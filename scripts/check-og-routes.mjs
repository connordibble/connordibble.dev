import { readFile } from "node:fs/promises";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");
const manifest = JSON.parse(
  await readFile(join(nextDir, "prerender-manifest.json"), "utf8"),
);

const routeFamilies = [
  {
    pageSource: "/writing/[slug]",
    imageSource: "/writing/[slug]/opengraph-image",
  },
  {
    pageSource: "/projects/[slug]",
    imageSource: "/projects/[slug]/opengraph-image",
  },
];

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const failures = [];
let checked = 0;

for (const { pageSource, imageSource } of routeFamilies) {
  const pageRoutes = Object.entries(manifest.routes)
    .filter(([, config]) => config.srcRoute === pageSource)
    .map(([route]) => route);

  if (pageRoutes.length === 0) {
    failures.push(`No prerendered pages found for ${pageSource}`);
    continue;
  }

  for (const pageRoute of pageRoutes) {
    const imageRoute = `${pageRoute}/opengraph-image`;
    const imageConfig = manifest.routes[imageRoute];
    if (!imageConfig || imageConfig.srcRoute !== imageSource) {
      failures.push(`Missing prerendered image route: ${imageRoute}`);
      continue;
    }

    const artifactBase = join(nextDir, "server", "app", imageRoute.slice(1));
    try {
      const [body, metadataText] = await Promise.all([
        readFile(`${artifactBase}.body`),
        readFile(`${artifactBase}.meta`, "utf8"),
      ]);
      const metadata = JSON.parse(metadataText);
      const contentType = metadata.headers?.["content-type"];

      if (!body.subarray(0, pngSignature.length).equals(pngSignature)) {
        failures.push(`Invalid PNG artifact: ${imageRoute}`);
        continue;
      }
      if (metadata.status !== 200 || contentType !== "image/png") {
        failures.push(
          `Invalid image metadata for ${imageRoute}: ${metadata.status} ${contentType}`,
        );
        continue;
      }
      checked += 1;
    } catch (error) {
      failures.push(
        `Unreadable image artifact for ${imageRoute}: ${error.message}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`check-og-routes: failed\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`check-og-routes: ${checked} static PNG routes verified`);
}
