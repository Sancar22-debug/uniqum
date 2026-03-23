import { NextResponse } from "next/server"

// AmoCRM Complex API Route
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, age, utmTags } = body

    const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN
    const AMOCRM_ACCESS_TOKEN = process.env.AMOCRM_ACCESS_TOKEN

    if (!AMOCRM_SUBDOMAIN || !AMOCRM_ACCESS_TOKEN) {
      console.warn("AmoCRM credentials are not configured in environment variables.")
      // We resolve cleanly for local dev testing if not configured yet.
      return NextResponse.json({ success: true, simulated: true, m: "No credentials" })
    }

    const apiUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex`

    // Format Custom Fields for UTM tags if present
    const customFields = []
    
    // NOTE: You will need to replace these ID numbers with your actual custom field IDs from AmoCRM
    // if you want them properly mapped. For now, we drop them mathematically as a string mapped list.
    const utmString = Object.entries(utmTags || {})
        .filter(([_, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")

    const payload = [
      {
        name: `Новая заявка с сайта: ${name}`,
        // If you know your Pipeline ID (Воронка) or status ID, you can set them here
        custom_fields_values: [
          ...(utmString ? [{
            // Assuming you create a text field for UTM parameters and insert its ID here
            // field_id: XXXXXX,
            // values: [{ value: utmString }]
          }] : []),
          ...(age ? [{
             // field_id: YOUR_AGE_FIELD_ID,
             // values: [{ value: age }]
          }]: [])
        ],
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
        "Authorization": `Bearer ${AMOCRM_ACCESS_TOKEN}`,
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
    return NextResponse.json({ success: true, data })

  } catch (error: any) {
    console.error("Internal Server Error:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
