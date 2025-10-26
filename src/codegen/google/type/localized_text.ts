// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { Exact } from "../../helpers";
/**
 * Localized variant of a text in a particular language.
 * @name LocalizedText
 * @package google.type
 * @see proto type: google.type.LocalizedText
 */
export interface LocalizedText {
  /**
   * Localized string in the language corresponding to `language_code' below.
   */
  text: string;
  /**
   * The text's BCP-47 language code, such as "en-US" or "sr-Latn".
   * 
   * For more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode: string;
}
export interface LocalizedTextProtoMsg {
  typeUrl: "/google.type.LocalizedText";
  value: Uint8Array;
}
/**
 * Localized variant of a text in a particular language.
 * @name LocalizedTextAmino
 * @package google.type
 * @see proto type: google.type.LocalizedText
 */
export interface LocalizedTextAmino {
  /**
   * Localized string in the language corresponding to `language_code' below.
   */
  text?: string;
  /**
   * The text's BCP-47 language code, such as "en-US" or "sr-Latn".
   * 
   * For more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  language_code?: string;
}
export interface LocalizedTextAminoMsg {
  type: "/google.type.LocalizedText";
  value: LocalizedTextAmino;
}
/**
 * Localized variant of a text in a particular language.
 * @name LocalizedTextSDKType
 * @package google.type
 * @see proto type: google.type.LocalizedText
 */
export interface LocalizedTextSDKType {
  text: string;
  language_code: string;
}
function createBaseLocalizedText(): LocalizedText {
  return {
    text: "",
    languageCode: ""
  };
}
/**
 * Localized variant of a text in a particular language.
 * @name LocalizedText
 * @package google.type
 * @see proto type: google.type.LocalizedText
 */
export const LocalizedText = {
  typeUrl: "/google.type.LocalizedText",
  is(o: any): o is LocalizedText {
    return o && (o.$typeUrl === LocalizedText.typeUrl || typeof o.text === "string" && typeof o.languageCode === "string");
  },
  isSDK(o: any): o is LocalizedTextSDKType {
    return o && (o.$typeUrl === LocalizedText.typeUrl || typeof o.text === "string" && typeof o.language_code === "string");
  },
  isAmino(o: any): o is LocalizedTextAmino {
    return o && (o.$typeUrl === LocalizedText.typeUrl || typeof o.text === "string" && typeof o.language_code === "string");
  },
  encode(message: LocalizedText, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.languageCode !== "") {
      writer.uint32(18).string(message.languageCode);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LocalizedText {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalizedText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.languageCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<LocalizedText>, I>>(object: I): LocalizedText {
    const message = createBaseLocalizedText();
    message.text = object.text ?? "";
    message.languageCode = object.languageCode ?? "";
    return message;
  },
  fromAmino(object: LocalizedTextAmino): LocalizedText {
    const message = createBaseLocalizedText();
    if (object.text !== undefined && object.text !== null) {
      message.text = object.text;
    }
    if (object.language_code !== undefined && object.language_code !== null) {
      message.languageCode = object.language_code;
    }
    return message;
  },
  toAmino(message: LocalizedText): LocalizedTextAmino {
    const obj: any = {};
    obj.text = message.text === "" ? undefined : message.text;
    obj.language_code = message.languageCode === "" ? undefined : message.languageCode;
    return obj;
  },
  fromAminoMsg(object: LocalizedTextAminoMsg): LocalizedText {
    return LocalizedText.fromAmino(object.value);
  },
  fromProtoMsg(message: LocalizedTextProtoMsg): LocalizedText {
    return LocalizedText.decode(message.value);
  },
  toProto(message: LocalizedText): Uint8Array {
    return LocalizedText.encode(message).finish();
  },
  toProtoMsg(message: LocalizedText): LocalizedTextProtoMsg {
    return {
      typeUrl: "/google.type.LocalizedText",
      value: LocalizedText.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};