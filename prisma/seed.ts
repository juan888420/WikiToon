import { prisma } from "../src/lib/prisma";

// Pan-regional Latin American feeds, so `country` stays null.
// Logo assets and their sources are documented in public/logos/SOURCES.md.
const channels = [
  { slug: "cartoon-network", name: "Cartoon Network", logoPath: "/logos/cartoon-network.svg" },
  { slug: "nickelodeon", name: "Nickelodeon", logoPath: "/logos/nickelodeon.svg" },
  { slug: "disney-channel", name: "Disney Channel", logoPath: "/logos/disney-channel.svg" },
  { slug: "fox-kids", name: "Fox Kids", logoPath: "/logos/fox-kids.svg" },
  { slug: "jetix", name: "Jetix", logoPath: "/logos/jetix.png" },
  { slug: "boomerang", name: "Boomerang", logoPath: "/logos/boomerang.svg" },
  { slug: "discovery-kids", name: "Discovery Kids", logoPath: "/logos/discovery-kids.svg" },
];

async function main() {
  await prisma.$transaction(
    channels.map((channel) =>
      prisma.channel.upsert({
        where: { slug: channel.slug },
        update: { name: channel.name, logoPath: channel.logoPath },
        create: channel,
      }),
    ),
  );
  console.log(`Seeded ${channels.length} channels.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
