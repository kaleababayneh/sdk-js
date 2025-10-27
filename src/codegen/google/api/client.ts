// @ts-nocheck
/* eslint-disable */
import { LaunchStage } from "./launch_stage";
import { Duration, DurationAmino } from "../protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { DeepPartial, isSet } from "../../helpers";
/**
 * The organization for which the client libraries are being published.
 * Affects the url where generated docs are published, etc.
 */
export enum ClientLibraryOrganization {
  /** CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED - Not useful. */
  CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = 0,
  /** CLOUD - Google Cloud Platform Org. */
  CLOUD = 1,
  /** ADS - Ads (Advertising) Org. */
  ADS = 2,
  /** PHOTOS - Photos Org. */
  PHOTOS = 3,
  /** STREET_VIEW - Street View Org. */
  STREET_VIEW = 4,
  /** SHOPPING - Shopping Org. */
  SHOPPING = 5,
  /** GEO - Geo Org. */
  GEO = 6,
  /** GENERATIVE_AI - Generative AI - https://developers.generativeai.google */
  GENERATIVE_AI = 7,
  UNRECOGNIZED = -1,
}
export const ClientLibraryOrganizationAmino = ClientLibraryOrganization;
export function clientLibraryOrganizationFromJSON(object: any): ClientLibraryOrganization {
  switch (object) {
    case 0:
    case "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED":
      return ClientLibraryOrganization.CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED;
    case 1:
    case "CLOUD":
      return ClientLibraryOrganization.CLOUD;
    case 2:
    case "ADS":
      return ClientLibraryOrganization.ADS;
    case 3:
    case "PHOTOS":
      return ClientLibraryOrganization.PHOTOS;
    case 4:
    case "STREET_VIEW":
      return ClientLibraryOrganization.STREET_VIEW;
    case 5:
    case "SHOPPING":
      return ClientLibraryOrganization.SHOPPING;
    case 6:
    case "GEO":
      return ClientLibraryOrganization.GEO;
    case 7:
    case "GENERATIVE_AI":
      return ClientLibraryOrganization.GENERATIVE_AI;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClientLibraryOrganization.UNRECOGNIZED;
  }
}
export function clientLibraryOrganizationToJSON(object: ClientLibraryOrganization): string {
  switch (object) {
    case ClientLibraryOrganization.CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED:
      return "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED";
    case ClientLibraryOrganization.CLOUD:
      return "CLOUD";
    case ClientLibraryOrganization.ADS:
      return "ADS";
    case ClientLibraryOrganization.PHOTOS:
      return "PHOTOS";
    case ClientLibraryOrganization.STREET_VIEW:
      return "STREET_VIEW";
    case ClientLibraryOrganization.SHOPPING:
      return "SHOPPING";
    case ClientLibraryOrganization.GEO:
      return "GEO";
    case ClientLibraryOrganization.GENERATIVE_AI:
      return "GENERATIVE_AI";
    case ClientLibraryOrganization.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** To where should client libraries be published? */
export enum ClientLibraryDestination {
  /**
   * CLIENT_LIBRARY_DESTINATION_UNSPECIFIED - Client libraries will neither be generated nor published to package
   * managers.
   */
  CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = 0,
  /**
   * GITHUB - Generate the client library in a repo under github.com/googleapis,
   * but don't publish it to package managers.
   */
  GITHUB = 10,
  /** PACKAGE_MANAGER - Publish the library to package managers like nuget.org and npmjs.com. */
  PACKAGE_MANAGER = 20,
  UNRECOGNIZED = -1,
}
export const ClientLibraryDestinationAmino = ClientLibraryDestination;
export function clientLibraryDestinationFromJSON(object: any): ClientLibraryDestination {
  switch (object) {
    case 0:
    case "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED":
      return ClientLibraryDestination.CLIENT_LIBRARY_DESTINATION_UNSPECIFIED;
    case 10:
    case "GITHUB":
      return ClientLibraryDestination.GITHUB;
    case 20:
    case "PACKAGE_MANAGER":
      return ClientLibraryDestination.PACKAGE_MANAGER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClientLibraryDestination.UNRECOGNIZED;
  }
}
export function clientLibraryDestinationToJSON(object: ClientLibraryDestination): string {
  switch (object) {
    case ClientLibraryDestination.CLIENT_LIBRARY_DESTINATION_UNSPECIFIED:
      return "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED";
    case ClientLibraryDestination.GITHUB:
      return "GITHUB";
    case ClientLibraryDestination.PACKAGE_MANAGER:
      return "PACKAGE_MANAGER";
    case ClientLibraryDestination.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Required information for every language.
 * @name CommonLanguageSettings
 * @package google.api
 * @see proto type: google.api.CommonLanguageSettings
 */
export interface CommonLanguageSettings {
  /**
   * Link to automatically generated reference documentation.  Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   * @deprecated
   */
  referenceDocsUri: string;
  /**
   * The destination where API teams want this client library to be published.
   */
  destinations: ClientLibraryDestination[];
  /**
   * Configuration for which RPCs should be generated in the GAPIC client.
   */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
}
export interface CommonLanguageSettingsProtoMsg {
  typeUrl: "/google.api.CommonLanguageSettings";
  value: Uint8Array;
}
/**
 * Required information for every language.
 * @name CommonLanguageSettingsAmino
 * @package google.api
 * @see proto type: google.api.CommonLanguageSettings
 */
export interface CommonLanguageSettingsAmino {
  /**
   * Link to automatically generated reference documentation.  Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   * @deprecated
   */
  reference_docs_uri: string;
  /**
   * The destination where API teams want this client library to be published.
   */
  destinations: ClientLibraryDestination[];
  /**
   * Configuration for which RPCs should be generated in the GAPIC client.
   */
  selective_gapic_generation?: SelectiveGapicGenerationAmino;
}
export interface CommonLanguageSettingsAminoMsg {
  type: "/google.api.CommonLanguageSettings";
  value: CommonLanguageSettingsAmino;
}
/**
 * Details about how and where to publish client libraries.
 * @name ClientLibrarySettings
 * @package google.api
 * @see proto type: google.api.ClientLibrarySettings
 */
export interface ClientLibrarySettings {
  /**
   * Version of the API to apply these settings to. This is the full protobuf
   * package for the API, ending in the version element.
   * Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1".
   */
  version: string;
  /**
   * Launch stage of this version of the API.
   */
  launchStage: LaunchStage;
  /**
   * When using transport=rest, the client request will encode enums as
   * numbers rather than strings.
   */
  restNumericEnums: boolean;
  /**
   * Settings for legacy Java features, supported in the Service YAML.
   */
  javaSettings?: JavaSettings;
  /**
   * Settings for C++ client libraries.
   */
  cppSettings?: CppSettings;
  /**
   * Settings for PHP client libraries.
   */
  phpSettings?: PhpSettings;
  /**
   * Settings for Python client libraries.
   */
  pythonSettings?: PythonSettings;
  /**
   * Settings for Node client libraries.
   */
  nodeSettings?: NodeSettings;
  /**
   * Settings for .NET client libraries.
   */
  dotnetSettings?: DotnetSettings;
  /**
   * Settings for Ruby client libraries.
   */
  rubySettings?: RubySettings;
  /**
   * Settings for Go client libraries.
   */
  goSettings?: GoSettings;
}
export interface ClientLibrarySettingsProtoMsg {
  typeUrl: "/google.api.ClientLibrarySettings";
  value: Uint8Array;
}
/**
 * Details about how and where to publish client libraries.
 * @name ClientLibrarySettingsAmino
 * @package google.api
 * @see proto type: google.api.ClientLibrarySettings
 */
export interface ClientLibrarySettingsAmino {
  /**
   * Version of the API to apply these settings to. This is the full protobuf
   * package for the API, ending in the version element.
   * Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1".
   */
  version: string;
  /**
   * Launch stage of this version of the API.
   */
  launch_stage: LaunchStage;
  /**
   * When using transport=rest, the client request will encode enums as
   * numbers rather than strings.
   */
  rest_numeric_enums: boolean;
  /**
   * Settings for legacy Java features, supported in the Service YAML.
   */
  java_settings?: JavaSettingsAmino;
  /**
   * Settings for C++ client libraries.
   */
  cpp_settings?: CppSettingsAmino;
  /**
   * Settings for PHP client libraries.
   */
  php_settings?: PhpSettingsAmino;
  /**
   * Settings for Python client libraries.
   */
  python_settings?: PythonSettingsAmino;
  /**
   * Settings for Node client libraries.
   */
  node_settings?: NodeSettingsAmino;
  /**
   * Settings for .NET client libraries.
   */
  dotnet_settings?: DotnetSettingsAmino;
  /**
   * Settings for Ruby client libraries.
   */
  ruby_settings?: RubySettingsAmino;
  /**
   * Settings for Go client libraries.
   */
  go_settings?: GoSettingsAmino;
}
export interface ClientLibrarySettingsAminoMsg {
  type: "/google.api.ClientLibrarySettings";
  value: ClientLibrarySettingsAmino;
}
/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 * @name Publishing
 * @package google.api
 * @see proto type: google.api.Publishing
 */
export interface Publishing {
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   */
  methodSettings: MethodSettings[];
  /**
   * Link to a *public* URI where users can report issues.  Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   */
  newIssueUri: string;
  /**
   * Link to product home page.  Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   */
  documentationUri: string;
  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers,
   * etc.  Example: "speech".
   */
  apiShortName: string;
  /**
   * GitHub label to apply to issues and pull requests opened for this API.
   */
  githubLabel: string;
  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   */
  codeownerGithubTeams: string[];
  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   */
  docTagPrefix: string;
  /**
   * For whom the client library is being published.
   */
  organization: ClientLibraryOrganization;
  /**
   * Client library settings.  If the same version string appears multiple
   * times in this list, then the last one wins.  Settings from earlier
   * settings with the same version string are discarded.
   */
  librarySettings: ClientLibrarySettings[];
  /**
   * Optional link to proto reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rpc
   */
  protoReferenceDocumentationUri: string;
  /**
   * Optional link to REST reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rest
   */
  restReferenceDocumentationUri: string;
}
export interface PublishingProtoMsg {
  typeUrl: "/google.api.Publishing";
  value: Uint8Array;
}
/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 * @name PublishingAmino
 * @package google.api
 * @see proto type: google.api.Publishing
 */
export interface PublishingAmino {
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   */
  method_settings: MethodSettingsAmino[];
  /**
   * Link to a *public* URI where users can report issues.  Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   */
  new_issue_uri: string;
  /**
   * Link to product home page.  Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   */
  documentation_uri: string;
  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers,
   * etc.  Example: "speech".
   */
  api_short_name: string;
  /**
   * GitHub label to apply to issues and pull requests opened for this API.
   */
  github_label: string;
  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   */
  codeowner_github_teams: string[];
  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   */
  doc_tag_prefix: string;
  /**
   * For whom the client library is being published.
   */
  organization: ClientLibraryOrganization;
  /**
   * Client library settings.  If the same version string appears multiple
   * times in this list, then the last one wins.  Settings from earlier
   * settings with the same version string are discarded.
   */
  library_settings: ClientLibrarySettingsAmino[];
  /**
   * Optional link to proto reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rpc
   */
  proto_reference_documentation_uri: string;
  /**
   * Optional link to REST reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rest
   */
  rest_reference_documentation_uri: string;
}
export interface PublishingAminoMsg {
  type: "/google.api.Publishing";
  value: PublishingAmino;
}
/**
 * @name JavaSettings_ServiceClassNamesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export interface JavaSettings_ServiceClassNamesEntry {
  key: string;
  value: string;
}
export interface JavaSettings_ServiceClassNamesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
/**
 * @name JavaSettings_ServiceClassNamesEntryAmino
 * @package google.api
 * @see proto type: google.api.JavaSettings_ServiceClassNamesEntry
 */
export interface JavaSettings_ServiceClassNamesEntryAmino {
  key: string;
  value: string;
}
export interface JavaSettings_ServiceClassNamesEntryAminoMsg {
  type: string;
  value: JavaSettings_ServiceClassNamesEntryAmino;
}
/**
 * Settings for Java client libraries.
 * @name JavaSettings
 * @package google.api
 * @see proto type: google.api.JavaSettings
 */
export interface JavaSettings {
  /**
   * The package name to use in Java. Clobbers the java_package option
   * set in the protobuf. This should be used **only** by APIs
   * who have already set the language_settings.java.package_name" field
   * in gapic.yaml. API teams should use the protobuf java_package option
   * where possible.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      library_package: com.google.cloud.pubsub.v1
   */
  libraryPackage: string;
  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified
   * service names as they appear in the protobuf (including the full
   * the language_settings.java.interface_names" field in gapic.yaml. API
   * teams should otherwise use the service name as it appears in the
   * protobuf.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      service_class_names:
   *        - google.pubsub.v1.Publisher: TopicAdmin
   *        - google.pubsub.v1.Subscriber: SubscriptionAdmin
   */
  serviceClassNames: {
    [key: string]: string;
  };
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}
export interface JavaSettingsProtoMsg {
  typeUrl: "/google.api.JavaSettings";
  value: Uint8Array;
}
/**
 * Settings for Java client libraries.
 * @name JavaSettingsAmino
 * @package google.api
 * @see proto type: google.api.JavaSettings
 */
export interface JavaSettingsAmino {
  /**
   * The package name to use in Java. Clobbers the java_package option
   * set in the protobuf. This should be used **only** by APIs
   * who have already set the language_settings.java.package_name" field
   * in gapic.yaml. API teams should use the protobuf java_package option
   * where possible.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      library_package: com.google.cloud.pubsub.v1
   */
  library_package: string;
  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified
   * service names as they appear in the protobuf (including the full
   * the language_settings.java.interface_names" field in gapic.yaml. API
   * teams should otherwise use the service name as it appears in the
   * protobuf.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      service_class_names:
   *        - google.pubsub.v1.Publisher: TopicAdmin
   *        - google.pubsub.v1.Subscriber: SubscriptionAdmin
   */
  service_class_names: {
    [key: string]: string;
  };
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
}
export interface JavaSettingsAminoMsg {
  type: "/google.api.JavaSettings";
  value: JavaSettingsAmino;
}
/**
 * Settings for C++ client libraries.
 * @name CppSettings
 * @package google.api
 * @see proto type: google.api.CppSettings
 */
export interface CppSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}
export interface CppSettingsProtoMsg {
  typeUrl: "/google.api.CppSettings";
  value: Uint8Array;
}
/**
 * Settings for C++ client libraries.
 * @name CppSettingsAmino
 * @package google.api
 * @see proto type: google.api.CppSettings
 */
export interface CppSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
}
export interface CppSettingsAminoMsg {
  type: "/google.api.CppSettings";
  value: CppSettingsAmino;
}
/**
 * Settings for Php client libraries.
 * @name PhpSettings
 * @package google.api
 * @see proto type: google.api.PhpSettings
 */
export interface PhpSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}
export interface PhpSettingsProtoMsg {
  typeUrl: "/google.api.PhpSettings";
  value: Uint8Array;
}
/**
 * Settings for Php client libraries.
 * @name PhpSettingsAmino
 * @package google.api
 * @see proto type: google.api.PhpSettings
 */
export interface PhpSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
}
export interface PhpSettingsAminoMsg {
  type: "/google.api.PhpSettings";
  value: PhpSettingsAmino;
}
/**
 * Settings for Python client libraries.
 * @name PythonSettings
 * @package google.api
 * @see proto type: google.api.PythonSettings
 */
export interface PythonSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
  /**
   * Experimental features to be included during client library generation.
   */
  experimentalFeatures?: PythonSettings_ExperimentalFeatures;
}
export interface PythonSettingsProtoMsg {
  typeUrl: "/google.api.PythonSettings";
  value: Uint8Array;
}
/**
 * Settings for Python client libraries.
 * @name PythonSettingsAmino
 * @package google.api
 * @see proto type: google.api.PythonSettings
 */
export interface PythonSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
  /**
   * Experimental features to be included during client library generation.
   */
  experimental_features?: PythonSettings_ExperimentalFeaturesAmino;
}
export interface PythonSettingsAminoMsg {
  type: "/google.api.PythonSettings";
  value: PythonSettingsAmino;
}
/**
 * Experimental features to be included during client library generation.
 * These fields will be deprecated once the feature graduates and is enabled
 * by default.
 * @name PythonSettings_ExperimentalFeatures
 * @package google.api
 * @see proto type: google.api.ExperimentalFeatures
 */
