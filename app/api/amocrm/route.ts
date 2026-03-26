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

    // Format custom fields and UTMs
    const customFields = []
    
    // We add the age into custom fields if it exists. 
    // Usually you need a specific field_id, but here we can just pass it into the lead name or a note if we don't have the ID.
    const utmString = utmTags 
      ? Object.entries(utmTags)
          .filter(([_, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" | ")
      : ""

    const leadName = age ? `Новая заявка с сайта: ${name} (Возраст: ${age})` : `Новая заявка с сайта: ${name}`

    const payload = [
      {
        name: leadName,
        price: 0,
        // _embedded: { tags: [{ name: "Заявка с сайта" }] } - Optional tags
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
      }
    ]

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
    
    // We can also post a note with the UTM tags since we don't know the exact custom field IDs
    if (utmString && data.length > 0 && data[0].id) {
        const leadId = data[0].id;
        await fetch(`https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/${leadId}/notes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{
                note_type: "common",
                params: {
                    text: `UTM Метки:\n${utmString}`
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
