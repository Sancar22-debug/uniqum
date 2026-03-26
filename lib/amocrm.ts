import fs from "fs"
import path from "path"

const TOKEN_FILE_PATH = path.resolve(process.cwd(), "amocrm-tokens.json")

interface AmoCrmTokens {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
  expires_at: number
}

// Read tokens from the local file
function getStoredTokens(): AmoCrmTokens | null {
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const data = fs.readFileSync(TOKEN_FILE_PATH, "utf-8")
      return JSON.parse(data) as AmoCrmTokens
    }
  } catch (error) {
    console.error("Failed to read amoCRM tokens:", error)
  }
  return null
}

// Write tokens to the local file
function saveTokens(tokens: any) {
  try {
    const tokenData = {
      ...tokens,
      expires_at: Date.now() + tokens.expires_in * 1000,
    }
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2))
    return tokenData as AmoCrmTokens
  } catch (error) {
    console.error("Failed to save amoCRM tokens:", error)
    return null
  }
}

// Exchange the refresh token for a new access token
async function refreshTokens(refreshToken: string) {
  const subdomain = process.env.AMOCRM_SUBDOMAIN
  const clientId = process.env.AMOCRM_CLIENT_ID
  const clientSecret = process.env.AMOCRM_CLIENT_SECRET
  const redirectUri = process.env.AMOCRM_REDIRECT_URI

  if (!subdomain || !clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing AmoCRM credentials in environment variables")
  }

  const url = `https://${subdomain}.amocrm.ru/oauth2/access_token`
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    redirect_uri: redirectUri,
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error("AmoCRM Token Refresh Error:", errorData)
    throw new Error("Failed to refresh AmoCRM tokens")
  }

  const newTokens = await response.json()
  return saveTokens(newTokens)
}

// Provide a valid access token (refreshes automatically if expired)
export async function getAccessToken(): Promise<string | null> {
  let tokens = getStoredTokens()

  if (!tokens) {
    console.error("No amoCRM tokens found! Run the setup-amocrm script first.")
    return null
  }

  // Check if token is expired or expires in less than 5 minutes
  const isExpired = Date.now() >= tokens.expires_at - 5 * 60 * 1000

  if (isExpired) {
    console.log("amoCRM access token expired. Refreshing...")
    try {
      const newTokens = await refreshTokens(tokens.refresh_token)
      if (newTokens) {
        tokens = newTokens
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  return tokens.access_token
}
