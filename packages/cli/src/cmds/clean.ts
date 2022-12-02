import { program } from "commander";
import { clean, platforms } from "@brandingbrand/kernel-core";

program
  .command("clean")
  .description("remove build and installation artifacts")
  .option(
    "-p, --platform [platform]",
    "platform: ios, android or native (ios & android)",
    "native"
  )
  .option("-q, --quiet", "supress stdout")
  .action(async (options) => {
    for (const e of clean.pre.executors) {
      await e.execute(options, {}, __dirname);
    }

    for (const u of [clean.prePlatform, clean.platform, clean.postPlatform]) {
      for (const p of platforms.get(options.platform)) {
        for (const e of u.executors) {
          await e.execute(options, {}, __dirname)[p]();
        }
      }
    }

    for (const e of clean.post.executors) {
      await e.execute(options, {}, __dirname);
    }
  });