export interface PythonSettings_ExperimentalFeatures {
  /**
   * Enables generation of asynchronous REST clients if `rest` transport is
   * enabled. By default, asynchronous REST clients will not be generated.
   * This feature will be enabled by default 1 month after launching the
   * feature in preview packages.
   */
  restAsyncIoEnabled: boolean;
  /**
   * Enables generation of protobuf code using new types that are more
   * Pythonic which are included in `protobuf>=5.29.x`. This feature will be
   * enabled by default 1 month after launching the feature in preview
   * packages.
   */
  protobufPythonicTypesEnabled: boolean;
  /**
   * Disables generation of an unversioned Python package for this client
   * library. This means that the module names will need to be versioned in
   * import statements. For example `import google.cloud.library_v2` instead
   * of `import google.cloud.library`.
   */
  unversionedPackageDisabled: boolean;
}
export interface PythonSettings_ExperimentalFeaturesProtoMsg {
  typeUrl: "/google.api.ExperimentalFeatures";
  value: Uint8Array;
}
/**
 * Experimental features to be included during client library generation.
 * These fields will be deprecated once the feature graduates and is enabled
 * by default.
 * @name PythonSettings_ExperimentalFeaturesAmino
 * @package google.api
 * @see proto type: google.api.PythonSettings_ExperimentalFeatures
 */
export interface PythonSettings_ExperimentalFeaturesAmino {
  /**
   * Enables generation of asynchronous REST clients if `rest` transport is
   * enabled. By default, asynchronous REST clients will not be generated.
   * This feature will be enabled by default 1 month after launching the
   * feature in preview packages.
   */
  rest_async_io_enabled: boolean;
  /**
   * Enables generation of protobuf code using new types that are more
   * Pythonic which are included in `protobuf>=5.29.x`. This feature will be
   * enabled by default 1 month after launching the feature in preview
   * packages.
   */
  protobuf_pythonic_types_enabled: boolean;
  /**
   * Disables generation of an unversioned Python package for this client
   * library. This means that the module names will need to be versioned in
   * import statements. For example `import google.cloud.library_v2` instead
   * of `import google.cloud.library`.
   */
  unversioned_package_disabled: boolean;
}
export interface PythonSettings_ExperimentalFeaturesAminoMsg {
  type: "/google.api.ExperimentalFeatures";
  value: PythonSettings_ExperimentalFeaturesAmino;
}
/**
 * Settings for Node client libraries.
 * @name NodeSettings
 * @package google.api
 * @see proto type: google.api.NodeSettings
 */
export interface NodeSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}
export interface NodeSettingsProtoMsg {
  typeUrl: "/google.api.NodeSettings";
  value: Uint8Array;
}
/**
 * Settings for Node client libraries.
 * @name NodeSettingsAmino
 * @package google.api
 * @see proto type: google.api.NodeSettings
 */
export interface NodeSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
}
export interface NodeSettingsAminoMsg {
  type: "/google.api.NodeSettings";
  value: NodeSettingsAmino;
}
/**
 * @name DotnetSettings_RenamedServicesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export interface DotnetSettings_RenamedServicesEntry {
  key: string;
  value: string;
}
export interface DotnetSettings_RenamedServicesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
/**
 * @name DotnetSettings_RenamedServicesEntryAmino
 * @package google.api
 * @see proto type: google.api.DotnetSettings_RenamedServicesEntry
 */
export interface DotnetSettings_RenamedServicesEntryAmino {
  key: string;
  value: string;
}
export interface DotnetSettings_RenamedServicesEntryAminoMsg {
  type: string;
  value: DotnetSettings_RenamedServicesEntryAmino;
}
/**
 * @name DotnetSettings_RenamedResourcesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export interface DotnetSettings_RenamedResourcesEntry {
  key: string;
  value: string;
}
export interface DotnetSettings_RenamedResourcesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
/**
 * @name DotnetSettings_RenamedResourcesEntryAmino
 * @package google.api
 * @see proto type: google.api.DotnetSettings_RenamedResourcesEntry
 */
export interface DotnetSettings_RenamedResourcesEntryAmino {
  key: string;
  value: string;
}
export interface DotnetSettings_RenamedResourcesEntryAminoMsg {
  type: string;
  value: DotnetSettings_RenamedResourcesEntryAmino;
}
/**
 * Settings for Dotnet client libraries.
 * @name DotnetSettings
 * @package google.api
 * @see proto type: google.api.DotnetSettings
 */
export interface DotnetSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
  /**
   * Map from original service names to renamed versions.
   * This is used when the default generated types
   * would cause a naming conflict. (Neither name is
   * fully-qualified.)
   * Example: Subscriber to SubscriberServiceApi.
   */
  renamedServices: {
    [key: string]: string;
  };
  /**
   * Map from full resource types to the effective short name
   * for the resource. This is used when otherwise resource
   * named from different services would cause naming collisions.
   * Example entry:
   * "datalabeling.googleapis.com/Dataset": "DataLabelingDataset"
   */
  renamedResources: {
    [key: string]: string;
  };
  /**
   * List of full resource types to ignore during generation.
   * This is typically used for API-specific Location resources,
   * which should be handled by the generator as if they were actually
   * the common Location resources.
   * Example entry: "documentai.googleapis.com/Location"
   */
  ignoredResources: string[];
  /**
   * Namespaces which must be aliased in snippets due to
   * a known (but non-generator-predictable) naming collision
   */
  forcedNamespaceAliases: string[];
  /**
   * Method signatures (in the form "service.method(signature)")
   * which are provided separately, so shouldn't be generated.
   * Snippets *calling* these methods are still generated, however.
   */
  handwrittenSignatures: string[];
}
export interface DotnetSettingsProtoMsg {
  typeUrl: "/google.api.DotnetSettings";
  value: Uint8Array;
}
/**
 * Settings for Dotnet client libraries.
 * @name DotnetSettingsAmino
 * @package google.api
 * @see proto type: google.api.DotnetSettings
 */
