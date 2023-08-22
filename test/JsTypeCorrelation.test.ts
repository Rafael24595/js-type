import { TemplateBuilder } from "../src/commons/builder/TemplateBuilder";
import { JsTypeMessages } from "../src/commons/error/JsTypeMessages";
import { JsTypeError } from "../src/commons/error/JsTypeError";
import { JsTypeCorrelationQuery } from "../src/module/correlation/JsTypeCorrelationQuery";
import { JsTypeCorrelation } from "../src/module/correlation/JsTypeCorrelation";
import { SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION, VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION } from "./source/js-type-correlation/Structures";

test('Success validation: Single parameter', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A");
    JsTypeCorrelation.valide(SINGLE_PARAMETER_DEFINITION, SINGLE_PARAMETER_IMPLEMENTATION, correlation);
});

test('Success validation: Vactor parameter', () => {
    const correlation = JsTypeCorrelationQuery.instance()
        .addCoincidence("name")
        .addFilter("force", true)
        .addFilter("type", "A");
    JsTypeCorrelation.valide(VECTOR_PARAMETER_DEFINITION, VECTOR_PARAMETER_IMPLEMENTATION, correlation);
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

test('Success validation: Schema and structure does not match', () => {
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