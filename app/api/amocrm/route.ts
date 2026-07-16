import { NextResponse } from "next/server"

const DEFAULT_STATUS_NAME = "Заявки с сайта (приоритет 1)"

type AmoCrmStatus = {
  id: number
  name: string
}

type AmoCrmPipeline = {
  id: number
  name: string
  account_id?: number
  is_archive?: boolean
  _embedded?: {
    statuses?: AmoCrmStatus[]
  }
}

let cachedRouting:
  | {
      cacheKey: string
      pipelineId: number
      statusId: number
    }
  | undefined

function parsePositiveInteger(value: string | undefined) {
  if (!value) return undefined

  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

function normalizeAccountDomain(value: string) {
  const hostname = value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")

  return hostname.includes(".") ? hostname : `${hostname}.amocrm.ru`
}

async function resolveRouting({
  accountDomain,
  accessToken,
  configuredPipelineId,
  configuredStatusId,
  statusName,
}: {
  accountDomain: string
  accessToken: string
  configuredPipelineId?: number
  configuredStatusId?: number
  statusName: string
}) {
  const cacheKey = [
    accountDomain,
    configuredPipelineId ?? "auto",
    configuredStatusId ?? "auto",
    statusName,
  ].join(":")
  if (cachedRouting?.cacheKey === cacheKey) return cachedRouting

  const response = await fetch(
    `https://${accountDomain}/api/v4/leads/pipelines`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error("AmoCRM pipeline status lookup failed:", response.status, errorText)

    if (response.status === 401) {
      throw new Error("AmoCRM token is invalid, expired, or revoked")
    }

    throw new Error("Could not load amoCRM pipelines and statuses")
  }

  const data = (await response.json()) as {
    _embedded?: {
      pipelines?: AmoCrmPipeline[]
    }
  }
  const pipelines = data._embedded?.pipelines ?? []
  const candidatePipelines = configuredPipelineId
    ? pipelines.filter((pipeline) => pipeline.id === configuredPipelineId)
    : pipelines.filter((pipeline) => !pipeline.is_archive)

  if (configuredPipelineId && candidatePipelines.length === 0) {
    const matchingAccount = pipelines.find(
      (pipeline) => pipeline.account_id === configuredPipelineId
    )

    if (matchingAccount) {
      console.error(
        `AMOCRM_PIPELINE_ID ${configuredPipelineId} is the account ID, not a pipeline ID`
      )
    }

    throw new Error(`AmoCRM pipeline ${configuredPipelineId} was not found`)
  }

  if (candidatePipelines.some((pipeline) => pipeline.is_archive)) {
    throw new Error(`AmoCRM pipeline ${configuredPipelineId} is archived`)
  }

  const normalizedTargetName = statusName.trim().toLocaleLowerCase("ru")
  const matches = candidatePipelines.flatMap((pipeline) =>
    (pipeline._embedded?.statuses ?? [])
      .filter((status) =>
        configuredStatusId
          ? status.id === configuredStatusId
          : status.name.trim().toLocaleLowerCase("ru") === normalizedTargetName
      )
      .map((status) => ({
        pipeline,
        status,
      }))
  )

  if (matches.length === 0) {
    console.error(
      `AmoCRM status "${statusName}" was not found. Available routing:`,
      candidatePipelines
        .flatMap((pipeline) =>
          (pipeline._embedded?.statuses ?? []).map(
            (status) =>
              `${pipeline.name} (${pipeline.id}) -> ${status.name} (${status.id})`
          )
        )
        .join(", ")
    )
    throw new Error(`AmoCRM status "${statusName}" was not found`)
  }

  if (matches.length > 1) {
    console.error(
      `AmoCRM status "${statusName}" exists in more than one pipeline:`,
      matches
        .map(
          ({ pipeline, status }) =>
            `${pipeline.name} (${pipeline.id}) -> ${status.name} (${status.id})`
        )
        .join(", ")
    )
    throw new Error(
      `AmoCRM status "${statusName}" is ambiguous; configure AMOCRM_PIPELINE_ID`
    )
  }

  const [{ pipeline, status }] = matches
  cachedRouting = {
    cacheKey,
    pipelineId: pipeline.id,
    statusId: status.id,
  }

  console.info(
    `AmoCRM routing resolved: ${pipeline.name} (${pipeline.id}) -> ${status.name} (${status.id})`
  )

  return cachedRouting
}

export async function POST(req: Request) {
  try {
    const parsedBody = await req.json()

    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      )
    }

    const body = parsedBody as Record<string, unknown>
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const age = typeof body.age === "string" ? body.age.trim() : ""
    const rawUtmTags =
      body.utmTags && typeof body.utmTags === "object" && !Array.isArray(body.utmTags)
        ? (body.utmTags as Record<string, unknown>)
        : undefined
    const utmTags = rawUtmTags
      ? Object.fromEntries(
          Object.entries(rawUtmTags).map(([key, value]) => [
            key,
            value == null ? undefined : String(value).trim(),
          ])
        )
      : undefined

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      )
    }

    const rawAccountDomain = process.env.AMOCRM_API_DOMAIN || process.env.AMOCRM_SUBDOMAIN
    const accessToken =
      process.env.AMOCRM_LONG_LIVED_TOKEN || process.env.AMOCRM_ACCESS_TOKEN

    if (!rawAccountDomain || !accessToken) {
      console.warn("AmoCRM account domain or access token is not configured.")
      return NextResponse.json({ success: false, error: "Not configured" }, { status: 500 })
    }

    const accountDomain = normalizeAccountDomain(rawAccountDomain)
    const configuredPipelineId = process.env.AMOCRM_PIPELINE_ID
    const pipelineIdOverride = parsePositiveInteger(configuredPipelineId)

    if (configuredPipelineId && !pipelineIdOverride) {
      return NextResponse.json(
        { success: false, error: "AMOCRM_PIPELINE_ID must be a positive integer" },
        { status: 500 }
      )
    }

    const configuredStatusIdValue = process.env.AMOCRM_STATUS_ID
    const configuredStatusId = parsePositiveInteger(configuredStatusIdValue)

    if (configuredStatusIdValue && !configuredStatusId) {
      return NextResponse.json(
        { success: false, error: "AMOCRM_STATUS_ID must be a positive integer" },
        { status: 500 }
      )
    }

    const statusName = process.env.AMOCRM_STATUS_NAME?.trim() || DEFAULT_STATUS_NAME
    const { pipelineId, statusId } = await resolveRouting({
      accountDomain,
      accessToken,
      configuredPipelineId: pipelineIdOverride,
      configuredStatusId,
      statusName,
    })
    const apiUrl = `https://${accountDomain}/api/v4/leads/complex`

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
        status_id: statusId,
        pipeline_id: pipelineId,
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
      console.error("AmoCRM API Error:", response.status, errorText)

      const errorMessage =
        response.status === 401
          ? "AmoCRM token is invalid, expired, or revoked"
          : "AmoCRM rejected the lead submission"

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 502 }
      )
    }

    const data = (await response.json()) as Array<{ id?: number; merged?: boolean }>

    if (!Array.isArray(data) || !data[0]?.id) {
      console.error("AmoCRM returned an unexpected lead response:", data)
      return NextResponse.json(
        { success: false, error: "AmoCRM returned an invalid response" },
        { status: 502 }
      )
    }

    if (data[0]?.merged) {
      console.warn(
        `AmoCRM duplicate control merged the submission into existing lead ${data[0].id}`
      )
    }
    
    // Russian note with UTM and Age info for secondary visibility
    if (data.length > 0 && data[0].id) {
        const leadId = data[0].id;
        let noteText = `ИНФОРМАЦИЯ О ЗАЯВКЕ:\n`;
        if (age) noteText += `Возраст ребенка: ${age}\n`;
        if (utmString) noteText += `\nUTM Метки:\n${utmString}`;

        const noteResponse = await fetch(`https://${accountDomain}/api/v4/leads/${leadId}/notes`, {
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

        if (!noteResponse.ok) {
          console.error(
            "AmoCRM note creation failed:",
            noteResponse.status,
            await noteResponse.text()
          )
        }
    }

    return NextResponse.json({ success: true, data })

  } catch (error: any) {
    console.error("Internal Server Error:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
