import fs from "fs-extra";

import { logger, path } from "../../../utils";
import { Warning } from "../../../utils/errors";
import { withSummary } from "../../../utils/summary";
import { withVersion } from "../../../utils/package-manager";

import type { Config } from "../../../types/types";
import type { InitOptions } from "../../../types/options";

export const execute = withSummary(
  async (options: InitOptions, config: Config) => {
    let envMatch = /env.\w+.js/;
    if (options.release) {
      envMatch = new RegExp(`env\\.${options.env}\\.js`);
      logger.logInfo("Creating index file for default env");
    } else {
      logger.logInfo("Creating index file for project envs");
    }

    const envs = (
      await fs.readdir(path.config.resolve("env"))
    ).filter((f: string) => f.match(envMatch));

    const envIndexFile = `module.exports = {\n${envs
      .map((env: string) => {
        const envName = /env.(\w+).js/.exec(env);
        return (
          envName &&
          `"${envName.pop()}": require(${JSON.stringify(
            path.config.resolve("env", env)
          )}).default`
        );
      })
      .join(",\n")}\n}`;

    await withVersion(
      "@brandingbrand/fsapp",
      async (packageVersion: string | undefined) => {
        if (!packageVersion) {
          throw new Warning(
            "@brandingbrand/fsapp v10.+ or v11.+ installed; runtime env will not be accessible. The runtime env will be accessible in a more targeted package in the future."
          );
        }

        if (packageVersion.match(/10./)) {
          return fs.writeFile(
            path.app.resolve("project_env_index.js"),
            envIndexFile
          );
        }

        if (packageVersion.match(/11./)) {
          return fs.writeFile(
            path.app.resolve("src/project_env_index.js"),
            envIndexFile
          );
        }
      }
    );
  },
  "env",
  "pre"
);
