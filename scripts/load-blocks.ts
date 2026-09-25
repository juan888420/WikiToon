import { loadBlocks } from "@/lib/import/blocks";
import { prisma } from "@/lib/prisma";
import { blocks } from "../prisma/data/blocks";

async function main() {
  const loaded = await loadBlocks(blocks);
  for (const block of loaded) {
    console.log(
      `${block.blockCreated ? "Created" : "Updated"} block ${block.channelSlug}/${block.slug} ` +
        `(id ${block.blockId}): ${block.linksCreated} series linked, ${block.linksExisting} already linked.`,
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
