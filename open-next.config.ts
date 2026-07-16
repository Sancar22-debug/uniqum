import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";

const config = {
  ...defineCloudflareConfig(),
  // Cloudflare runs `npm run build`, while OpenNext must invoke the plain
  // Next.js build internally. Keeping the commands separate avoids recursion.
  buildCommand: "npm run build:next",
} satisfies OpenNextConfig;

export default config;
