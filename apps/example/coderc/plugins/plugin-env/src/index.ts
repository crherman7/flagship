/**
 * Defines a plugin for @brandingbrand/code-cli-kit.
 * @module Plugin
 */

import {
  definePlugin,
  withInfoPlist,
  withStrings,
} from '@brandingbrand/code-cli-kit';

/**
 * Defines a plugin with functions for both iOS and Android platforms.
 * @alias module:Plugin
 * @param {Object} build - The build configuration object.
 * @param {Object} options - The options object.
 */
export default definePlugin({
  /**
   * Function to be executed for iOS platform.
   * @param {Object} _build - The build configuration object for iOS.
   * @param {Object} _options - The options object for iOS.
   * @returns {Promise<void>} A promise that resolves when the process completes.
   */
  ios: async function (_build: object, _options: object): Promise<void> {
    await withInfoPlist(plist => {
      return {
        ...plist,
        FlagshipEnv: 'prod',
        FlagshipDevMenu: true,
      };
    });
  },

  /**
   * Function to be executed for Android platform.
   * @param {Object} _build - The build configuration object for Android.
   * @param {Object} _options - The options object for Android.
   * @returns {Promise<void>} A promise that resolves when the process completes.
   */
  android: async function (_build: object, _options: object): Promise<void> {
    return withStrings(xml => {
      xml.resources.string?.push({$: {name: 'flagship_env'}, _: 'prod'});
      xml.resources.string?.push({$: {name: 'flagship_dev_menu'}, _: 'true'});

      return xml;
    });
  },
});
