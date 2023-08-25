import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { JsTypeCorrelationQuery } from "../src/module/correlation/JsTypeCorrelationQuery";
import { JsTypeCorrelation } from "../src/module/correlation/JsTypeCorrelation";
import { SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION, SINGLE_PARAMETER_IMPLEMENTATION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB_ERROR_I, VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION } from "./source/js-type-correlation/Structures";

test('Success validation: Single parameter', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A");
    JsTypeCorrelation.valide(SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION, correlation);
});

test('Success validation: Vector parameter', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A");
    JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
});

test('Success validation: Empty coincidences non exists field', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("not-exists-I", true)
        .addFilter("not-exists-II", "A");
    JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
});

test('Success validation: Sub-correlation', () => {
    const subCorrelation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("is_child", true);
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addCoincidence("child")
        .addFilter("force", true)
        .addFilter("child", subCorrelation);
    JsTypeCorrelation.valide(SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB, correlation);
});

test('Success validation: Empty coincidences', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "Not-Exists");
    JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
});

test('Failed validation: Vector parameter', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "C");
    const t = () => {
        JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_101, [JSON.stringify({"name":"param-V"})]));
});

test('Failed validation: Schema and structure does not match', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A");
    const t = () => {
        JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION, correlation);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_102, []));
});

test('Failed validation: Sub-correlation mismatch types', () => {
    const subCorrelation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("is_child", true);
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addCoincidence("child")
        .addFilter("force", true)
        .addFilter("child", subCorrelation);
    const t = () => {
        JsTypeCorrelation.valide(SINGLE_PARAMETER_DEFINITION_SUB, SINGLE_PARAMETER_IMPLEMENTATION_SUB_ERROR_I, correlation);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_103, [true, false]));
});

test('Failed validation: Item out of bounds', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .restrictBounds()
        .addCoincidence("name")
        .addFilter("type", "A");
    const t = () => {
        JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
    };
    expect(t).toThrow(JsTypeError);
    expect(t).toThrow(TemplateBuilder.message(JsTypeMessages.JS_TYPE_105, [JSON.stringify([VECTOR_PARAMETER_IMPLEMENTATION[3]])]));
});