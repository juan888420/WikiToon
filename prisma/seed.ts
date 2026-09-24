import { prisma } from "../src/lib/prisma";

// Pan-regional Latin American feeds, so `country` stays null.
const channels = [
  { slug: "cartoon-network", name: "Cartoon Network" },
  { slug: "nickelodeon", name: "Nickelodeon" },
  { slug: "disney-channel", name: "Disney Channel" },
  { slug: "fox-kids", name: "Fox Kids" },
  { slug: "jetix", name: "Jetix" },
  { slug: "boomerang", name: "Boomerang" },
  { slug: "discovery-kids", name: "Discovery Kids" },
];

async function main() {
  await prisma.$transaction(
    channels.map((channel) =>
      prisma.channel.upsert({
        where: { slug: channel.slug },
        update: { name: channel.name },
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
