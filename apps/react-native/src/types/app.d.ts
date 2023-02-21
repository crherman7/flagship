declare module '@brandingbrand/code-app' {
  type ENV = import('@brandingbrand/code-core').Config<App> &
    import('@brandingbrand/code-plugin-asset').CodePluginAsset &
    import('@brandingbrand/code-plugin-app-icon').CodePluginAppIcon &
    import('@brandingbrand/code-plugin-fastlane').CodePluginFastlane &
    import('@brandingbrand/code-plugin-permissions').CodePluginPermissions &
    import('@brandingbrand/code-plugin-splash-screen').CodePluginSplashScreen &
    import('@brandingbrand/code-plugin-target-extension').CodePluginTargetExtension;

  interface App {
    foo: string;
    bar: number;
  }
}
