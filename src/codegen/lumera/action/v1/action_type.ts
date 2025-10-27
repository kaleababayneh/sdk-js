// @ts-nocheck
/* eslint-disable */
/** ActionType enum represents the various types of actions that can be performed. */
export enum ActionType {
  /** ACTION_TYPE_UNSPECIFIED - The default action type, used when the type is not specified. */
  ACTION_TYPE_UNSPECIFIED = 0,
  /** ACTION_TYPE_SENSE - The action type for sense operations. */
  ACTION_TYPE_SENSE = 1,
  /** ACTION_TYPE_CASCADE - The action type for cascade operations. */
  ACTION_TYPE_CASCADE = 2,
  UNRECOGNIZED = -1,
}
export const ActionTypeAmino = ActionType;
export function actionTypeFromJSON(object: any): ActionType {
  switch (object) {
    case 0:
    case "ACTION_TYPE_UNSPECIFIED":
      return ActionType.ACTION_TYPE_UNSPECIFIED;
    case 1:
    case "ACTION_TYPE_SENSE":
      return ActionType.ACTION_TYPE_SENSE;
    case 2:
    case "ACTION_TYPE_CASCADE":
      return ActionType.ACTION_TYPE_CASCADE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionType.UNRECOGNIZED;
  }
}
export function actionTypeToJSON(object: ActionType): string {
  switch (object) {
    case ActionType.ACTION_TYPE_UNSPECIFIED:
      return "ACTION_TYPE_UNSPECIFIED";
    case ActionType.ACTION_TYPE_SENSE:
      return "ACTION_TYPE_SENSE";
    case ActionType.ACTION_TYPE_CASCADE:
      return "ACTION_TYPE_CASCADE";
    case ActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}