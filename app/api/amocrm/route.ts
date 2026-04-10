import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, age, utmTags } = body

    const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN
    // We now use the long-lived token from Vercel environment variables directly!
    const accessToken = process.env.AMOCRM_LONG_LIVED_TOKEN

    if (!AMOCRM_SUBDOMAIN || !accessToken) {
      console.warn("AmoCRM subdomain or long-lived token is not configured.")
      return NextResponse.json({ success: false, error: "Not configured" }, { status: 500 })
    }

    const apiUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex`

    // --- DISCOVERY MODE ---
    // This logs all custom fields to help find the correct ID for "Возраст ребенка"
    try {
      const response = await fetch(`https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/custom_fields`, {
          headers: { "Authorization": `Bearer ${accessToken}` }
      });
      if (response.ok) {
          const fieldsData = await response.json();
          console.log("--- AmoCRM DISCOVERY MODE: Lead Custom Fields ---");
          fieldsData._embedded?.custom_fields?.forEach((f: any) => {
              console.log(`Field Name: ${f.name} | ID: ${f.id} | Code: ${f.code}`);
          });
          console.log("--------------------------------------------------");
      }
    } catch (e) {
      console.warn("Discovery Mode failed, proceeding with submission.");
    }

    // --- MAPPING ---
    // Use the ID discovered from logs here.
    const CORRECT_AGE_FIELD_ID = null; // Placeholder - change this once ID is found
    
    const utmString = utmTags 
      ? Object.entries(utmTags)
          .filter(([_, v]) => v)
          .map(([k, v]) => {
              const labels: Record<string, string> = {
                  utm_source: "Источник",
                  utm_medium: "Тип трафика",
                  utm_campaign: "Кампания",
                  utm_term: "Ключевое слово",
                  utm_content: "Контент"
              };
              return `${labels[k] || k}: ${v}`;
          })
          .join(" | ")
      : ""

    const leadName = age ? `Заявка с сайта: ${name} (Ребёнок: ${age} лет)` : `Заявка с сайта: ${name}`

    const lead: any = {
        name: leadName,
        price: 0,
        _embedded: {
          contacts: [
            {
              first_name: name,
              custom_fields_values: [
                {
                  field_code: "PHONE",
                  values: [
                    {
                      value: phone,
                      enum_code: "WORK"
                    }
                  ]
                }
              ]
            }
          ]
        }
    };

    // Only add custom field if we have a valid ID
    if (CORRECT_AGE_FIELD_ID) {
        lead.custom_fields_values = [
            {
                field_id: CORRECT_AGE_FIELD_ID,
                values: [{ value: age }]
            }
        ];
    }

    const payload = [lead];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AmoCRM API Error:", errorText)
      return NextResponse.json({ error: "Failed to submit to AmoCRM", details: errorText }, { status: 400 })
    }

    const data = await response.json()
    
    // Russian note with UTM and Age info
    if (data.length > 0 && data[0].id) {
        const leadId = data[0].id;
        let noteText = `ИНФОРМАЦИЯ О ЗАЯВКЕ:\n`;
        if (age) noteText += `Возраст ребенка: ${age}\n`;
        if (utmString) noteText += `\nUTM Метки:\n${utmString}`;

        await fetch(`https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/${leadId}/notes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{
                note_type: "common",
                params: {
                    text: noteText
                }
            }])
        })
    }

    return NextResponse.json({ success: true, data })

  } catch (error: any) {
    console.error("Internal Server Error:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