export interface DotnetSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
  /**
   * Map from original service names to renamed versions.
   * This is used when the default generated types
   * would cause a naming conflict. (Neither name is
   * fully-qualified.)
   * Example: Subscriber to SubscriberServiceApi.
   */
  renamed_services: {
    [key: string]: string;
  };
  /**
   * Map from full resource types to the effective short name
   * for the resource. This is used when otherwise resource
   * named from different services would cause naming collisions.
   * Example entry:
   * "datalabeling.googleapis.com/Dataset": "DataLabelingDataset"
   */
  renamed_resources: {
    [key: string]: string;
  };
  /**
   * List of full resource types to ignore during generation.
   * This is typically used for API-specific Location resources,
   * which should be handled by the generator as if they were actually
   * the common Location resources.
   * Example entry: "documentai.googleapis.com/Location"
   */
  ignored_resources: string[];
  /**
   * Namespaces which must be aliased in snippets due to
   * a known (but non-generator-predictable) naming collision
   */
  forced_namespace_aliases: string[];
  /**
   * Method signatures (in the form "service.method(signature)")
   * which are provided separately, so shouldn't be generated.
   * Snippets *calling* these methods are still generated, however.
   */
  handwritten_signatures: string[];
}
export interface DotnetSettingsAminoMsg {
  type: "/google.api.DotnetSettings";
  value: DotnetSettingsAmino;
}
/**
 * Settings for Ruby client libraries.
 * @name RubySettings
 * @package google.api
 * @see proto type: google.api.RubySettings
 */
export interface RubySettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}
export interface RubySettingsProtoMsg {
  typeUrl: "/google.api.RubySettings";
  value: Uint8Array;
}
/**
 * Settings for Ruby client libraries.
 * @name RubySettingsAmino
 * @package google.api
 * @see proto type: google.api.RubySettings
 */
export interface RubySettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
}
export interface RubySettingsAminoMsg {
  type: "/google.api.RubySettings";
  value: RubySettingsAmino;
}
/**
 * @name GoSettings_RenamedServicesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export interface GoSettings_RenamedServicesEntry {
  key: string;
  value: string;
}
export interface GoSettings_RenamedServicesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
/**
 * @name GoSettings_RenamedServicesEntryAmino
 * @package google.api
 * @see proto type: google.api.GoSettings_RenamedServicesEntry
 */
export interface GoSettings_RenamedServicesEntryAmino {
  key: string;
  value: string;
}
export interface GoSettings_RenamedServicesEntryAminoMsg {
  type: string;
  value: GoSettings_RenamedServicesEntryAmino;
}
/**
 * Settings for Go client libraries.
 * @name GoSettings
 * @package google.api
 * @see proto type: google.api.GoSettings
 */
export interface GoSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
  /**
   * Map of service names to renamed services. Keys are the package relative
   * service names and values are the name to be used for the service client
   * and call options.
   * 
   * publishing:
   *   go_settings:
   *     renamed_services:
   *       Publisher: TopicAdmin
   */
  renamedServices: {
    [key: string]: string;
  };
}
export interface GoSettingsProtoMsg {
  typeUrl: "/google.api.GoSettings";
  value: Uint8Array;
}
/**
 * Settings for Go client libraries.
 * @name GoSettingsAmino
 * @package google.api
 * @see proto type: google.api.GoSettings
 */
export interface GoSettingsAmino {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettingsAmino;
  /**
   * Map of service names to renamed services. Keys are the package relative
   * service names and values are the name to be used for the service client
   * and call options.
   * 
   * publishing:
   *   go_settings:
   *     renamed_services:
   *       Publisher: TopicAdmin
   */
  renamed_services: {
    [key: string]: string;
  };
}
export interface GoSettingsAminoMsg {
  type: "/google.api.GoSettings";
  value: GoSettingsAmino;
}
/**
 * Describes the generator configuration for a method.
 * @name MethodSettings
 * @package google.api
 * @see proto type: google.api.MethodSettings
 */
export interface MethodSettings {
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   * 
   * Example:
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.storage.control.v2.StorageControl.CreateFolder
   *        # method settings for CreateFolder...
   */
  selector: string;
  /**
   * Describes settings to use for long-running operations when generating
   * API methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto.
   * 
   * Example of a YAML configuration::
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.cloud.speech.v2.Speech.BatchRecognize
   *        long_running:
   *          initial_poll_delay: 60s # 1 minute
   *          poll_delay_multiplier: 1.5
   *          max_poll_delay: 360s # 6 minutes
   *          total_poll_timeout: 54000s # 90 minutes
   */
  longRunning?: MethodSettings_LongRunning;
  /**
   * List of top-level fields of the request message, that should be
   * automatically populated by the client libraries based on their
   * (google.api.field_info).format. Currently supported format: UUID4.
   * 
   * Example of a YAML configuration:
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.example.v1.ExampleService.CreateExample
   *        auto_populated_fields:
   *        - request_id
   */
  autoPopulatedFields: string[];
}
export interface MethodSettingsProtoMsg {
  typeUrl: "/google.api.MethodSettings";
  value: Uint8Array;
}
/**
 * Describes the generator configuration for a method.
 * @name MethodSettingsAmino
 * @package google.api
 * @see proto type: google.api.MethodSettings
 */
export interface MethodSettingsAmino {
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   * 
   * Example:
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.storage.control.v2.StorageControl.CreateFolder
   *        # method settings for CreateFolder...
   */
  selector: string;
  /**
   * Describes settings to use for long-running operations when generating
   * API methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto.
   * 
   * Example of a YAML configuration::
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.cloud.speech.v2.Speech.BatchRecognize
   *        long_running:
   *          initial_poll_delay: 60s # 1 minute
   *          poll_delay_multiplier: 1.5
   *          max_poll_delay: 360s # 6 minutes
   *          total_poll_timeout: 54000s # 90 minutes
   */
  long_running?: MethodSettings_LongRunningAmino;
  /**
   * List of top-level fields of the request message, that should be
   * automatically populated by the client libraries based on their
   * (google.api.field_info).format. Currently supported format: UUID4.
   * 
   * Example of a YAML configuration:
   * 
   *    publishing:
   *      method_settings:
   *      - selector: google.example.v1.ExampleService.CreateExample
   *        auto_populated_fields:
   *        - request_id
   */
  auto_populated_fields: string[];
}
export interface MethodSettingsAminoMsg {
  type: "/google.api.MethodSettings";
  value: MethodSettingsAmino;
}
/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 * @name MethodSettings_LongRunning
 * @package google.api
 * @see proto type: google.api.LongRunning
 */
export interface MethodSettings_LongRunning {
  /**
   * Initial delay after which the first poll request will be made.
   * Default value: 5 seconds.
   */
  initialPollDelay?: Duration;
  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay.
   * Default value: 1.5.
   */
  pollDelayMultiplier: number;
  /**
   * Maximum time between two subsequent poll requests.
   * Default value: 45 seconds.
   */
  maxPollDelay?: Duration;
  /**
   * Total polling timeout.
   * Default value: 5 minutes.
   */
  totalPollTimeout?: Duration;
}
export interface MethodSettings_LongRunningProtoMsg {
  typeUrl: "/google.api.LongRunning";
  value: Uint8Array;
}
/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 * @name MethodSettings_LongRunningAmino
 * @package google.api
 * @see proto type: google.api.MethodSettings_LongRunning
 */
export interface MethodSettings_LongRunningAmino {
  /**
   * Initial delay after which the first poll request will be made.
   * Default value: 5 seconds.
   */
  initial_poll_delay?: DurationAmino;
  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay.
   * Default value: 1.5.
   */
  poll_delay_multiplier: number;
  /**
   * Maximum time between two subsequent poll requests.
   * Default value: 45 seconds.
   */
  max_poll_delay?: DurationAmino;
  /**
   * Total polling timeout.
   * Default value: 5 minutes.
   */
  total_poll_timeout?: DurationAmino;
}
export interface MethodSettings_LongRunningAminoMsg {
  type: "/google.api.LongRunning";
  value: MethodSettings_LongRunningAmino;
}
/**
 * This message is used to configure the generation of a subset of the RPCs in
 * a service for client libraries.
 * @name SelectiveGapicGeneration
 * @package google.api
 * @see proto type: google.api.SelectiveGapicGeneration
 */
export interface SelectiveGapicGeneration {
  /**
   * An allowlist of the fully qualified names of RPCs that should be included
   * on public client surfaces.
   */
  methods: string[];
  /**
   * Setting this to true indicates to the client generators that methods
   * that would be excluded from the generation should instead be generated
   * in a way that indicates these methods should not be consumed by
   * end users. How this is expressed is up to individual language
   * implementations to decide. Some examples may be: added annotations,
   * obfuscated identifiers, or other language idiomatic patterns.
   */
  generateOmittedAsInternal: boolean;
}
export interface SelectiveGapicGenerationProtoMsg {
  typeUrl: "/google.api.SelectiveGapicGeneration";
  value: Uint8Array;
}
/**
 * This message is used to configure the generation of a subset of the RPCs in
 * a service for client libraries.
 * @name SelectiveGapicGenerationAmino
 * @package google.api
 * @see proto type: google.api.SelectiveGapicGeneration
 */
export interface SelectiveGapicGenerationAmino {
  /**
   * An allowlist of the fully qualified names of RPCs that should be included
   * on public client surfaces.
   */
  methods: string[];
  /**
   * Setting this to true indicates to the client generators that methods
   * that would be excluded from the generation should instead be generated
   * in a way that indicates these methods should not be consumed by
   * end users. How this is expressed is up to individual language
   * implementations to decide. Some examples may be: added annotations,
   * obfuscated identifiers, or other language idiomatic patterns.
   */
  generate_omitted_as_internal: boolean;
}
export interface SelectiveGapicGenerationAminoMsg {
  type: "/google.api.SelectiveGapicGeneration";
  value: SelectiveGapicGenerationAmino;
}
function createBaseCommonLanguageSettings(): CommonLanguageSettings {
  return {
    referenceDocsUri: "",
    destinations: [],
    selectiveGapicGeneration: undefined
  };
}
/**
 * Required information for every language.
 * @name CommonLanguageSettings
 * @package google.api
 * @see proto type: google.api.CommonLanguageSettings
 */
