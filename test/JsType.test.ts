import { JsType } from "../src/module/JsType";
import { PlainStructI, PlainStructII, PlainStructIII, PlainStructIV, PlainStructIX, PlainStructI_I, PlainStructI_II, PlainStructI_III, PlainStructV, PlainStructVI, PlainStructVII, PlainStructVIII } from "./source/js-type/PlainStruct";
import { StructA } from "./source/js-type/StructA";
import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { StructC } from "./source/js-type/StructC";
import { StructB } from "./source/js-type/StructB";
import { MyEnum } from "./source/js-type/MyEnum";
import { StructD } from "./source/js-type/StructD";
import { StructE } from "./source/js-type/StructE";

test('Success validation: Full object (PlainStructI)', () => {
    StructA.valide(PlainStructI);
});

test('Success validation: Empty vector (PlainStructI_I)', () => {
    StructA.valide(PlainStructI_I);
});

test('Success validation: Circular reference (PlainStructI_II, PlainStructI_III)', () => {
    const structI = PlainStructI_II;
    const structII = PlainStructI_III;
    structI.self = structII;
    structII.self = structI;
    StructD.valide(structI);
});

test('Failed validation: JsType not implemented (PlainStructII)', () => {
    const t = () => {
        StructC.valide(PlainStructII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_001, [StructC.name]));
});

test('Failed validation: Undefined field (PlainStructIII)', () => {
    const t = () => {
        StructA.valide(PlainStructIII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_002, ["id"]));
});

test('Failed validation: Vector expected (PlainStructIV)', () => {
    const t = () => {
        StructA.valide(PlainStructIV);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_003, ["childs", "object"]));
});

test('Failed validation: Specific primitive expected (PlainStructV)', () => {
    const t = () => {
        StructB.valide(PlainStructV);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_004, ["boolean", "bool", "string"]));
});

test('Failed validation: Value out of bounds (PlainStructVI)', () => {
    const t = () => {
        StructA.valide(PlainStructVI);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_005, ["Not-Found", "id", Object.values(MyEnum)]));
});

test('Failed validation: JsType not implemented for sub-structure (PlainStructVII)', () => {
    const t = () => {
        StructE.valide(PlainStructVII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_001, [StructC.name]));
});

test('Failed validation: JsType struct expected (PlainStructVIII)', () => {
    const t = () => {
        StructA.valide(PlainStructVIII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_006, [StructB.name, "parent","boolean"]));
});

test('Failed validation: JsType implementation used as template (PlainStructVIII)', () => {
    const t = () => {
        JsType.valide(PlainStructVIII);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_007, []));
});

test('Failed validation: JsType implementation used as template (PlainStructVIII)', () => {
    const t = () => {
        StructA.valide(PlainStructIX);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_008, ["outOfBoundsField"]));
});