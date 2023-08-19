import { JsType } from "../src/module/JsType";
import { PlainStructI, PlainStructII, PlainStructIII, PlainStructIV, PlainStructI_I, PlainStructI_II, PlainStructI_III, PlainStructV, PlainStructVI } from "./source/PlainStruct";
import { StructA } from "./source/StructA";
import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { StructC } from "./source/StructC";
import { StructB } from "./source/StructB";
import { MyEnum } from "./source/MyEnum";
import { StructD } from "./source/StructD";

test('Success validation: Full object (PlainStructI)', () => {
    JsType.valide(StructA, PlainStructI);
});

test('Success validation: Empty vector (PlainStructI_I)', () => {
    JsType.valide(StructA, PlainStructI_I);
});

test('Success validation: Circular reference (PlainStructI_II, PlainStructI_III)', () => {
    const structI = PlainStructI_II;
    const structII = PlainStructI_III;
    structI.self = structII;
    structII.self = structI;
    JsType.valide(StructD, structI);
});

test('Failed validation: JsType not implemented (PlainStructII)', () => {
    const t = () => {
        JsType.valide(StructC, PlainStructII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_001, [StructC.name]));
});

test('Failed validation: Undefined field (PlainStructIII)', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructIII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_002, ["id"]));
});

test('Failed validation: Vector expected (PlainStructIV)', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructIV);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_003, ["childs", "object"]));
});

test('Failed validation: Specific primitive expected (PlainStructV)', () => {
    const t = () => {
        JsType.valide(StructB, PlainStructV);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_004, ["boolean", "bool", "string"]));
});

test('Failed validation: Value out of bounds (PlainStructVI)', () => {
    const t = () => {
        JsType.valide(StructA, PlainStructVI);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_005, ["Not-Found", "id", Object.values(MyEnum)]));
});