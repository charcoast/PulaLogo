import { build } from "esbuild";
import  dependencies  from "./package.json" with { type: "json" };
import  peerDependencies  from "./package.json" with { type: "json" };

const sharedConfig = {
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(
    Object.keys(peerDependencies ?? {}),
  ),
};

build({
  ...sharedConfig,
  entryPoints: ["scripts/streaming/crunchy-roll/crunchyRoll.ts"],
  platform: "browser",
  outfile: "dist/crunchy-roll.js",
});

build({
  ...sharedConfig,
  entryPoints: ["scripts/streaming/netflix/netflix.ts"],
  platform: "browser",
  outfile: "dist/netflix.js",
});
