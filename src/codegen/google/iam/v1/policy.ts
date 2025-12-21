// @ts-nocheck
/* eslint-disable */
import { Expr, ExprAmino } from "../../type/expr";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, bytesFromBase64, base64FromBytes, isSet } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * The list of valid permission types for which logging can be configured.
 * Admin writes are always logged, and are not configurable.
 */
export enum AuditLogConfig_LogType {
  /** LOG_TYPE_UNSPECIFIED - Default case. Should never be this. */
  LOG_TYPE_UNSPECIFIED = 0,
  /** ADMIN_READ - Admin reads. Example: CloudIAM getIamPolicy */
  ADMIN_READ = 1,
  /** DATA_WRITE - Data writes. Example: CloudSQL Users create */
  DATA_WRITE = 2,
  /** DATA_READ - Data reads. Example: CloudSQL Users list */
  DATA_READ = 3,
  UNRECOGNIZED = -1,
}
export const AuditLogConfig_LogTypeAmino = AuditLogConfig_LogType;
export function auditLogConfig_LogTypeFromJSON(object: any): AuditLogConfig_LogType {
  switch (object) {
    case 0:
    case "LOG_TYPE_UNSPECIFIED":
      return AuditLogConfig_LogType.LOG_TYPE_UNSPECIFIED;
    case 1:
    case "ADMIN_READ":
      return AuditLogConfig_LogType.ADMIN_READ;
    case 2:
    case "DATA_WRITE":
      return AuditLogConfig_LogType.DATA_WRITE;
    case 3:
    case "DATA_READ":
      return AuditLogConfig_LogType.DATA_READ;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuditLogConfig_LogType.UNRECOGNIZED;
  }
}
export function auditLogConfig_LogTypeToJSON(object: AuditLogConfig_LogType): string {
  switch (object) {
    case AuditLogConfig_LogType.LOG_TYPE_UNSPECIFIED:
      return "LOG_TYPE_UNSPECIFIED";
    case AuditLogConfig_LogType.ADMIN_READ:
      return "ADMIN_READ";
    case AuditLogConfig_LogType.DATA_WRITE:
      return "DATA_WRITE";
    case AuditLogConfig_LogType.DATA_READ:
      return "DATA_READ";
    case AuditLogConfig_LogType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** The type of action performed on a Binding in a policy. */
export enum BindingDelta_Action {
  /** ACTION_UNSPECIFIED - Unspecified. */
  ACTION_UNSPECIFIED = 0,
  /** ADD - Addition of a Binding. */
  ADD = 1,
  /** REMOVE - Removal of a Binding. */
  REMOVE = 2,
  UNRECOGNIZED = -1,
}
export const BindingDelta_ActionAmino = BindingDelta_Action;
export function bindingDelta_ActionFromJSON(object: any): BindingDelta_Action {
  switch (object) {
    case 0:
    case "ACTION_UNSPECIFIED":
      return BindingDelta_Action.ACTION_UNSPECIFIED;
    case 1:
    case "ADD":
      return BindingDelta_Action.ADD;
    case 2:
    case "REMOVE":
      return BindingDelta_Action.REMOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BindingDelta_Action.UNRECOGNIZED;
  }
}
export function bindingDelta_ActionToJSON(object: BindingDelta_Action): string {
  switch (object) {
    case BindingDelta_Action.ACTION_UNSPECIFIED:
      return "ACTION_UNSPECIFIED";
    case BindingDelta_Action.ADD:
      return "ADD";
    case BindingDelta_Action.REMOVE:
      return "REMOVE";
    case BindingDelta_Action.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** The type of action performed on an audit configuration in a policy. */
export enum AuditConfigDelta_Action {
  /** ACTION_UNSPECIFIED - Unspecified. */
  ACTION_UNSPECIFIED = 0,
  /** ADD - Addition of an audit configuration. */
  ADD = 1,
  /** REMOVE - Removal of an audit configuration. */
  REMOVE = 2,
  UNRECOGNIZED = -1,
}
export const AuditConfigDelta_ActionAmino = AuditConfigDelta_Action;
export function auditConfigDelta_ActionFromJSON(object: any): AuditConfigDelta_Action {
  switch (object) {
    case 0:
    case "ACTION_UNSPECIFIED":
      return AuditConfigDelta_Action.ACTION_UNSPECIFIED;
    case 1:
    case "ADD":
      return AuditConfigDelta_Action.ADD;
    case 2:
    case "REMOVE":
      return AuditConfigDelta_Action.REMOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuditConfigDelta_Action.UNRECOGNIZED;
  }
}
export function auditConfigDelta_ActionToJSON(object: AuditConfigDelta_Action): string {
  switch (object) {
    case AuditConfigDelta_Action.ACTION_UNSPECIFIED:
      return "ACTION_UNSPECIFIED";
    case AuditConfigDelta_Action.ADD:
      return "ADD";
    case AuditConfigDelta_Action.REMOVE:
      return "REMOVE";
    case AuditConfigDelta_Action.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources.
 * 
 * 
 * A `Policy` is a collection of `bindings`. A `binding` binds one or more
 * `members`, or principals, to a single `role`. Principals can be user
 * accounts, service accounts, Google groups, and domains (such as G Suite). A
 * `role` is a named list of permissions; each `role` can be an IAM predefined
 * role or a user-created custom role.
 * 
 * For some types of Google Cloud resources, a `binding` can also specify a
 * `condition`, which is a logical expression that allows access to a resource
 * only if the expression evaluates to `true`. A condition can add constraints
 * based on attributes of the request, the resource, or both. To learn which
 * resources support conditions in their IAM policies, see the
 * [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * 
 * **JSON example:**
 * 
 * ```
 *     {
 *       "bindings": [
 *         {
 *           "role": "roles/resourcemanager.organizationAdmin",
 *           "members": [
 *             "user:mike@example.com",
 *             "group:admins@example.com",
 *             "domain:google.com",
 *             "serviceAccount:my-project-id@appspot.gserviceaccount.com"
 *           ]
 *         },
 *         {
 *           "role": "roles/resourcemanager.organizationViewer",
 *           "members": [
 *             "user:eve@example.com"
 *           ],
 *           "condition": {
 *             "title": "expirable access",
 *             "description": "Does not grant access after Sep 2020",
 *             "expression": "request.time <
 *             timestamp('2020-10-01T00:00:00.000Z')",
 *           }
 *         }
 *       ],
 *       "etag": "BwWWja0YfJA=",
 *       "version": 3
 *     }
 * ```
 * 
 * **YAML example:**
 * 
 * ```
 *     bindings:
 *     - members:
 *       - user:mike@example.com
 *       - group:admins@example.com
 *       - domain:google.com
 *       - serviceAccount:my-project-id@appspot.gserviceaccount.com
 *       role: roles/resourcemanager.organizationAdmin
 *     - members:
 *       - user:eve@example.com
 *       role: roles/resourcemanager.organizationViewer
 *       condition:
 *         title: expirable access
 *         description: Does not grant access after Sep 2020
 *         expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
 *     etag: BwWWja0YfJA=
 *     version: 3
 * ```
 * 
 * For a description of IAM and its features, see the
 * [IAM documentation](https://cloud.google.com/iam/docs/).
 * @name Policy
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Policy
 */
export interface Policy {
  /**
   * Specifies the format of the policy.
   * 
   * Valid values are `0`, `1`, and `3`. Requests that specify an invalid value
   * are rejected.
   * 
   * Any operation that affects conditional role bindings must specify version
   * `3`. This requirement applies to the following operations:
   * 
   * * Getting a policy that includes a conditional role binding
   * * Adding a conditional role binding to a policy
   * * Changing a conditional role binding in a policy
   * * Removing any role binding, with or without a condition, from a policy
   *   that includes conditions
   * 
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   * 
   * If a policy does not include any conditions, operations on that policy may
   * specify any valid version or leave the field unset.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version: number;
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal.
   * 
   * The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250
   * of these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings: Binding[];
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs: AuditConfig[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help
   * prevent simultaneous updates of a policy from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * 
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag: Uint8Array;
}
export interface PolicyProtoMsg {
  typeUrl: "/google.iam.v1.Policy";
  value: Uint8Array;
}
/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources.
 * 
 * 
 * A `Policy` is a collection of `bindings`. A `binding` binds one or more
 * `members`, or principals, to a single `role`. Principals can be user
 * accounts, service accounts, Google groups, and domains (such as G Suite). A
 * `role` is a named list of permissions; each `role` can be an IAM predefined
 * role or a user-created custom role.
 * 
 * For some types of Google Cloud resources, a `binding` can also specify a
 * `condition`, which is a logical expression that allows access to a resource
 * only if the expression evaluates to `true`. A condition can add constraints
 * based on attributes of the request, the resource, or both. To learn which
 * resources support conditions in their IAM policies, see the
 * [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * 
 * **JSON example:**
 * 
 * ```
 *     {
 *       "bindings": [
 *         {
 *           "role": "roles/resourcemanager.organizationAdmin",
 *           "members": [
 *             "user:mike@example.com",
 *             "group:admins@example.com",
 *             "domain:google.com",
 *             "serviceAccount:my-project-id@appspot.gserviceaccount.com"
 *           ]
 *         },
 *         {
 *           "role": "roles/resourcemanager.organizationViewer",
 *           "members": [
 *             "user:eve@example.com"
 *           ],
 *           "condition": {
 *             "title": "expirable access",
 *             "description": "Does not grant access after Sep 2020",
 *             "expression": "request.time <
 *             timestamp('2020-10-01T00:00:00.000Z')",
 *           }
 *         }
 *       ],
 *       "etag": "BwWWja0YfJA=",
 *       "version": 3
 *     }
 * ```
 * 
 * **YAML example:**
 * 
 * ```
 *     bindings:
 *     - members:
 *       - user:mike@example.com
 *       - group:admins@example.com
 *       - domain:google.com
 *       - serviceAccount:my-project-id@appspot.gserviceaccount.com
 *       role: roles/resourcemanager.organizationAdmin
 *     - members:
 *       - user:eve@example.com
 *       role: roles/resourcemanager.organizationViewer
 *       condition:
 *         title: expirable access
 *         description: Does not grant access after Sep 2020
 *         expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
 *     etag: BwWWja0YfJA=
 *     version: 3
 * ```
 * 
 * For a description of IAM and its features, see the
 * [IAM documentation](https://cloud.google.com/iam/docs/).
 * @name PolicyAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Policy
 */
export interface PolicyAmino {
  /**
   * Specifies the format of the policy.
   * 
   * Valid values are `0`, `1`, and `3`. Requests that specify an invalid value
   * are rejected.
   * 
   * Any operation that affects conditional role bindings must specify version
   * `3`. This requirement applies to the following operations:
   * 
   * * Getting a policy that includes a conditional role binding
   * * Adding a conditional role binding to a policy
   * * Changing a conditional role binding in a policy
   * * Removing any role binding, with or without a condition, from a policy
   *   that includes conditions
   * 
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   * 
   * If a policy does not include any conditions, operations on that policy may
   * specify any valid version or leave the field unset.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version: number;
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal.
   * 
   * The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250
   * of these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings: BindingAmino[];
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  audit_configs: AuditConfigAmino[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help
   * prevent simultaneous updates of a policy from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * 
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag: string;
}
export interface PolicyAminoMsg {
  type: "/google.iam.v1.Policy";
  value: PolicyAmino;
}
/**
 * Associates `members`, or principals, with a `role`.
 * @name Binding
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Binding
 */
export interface Binding {
  /**
   * Role that is assigned to the list of `members`, or principals.
   * For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role: string;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values:
   * 
   * * `allUsers`: A special identifier that represents anyone who is
   *    on the internet; with or without a Google account.
   * 
   * * `allAuthenticatedUsers`: A special identifier that represents anyone
   *    who is authenticated with a Google account or a service account.
   * 
   * * `user:{emailid}`: An email address that represents a specific Google
   *    account. For example, `alice@example.com` .
   * 
   * 
   * * `serviceAccount:{emailid}`: An email address that represents a service
   *    account. For example, `my-other-app@appspot.gserviceaccount.com`.
   * 
   * * `group:{emailid}`: An email address that represents a Google group.
   *    For example, `admins@example.com`.
   * 
   * * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique
   *    identifier) representing a user that has been recently deleted. For
   *    example, `alice@example.com?uid=123456789012345678901`. If the user is
   *    recovered, this value reverts to `user:{emailid}` and the recovered user
   *    retains the role in the binding.
   * 
   * * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus
   *    unique identifier) representing a service account that has been recently
   *    deleted. For example,
   *    `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`.
   *    If the service account is undeleted, this value reverts to
   *    `serviceAccount:{emailid}` and the undeleted service account retains the
   *    role in the binding.
   * 
   * * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique
   *    identifier) representing a Google group that has been recently
   *    deleted. For example, `admins@example.com?uid=123456789012345678901`. If
   *    the group is recovered, this value reverts to `group:{emailid}` and the
   *    recovered group retains the role in the binding.
   * 
   * 
   * * `domain:{domain}`: The G Suite domain (primary) that represents all the
   *    users of that domain. For example, `google.com` or `example.com`.
   */
  members: string[];
  /**
   * The condition that is associated with this binding.
   * 
   * If the condition evaluates to `true`, then this binding applies to the
   * current request.
   * 
   * If the condition evaluates to `false`, then this binding does not apply to
   * the current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
}
export interface BindingProtoMsg {
  typeUrl: "/google.iam.v1.Binding";
  value: Uint8Array;
}
/**
 * Associates `members`, or principals, with a `role`.
 * @name BindingAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Binding
 */
export interface BindingAmino {
  /**
   * Role that is assigned to the list of `members`, or principals.
   * For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role: string;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values:
   * 
   * * `allUsers`: A special identifier that represents anyone who is
   *    on the internet; with or without a Google account.
   * 
   * * `allAuthenticatedUsers`: A special identifier that represents anyone
   *    who is authenticated with a Google account or a service account.
   * 
   * * `user:{emailid}`: An email address that represents a specific Google
   *    account. For example, `alice@example.com` .
   * 
   * 
   * * `serviceAccount:{emailid}`: An email address that represents a service
   *    account. For example, `my-other-app@appspot.gserviceaccount.com`.
   * 
   * * `group:{emailid}`: An email address that represents a Google group.
   *    For example, `admins@example.com`.
   * 
   * * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique
   *    identifier) representing a user that has been recently deleted. For
   *    example, `alice@example.com?uid=123456789012345678901`. If the user is
   *    recovered, this value reverts to `user:{emailid}` and the recovered user
   *    retains the role in the binding.
   * 
   * * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus
   *    unique identifier) representing a service account that has been recently
   *    deleted. For example,
   *    `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`.
   *    If the service account is undeleted, this value reverts to
   *    `serviceAccount:{emailid}` and the undeleted service account retains the
   *    role in the binding.
   * 
   * * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique
   *    identifier) representing a Google group that has been recently
   *    deleted. For example, `admins@example.com?uid=123456789012345678901`. If
   *    the group is recovered, this value reverts to `group:{emailid}` and the
   *    recovered group retains the role in the binding.
   * 
   * 
   * * `domain:{domain}`: The G Suite domain (primary) that represents all the
   *    users of that domain. For example, `google.com` or `example.com`.
   */
  members: string[];
  /**
   * The condition that is associated with this binding.
   * 
   * If the condition evaluates to `true`, then this binding applies to the
   * current request.
   * 
   * If the condition evaluates to `false`, then this binding does not apply to
   * the current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: ExprAmino;
}
export interface BindingAminoMsg {
  type: "/google.iam.v1.Binding";
  value: BindingAmino;
}
/**
 * Specifies the audit configuration for a service.
 * The configuration determines which permission types are logged, and what
 * identities, if any, are exempted from logging.
 * An AuditConfig must have one or more AuditLogConfigs.
 * 
 * If there are AuditConfigs for both `allServices` and a specific service,
 * the union of the two AuditConfigs is used for that service: the log_types
 * specified in each AuditConfig are enabled, and the exempted_members in each
 * AuditLogConfig are exempted.
 * 
 * Example Policy with multiple AuditConfigs:
 * 
 *     {
 *       "audit_configs": [
 *         {
 *           "service": "allServices",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ",
 *               "exempted_members": [
 *                 "user:jose@example.com"
 *               ]
 *             },
 *             {
 *               "log_type": "DATA_WRITE"
 *             },
 *             {
 *               "log_type": "ADMIN_READ"
 *             }
 *           ]
 *         },
 *         {
 *           "service": "sampleservice.googleapis.com",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ"
 *             },
 *             {
 *               "log_type": "DATA_WRITE",
 *               "exempted_members": [
 *                 "user:aliya@example.com"
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 * 
 * For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 * @name AuditConfig
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfig
 */
export interface AuditConfig {
  /**
   * Specifies a service that will be enabled for audit logging.
   * For example, `storage.googleapis.com`, `cloudsql.googleapis.com`.
   * `allServices` is a special value that covers all services.
   */
  service: string;
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs: AuditLogConfig[];
}
export interface AuditConfigProtoMsg {
  typeUrl: "/google.iam.v1.AuditConfig";
  value: Uint8Array;
}
/**
 * Specifies the audit configuration for a service.
 * The configuration determines which permission types are logged, and what
 * identities, if any, are exempted from logging.
 * An AuditConfig must have one or more AuditLogConfigs.
 * 
 * If there are AuditConfigs for both `allServices` and a specific service,
 * the union of the two AuditConfigs is used for that service: the log_types
 * specified in each AuditConfig are enabled, and the exempted_members in each
 * AuditLogConfig are exempted.
 * 
 * Example Policy with multiple AuditConfigs:
 * 
 *     {
 *       "audit_configs": [
 *         {
 *           "service": "allServices",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ",
 *               "exempted_members": [
 *                 "user:jose@example.com"
 *               ]
 *             },
 *             {
 *               "log_type": "DATA_WRITE"
 *             },
 *             {
 *               "log_type": "ADMIN_READ"
 *             }
 *           ]
 *         },
 *         {
 *           "service": "sampleservice.googleapis.com",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ"
 *             },
 *             {
 *               "log_type": "DATA_WRITE",
 *               "exempted_members": [
 *                 "user:aliya@example.com"
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 * 
 * For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 * @name AuditConfigAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfig
 */
export interface AuditConfigAmino {
  /**
   * Specifies a service that will be enabled for audit logging.
   * For example, `storage.googleapis.com`, `cloudsql.googleapis.com`.
   * `allServices` is a special value that covers all services.
   */
  service: string;
  /**
   * The configuration for logging of each type of permission.
   */
  audit_log_configs: AuditLogConfigAmino[];
}
export interface AuditConfigAminoMsg {
  type: "/google.iam.v1.AuditConfig";
  value: AuditConfigAmino;
}
/**
 * Provides the configuration for logging a type of permissions.
 * Example:
 * 
 *     {
 *       "audit_log_configs": [
 *         {
 *           "log_type": "DATA_READ",
 *           "exempted_members": [
 *             "user:jose@example.com"
 *           ]
 *         },
 *         {
 *           "log_type": "DATA_WRITE"
 *         }
 *       ]
 *     }
 * 
 * This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting
 * jose@example.com from DATA_READ logging.
 * @name AuditLogConfig
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditLogConfig
 */
export interface AuditLogConfig {
  /**
   * The log type that this config enables.
   */
  logType: AuditLogConfig_LogType;
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission.
   * Follows the same format of
   * [Binding.members][google.iam.v1.Binding.members].
   */
  exemptedMembers: string[];
}
export interface AuditLogConfigProtoMsg {
  typeUrl: "/google.iam.v1.AuditLogConfig";
  value: Uint8Array;
}
/**
 * Provides the configuration for logging a type of permissions.
 * Example:
 * 
 *     {
 *       "audit_log_configs": [
 *         {
 *           "log_type": "DATA_READ",
 *           "exempted_members": [
 *             "user:jose@example.com"
 *           ]
 *         },
 *         {
 *           "log_type": "DATA_WRITE"
 *         }
 *       ]
 *     }
 * 
 * This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting
 * jose@example.com from DATA_READ logging.
 * @name AuditLogConfigAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditLogConfig
 */
export interface AuditLogConfigAmino {
  /**
   * The log type that this config enables.
   */
  log_type: AuditLogConfig_LogType;
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission.
   * Follows the same format of
   * [Binding.members][google.iam.v1.Binding.members].
   */
  exempted_members: string[];
}
export interface AuditLogConfigAminoMsg {
  type: "/google.iam.v1.AuditLogConfig";
  value: AuditLogConfigAmino;
}
/**
 * The difference delta between two policies.
 * @name PolicyDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.PolicyDelta
 */
export interface PolicyDelta {
  /**
   * The delta for Bindings between two policies.
   */
  bindingDeltas: BindingDelta[];
  /**
   * The delta for AuditConfigs between two policies.
   */
  auditConfigDeltas: AuditConfigDelta[];
}
export interface PolicyDeltaProtoMsg {
  typeUrl: "/google.iam.v1.PolicyDelta";
  value: Uint8Array;
}
/**
 * The difference delta between two policies.
 * @name PolicyDeltaAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.PolicyDelta
 */
export interface PolicyDeltaAmino {
  /**
   * The delta for Bindings between two policies.
   */
  binding_deltas: BindingDeltaAmino[];
  /**
   * The delta for AuditConfigs between two policies.
   */
  audit_config_deltas: AuditConfigDeltaAmino[];
}
export interface PolicyDeltaAminoMsg {
  type: "/google.iam.v1.PolicyDelta";
  value: PolicyDeltaAmino;
}
/**
 * One delta entry for Binding. Each individual change (only one member in each
 * entry) to a binding will be a separate entry.
 * @name BindingDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.BindingDelta
 */
export interface BindingDelta {
  /**
   * The action that was performed on a Binding.
   * Required
   */
  action: BindingDelta_Action;
  /**
   * Role that is assigned to `members`.
   * For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   * Required
   */
  role: string;
  /**
   * A single identity requesting access for a Google Cloud resource.
   * Follows the same format of Binding.members.
   * Required
   */
  member: string;
  /**
   * The condition that is associated with this binding.
   */
  condition?: Expr;
}
export interface BindingDeltaProtoMsg {
  typeUrl: "/google.iam.v1.BindingDelta";
  value: Uint8Array;
}
/**
 * One delta entry for Binding. Each individual change (only one member in each
 * entry) to a binding will be a separate entry.
 * @name BindingDeltaAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.BindingDelta
 */
export interface BindingDeltaAmino {
  /**
   * The action that was performed on a Binding.
   * Required
   */
  action: BindingDelta_Action;
  /**
   * Role that is assigned to `members`.
   * For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   * Required
   */
  role: string;
  /**
   * A single identity requesting access for a Google Cloud resource.
   * Follows the same format of Binding.members.
   * Required
   */
  member: string;
  /**
   * The condition that is associated with this binding.
   */
  condition?: ExprAmino;
}
export interface BindingDeltaAminoMsg {
  type: "/google.iam.v1.BindingDelta";
  value: BindingDeltaAmino;
}
/**
 * One delta entry for AuditConfig. Each individual change (only one
 * exempted_member in each entry) to a AuditConfig will be a separate entry.
 * @name AuditConfigDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfigDelta
 */
export interface AuditConfigDelta {
  /**
   * The action that was performed on an audit configuration in a policy.
   * Required
   */
  action: AuditConfigDelta_Action;
  /**
   * Specifies a service that was configured for Cloud Audit Logging.
   * For example, `storage.googleapis.com`, `cloudsql.googleapis.com`.
   * `allServices` is a special value that covers all services.
   * Required
   */
  service: string;
  /**
   * A single identity that is exempted from "data access" audit
   * logging for the `service` specified above.
   * Follows the same format of Binding.members.
   */
  exemptedMember: string;
  /**
   * Specifies the log_type that was be enabled. ADMIN_ACTIVITY is always
   * enabled, and cannot be configured.
   * Required
   */
  logType: string;
}
export interface AuditConfigDeltaProtoMsg {
  typeUrl: "/google.iam.v1.AuditConfigDelta";
  value: Uint8Array;
}
/**
 * One delta entry for AuditConfig. Each individual change (only one
 * exempted_member in each entry) to a AuditConfig will be a separate entry.
 * @name AuditConfigDeltaAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfigDelta
 */
export interface AuditConfigDeltaAmino {
  /**
   * The action that was performed on an audit configuration in a policy.
   * Required
   */
  action: AuditConfigDelta_Action;
  /**
   * Specifies a service that was configured for Cloud Audit Logging.
   * For example, `storage.googleapis.com`, `cloudsql.googleapis.com`.
   * `allServices` is a special value that covers all services.
   * Required
   */
  service: string;
  /**
   * A single identity that is exempted from "data access" audit
   * logging for the `service` specified above.
   * Follows the same format of Binding.members.
   */
  exempted_member: string;
  /**
   * Specifies the log_type that was be enabled. ADMIN_ACTIVITY is always
   * enabled, and cannot be configured.
   * Required
   */
  log_type: string;
}
export interface AuditConfigDeltaAminoMsg {
  type: "/google.iam.v1.AuditConfigDelta";
  value: AuditConfigDeltaAmino;
}
function createBasePolicy(): Policy {
  return {
    version: 0,
    bindings: [],
    auditConfigs: [],
    etag: new Uint8Array()
  };
}
/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources.
 * 
 * 
 * A `Policy` is a collection of `bindings`. A `binding` binds one or more
 * `members`, or principals, to a single `role`. Principals can be user
 * accounts, service accounts, Google groups, and domains (such as G Suite). A
 * `role` is a named list of permissions; each `role` can be an IAM predefined
 * role or a user-created custom role.
 * 
 * For some types of Google Cloud resources, a `binding` can also specify a
 * `condition`, which is a logical expression that allows access to a resource
 * only if the expression evaluates to `true`. A condition can add constraints
 * based on attributes of the request, the resource, or both. To learn which
 * resources support conditions in their IAM policies, see the
 * [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * 
 * **JSON example:**
 * 
 * ```
 *     {
 *       "bindings": [
 *         {
 *           "role": "roles/resourcemanager.organizationAdmin",
 *           "members": [
 *             "user:mike@example.com",
 *             "group:admins@example.com",
 *             "domain:google.com",
 *             "serviceAccount:my-project-id@appspot.gserviceaccount.com"
 *           ]
 *         },
 *         {
 *           "role": "roles/resourcemanager.organizationViewer",
 *           "members": [
 *             "user:eve@example.com"
 *           ],
 *           "condition": {
 *             "title": "expirable access",
 *             "description": "Does not grant access after Sep 2020",
 *             "expression": "request.time <
 *             timestamp('2020-10-01T00:00:00.000Z')",
 *           }
 *         }
 *       ],
 *       "etag": "BwWWja0YfJA=",
 *       "version": 3
 *     }
 * ```
 * 
 * **YAML example:**
 * 
 * ```
 *     bindings:
 *     - members:
 *       - user:mike@example.com
 *       - group:admins@example.com
 *       - domain:google.com
 *       - serviceAccount:my-project-id@appspot.gserviceaccount.com
 *       role: roles/resourcemanager.organizationAdmin
 *     - members:
 *       - user:eve@example.com
 *       role: roles/resourcemanager.organizationViewer
 *       condition:
 *         title: expirable access
 *         description: Does not grant access after Sep 2020
 *         expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
 *     etag: BwWWja0YfJA=
 *     version: 3
 * ```
 * 
 * For a description of IAM and its features, see the
 * [IAM documentation](https://cloud.google.com/iam/docs/).
 * @name Policy
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Policy
 */
export const Policy = {
  typeUrl: "/google.iam.v1.Policy",
  is(o: any): o is Policy {
    return o && (o.$typeUrl === Policy.typeUrl || typeof o.version === "number" && Array.isArray(o.bindings) && (!o.bindings.length || Binding.is(o.bindings[0])) && Array.isArray(o.auditConfigs) && (!o.auditConfigs.length || AuditConfig.is(o.auditConfigs[0])) && (o.etag instanceof Uint8Array || typeof o.etag === "string"));
  },
  isAmino(o: any): o is PolicyAmino {
    return o && (o.$typeUrl === Policy.typeUrl || typeof o.version === "number" && Array.isArray(o.bindings) && (!o.bindings.length || Binding.isAmino(o.bindings[0])) && Array.isArray(o.audit_configs) && (!o.audit_configs.length || AuditConfig.isAmino(o.audit_configs[0])) && (o.etag instanceof Uint8Array || typeof o.etag === "string"));
  },
  encode(message: Policy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    for (const v of message.bindings) {
      Binding.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.auditConfigs) {
      AuditConfig.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.etag.length !== 0) {
      writer.uint32(26).bytes(message.etag);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Policy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.int32();
          break;
        case 4:
          message.bindings.push(Binding.decode(reader, reader.uint32()));
          break;
        case 6:
          message.auditConfigs.push(AuditConfig.decode(reader, reader.uint32()));
          break;
        case 3:
          message.etag = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Policy>): Policy {
    const message = createBasePolicy();
    message.version = object.version ?? 0;
    message.bindings = object.bindings?.map(e => Binding.fromPartial(e)) || [];
    message.auditConfigs = object.auditConfigs?.map(e => AuditConfig.fromPartial(e)) || [];
    message.etag = object.etag ?? new Uint8Array();
    return message;
  },
  fromAmino(object: PolicyAmino): Policy {
    const message = createBasePolicy();
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    message.bindings = object.bindings?.map(e => Binding.fromAmino(e)) || [];
    message.auditConfigs = object.audit_configs?.map(e => AuditConfig.fromAmino(e)) || [];
    if (object.etag !== undefined && object.etag !== null) {
      message.etag = bytesFromBase64(object.etag);
    }
    return message;
  },
  toAmino(message: Policy): PolicyAmino {
    const obj: any = {};
    obj.version = message.version === 0 ? undefined : message.version;
    if (message.bindings) {
      obj.bindings = message.bindings.map(e => e ? Binding.toAmino(e) : undefined);
    } else {
      obj.bindings = message.bindings;
    }
    if (message.auditConfigs) {
      obj.audit_configs = message.auditConfigs.map(e => e ? AuditConfig.toAmino(e) : undefined);
    } else {
      obj.audit_configs = message.auditConfigs;
    }
    obj.etag = message.etag ? base64FromBytes(message.etag) : undefined;
    return obj;
  },
  fromAminoMsg(object: PolicyAminoMsg): Policy {
    return Policy.fromAmino(object.value);
  },
  fromProtoMsg(message: PolicyProtoMsg): Policy {
    return Policy.decode(message.value);
  },
  toProto(message: Policy): Uint8Array {
    return Policy.encode(message).finish();
  },
  toProtoMsg(message: Policy): PolicyProtoMsg {
    return {
      typeUrl: "/google.iam.v1.Policy",
      value: Policy.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(Policy.typeUrl)) {
      return;
    }
    Binding.registerTypeUrl();
    AuditConfig.registerTypeUrl();
  }
};
function createBaseBinding(): Binding {
  return {
    role: "",
    members: [],
    condition: undefined
  };
}
/**
 * Associates `members`, or principals, with a `role`.
 * @name Binding
 * @package google.iam.v1
 * @see proto type: google.iam.v1.Binding
 */
export const Binding = {
  typeUrl: "/google.iam.v1.Binding",
  is(o: any): o is Binding {
    return o && (o.$typeUrl === Binding.typeUrl || typeof o.role === "string" && Array.isArray(o.members) && (!o.members.length || typeof o.members[0] === "string"));
  },
  isAmino(o: any): o is BindingAmino {
    return o && (o.$typeUrl === Binding.typeUrl || typeof o.role === "string" && Array.isArray(o.members) && (!o.members.length || typeof o.members[0] === "string"));
  },
  encode(message: Binding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.role !== "") {
      writer.uint32(10).string(message.role);
    }
    for (const v of message.members) {
      writer.uint32(18).string(v!);
    }
    if (message.condition !== undefined) {
      Expr.encode(message.condition, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Binding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBinding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role = reader.string();
          break;
        case 2:
          message.members.push(reader.string());
          break;
        case 3:
          message.condition = Expr.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Binding>): Binding {
    const message = createBaseBinding();
    message.role = object.role ?? "";
    message.members = object.members?.map(e => e) || [];
    message.condition = object.condition !== undefined && object.condition !== null ? Expr.fromPartial(object.condition) : undefined;
    return message;
  },
  fromAmino(object: BindingAmino): Binding {
    const message = createBaseBinding();
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    }
    message.members = object.members?.map(e => e) || [];
    if (object.condition !== undefined && object.condition !== null) {
      message.condition = Expr.fromAmino(object.condition);
    }
    return message;
  },
  toAmino(message: Binding): BindingAmino {
    const obj: any = {};
    obj.role = message.role === "" ? undefined : message.role;
    if (message.members) {
      obj.members = message.members.map(e => e);
    } else {
      obj.members = message.members;
    }
    obj.condition = message.condition ? Expr.toAmino(message.condition) : undefined;
    return obj;
  },
  fromAminoMsg(object: BindingAminoMsg): Binding {
    return Binding.fromAmino(object.value);
  },
  fromProtoMsg(message: BindingProtoMsg): Binding {
    return Binding.decode(message.value);
  },
  toProto(message: Binding): Uint8Array {
    return Binding.encode(message).finish();
  },
  toProtoMsg(message: Binding): BindingProtoMsg {
    return {
      typeUrl: "/google.iam.v1.Binding",
      value: Binding.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(Binding.typeUrl)) {
      return;
    }
    Expr.registerTypeUrl();
  }
};
function createBaseAuditConfig(): AuditConfig {
  return {
    service: "",
    auditLogConfigs: []
  };
}
/**
 * Specifies the audit configuration for a service.
 * The configuration determines which permission types are logged, and what
 * identities, if any, are exempted from logging.
 * An AuditConfig must have one or more AuditLogConfigs.
 * 
 * If there are AuditConfigs for both `allServices` and a specific service,
 * the union of the two AuditConfigs is used for that service: the log_types
 * specified in each AuditConfig are enabled, and the exempted_members in each
 * AuditLogConfig are exempted.
 * 
 * Example Policy with multiple AuditConfigs:
 * 
 *     {
 *       "audit_configs": [
 *         {
 *           "service": "allServices",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ",
 *               "exempted_members": [
 *                 "user:jose@example.com"
 *               ]
 *             },
 *             {
 *               "log_type": "DATA_WRITE"
 *             },
 *             {
 *               "log_type": "ADMIN_READ"
 *             }
 *           ]
 *         },
 *         {
 *           "service": "sampleservice.googleapis.com",
 *           "audit_log_configs": [
 *             {
 *               "log_type": "DATA_READ"
 *             },
 *             {
 *               "log_type": "DATA_WRITE",
 *               "exempted_members": [
 *                 "user:aliya@example.com"
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 * 
 * For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 * @name AuditConfig
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfig
 */
export const AuditConfig = {
  typeUrl: "/google.iam.v1.AuditConfig",
  is(o: any): o is AuditConfig {
    return o && (o.$typeUrl === AuditConfig.typeUrl || typeof o.service === "string" && Array.isArray(o.auditLogConfigs) && (!o.auditLogConfigs.length || AuditLogConfig.is(o.auditLogConfigs[0])));
  },
  isAmino(o: any): o is AuditConfigAmino {
    return o && (o.$typeUrl === AuditConfig.typeUrl || typeof o.service === "string" && Array.isArray(o.audit_log_configs) && (!o.audit_log_configs.length || AuditLogConfig.isAmino(o.audit_log_configs[0])));
  },
  encode(message: AuditConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.service !== "") {
      writer.uint32(10).string(message.service);
    }
    for (const v of message.auditLogConfigs) {
      AuditLogConfig.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AuditConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuditConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.service = reader.string();
          break;
        case 3:
          message.auditLogConfigs.push(AuditLogConfig.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AuditConfig>): AuditConfig {
    const message = createBaseAuditConfig();
    message.service = object.service ?? "";
    message.auditLogConfigs = object.auditLogConfigs?.map(e => AuditLogConfig.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AuditConfigAmino): AuditConfig {
    const message = createBaseAuditConfig();
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    }
    message.auditLogConfigs = object.audit_log_configs?.map(e => AuditLogConfig.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AuditConfig): AuditConfigAmino {
    const obj: any = {};
    obj.service = message.service === "" ? undefined : message.service;
    if (message.auditLogConfigs) {
      obj.audit_log_configs = message.auditLogConfigs.map(e => e ? AuditLogConfig.toAmino(e) : undefined);
    } else {
      obj.audit_log_configs = message.auditLogConfigs;
    }
    return obj;
  },
  fromAminoMsg(object: AuditConfigAminoMsg): AuditConfig {
    return AuditConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: AuditConfigProtoMsg): AuditConfig {
    return AuditConfig.decode(message.value);
  },
  toProto(message: AuditConfig): Uint8Array {
    return AuditConfig.encode(message).finish();
  },
  toProtoMsg(message: AuditConfig): AuditConfigProtoMsg {
    return {
      typeUrl: "/google.iam.v1.AuditConfig",
      value: AuditConfig.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(AuditConfig.typeUrl)) {
      return;
    }
    AuditLogConfig.registerTypeUrl();
  }
};
function createBaseAuditLogConfig(): AuditLogConfig {
  return {
    logType: 0,
    exemptedMembers: []
  };
}
/**
 * Provides the configuration for logging a type of permissions.
 * Example:
 * 
 *     {
 *       "audit_log_configs": [
 *         {
 *           "log_type": "DATA_READ",
 *           "exempted_members": [
 *             "user:jose@example.com"
 *           ]
 *         },
 *         {
 *           "log_type": "DATA_WRITE"
 *         }
 *       ]
 *     }
 * 
 * This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting
 * jose@example.com from DATA_READ logging.
 * @name AuditLogConfig
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditLogConfig
 */
export const AuditLogConfig = {
  typeUrl: "/google.iam.v1.AuditLogConfig",
  is(o: any): o is AuditLogConfig {
    return o && (o.$typeUrl === AuditLogConfig.typeUrl || isSet(o.logType) && Array.isArray(o.exemptedMembers) && (!o.exemptedMembers.length || typeof o.exemptedMembers[0] === "string"));
  },
  isAmino(o: any): o is AuditLogConfigAmino {
    return o && (o.$typeUrl === AuditLogConfig.typeUrl || isSet(o.log_type) && Array.isArray(o.exempted_members) && (!o.exempted_members.length || typeof o.exempted_members[0] === "string"));
  },
  encode(message: AuditLogConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.logType !== 0) {
      writer.uint32(8).int32(message.logType);
    }
    for (const v of message.exemptedMembers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AuditLogConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuditLogConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.logType = reader.int32() as any;
          break;
        case 2:
          message.exemptedMembers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AuditLogConfig>): AuditLogConfig {
    const message = createBaseAuditLogConfig();
    message.logType = object.logType ?? 0;
    message.exemptedMembers = object.exemptedMembers?.map(e => e) || [];
    return message;
  },
  fromAmino(object: AuditLogConfigAmino): AuditLogConfig {
    const message = createBaseAuditLogConfig();
    if (object.log_type !== undefined && object.log_type !== null) {
      message.logType = object.log_type;
    }
    message.exemptedMembers = object.exempted_members?.map(e => e) || [];
    return message;
  },
  toAmino(message: AuditLogConfig): AuditLogConfigAmino {
    const obj: any = {};
    obj.log_type = message.logType === 0 ? undefined : message.logType;
    if (message.exemptedMembers) {
      obj.exempted_members = message.exemptedMembers.map(e => e);
    } else {
      obj.exempted_members = message.exemptedMembers;
    }
    return obj;
  },
  fromAminoMsg(object: AuditLogConfigAminoMsg): AuditLogConfig {
    return AuditLogConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: AuditLogConfigProtoMsg): AuditLogConfig {
    return AuditLogConfig.decode(message.value);
  },
  toProto(message: AuditLogConfig): Uint8Array {
    return AuditLogConfig.encode(message).finish();
  },
  toProtoMsg(message: AuditLogConfig): AuditLogConfigProtoMsg {
    return {
      typeUrl: "/google.iam.v1.AuditLogConfig",
      value: AuditLogConfig.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBasePolicyDelta(): PolicyDelta {
  return {
    bindingDeltas: [],
    auditConfigDeltas: []
  };
}
/**
 * The difference delta between two policies.
 * @name PolicyDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.PolicyDelta
 */
export const PolicyDelta = {
  typeUrl: "/google.iam.v1.PolicyDelta",
  is(o: any): o is PolicyDelta {
    return o && (o.$typeUrl === PolicyDelta.typeUrl || Array.isArray(o.bindingDeltas) && (!o.bindingDeltas.length || BindingDelta.is(o.bindingDeltas[0])) && Array.isArray(o.auditConfigDeltas) && (!o.auditConfigDeltas.length || AuditConfigDelta.is(o.auditConfigDeltas[0])));
  },
  isAmino(o: any): o is PolicyDeltaAmino {
    return o && (o.$typeUrl === PolicyDelta.typeUrl || Array.isArray(o.binding_deltas) && (!o.binding_deltas.length || BindingDelta.isAmino(o.binding_deltas[0])) && Array.isArray(o.audit_config_deltas) && (!o.audit_config_deltas.length || AuditConfigDelta.isAmino(o.audit_config_deltas[0])));
  },
  encode(message: PolicyDelta, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.bindingDeltas) {
      BindingDelta.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.auditConfigDeltas) {
      AuditConfigDelta.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PolicyDelta {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolicyDelta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bindingDeltas.push(BindingDelta.decode(reader, reader.uint32()));
          break;
        case 2:
          message.auditConfigDeltas.push(AuditConfigDelta.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PolicyDelta>): PolicyDelta {
    const message = createBasePolicyDelta();
    message.bindingDeltas = object.bindingDeltas?.map(e => BindingDelta.fromPartial(e)) || [];
    message.auditConfigDeltas = object.auditConfigDeltas?.map(e => AuditConfigDelta.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PolicyDeltaAmino): PolicyDelta {
    const message = createBasePolicyDelta();
    message.bindingDeltas = object.binding_deltas?.map(e => BindingDelta.fromAmino(e)) || [];
    message.auditConfigDeltas = object.audit_config_deltas?.map(e => AuditConfigDelta.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: PolicyDelta): PolicyDeltaAmino {
    const obj: any = {};
    if (message.bindingDeltas) {
      obj.binding_deltas = message.bindingDeltas.map(e => e ? BindingDelta.toAmino(e) : undefined);
    } else {
      obj.binding_deltas = message.bindingDeltas;
    }
    if (message.auditConfigDeltas) {
      obj.audit_config_deltas = message.auditConfigDeltas.map(e => e ? AuditConfigDelta.toAmino(e) : undefined);
    } else {
      obj.audit_config_deltas = message.auditConfigDeltas;
    }
    return obj;
  },
  fromAminoMsg(object: PolicyDeltaAminoMsg): PolicyDelta {
    return PolicyDelta.fromAmino(object.value);
  },
  fromProtoMsg(message: PolicyDeltaProtoMsg): PolicyDelta {
    return PolicyDelta.decode(message.value);
  },
  toProto(message: PolicyDelta): Uint8Array {
    return PolicyDelta.encode(message).finish();
  },
  toProtoMsg(message: PolicyDelta): PolicyDeltaProtoMsg {
    return {
      typeUrl: "/google.iam.v1.PolicyDelta",
      value: PolicyDelta.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(PolicyDelta.typeUrl)) {
      return;
    }
    BindingDelta.registerTypeUrl();
    AuditConfigDelta.registerTypeUrl();
  }
};
function createBaseBindingDelta(): BindingDelta {
  return {
    action: 0,
    role: "",
    member: "",
    condition: undefined
  };
}
/**
 * One delta entry for Binding. Each individual change (only one member in each
 * entry) to a binding will be a separate entry.
 * @name BindingDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.BindingDelta
 */
export const BindingDelta = {
  typeUrl: "/google.iam.v1.BindingDelta",
  is(o: any): o is BindingDelta {
    return o && (o.$typeUrl === BindingDelta.typeUrl || isSet(o.action) && typeof o.role === "string" && typeof o.member === "string");
  },
  isAmino(o: any): o is BindingDeltaAmino {
    return o && (o.$typeUrl === BindingDelta.typeUrl || isSet(o.action) && typeof o.role === "string" && typeof o.member === "string");
  },
  encode(message: BindingDelta, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== 0) {
      writer.uint32(8).int32(message.action);
    }
    if (message.role !== "") {
      writer.uint32(18).string(message.role);
    }
    if (message.member !== "") {
      writer.uint32(26).string(message.member);
    }
    if (message.condition !== undefined) {
      Expr.encode(message.condition, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BindingDelta {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBindingDelta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = reader.int32() as any;
          break;
        case 2:
          message.role = reader.string();
          break;
        case 3:
          message.member = reader.string();
          break;
        case 4:
          message.condition = Expr.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BindingDelta>): BindingDelta {
    const message = createBaseBindingDelta();
    message.action = object.action ?? 0;
    message.role = object.role ?? "";
    message.member = object.member ?? "";
    message.condition = object.condition !== undefined && object.condition !== null ? Expr.fromPartial(object.condition) : undefined;
    return message;
  },
  fromAmino(object: BindingDeltaAmino): BindingDelta {
    const message = createBaseBindingDelta();
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    }
    if (object.member !== undefined && object.member !== null) {
      message.member = object.member;
    }
    if (object.condition !== undefined && object.condition !== null) {
      message.condition = Expr.fromAmino(object.condition);
    }
    return message;
  },
  toAmino(message: BindingDelta): BindingDeltaAmino {
    const obj: any = {};
    obj.action = message.action === 0 ? undefined : message.action;
    obj.role = message.role === "" ? undefined : message.role;
    obj.member = message.member === "" ? undefined : message.member;
    obj.condition = message.condition ? Expr.toAmino(message.condition) : undefined;
    return obj;
  },
  fromAminoMsg(object: BindingDeltaAminoMsg): BindingDelta {
    return BindingDelta.fromAmino(object.value);
  },
  fromProtoMsg(message: BindingDeltaProtoMsg): BindingDelta {
    return BindingDelta.decode(message.value);
  },
  toProto(message: BindingDelta): Uint8Array {
    return BindingDelta.encode(message).finish();
  },
  toProtoMsg(message: BindingDelta): BindingDeltaProtoMsg {
    return {
      typeUrl: "/google.iam.v1.BindingDelta",
      value: BindingDelta.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(BindingDelta.typeUrl)) {
      return;
    }
    Expr.registerTypeUrl();
  }
};
function createBaseAuditConfigDelta(): AuditConfigDelta {
  return {
    action: 0,
    service: "",
    exemptedMember: "",
    logType: ""
  };
}
/**
 * One delta entry for AuditConfig. Each individual change (only one
 * exempted_member in each entry) to a AuditConfig will be a separate entry.
 * @name AuditConfigDelta
 * @package google.iam.v1
 * @see proto type: google.iam.v1.AuditConfigDelta
 */
export const AuditConfigDelta = {
  typeUrl: "/google.iam.v1.AuditConfigDelta",
  is(o: any): o is AuditConfigDelta {
    return o && (o.$typeUrl === AuditConfigDelta.typeUrl || isSet(o.action) && typeof o.service === "string" && typeof o.exemptedMember === "string" && typeof o.logType === "string");
  },
  isAmino(o: any): o is AuditConfigDeltaAmino {
    return o && (o.$typeUrl === AuditConfigDelta.typeUrl || isSet(o.action) && typeof o.service === "string" && typeof o.exempted_member === "string" && typeof o.log_type === "string");
  },
  encode(message: AuditConfigDelta, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== 0) {
      writer.uint32(8).int32(message.action);
    }
    if (message.service !== "") {
      writer.uint32(18).string(message.service);
    }
    if (message.exemptedMember !== "") {
      writer.uint32(26).string(message.exemptedMember);
    }
    if (message.logType !== "") {
      writer.uint32(34).string(message.logType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AuditConfigDelta {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuditConfigDelta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = reader.int32() as any;
          break;
        case 2:
          message.service = reader.string();
          break;
        case 3:
          message.exemptedMember = reader.string();
          break;
        case 4:
          message.logType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AuditConfigDelta>): AuditConfigDelta {
    const message = createBaseAuditConfigDelta();
    message.action = object.action ?? 0;
    message.service = object.service ?? "";
    message.exemptedMember = object.exemptedMember ?? "";
    message.logType = object.logType ?? "";
    return message;
  },
  fromAmino(object: AuditConfigDeltaAmino): AuditConfigDelta {
    const message = createBaseAuditConfigDelta();
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    }
    if (object.exempted_member !== undefined && object.exempted_member !== null) {
      message.exemptedMember = object.exempted_member;
    }
    if (object.log_type !== undefined && object.log_type !== null) {
      message.logType = object.log_type;
    }
    return message;
  },
  toAmino(message: AuditConfigDelta): AuditConfigDeltaAmino {
    const obj: any = {};
    obj.action = message.action === 0 ? undefined : message.action;
    obj.service = message.service === "" ? undefined : message.service;
    obj.exempted_member = message.exemptedMember === "" ? undefined : message.exemptedMember;
    obj.log_type = message.logType === "" ? undefined : message.logType;
    return obj;
  },
  fromAminoMsg(object: AuditConfigDeltaAminoMsg): AuditConfigDelta {
    return AuditConfigDelta.fromAmino(object.value);
  },
  fromProtoMsg(message: AuditConfigDeltaProtoMsg): AuditConfigDelta {
    return AuditConfigDelta.decode(message.value);
  },
  toProto(message: AuditConfigDelta): Uint8Array {
    return AuditConfigDelta.encode(message).finish();
  },
  toProtoMsg(message: AuditConfigDelta): AuditConfigDeltaProtoMsg {
    return {
      typeUrl: "/google.iam.v1.AuditConfigDelta",
      value: AuditConfigDelta.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};