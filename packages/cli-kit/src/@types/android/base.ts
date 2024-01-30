import type { Manifest } from "./android-manifest";
import type { NetworkSecurityConfigElements } from "./network-security";
import type { StringsElements } from "./strings";
import type { Styles } from "./styles";

export interface Android {
  /**
   * Application source code name
   */
  name: string;
  /**
   * Android app display name
   */
  displayName: string;
  /**
   * Gradle configuration
   */
  gradle?: Gradle;
  /**
   * AndroidManifest.xml configuration
   */
  manifest?: Manifest;
  /**
   * Android network_security_config.xml configuration
   */
  security?: NetworkSecurityConfigElements;
  /**
   * Android styles.xml configuration
   */
  styles?: Styles;
  /**
   * Android strings.xml configuration
   */
  strings?: StringsElements;
  /**
   * App package name
   */
  packageName: string;
  /**
   * signing config
   */
  signing?: AndroidSigning;
  /**
   * App version
   */
  versioning?: AndroidVersion;
}

export interface AndroidVersion {
  /**
   * App version i.e. versionName
   */
  version: string;
  /**
   * App build i.e. versionCode
   */
  build?: number;
}

export interface AndroidSigning {
  keyAlias: string;
  storeFile: string;
}

export interface AppGradle {
  /**
   * Additional dependencies for app/build.gradle
   */
  dependencies?: string[];
}

export interface ProjectGradle {
  /**
   * Android gradle plugin version.
   */
  androidGradlePluginVersion?: string;
  /**
   * Android build tools version
   */
  buildToolsVersion?: string;
  /**
   * Android compile SDK version
   */
  compileSdkVersion?: number;
  /**
   * Kotlin version
   */
  kotlinVersion?: string;
  /**
   * Min supported Android SDK
   */
  minSdkVersion?: number;
  /**
   * Specified NDK version
   */
  ndkVersion?: string;
  /**
   * Additional repository search paths
   */
  repositories?: string[];
  /**
   * Android target SDK version
   */
  targetSdkVersion?: number;
  /**
   * Ext config
   */
  ext?: string[];
  /**
   * Dependencies
   */
  dependencies?: string[];
  /**
   * Build repositories
   */
  buildRepositories?: string[];
}

export interface Gradle {
  /**
   * app/build.gradle config
   */
  appGradle?: AppGradle;
  /**
   * Gradle wrapper distribution url
   */
  distributionVersion?: string;
  /**
   * jvm args i.e. heap memory
   */
  jvmArgs?: string;
  /**
   * build.gradle config
   */
  projectGradle?: ProjectGradle;
}