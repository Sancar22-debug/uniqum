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

    // --- MAPPING (IDs discovered from logs) ---
    const FIELD_IDS = {
        AGE: 1181301,
        UTM_SOURCE: 661843,
        UTM_MEDIUM: 661839,
        UTM_CAMPAIGN: 661841,
        UTM_CONTENT: 661837,
        UTM_TERM: 661845,
        LEAD_SOURCE: 662661 // "Откуда узнали про нас"
    };

    const PIPELINE_ID = 5491699;
    const STATUS_ID = 48608338; // "новый лид"
    
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

    // Construct custom fields for the lead
    const leadCustomFields = [
        {
            field_id: FIELD_IDS.LEAD_SOURCE,
            values: [{ value: "Сайт" }]
        }
    ];
    
    if (age) {
        leadCustomFields.push({
            field_id: FIELD_IDS.AGE,
            values: [{ value: age }]
        });
    }

    if (utmTags) {
        if (utmTags.utm_source) {
            leadCustomFields.push({ field_id: FIELD_IDS.UTM_SOURCE, values: [{ value: utmTags.utm_source }] });
        } else {
            // Default to 'Сайт' if no UTM source is provided
            leadCustomFields.push({ field_id: FIELD_IDS.UTM_SOURCE, values: [{ value: "Сайт" }] });
        }
        if (utmTags.utm_medium) leadCustomFields.push({ field_id: FIELD_IDS.UTM_MEDIUM, values: [{ value: utmTags.utm_medium }] });
        if (utmTags.utm_campaign) leadCustomFields.push({ field_id: FIELD_IDS.UTM_CAMPAIGN, values: [{ value: utmTags.utm_campaign }] });
        if (utmTags.utm_content) leadCustomFields.push({ field_id: FIELD_IDS.UTM_CONTENT, values: [{ value: utmTags.utm_content }] });
        if (utmTags.utm_term) leadCustomFields.push({ field_id: FIELD_IDS.UTM_TERM, values: [{ value: utmTags.utm_term }] });
    } else {
        // No UTM tags at all, definitely set UTM source to 'Сайт' for internal tracking
        leadCustomFields.push({ field_id: FIELD_IDS.UTM_SOURCE, values: [{ value: "Сайт" }] });
    }

    const lead: any = {
        name: leadName,
        price: 0,
        status_id: STATUS_ID,
        pipeline_id: PIPELINE_ID,
        custom_fields_values: leadCustomFields,
        _embedded: {
          tags: [
            {
              name: "сайт"
            }
          ],
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
    
    // Russian note with UTM and Age info for secondary visibility
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