export const CommonLanguageSettings = {
  typeUrl: "/google.api.CommonLanguageSettings",
  is(o: any): o is CommonLanguageSettings {
    return o && (o.$typeUrl === CommonLanguageSettings.typeUrl || typeof o.referenceDocsUri === "string" && Array.isArray(o.destinations));
  },
  isAmino(o: any): o is CommonLanguageSettingsAmino {
    return o && (o.$typeUrl === CommonLanguageSettings.typeUrl || typeof o.reference_docs_uri === "string" && Array.isArray(o.destinations));
  },
  encode(message: CommonLanguageSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.referenceDocsUri !== "") {
      writer.uint32(10).string(message.referenceDocsUri);
    }
    writer.uint32(18).fork();
    for (const v of message.destinations) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.selectiveGapicGeneration !== undefined) {
      SelectiveGapicGeneration.encode(message.selectiveGapicGeneration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CommonLanguageSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommonLanguageSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceDocsUri = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.destinations.push(reader.int32() as any);
            }
          } else {
            message.destinations.push(reader.int32() as any);
          }
          break;
        case 3:
          message.selectiveGapicGeneration = SelectiveGapicGeneration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonLanguageSettings>): CommonLanguageSettings {
    const message = createBaseCommonLanguageSettings();
    message.referenceDocsUri = object.referenceDocsUri ?? "";
    message.destinations = object.destinations?.map(e => e) || [];
    message.selectiveGapicGeneration = object.selectiveGapicGeneration !== undefined && object.selectiveGapicGeneration !== null ? SelectiveGapicGeneration.fromPartial(object.selectiveGapicGeneration) : undefined;
    return message;
  },
  fromAmino(object: CommonLanguageSettingsAmino): CommonLanguageSettings {
    const message = createBaseCommonLanguageSettings();
    if (object.reference_docs_uri !== undefined && object.reference_docs_uri !== null) {
      message.referenceDocsUri = object.reference_docs_uri;
    }
    message.destinations = object.destinations?.map(e => e) || [];
    if (object.selective_gapic_generation !== undefined && object.selective_gapic_generation !== null) {
      message.selectiveGapicGeneration = SelectiveGapicGeneration.fromAmino(object.selective_gapic_generation);
    }
    return message;
  },
  toAmino(message: CommonLanguageSettings): CommonLanguageSettingsAmino {
    const obj: any = {};
    obj.reference_docs_uri = message.referenceDocsUri === "" ? undefined : message.referenceDocsUri;
    if (message.destinations) {
      obj.destinations = message.destinations.map(e => e);
    } else {
      obj.destinations = message.destinations;
    }
    obj.selective_gapic_generation = message.selectiveGapicGeneration ? SelectiveGapicGeneration.toAmino(message.selectiveGapicGeneration) : undefined;
    return obj;
  },
  fromAminoMsg(object: CommonLanguageSettingsAminoMsg): CommonLanguageSettings {
    return CommonLanguageSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: CommonLanguageSettingsProtoMsg): CommonLanguageSettings {
    return CommonLanguageSettings.decode(message.value);
  },
  toProto(message: CommonLanguageSettings): Uint8Array {
    return CommonLanguageSettings.encode(message).finish();
  },
  toProtoMsg(message: CommonLanguageSettings): CommonLanguageSettingsProtoMsg {
    return {
      typeUrl: "/google.api.CommonLanguageSettings",
      value: CommonLanguageSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(CommonLanguageSettings.typeUrl)) {
      return;
    }
    SelectiveGapicGeneration.registerTypeUrl();
  }
};
function createBaseClientLibrarySettings(): ClientLibrarySettings {
  return {
    version: "",
    launchStage: 0,
    restNumericEnums: false,
    javaSettings: undefined,
    cppSettings: undefined,
    phpSettings: undefined,
    pythonSettings: undefined,
    nodeSettings: undefined,
    dotnetSettings: undefined,
    rubySettings: undefined,
    goSettings: undefined
  };
}
/**
 * Details about how and where to publish client libraries.
 * @name ClientLibrarySettings
 * @package google.api
 * @see proto type: google.api.ClientLibrarySettings
 */
