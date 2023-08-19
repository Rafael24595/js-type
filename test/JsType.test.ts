import { JsType } from "../src/module/JsType";
import { PlainStructI, PlainStructII, PlainStructIII, PlainStructIV, PlainStructI_I, PlainStructV, PlainStructVI } from "./source/PlainStruct";
import { StructA } from "./source/StructA";
import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { StructC } from "./source/StructC";
import { StructB } from "./source/StructB";
import { MyEnum } from "./source/MyEnum";

test('Success validation of typed of PlainStructI', () => {
    JsType.valide(StructA, PlainStructI)
});

test('Success validation of typed of PlainStructI', () => {
    JsType.valide(StructA, PlainStructI_I)
});

test('Failed validation of typed of PlainStructII', () => {
    const t = () => {
        JsType.valide(StructC, PlainStructII)
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_001, [StructC.name]));
});

test('Failed validation of typed of PlainStructIII', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructIII)
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_002, ["id"]));
});

test('Failed validation of typed of PlainStructIV', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructIV)
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_003, ["childs", "object"]));
});

test('Failed validation of typed of PlainStructV', () => {
    const t = () => {
        JsType.valide(StructB, PlainStructV)
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_004, ["boolean", "bool", "string"]));
});

test('Failed validation of typed of PlainStructVI', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructVI)
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_005, ["Not-Found", "id", Object.values(MyEnum)]));
});