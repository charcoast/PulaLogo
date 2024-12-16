const {build} = require("esbuild");
const {dependencies, peerDependencies} = require("./package.json");

const sharedConfig = {
    bundle: true,
    minify: true,
    external: Object.keys(dependencies).concat(
        Object.keys(peerDependencies ?? {})
    ),
};

build({
    ...sharedConfig,
    entryPoints: ["scripts/streaming/crunchy-roll.ts"],
    platform: "browser",
    outfile: "dist/crunchy-roll.js",
});

build({
    ...sharedConfig,
    entryPoints: ["scripts/streaming/netflix.ts"],
    platform: "browser",
    outfile: "dist/netflix.js",
});
