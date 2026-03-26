import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// This script exchanges the one-time short-lived Authorization code 
// for the long-lived refresh token + initial access token.
async function setupAmoCrm() {
  const subdomain = process.env.AMOCRM_SUBDOMAIN;
  const clientId = process.env.AMOCRM_CLIENT_ID;
  const clientSecret = process.env.AMOCRM_CLIENT_SECRET;
  const redirectUri = process.env.AMOCRM_REDIRECT_URI;
  const code = process.env.AMOCRM_CODE;

  if (!subdomain || !clientId || !clientSecret || !redirectUri || !code) {
    console.error("Missing necessary environment variables in .env.local");
    return;
  }

  const url = `https://${subdomain}.amocrm.ru/oauth2/access_token`;
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Error from amoCRM:", data);
        return;
    }

    // Success! We have the tokens. Let's write them to a JSON file.
    const tokenPath = path.resolve(process.cwd(), 'amocrm-tokens.json');
    
    // add an absolute expiry timestamp for easier refreshing later
    const tokenData = {
        ...data,
        expires_at: Date.now() + (data.expires_in * 1000)
    };

    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));

    console.log("✅ Successfully exchanged code for tokens!");
    console.log(`✅ Saved to ${tokenPath}`);
    console.log("You can now make API requests using the access token.");

  } catch (error) {
    console.error("Failed to fetch from amoCRM:", error);
  }
}

setupAmoCrm();