export const ClientLibrarySettings = {
  typeUrl: "/google.api.ClientLibrarySettings",
  is(o: any): o is ClientLibrarySettings {
    return o && (o.$typeUrl === ClientLibrarySettings.typeUrl || typeof o.version === "string" && isSet(o.launchStage) && typeof o.restNumericEnums === "boolean");
  },
  isAmino(o: any): o is ClientLibrarySettingsAmino {
    return o && (o.$typeUrl === ClientLibrarySettings.typeUrl || typeof o.version === "string" && isSet(o.launch_stage) && typeof o.rest_numeric_enums === "boolean");
  },
  encode(message: ClientLibrarySettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.launchStage !== 0) {
      writer.uint32(16).int32(message.launchStage);
    }
    if (message.restNumericEnums === true) {
      writer.uint32(24).bool(message.restNumericEnums);
    }
    if (message.javaSettings !== undefined) {
      JavaSettings.encode(message.javaSettings, writer.uint32(170).fork()).ldelim();
    }
    if (message.cppSettings !== undefined) {
      CppSettings.encode(message.cppSettings, writer.uint32(178).fork()).ldelim();
    }
    if (message.phpSettings !== undefined) {
      PhpSettings.encode(message.phpSettings, writer.uint32(186).fork()).ldelim();
    }
    if (message.pythonSettings !== undefined) {
      PythonSettings.encode(message.pythonSettings, writer.uint32(194).fork()).ldelim();
    }
    if (message.nodeSettings !== undefined) {
      NodeSettings.encode(message.nodeSettings, writer.uint32(202).fork()).ldelim();
    }
    if (message.dotnetSettings !== undefined) {
      DotnetSettings.encode(message.dotnetSettings, writer.uint32(210).fork()).ldelim();
    }
    if (message.rubySettings !== undefined) {
      RubySettings.encode(message.rubySettings, writer.uint32(218).fork()).ldelim();
    }
    if (message.goSettings !== undefined) {
      GoSettings.encode(message.goSettings, writer.uint32(226).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClientLibrarySettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientLibrarySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.launchStage = reader.int32() as any;
          break;
        case 3:
          message.restNumericEnums = reader.bool();
          break;
        case 21:
          message.javaSettings = JavaSettings.decode(reader, reader.uint32());
          break;
        case 22:
          message.cppSettings = CppSettings.decode(reader, reader.uint32());
          break;
        case 23:
          message.phpSettings = PhpSettings.decode(reader, reader.uint32());
          break;
        case 24:
          message.pythonSettings = PythonSettings.decode(reader, reader.uint32());
          break;
        case 25:
          message.nodeSettings = NodeSettings.decode(reader, reader.uint32());
          break;
        case 26:
          message.dotnetSettings = DotnetSettings.decode(reader, reader.uint32());
          break;
        case 27:
          message.rubySettings = RubySettings.decode(reader, reader.uint32());
          break;
        case 28:
          message.goSettings = GoSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientLibrarySettings>): ClientLibrarySettings {
    const message = createBaseClientLibrarySettings();
    message.version = object.version ?? "";
    message.launchStage = object.launchStage ?? 0;
    message.restNumericEnums = object.restNumericEnums ?? false;
    message.javaSettings = object.javaSettings !== undefined && object.javaSettings !== null ? JavaSettings.fromPartial(object.javaSettings) : undefined;
    message.cppSettings = object.cppSettings !== undefined && object.cppSettings !== null ? CppSettings.fromPartial(object.cppSettings) : undefined;
    message.phpSettings = object.phpSettings !== undefined && object.phpSettings !== null ? PhpSettings.fromPartial(object.phpSettings) : undefined;
    message.pythonSettings = object.pythonSettings !== undefined && object.pythonSettings !== null ? PythonSettings.fromPartial(object.pythonSettings) : undefined;
    message.nodeSettings = object.nodeSettings !== undefined && object.nodeSettings !== null ? NodeSettings.fromPartial(object.nodeSettings) : undefined;
    message.dotnetSettings = object.dotnetSettings !== undefined && object.dotnetSettings !== null ? DotnetSettings.fromPartial(object.dotnetSettings) : undefined;
    message.rubySettings = object.rubySettings !== undefined && object.rubySettings !== null ? RubySettings.fromPartial(object.rubySettings) : undefined;
    message.goSettings = object.goSettings !== undefined && object.goSettings !== null ? GoSettings.fromPartial(object.goSettings) : undefined;
    return message;
  },
  fromAmino(object: ClientLibrarySettingsAmino): ClientLibrarySettings {
    const message = createBaseClientLibrarySettings();
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    if (object.launch_stage !== undefined && object.launch_stage !== null) {
      message.launchStage = object.launch_stage;
    }
    if (object.rest_numeric_enums !== undefined && object.rest_numeric_enums !== null) {
      message.restNumericEnums = object.rest_numeric_enums;
    }
    if (object.java_settings !== undefined && object.java_settings !== null) {
      message.javaSettings = JavaSettings.fromAmino(object.java_settings);
    }
    if (object.cpp_settings !== undefined && object.cpp_settings !== null) {
      message.cppSettings = CppSettings.fromAmino(object.cpp_settings);
    }
    if (object.php_settings !== undefined && object.php_settings !== null) {
      message.phpSettings = PhpSettings.fromAmino(object.php_settings);
    }
    if (object.python_settings !== undefined && object.python_settings !== null) {
      message.pythonSettings = PythonSettings.fromAmino(object.python_settings);
    }
    if (object.node_settings !== undefined && object.node_settings !== null) {
      message.nodeSettings = NodeSettings.fromAmino(object.node_settings);
    }
    if (object.dotnet_settings !== undefined && object.dotnet_settings !== null) {
      message.dotnetSettings = DotnetSettings.fromAmino(object.dotnet_settings);
    }
    if (object.ruby_settings !== undefined && object.ruby_settings !== null) {
      message.rubySettings = RubySettings.fromAmino(object.ruby_settings);
    }
    if (object.go_settings !== undefined && object.go_settings !== null) {
      message.goSettings = GoSettings.fromAmino(object.go_settings);
    }
    return message;
  },
  toAmino(message: ClientLibrarySettings): ClientLibrarySettingsAmino {
    const obj: any = {};
    obj.version = message.version === "" ? undefined : message.version;
    obj.launch_stage = message.launchStage === 0 ? undefined : message.launchStage;
    obj.rest_numeric_enums = message.restNumericEnums === false ? undefined : message.restNumericEnums;
    obj.java_settings = message.javaSettings ? JavaSettings.toAmino(message.javaSettings) : undefined;
    obj.cpp_settings = message.cppSettings ? CppSettings.toAmino(message.cppSettings) : undefined;
    obj.php_settings = message.phpSettings ? PhpSettings.toAmino(message.phpSettings) : undefined;
    obj.python_settings = message.pythonSettings ? PythonSettings.toAmino(message.pythonSettings) : undefined;
    obj.node_settings = message.nodeSettings ? NodeSettings.toAmino(message.nodeSettings) : undefined;
    obj.dotnet_settings = message.dotnetSettings ? DotnetSettings.toAmino(message.dotnetSettings) : undefined;
    obj.ruby_settings = message.rubySettings ? RubySettings.toAmino(message.rubySettings) : undefined;
    obj.go_settings = message.goSettings ? GoSettings.toAmino(message.goSettings) : undefined;
    return obj;
  },
  fromAminoMsg(object: ClientLibrarySettingsAminoMsg): ClientLibrarySettings {
    return ClientLibrarySettings.fromAmino(object.value);
  },
  fromProtoMsg(message: ClientLibrarySettingsProtoMsg): ClientLibrarySettings {
    return ClientLibrarySettings.decode(message.value);
  },
  toProto(message: ClientLibrarySettings): Uint8Array {
    return ClientLibrarySettings.encode(message).finish();
  },
  toProtoMsg(message: ClientLibrarySettings): ClientLibrarySettingsProtoMsg {
    return {
      typeUrl: "/google.api.ClientLibrarySettings",
      value: ClientLibrarySettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(ClientLibrarySettings.typeUrl)) {
      return;
    }
    JavaSettings.registerTypeUrl();
    CppSettings.registerTypeUrl();
    PhpSettings.registerTypeUrl();
    PythonSettings.registerTypeUrl();
    NodeSettings.registerTypeUrl();
    DotnetSettings.registerTypeUrl();
    RubySettings.registerTypeUrl();
    GoSettings.registerTypeUrl();
  }
};
function createBasePublishing(): Publishing {
  return {
    methodSettings: [],
    newIssueUri: "",
    documentationUri: "",
    apiShortName: "",
    githubLabel: "",
    codeownerGithubTeams: [],
    docTagPrefix: "",
    organization: 0,
    librarySettings: [],
    protoReferenceDocumentationUri: "",
    restReferenceDocumentationUri: ""
  };
}
/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 * @name Publishing
 * @package google.api
 * @see proto type: google.api.Publishing
 */
export const Publishing = {
  typeUrl: "/google.api.Publishing",
  is(o: any): o is Publishing {
    return o && (o.$typeUrl === Publishing.typeUrl || Array.isArray(o.methodSettings) && (!o.methodSettings.length || MethodSettings.is(o.methodSettings[0])) && typeof o.newIssueUri === "string" && typeof o.documentationUri === "string" && typeof o.apiShortName === "string" && typeof o.githubLabel === "string" && Array.isArray(o.codeownerGithubTeams) && (!o.codeownerGithubTeams.length || typeof o.codeownerGithubTeams[0] === "string") && typeof o.docTagPrefix === "string" && isSet(o.organization) && Array.isArray(o.librarySettings) && (!o.librarySettings.length || ClientLibrarySettings.is(o.librarySettings[0])) && typeof o.protoReferenceDocumentationUri === "string" && typeof o.restReferenceDocumentationUri === "string");
  },
  isAmino(o: any): o is PublishingAmino {
    return o && (o.$typeUrl === Publishing.typeUrl || Array.isArray(o.method_settings) && (!o.method_settings.length || MethodSettings.isAmino(o.method_settings[0])) && typeof o.new_issue_uri === "string" && typeof o.documentation_uri === "string" && typeof o.api_short_name === "string" && typeof o.github_label === "string" && Array.isArray(o.codeowner_github_teams) && (!o.codeowner_github_teams.length || typeof o.codeowner_github_teams[0] === "string") && typeof o.doc_tag_prefix === "string" && isSet(o.organization) && Array.isArray(o.library_settings) && (!o.library_settings.length || ClientLibrarySettings.isAmino(o.library_settings[0])) && typeof o.proto_reference_documentation_uri === "string" && typeof o.rest_reference_documentation_uri === "string");
  },
  encode(message: Publishing, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.methodSettings) {
      MethodSettings.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.newIssueUri !== "") {
      writer.uint32(810).string(message.newIssueUri);
    }
    if (message.documentationUri !== "") {
      writer.uint32(818).string(message.documentationUri);
    }
    if (message.apiShortName !== "") {
      writer.uint32(826).string(message.apiShortName);
    }
    if (message.githubLabel !== "") {
      writer.uint32(834).string(message.githubLabel);
    }
    for (const v of message.codeownerGithubTeams) {
      writer.uint32(842).string(v!);
    }
    if (message.docTagPrefix !== "") {
      writer.uint32(850).string(message.docTagPrefix);
    }
    if (message.organization !== 0) {
      writer.uint32(856).int32(message.organization);
    }
    for (const v of message.librarySettings) {
      ClientLibrarySettings.encode(v!, writer.uint32(874).fork()).ldelim();
    }
    if (message.protoReferenceDocumentationUri !== "") {
      writer.uint32(882).string(message.protoReferenceDocumentationUri);
    }
    if (message.restReferenceDocumentationUri !== "") {
      writer.uint32(890).string(message.restReferenceDocumentationUri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Publishing {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.methodSettings.push(MethodSettings.decode(reader, reader.uint32()));
          break;
        case 101:
          message.newIssueUri = reader.string();
          break;
        case 102:
          message.documentationUri = reader.string();
          break;
        case 103:
          message.apiShortName = reader.string();
          break;
        case 104:
          message.githubLabel = reader.string();
          break;
        case 105:
          message.codeownerGithubTeams.push(reader.string());
          break;
        case 106:
          message.docTagPrefix = reader.string();
          break;
        case 107:
          message.organization = reader.int32() as any;
          break;
        case 109:
          message.librarySettings.push(ClientLibrarySettings.decode(reader, reader.uint32()));
          break;
        case 110:
          message.protoReferenceDocumentationUri = reader.string();
          break;
        case 111:
          message.restReferenceDocumentationUri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Publishing>): Publishing {
    const message = createBasePublishing();
    message.methodSettings = object.methodSettings?.map(e => MethodSettings.fromPartial(e)) || [];
    message.newIssueUri = object.newIssueUri ?? "";
    message.documentationUri = object.documentationUri ?? "";
    message.apiShortName = object.apiShortName ?? "";
    message.githubLabel = object.githubLabel ?? "";
    message.codeownerGithubTeams = object.codeownerGithubTeams?.map(e => e) || [];
    message.docTagPrefix = object.docTagPrefix ?? "";
    message.organization = object.organization ?? 0;
    message.librarySettings = object.librarySettings?.map(e => ClientLibrarySettings.fromPartial(e)) || [];
    message.protoReferenceDocumentationUri = object.protoReferenceDocumentationUri ?? "";
    message.restReferenceDocumentationUri = object.restReferenceDocumentationUri ?? "";
    return message;
  },
  fromAmino(object: PublishingAmino): Publishing {
    const message = createBasePublishing();
    message.methodSettings = object.method_settings?.map(e => MethodSettings.fromAmino(e)) || [];
    if (object.new_issue_uri !== undefined && object.new_issue_uri !== null) {
      message.newIssueUri = object.new_issue_uri;
    }
    if (object.documentation_uri !== undefined && object.documentation_uri !== null) {
      message.documentationUri = object.documentation_uri;
    }
    if (object.api_short_name !== undefined && object.api_short_name !== null) {
      message.apiShortName = object.api_short_name;
    }
    if (object.github_label !== undefined && object.github_label !== null) {
      message.githubLabel = object.github_label;
    }
    message.codeownerGithubTeams = object.codeowner_github_teams?.map(e => e) || [];
    if (object.doc_tag_prefix !== undefined && object.doc_tag_prefix !== null) {
      message.docTagPrefix = object.doc_tag_prefix;
    }
    if (object.organization !== undefined && object.organization !== null) {
      message.organization = object.organization;
    }
    message.librarySettings = object.library_settings?.map(e => ClientLibrarySettings.fromAmino(e)) || [];
    if (object.proto_reference_documentation_uri !== undefined && object.proto_reference_documentation_uri !== null) {
      message.protoReferenceDocumentationUri = object.proto_reference_documentation_uri;
    }
    if (object.rest_reference_documentation_uri !== undefined && object.rest_reference_documentation_uri !== null) {
      message.restReferenceDocumentationUri = object.rest_reference_documentation_uri;
    }
    return message;
  },
  toAmino(message: Publishing): PublishingAmino {
    const obj: any = {};
    if (message.methodSettings) {
      obj.method_settings = message.methodSettings.map(e => e ? MethodSettings.toAmino(e) : undefined);
    } else {
      obj.method_settings = message.methodSettings;
    }
    obj.new_issue_uri = message.newIssueUri === "" ? undefined : message.newIssueUri;
    obj.documentation_uri = message.documentationUri === "" ? undefined : message.documentationUri;
    obj.api_short_name = message.apiShortName === "" ? undefined : message.apiShortName;
    obj.github_label = message.githubLabel === "" ? undefined : message.githubLabel;
    if (message.codeownerGithubTeams) {
      obj.codeowner_github_teams = message.codeownerGithubTeams.map(e => e);
    } else {
      obj.codeowner_github_teams = message.codeownerGithubTeams;
    }
    obj.doc_tag_prefix = message.docTagPrefix === "" ? undefined : message.docTagPrefix;
    obj.organization = message.organization === 0 ? undefined : message.organization;
    if (message.librarySettings) {
      obj.library_settings = message.librarySettings.map(e => e ? ClientLibrarySettings.toAmino(e) : undefined);
    } else {
      obj.library_settings = message.librarySettings;
    }
    obj.proto_reference_documentation_uri = message.protoReferenceDocumentationUri === "" ? undefined : message.protoReferenceDocumentationUri;
    obj.rest_reference_documentation_uri = message.restReferenceDocumentationUri === "" ? undefined : message.restReferenceDocumentationUri;
    return obj;
  },
  fromAminoMsg(object: PublishingAminoMsg): Publishing {
    return Publishing.fromAmino(object.value);
  },
  fromProtoMsg(message: PublishingProtoMsg): Publishing {
    return Publishing.decode(message.value);
  },
  toProto(message: Publishing): Uint8Array {
    return Publishing.encode(message).finish();
  },
  toProtoMsg(message: Publishing): PublishingProtoMsg {
    return {
      typeUrl: "/google.api.Publishing",
      value: Publishing.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(Publishing.typeUrl)) {
      return;
    }
    MethodSettings.registerTypeUrl();
    ClientLibrarySettings.registerTypeUrl();
  }
};
function createBaseJavaSettings_ServiceClassNamesEntry(): JavaSettings_ServiceClassNamesEntry {
  return {
    key: "",
    value: ""
  };
}
/**
 * @name JavaSettings_ServiceClassNamesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export const JavaSettings_ServiceClassNamesEntry = {
  encode(message: JavaSettings_ServiceClassNamesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): JavaSettings_ServiceClassNamesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJavaSettings_ServiceClassNamesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<JavaSettings_ServiceClassNamesEntry>): JavaSettings_ServiceClassNamesEntry {
    const message = createBaseJavaSettings_ServiceClassNamesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: JavaSettings_ServiceClassNamesEntryAmino): JavaSettings_ServiceClassNamesEntry {
    const message = createBaseJavaSettings_ServiceClassNamesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: JavaSettings_ServiceClassNamesEntry): JavaSettings_ServiceClassNamesEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: JavaSettings_ServiceClassNamesEntryAminoMsg): JavaSettings_ServiceClassNamesEntry {
    return JavaSettings_ServiceClassNamesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: JavaSettings_ServiceClassNamesEntryProtoMsg): JavaSettings_ServiceClassNamesEntry {
    return JavaSettings_ServiceClassNamesEntry.decode(message.value);
  },
  toProto(message: JavaSettings_ServiceClassNamesEntry): Uint8Array {
    return JavaSettings_ServiceClassNamesEntry.encode(message).finish();
  },
  registerTypeUrl() {}
};
function createBaseJavaSettings(): JavaSettings {
  return {
    libraryPackage: "",
    serviceClassNames: {},
    common: undefined
  };
}
/**
 * Settings for Java client libraries.
 * @name JavaSettings
 * @package google.api
 * @see proto type: google.api.JavaSettings
 */
export const JavaSettings = {
  typeUrl: "/google.api.JavaSettings",
  is(o: any): o is JavaSettings {
    return o && (o.$typeUrl === JavaSettings.typeUrl || typeof o.libraryPackage === "string" && isSet(o.serviceClassNames));
  },
  isAmino(o: any): o is JavaSettingsAmino {
    return o && (o.$typeUrl === JavaSettings.typeUrl || typeof o.library_package === "string" && isSet(o.service_class_names));
  },
  encode(message: JavaSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.libraryPackage !== "") {
      writer.uint32(10).string(message.libraryPackage);
    }
    Object.entries(message.serviceClassNames).forEach(([key, value]) => {
      JavaSettings_ServiceClassNamesEntry.encode({
        key: key as any,
        value
      }, writer.uint32(18).fork()).ldelim();
    });
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): JavaSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJavaSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.libraryPackage = reader.string();
          break;
        case 2:
          const entry2 = JavaSettings_ServiceClassNamesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.serviceClassNames[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<JavaSettings>): JavaSettings {
    const message = createBaseJavaSettings();
    message.libraryPackage = object.libraryPackage ?? "";
    message.serviceClassNames = Object.entries(object.serviceClassNames ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: JavaSettingsAmino): JavaSettings {
    const message = createBaseJavaSettings();
    if (object.library_package !== undefined && object.library_package !== null) {
      message.libraryPackage = object.library_package;
    }
    message.serviceClassNames = Object.entries(object.service_class_names ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    return message;
  },
  toAmino(message: JavaSettings): JavaSettingsAmino {
    const obj: any = {};
    obj.library_package = message.libraryPackage === "" ? undefined : message.libraryPackage;
    obj.service_class_names = {};
    if (message.serviceClassNames) {
      Object.entries(message.serviceClassNames).forEach(([k, v]) => {
        obj.service_class_names[k] = v;
      });
    }
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: JavaSettingsAminoMsg): JavaSettings {
    return JavaSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: JavaSettingsProtoMsg): JavaSettings {
    return JavaSettings.decode(message.value);
  },
  toProto(message: JavaSettings): Uint8Array {
    return JavaSettings.encode(message).finish();
  },
  toProtoMsg(message: JavaSettings): JavaSettingsProtoMsg {
    return {
      typeUrl: "/google.api.JavaSettings",
      value: JavaSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(JavaSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBaseCppSettings(): CppSettings {
  return {
    common: undefined
  };
}
/**
 * Settings for C++ client libraries.
 * @name CppSettings
 * @package google.api
 * @see proto type: google.api.CppSettings
 */
export const CppSettings = {
  typeUrl: "/google.api.CppSettings",
  is(o: any): o is CppSettings {
    return o && o.$typeUrl === CppSettings.typeUrl;
  },
  isAmino(o: any): o is CppSettingsAmino {
    return o && o.$typeUrl === CppSettings.typeUrl;
  },
  encode(message: CppSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CppSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCppSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CppSettings>): CppSettings {
    const message = createBaseCppSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: CppSettingsAmino): CppSettings {
    const message = createBaseCppSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    return message;
  },
  toAmino(message: CppSettings): CppSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: CppSettingsAminoMsg): CppSettings {
    return CppSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: CppSettingsProtoMsg): CppSettings {
    return CppSettings.decode(message.value);
  },
  toProto(message: CppSettings): Uint8Array {
    return CppSettings.encode(message).finish();
  },
  toProtoMsg(message: CppSettings): CppSettingsProtoMsg {
    return {
      typeUrl: "/google.api.CppSettings",
      value: CppSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(CppSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBasePhpSettings(): PhpSettings {
  return {
    common: undefined
  };
}
/**
 * Settings for Php client libraries.
 * @name PhpSettings
 * @package google.api
 * @see proto type: google.api.PhpSettings
 */
export const PhpSettings = {
  typeUrl: "/google.api.PhpSettings",
  is(o: any): o is PhpSettings {
    return o && o.$typeUrl === PhpSettings.typeUrl;
  },
  isAmino(o: any): o is PhpSettingsAmino {
    return o && o.$typeUrl === PhpSettings.typeUrl;
  },
  encode(message: PhpSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PhpSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhpSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PhpSettings>): PhpSettings {
    const message = createBasePhpSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: PhpSettingsAmino): PhpSettings {
    const message = createBasePhpSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    return message;
  },
  toAmino(message: PhpSettings): PhpSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: PhpSettingsAminoMsg): PhpSettings {
    return PhpSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: PhpSettingsProtoMsg): PhpSettings {
    return PhpSettings.decode(message.value);
  },
  toProto(message: PhpSettings): Uint8Array {
    return PhpSettings.encode(message).finish();
  },
  toProtoMsg(message: PhpSettings): PhpSettingsProtoMsg {
    return {
      typeUrl: "/google.api.PhpSettings",
      value: PhpSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(PhpSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBasePythonSettings(): PythonSettings {
  return {
    common: undefined,
    experimentalFeatures: undefined
  };
}
/**
 * Settings for Python client libraries.
 * @name PythonSettings
 * @package google.api
 * @see proto type: google.api.PythonSettings
 */
export const PythonSettings = {
  typeUrl: "/google.api.PythonSettings",
  is(o: any): o is PythonSettings {
    return o && o.$typeUrl === PythonSettings.typeUrl;
  },
  isAmino(o: any): o is PythonSettingsAmino {
    return o && o.$typeUrl === PythonSettings.typeUrl;
  },
  encode(message: PythonSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    if (message.experimentalFeatures !== undefined) {
      PythonSettings_ExperimentalFeatures.encode(message.experimentalFeatures, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PythonSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePythonSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        case 2:
          message.experimentalFeatures = PythonSettings_ExperimentalFeatures.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PythonSettings>): PythonSettings {
    const message = createBasePythonSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    message.experimentalFeatures = object.experimentalFeatures !== undefined && object.experimentalFeatures !== null ? PythonSettings_ExperimentalFeatures.fromPartial(object.experimentalFeatures) : undefined;
    return message;
  },
  fromAmino(object: PythonSettingsAmino): PythonSettings {
    const message = createBasePythonSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    if (object.experimental_features !== undefined && object.experimental_features !== null) {
      message.experimentalFeatures = PythonSettings_ExperimentalFeatures.fromAmino(object.experimental_features);
    }
    return message;
  },
  toAmino(message: PythonSettings): PythonSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    obj.experimental_features = message.experimentalFeatures ? PythonSettings_ExperimentalFeatures.toAmino(message.experimentalFeatures) : undefined;
    return obj;
  },
  fromAminoMsg(object: PythonSettingsAminoMsg): PythonSettings {
    return PythonSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: PythonSettingsProtoMsg): PythonSettings {
    return PythonSettings.decode(message.value);
  },
  toProto(message: PythonSettings): Uint8Array {
    return PythonSettings.encode(message).finish();
  },
  toProtoMsg(message: PythonSettings): PythonSettingsProtoMsg {
    return {
      typeUrl: "/google.api.PythonSettings",
      value: PythonSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(PythonSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
    PythonSettings_ExperimentalFeatures.registerTypeUrl();
  }
};
function createBasePythonSettings_ExperimentalFeatures(): PythonSettings_ExperimentalFeatures {
  return {
    restAsyncIoEnabled: false,
    protobufPythonicTypesEnabled: false,
    unversionedPackageDisabled: false
  };
}
/**
 * Experimental features to be included during client library generation.
 * These fields will be deprecated once the feature graduates and is enabled
 * by default.
 * @name PythonSettings_ExperimentalFeatures
 * @package google.api
 * @see proto type: google.api.ExperimentalFeatures
 */
export const PythonSettings_ExperimentalFeatures = {
  typeUrl: "/google.api.ExperimentalFeatures",
  is(o: any): o is PythonSettings_ExperimentalFeatures {
    return o && (o.$typeUrl === PythonSettings_ExperimentalFeatures.typeUrl || typeof o.restAsyncIoEnabled === "boolean" && typeof o.protobufPythonicTypesEnabled === "boolean" && typeof o.unversionedPackageDisabled === "boolean");
  },
  isAmino(o: any): o is PythonSettings_ExperimentalFeaturesAmino {
    return o && (o.$typeUrl === PythonSettings_ExperimentalFeatures.typeUrl || typeof o.rest_async_io_enabled === "boolean" && typeof o.protobuf_pythonic_types_enabled === "boolean" && typeof o.unversioned_package_disabled === "boolean");
  },
  encode(message: PythonSettings_ExperimentalFeatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.restAsyncIoEnabled === true) {
      writer.uint32(8).bool(message.restAsyncIoEnabled);
    }
    if (message.protobufPythonicTypesEnabled === true) {
      writer.uint32(16).bool(message.protobufPythonicTypesEnabled);
    }
    if (message.unversionedPackageDisabled === true) {
      writer.uint32(24).bool(message.unversionedPackageDisabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PythonSettings_ExperimentalFeatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePythonSettings_ExperimentalFeatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.restAsyncIoEnabled = reader.bool();
          break;
        case 2:
          message.protobufPythonicTypesEnabled = reader.bool();
          break;
        case 3:
          message.unversionedPackageDisabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PythonSettings_ExperimentalFeatures>): PythonSettings_ExperimentalFeatures {
    const message = createBasePythonSettings_ExperimentalFeatures();
    message.restAsyncIoEnabled = object.restAsyncIoEnabled ?? false;
    message.protobufPythonicTypesEnabled = object.protobufPythonicTypesEnabled ?? false;
    message.unversionedPackageDisabled = object.unversionedPackageDisabled ?? false;
    return message;
  },
  fromAmino(object: PythonSettings_ExperimentalFeaturesAmino): PythonSettings_ExperimentalFeatures {
    const message = createBasePythonSettings_ExperimentalFeatures();
    if (object.rest_async_io_enabled !== undefined && object.rest_async_io_enabled !== null) {
      message.restAsyncIoEnabled = object.rest_async_io_enabled;
    }
    if (object.protobuf_pythonic_types_enabled !== undefined && object.protobuf_pythonic_types_enabled !== null) {
      message.protobufPythonicTypesEnabled = object.protobuf_pythonic_types_enabled;
    }
    if (object.unversioned_package_disabled !== undefined && object.unversioned_package_disabled !== null) {
      message.unversionedPackageDisabled = object.unversioned_package_disabled;
    }
    return message;
  },
  toAmino(message: PythonSettings_ExperimentalFeatures): PythonSettings_ExperimentalFeaturesAmino {
    const obj: any = {};
    obj.rest_async_io_enabled = message.restAsyncIoEnabled === false ? undefined : message.restAsyncIoEnabled;
    obj.protobuf_pythonic_types_enabled = message.protobufPythonicTypesEnabled === false ? undefined : message.protobufPythonicTypesEnabled;
    obj.unversioned_package_disabled = message.unversionedPackageDisabled === false ? undefined : message.unversionedPackageDisabled;
    return obj;
  },
  fromAminoMsg(object: PythonSettings_ExperimentalFeaturesAminoMsg): PythonSettings_ExperimentalFeatures {
    return PythonSettings_ExperimentalFeatures.fromAmino(object.value);
  },
  fromProtoMsg(message: PythonSettings_ExperimentalFeaturesProtoMsg): PythonSettings_ExperimentalFeatures {
    return PythonSettings_ExperimentalFeatures.decode(message.value);
  },
  toProto(message: PythonSettings_ExperimentalFeatures): Uint8Array {
    return PythonSettings_ExperimentalFeatures.encode(message).finish();
  },
  toProtoMsg(message: PythonSettings_ExperimentalFeatures): PythonSettings_ExperimentalFeaturesProtoMsg {
    return {
      typeUrl: "/google.api.ExperimentalFeatures",
      value: PythonSettings_ExperimentalFeatures.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseNodeSettings(): NodeSettings {
  return {
    common: undefined
  };
}
/**
 * Settings for Node client libraries.
 * @name NodeSettings
 * @package google.api
 * @see proto type: google.api.NodeSettings
 */
export const NodeSettings = {
  typeUrl: "/google.api.NodeSettings",
  is(o: any): o is NodeSettings {
    return o && o.$typeUrl === NodeSettings.typeUrl;
  },
  isAmino(o: any): o is NodeSettingsAmino {
    return o && o.$typeUrl === NodeSettings.typeUrl;
  },
  encode(message: NodeSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NodeSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<NodeSettings>): NodeSettings {
    const message = createBaseNodeSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: NodeSettingsAmino): NodeSettings {
    const message = createBaseNodeSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    return message;
  },
  toAmino(message: NodeSettings): NodeSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: NodeSettingsAminoMsg): NodeSettings {
    return NodeSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: NodeSettingsProtoMsg): NodeSettings {
    return NodeSettings.decode(message.value);
  },
  toProto(message: NodeSettings): Uint8Array {
    return NodeSettings.encode(message).finish();
  },
  toProtoMsg(message: NodeSettings): NodeSettingsProtoMsg {
    return {
      typeUrl: "/google.api.NodeSettings",
      value: NodeSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(NodeSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBaseDotnetSettings_RenamedServicesEntry(): DotnetSettings_RenamedServicesEntry {
  return {
    key: "",
    value: ""
  };
}
/**
 * @name DotnetSettings_RenamedServicesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export const DotnetSettings_RenamedServicesEntry = {
  encode(message: DotnetSettings_RenamedServicesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DotnetSettings_RenamedServicesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDotnetSettings_RenamedServicesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DotnetSettings_RenamedServicesEntry>): DotnetSettings_RenamedServicesEntry {
    const message = createBaseDotnetSettings_RenamedServicesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: DotnetSettings_RenamedServicesEntryAmino): DotnetSettings_RenamedServicesEntry {
    const message = createBaseDotnetSettings_RenamedServicesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: DotnetSettings_RenamedServicesEntry): DotnetSettings_RenamedServicesEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: DotnetSettings_RenamedServicesEntryAminoMsg): DotnetSettings_RenamedServicesEntry {
    return DotnetSettings_RenamedServicesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: DotnetSettings_RenamedServicesEntryProtoMsg): DotnetSettings_RenamedServicesEntry {
    return DotnetSettings_RenamedServicesEntry.decode(message.value);
  },
  toProto(message: DotnetSettings_RenamedServicesEntry): Uint8Array {
    return DotnetSettings_RenamedServicesEntry.encode(message).finish();
  },
  registerTypeUrl() {}
};
function createBaseDotnetSettings_RenamedResourcesEntry(): DotnetSettings_RenamedResourcesEntry {
  return {
    key: "",
    value: ""
  };
}
/**
 * @name DotnetSettings_RenamedResourcesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export const DotnetSettings_RenamedResourcesEntry = {
  encode(message: DotnetSettings_RenamedResourcesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DotnetSettings_RenamedResourcesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDotnetSettings_RenamedResourcesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DotnetSettings_RenamedResourcesEntry>): DotnetSettings_RenamedResourcesEntry {
    const message = createBaseDotnetSettings_RenamedResourcesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: DotnetSettings_RenamedResourcesEntryAmino): DotnetSettings_RenamedResourcesEntry {
    const message = createBaseDotnetSettings_RenamedResourcesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: DotnetSettings_RenamedResourcesEntry): DotnetSettings_RenamedResourcesEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: DotnetSettings_RenamedResourcesEntryAminoMsg): DotnetSettings_RenamedResourcesEntry {
    return DotnetSettings_RenamedResourcesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: DotnetSettings_RenamedResourcesEntryProtoMsg): DotnetSettings_RenamedResourcesEntry {
    return DotnetSettings_RenamedResourcesEntry.decode(message.value);
  },
  toProto(message: DotnetSettings_RenamedResourcesEntry): Uint8Array {
    return DotnetSettings_RenamedResourcesEntry.encode(message).finish();
  },
  registerTypeUrl() {}
};
function createBaseDotnetSettings(): DotnetSettings {
  return {
    common: undefined,
    renamedServices: {},
    renamedResources: {},
    ignoredResources: [],
    forcedNamespaceAliases: [],
    handwrittenSignatures: []
  };
}
/**
 * Settings for Dotnet client libraries.
 * @name DotnetSettings
 * @package google.api
 * @see proto type: google.api.DotnetSettings
 */
export const DotnetSettings = {
  typeUrl: "/google.api.DotnetSettings",
  is(o: any): o is DotnetSettings {
    return o && (o.$typeUrl === DotnetSettings.typeUrl || isSet(o.renamedServices) && isSet(o.renamedResources) && Array.isArray(o.ignoredResources) && (!o.ignoredResources.length || typeof o.ignoredResources[0] === "string") && Array.isArray(o.forcedNamespaceAliases) && (!o.forcedNamespaceAliases.length || typeof o.forcedNamespaceAliases[0] === "string") && Array.isArray(o.handwrittenSignatures) && (!o.handwrittenSignatures.length || typeof o.handwrittenSignatures[0] === "string"));
  },
  isAmino(o: any): o is DotnetSettingsAmino {
    return o && (o.$typeUrl === DotnetSettings.typeUrl || isSet(o.renamed_services) && isSet(o.renamed_resources) && Array.isArray(o.ignored_resources) && (!o.ignored_resources.length || typeof o.ignored_resources[0] === "string") && Array.isArray(o.forced_namespace_aliases) && (!o.forced_namespace_aliases.length || typeof o.forced_namespace_aliases[0] === "string") && Array.isArray(o.handwritten_signatures) && (!o.handwritten_signatures.length || typeof o.handwritten_signatures[0] === "string"));
  },
  encode(message: DotnetSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.renamedServices).forEach(([key, value]) => {
      DotnetSettings_RenamedServicesEntry.encode({
        key: key as any,
        value
      }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.renamedResources).forEach(([key, value]) => {
      DotnetSettings_RenamedResourcesEntry.encode({
        key: key as any,
        value
      }, writer.uint32(26).fork()).ldelim();
    });
    for (const v of message.ignoredResources) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.forcedNamespaceAliases) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.handwrittenSignatures) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DotnetSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDotnetSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = DotnetSettings_RenamedServicesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.renamedServices[entry2.key] = entry2.value;
          }
          break;
        case 3:
          const entry3 = DotnetSettings_RenamedResourcesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.renamedResources[entry3.key] = entry3.value;
          }
          break;
        case 4:
          message.ignoredResources.push(reader.string());
          break;
        case 5:
          message.forcedNamespaceAliases.push(reader.string());
          break;
        case 6:
          message.handwrittenSignatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DotnetSettings>): DotnetSettings {
    const message = createBaseDotnetSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    message.renamedServices = Object.entries(object.renamedServices ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.renamedResources = Object.entries(object.renamedResources ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.ignoredResources = object.ignoredResources?.map(e => e) || [];
    message.forcedNamespaceAliases = object.forcedNamespaceAliases?.map(e => e) || [];
    message.handwrittenSignatures = object.handwrittenSignatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: DotnetSettingsAmino): DotnetSettings {
    const message = createBaseDotnetSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    message.renamedServices = Object.entries(object.renamed_services ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.renamedResources = Object.entries(object.renamed_resources ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.ignoredResources = object.ignored_resources?.map(e => e) || [];
    message.forcedNamespaceAliases = object.forced_namespace_aliases?.map(e => e) || [];
    message.handwrittenSignatures = object.handwritten_signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: DotnetSettings): DotnetSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    obj.renamed_services = {};
    if (message.renamedServices) {
      Object.entries(message.renamedServices).forEach(([k, v]) => {
        obj.renamed_services[k] = v;
      });
    }
    obj.renamed_resources = {};
    if (message.renamedResources) {
      Object.entries(message.renamedResources).forEach(([k, v]) => {
        obj.renamed_resources[k] = v;
      });
    }
    if (message.ignoredResources) {
      obj.ignored_resources = message.ignoredResources.map(e => e);
    } else {
      obj.ignored_resources = message.ignoredResources;
    }
    if (message.forcedNamespaceAliases) {
      obj.forced_namespace_aliases = message.forcedNamespaceAliases.map(e => e);
    } else {
      obj.forced_namespace_aliases = message.forcedNamespaceAliases;
    }
    if (message.handwrittenSignatures) {
      obj.handwritten_signatures = message.handwrittenSignatures.map(e => e);
    } else {
      obj.handwritten_signatures = message.handwrittenSignatures;
    }
    return obj;
  },
  fromAminoMsg(object: DotnetSettingsAminoMsg): DotnetSettings {
    return DotnetSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: DotnetSettingsProtoMsg): DotnetSettings {
    return DotnetSettings.decode(message.value);
  },
  toProto(message: DotnetSettings): Uint8Array {
    return DotnetSettings.encode(message).finish();
  },
  toProtoMsg(message: DotnetSettings): DotnetSettingsProtoMsg {
    return {
      typeUrl: "/google.api.DotnetSettings",
      value: DotnetSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(DotnetSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBaseRubySettings(): RubySettings {
  return {
    common: undefined
  };
}
/**
 * Settings for Ruby client libraries.
 * @name RubySettings
 * @package google.api
 * @see proto type: google.api.RubySettings
 */
export const RubySettings = {
  typeUrl: "/google.api.RubySettings",
  is(o: any): o is RubySettings {
    return o && o.$typeUrl === RubySettings.typeUrl;
  },
  isAmino(o: any): o is RubySettingsAmino {
    return o && o.$typeUrl === RubySettings.typeUrl;
  },
  encode(message: RubySettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RubySettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRubySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<RubySettings>): RubySettings {
    const message = createBaseRubySettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: RubySettingsAmino): RubySettings {
    const message = createBaseRubySettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    return message;
  },
  toAmino(message: RubySettings): RubySettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: RubySettingsAminoMsg): RubySettings {
    return RubySettings.fromAmino(object.value);
  },
  fromProtoMsg(message: RubySettingsProtoMsg): RubySettings {
    return RubySettings.decode(message.value);
  },
  toProto(message: RubySettings): Uint8Array {
    return RubySettings.encode(message).finish();
  },
  toProtoMsg(message: RubySettings): RubySettingsProtoMsg {
    return {
      typeUrl: "/google.api.RubySettings",
      value: RubySettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(RubySettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBaseGoSettings_RenamedServicesEntry(): GoSettings_RenamedServicesEntry {
  return {
    key: "",
    value: ""
  };
}
/**
 * @name GoSettings_RenamedServicesEntry
 * @package google.api
 * @see proto type: google.api.undefined
 */
export const GoSettings_RenamedServicesEntry = {
  encode(message: GoSettings_RenamedServicesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GoSettings_RenamedServicesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoSettings_RenamedServicesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GoSettings_RenamedServicesEntry>): GoSettings_RenamedServicesEntry {
    const message = createBaseGoSettings_RenamedServicesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: GoSettings_RenamedServicesEntryAmino): GoSettings_RenamedServicesEntry {
    const message = createBaseGoSettings_RenamedServicesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: GoSettings_RenamedServicesEntry): GoSettings_RenamedServicesEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: GoSettings_RenamedServicesEntryAminoMsg): GoSettings_RenamedServicesEntry {
    return GoSettings_RenamedServicesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GoSettings_RenamedServicesEntryProtoMsg): GoSettings_RenamedServicesEntry {
    return GoSettings_RenamedServicesEntry.decode(message.value);
  },
  toProto(message: GoSettings_RenamedServicesEntry): Uint8Array {
    return GoSettings_RenamedServicesEntry.encode(message).finish();
  },
  registerTypeUrl() {}
};
function createBaseGoSettings(): GoSettings {
  return {
    common: undefined,
    renamedServices: {}
  };
}
/**
 * Settings for Go client libraries.
 * @name GoSettings
 * @package google.api
 * @see proto type: google.api.GoSettings
 */
export const GoSettings = {
  typeUrl: "/google.api.GoSettings",
  is(o: any): o is GoSettings {
    return o && (o.$typeUrl === GoSettings.typeUrl || isSet(o.renamedServices));
  },
  isAmino(o: any): o is GoSettingsAmino {
    return o && (o.$typeUrl === GoSettings.typeUrl || isSet(o.renamed_services));
  },
  encode(message: GoSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.renamedServices).forEach(([key, value]) => {
      GoSettings_RenamedServicesEntry.encode({
        key: key as any,
        value
      }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GoSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = GoSettings_RenamedServicesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.renamedServices[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GoSettings>): GoSettings {
    const message = createBaseGoSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    message.renamedServices = Object.entries(object.renamedServices ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: GoSettingsAmino): GoSettings {
    const message = createBaseGoSettings();
    if (object.common !== undefined && object.common !== null) {
      message.common = CommonLanguageSettings.fromAmino(object.common);
    }
    message.renamedServices = Object.entries(object.renamed_services ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: GoSettings): GoSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    obj.renamed_services = {};
    if (message.renamedServices) {
      Object.entries(message.renamedServices).forEach(([k, v]) => {
        obj.renamed_services[k] = v;
      });
    }
    return obj;
  },
  fromAminoMsg(object: GoSettingsAminoMsg): GoSettings {
    return GoSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: GoSettingsProtoMsg): GoSettings {
    return GoSettings.decode(message.value);
  },
  toProto(message: GoSettings): Uint8Array {
    return GoSettings.encode(message).finish();
  },
  toProtoMsg(message: GoSettings): GoSettingsProtoMsg {
    return {
      typeUrl: "/google.api.GoSettings",
      value: GoSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(GoSettings.typeUrl)) {
      return;
    }
    CommonLanguageSettings.registerTypeUrl();
  }
};
function createBaseMethodSettings(): MethodSettings {
  return {
    selector: "",
    longRunning: undefined,
    autoPopulatedFields: []
  };
}
/**
 * Describes the generator configuration for a method.
 * @name MethodSettings
 * @package google.api
 * @see proto type: google.api.MethodSettings
 */
export const MethodSettings = {
  typeUrl: "/google.api.MethodSettings",
  is(o: any): o is MethodSettings {
    return o && (o.$typeUrl === MethodSettings.typeUrl || typeof o.selector === "string" && Array.isArray(o.autoPopulatedFields) && (!o.autoPopulatedFields.length || typeof o.autoPopulatedFields[0] === "string"));
  },
  isAmino(o: any): o is MethodSettingsAmino {
    return o && (o.$typeUrl === MethodSettings.typeUrl || typeof o.selector === "string" && Array.isArray(o.auto_populated_fields) && (!o.auto_populated_fields.length || typeof o.auto_populated_fields[0] === "string"));
  },
  encode(message: MethodSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.selector !== "") {
      writer.uint32(10).string(message.selector);
    }
    if (message.longRunning !== undefined) {
      MethodSettings_LongRunning.encode(message.longRunning, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.autoPopulatedFields) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MethodSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.selector = reader.string();
          break;
        case 2:
          message.longRunning = MethodSettings_LongRunning.decode(reader, reader.uint32());
          break;
        case 3:
          message.autoPopulatedFields.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MethodSettings>): MethodSettings {
    const message = createBaseMethodSettings();
    message.selector = object.selector ?? "";
    message.longRunning = object.longRunning !== undefined && object.longRunning !== null ? MethodSettings_LongRunning.fromPartial(object.longRunning) : undefined;
    message.autoPopulatedFields = object.autoPopulatedFields?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MethodSettingsAmino): MethodSettings {
    const message = createBaseMethodSettings();
    if (object.selector !== undefined && object.selector !== null) {
      message.selector = object.selector;
    }
    if (object.long_running !== undefined && object.long_running !== null) {
      message.longRunning = MethodSettings_LongRunning.fromAmino(object.long_running);
    }
    message.autoPopulatedFields = object.auto_populated_fields?.map(e => e) || [];
    return message;
  },
  toAmino(message: MethodSettings): MethodSettingsAmino {
    const obj: any = {};
    obj.selector = message.selector === "" ? undefined : message.selector;
    obj.long_running = message.longRunning ? MethodSettings_LongRunning.toAmino(message.longRunning) : undefined;
    if (message.autoPopulatedFields) {
      obj.auto_populated_fields = message.autoPopulatedFields.map(e => e);
    } else {
      obj.auto_populated_fields = message.autoPopulatedFields;
    }
    return obj;
  },
  fromAminoMsg(object: MethodSettingsAminoMsg): MethodSettings {
    return MethodSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: MethodSettingsProtoMsg): MethodSettings {
    return MethodSettings.decode(message.value);
  },
  toProto(message: MethodSettings): Uint8Array {
    return MethodSettings.encode(message).finish();
  },
  toProtoMsg(message: MethodSettings): MethodSettingsProtoMsg {
    return {
      typeUrl: "/google.api.MethodSettings",
      value: MethodSettings.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(MethodSettings.typeUrl)) {
      return;
    }
    MethodSettings_LongRunning.registerTypeUrl();
  }
};
function createBaseMethodSettings_LongRunning(): MethodSettings_LongRunning {
  return {
    initialPollDelay: undefined,
    pollDelayMultiplier: 0,
    maxPollDelay: undefined,
    totalPollTimeout: undefined
  };
}
/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 * @name MethodSettings_LongRunning
 * @package google.api
 * @see proto type: google.api.LongRunning
 */
export const MethodSettings_LongRunning = {
  typeUrl: "/google.api.LongRunning",
  is(o: any): o is MethodSettings_LongRunning {
    return o && (o.$typeUrl === MethodSettings_LongRunning.typeUrl || typeof o.pollDelayMultiplier === "number");
  },
  isAmino(o: any): o is MethodSettings_LongRunningAmino {
    return o && (o.$typeUrl === MethodSettings_LongRunning.typeUrl || typeof o.poll_delay_multiplier === "number");
  },
  encode(message: MethodSettings_LongRunning, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.initialPollDelay !== undefined) {
      Duration.encode(message.initialPollDelay, writer.uint32(10).fork()).ldelim();
    }
    if (message.pollDelayMultiplier !== 0) {
      writer.uint32(21).float(message.pollDelayMultiplier);
    }
    if (message.maxPollDelay !== undefined) {
      Duration.encode(message.maxPollDelay, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalPollTimeout !== undefined) {
      Duration.encode(message.totalPollTimeout, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MethodSettings_LongRunning {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodSettings_LongRunning();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initialPollDelay = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.pollDelayMultiplier = reader.float();
          break;
        case 3:
          message.maxPollDelay = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.totalPollTimeout = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MethodSettings_LongRunning>): MethodSettings_LongRunning {
    const message = createBaseMethodSettings_LongRunning();
    message.initialPollDelay = object.initialPollDelay !== undefined && object.initialPollDelay !== null ? Duration.fromPartial(object.initialPollDelay) : undefined;
    message.pollDelayMultiplier = object.pollDelayMultiplier ?? 0;
    message.maxPollDelay = object.maxPollDelay !== undefined && object.maxPollDelay !== null ? Duration.fromPartial(object.maxPollDelay) : undefined;
    message.totalPollTimeout = object.totalPollTimeout !== undefined && object.totalPollTimeout !== null ? Duration.fromPartial(object.totalPollTimeout) : undefined;
    return message;
  },
  fromAmino(object: MethodSettings_LongRunningAmino): MethodSettings_LongRunning {
    const message = createBaseMethodSettings_LongRunning();
    if (object.initial_poll_delay !== undefined && object.initial_poll_delay !== null) {
      message.initialPollDelay = Duration.fromAmino(object.initial_poll_delay);
    }
    if (object.poll_delay_multiplier !== undefined && object.poll_delay_multiplier !== null) {
      message.pollDelayMultiplier = object.poll_delay_multiplier;
    }
    if (object.max_poll_delay !== undefined && object.max_poll_delay !== null) {
      message.maxPollDelay = Duration.fromAmino(object.max_poll_delay);
    }
    if (object.total_poll_timeout !== undefined && object.total_poll_timeout !== null) {
      message.totalPollTimeout = Duration.fromAmino(object.total_poll_timeout);
    }
    return message;
  },
  toAmino(message: MethodSettings_LongRunning): MethodSettings_LongRunningAmino {
    const obj: any = {};
    obj.initial_poll_delay = message.initialPollDelay ? Duration.toAmino(message.initialPollDelay) : undefined;
    obj.poll_delay_multiplier = message.pollDelayMultiplier === 0 ? undefined : message.pollDelayMultiplier;
    obj.max_poll_delay = message.maxPollDelay ? Duration.toAmino(message.maxPollDelay) : undefined;
    obj.total_poll_timeout = message.totalPollTimeout ? Duration.toAmino(message.totalPollTimeout) : undefined;
    return obj;
  },
  fromAminoMsg(object: MethodSettings_LongRunningAminoMsg): MethodSettings_LongRunning {
    return MethodSettings_LongRunning.fromAmino(object.value);
  },
  fromProtoMsg(message: MethodSettings_LongRunningProtoMsg): MethodSettings_LongRunning {
    return MethodSettings_LongRunning.decode(message.value);
  },
  toProto(message: MethodSettings_LongRunning): Uint8Array {
    return MethodSettings_LongRunning.encode(message).finish();
  },
  toProtoMsg(message: MethodSettings_LongRunning): MethodSettings_LongRunningProtoMsg {
    return {
      typeUrl: "/google.api.LongRunning",
      value: MethodSettings_LongRunning.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseSelectiveGapicGeneration(): SelectiveGapicGeneration {
  return {
    methods: [],
    generateOmittedAsInternal: false
  };
}
/**
 * This message is used to configure the generation of a subset of the RPCs in
 * a service for client libraries.
 * @name SelectiveGapicGeneration
 * @package google.api
 * @see proto type: google.api.SelectiveGapicGeneration
 */
export const SelectiveGapicGeneration = {
  typeUrl: "/google.api.SelectiveGapicGeneration",
  is(o: any): o is SelectiveGapicGeneration {
    return o && (o.$typeUrl === SelectiveGapicGeneration.typeUrl || Array.isArray(o.methods) && (!o.methods.length || typeof o.methods[0] === "string") && typeof o.generateOmittedAsInternal === "boolean");
  },
  isAmino(o: any): o is SelectiveGapicGenerationAmino {
    return o && (o.$typeUrl === SelectiveGapicGeneration.typeUrl || Array.isArray(o.methods) && (!o.methods.length || typeof o.methods[0] === "string") && typeof o.generate_omitted_as_internal === "boolean");
  },
  encode(message: SelectiveGapicGeneration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.methods) {
      writer.uint32(10).string(v!);
    }
    if (message.generateOmittedAsInternal === true) {
      writer.uint32(16).bool(message.generateOmittedAsInternal);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SelectiveGapicGeneration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectiveGapicGeneration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.methods.push(reader.string());
          break;
        case 2:
          message.generateOmittedAsInternal = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SelectiveGapicGeneration>): SelectiveGapicGeneration {
    const message = createBaseSelectiveGapicGeneration();
    message.methods = object.methods?.map(e => e) || [];
    message.generateOmittedAsInternal = object.generateOmittedAsInternal ?? false;
    return message;
  },
  fromAmino(object: SelectiveGapicGenerationAmino): SelectiveGapicGeneration {
    const message = createBaseSelectiveGapicGeneration();
    message.methods = object.methods?.map(e => e) || [];
    if (object.generate_omitted_as_internal !== undefined && object.generate_omitted_as_internal !== null) {
      message.generateOmittedAsInternal = object.generate_omitted_as_internal;
    }
    return message;
  },
  toAmino(message: SelectiveGapicGeneration): SelectiveGapicGenerationAmino {
    const obj: any = {};
    if (message.methods) {
      obj.methods = message.methods.map(e => e);
    } else {
      obj.methods = message.methods;
    }
    obj.generate_omitted_as_internal = message.generateOmittedAsInternal === false ? undefined : message.generateOmittedAsInternal;
    return obj;
  },
  fromAminoMsg(object: SelectiveGapicGenerationAminoMsg): SelectiveGapicGeneration {
    return SelectiveGapicGeneration.fromAmino(object.value);
  },
  fromProtoMsg(message: SelectiveGapicGenerationProtoMsg): SelectiveGapicGeneration {
    return SelectiveGapicGeneration.decode(message.value);
  },
  toProto(message: SelectiveGapicGeneration): Uint8Array {
    return SelectiveGapicGeneration.encode(message).finish();
  },
  toProtoMsg(message: SelectiveGapicGeneration): SelectiveGapicGenerationProtoMsg {
    return {
      typeUrl: "/google.api.SelectiveGapicGeneration",
      value: SelectiveGapicGeneration.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};