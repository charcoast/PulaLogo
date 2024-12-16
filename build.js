const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");

const sharedConfig = {
  entryPoints: ["scripts/streaming/crunchy-roll.ts"],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(
    Object.keys(peerDependencies ?? {})
  ),
};

build({
  ...sharedConfig,
  platform: "browser", // for CJS
  outfile: "dist/bundle.js",
});

build({
  ...sharedConfig,
  outfile: "dist/bundle.esm.js",
  platform: "neutral", // for ESM
  format: "esm",
});
