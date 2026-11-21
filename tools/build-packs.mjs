// Compiles compendium packs from JSON sources in packs/_source into LevelDB.
// FVTT_CLI may point to the CLI's index.mjs when it is installed outside the repo.
import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

const cliPath = process.env.FVTT_CLI
  ? pathToFileURL(process.env.FVTT_CLI).href
  : "@foundryvtt/foundryvtt-cli";
const { compilePack } = await import(cliPath);

for (const name of readdirSync("packs/_source")) {
  await compilePack(`packs/_source/${name}`, `packs/${name}`, { log: true });
}
