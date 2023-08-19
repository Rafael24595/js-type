import { TemplateBuilder } from "../builder/TemplateBuilder";

export class JsTypeError extends Error {

    public constructor(message: string, ...args: any[]) {
        super(TemplateBuilder.message(message, args));
        this.name = "JsTypeError";
    }

}