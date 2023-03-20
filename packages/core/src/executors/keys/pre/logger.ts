import { spinner } from "../../../utils";

import type { Config } from "../../../types/types";
import type { KeysOptions } from "../../../types/options";

export const execute = async (options: KeysOptions, config: Config) => {
  if (!options.verbose) {
    spinner.start("Adding keys to the app");

    //@ts-ignore
    process.stdout.write = function () {};
  }
};
