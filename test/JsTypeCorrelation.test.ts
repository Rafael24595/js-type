import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { JsTypeCorrelation } from "../src/module/correlation/JsTypeCorrelation";
import { SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION, SINGLE_PARAMETER_IMPLEMENTATION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB_ERROR_I, VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION } from "./source/js-type-correlation/Structures";

test('Success validation: Single parameter', () => {
    JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A")
        .match(SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION);
});

test('Success validation: Vector parameter', () => {
    JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A")
        .match(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION);
});

test('Success validation: Empty coincidences non exists field', () => {
    JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("not-exists-I", true)
        .addFilter("not-exists-II", "A")
        .match(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION);
});

test('Success validation: Sub-correlation', () => {
    const subCorrelation = JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("is_child", true);
    JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addCoincidence("child")
        .addFilter("force", true)
        .addFilter("child", subCorrelation)
        .match(SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB);
});

test('Success validation: Empty coincidences', () => {
    JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "Not-Exists")
        .match(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION);
});

test('Failed validation: Vector parameter', () => {
    const t = () => {
        JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "C")
        .match(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_101, [JSON.stringify({"name":"param-V"})]));
});

test('Failed validation: Schema and structure does not match', () => {
    const t = () => {
        JsTypeCorrelation.instance()
            .addCoincidence("name")
            .addFilter("force", true)
            .addFilter("type", "A")
            .match(VECTOR_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_102, []));
});

test('Failed validation: Sub-correlation mismatch types', () => {
    const subCorrelation = JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addFilter("is_child", true);
    const t = () => {
        JsTypeCorrelation.instance()
        .addCoincidence("name")
        .addCoincidence("child")
        .addFilter("force", true)
        .addFilter("child", subCorrelation)
        .match(SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB_ERROR_I);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_103, [true, false]));
});

test('Failed validation: Item out of bounds', () => {
    const t = () => {
        JsTypeCorrelation.instance()
        .restrictBounds()
        .addCoincidence("name")
        .addFilter("type", "A")
        .match(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_105, [JSON.stringify([VECTOR_PARAMETER_IMPLEMENTATION[3]])]));
});