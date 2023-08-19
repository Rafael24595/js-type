import { JsTypeError } from "../commons/error/JsTypeError";
import { JsTypeMessages } from "../commons/error/JsTypeMessages";

export class JsType {

    public static valide(scheme: Object, structure: any) {
        const schema = scheme as any;
        if (!this.isTyped(schema))
            throw new JsTypeError(JsTypeMessages.JS_TYPE_001, schema.name);
        const types = this.types(schema)
        for (const code of Object.keys(types)) {
            const childSchema = types[code];
            const childStructure = structure[code];
            if (childStructure == undefined) {
                throw new JsTypeError(JsTypeMessages.JS_TYPE_002, code);
            }
            if (this.isVector(childSchema)) {
                const vectorSchema = childSchema[0];
                this.valideVector(code, vectorSchema, childStructure);
                continue;
            }
            if (this.isPrimitive(childSchema)) {
                this.validePrimitive(code, childSchema, childStructure);
                continue;
            }
            if (this.isStruct(childSchema)) {
                this.valideStruct(code, childSchema, childStructure);
                continue;
            }
            if (this.isTyped(childSchema)) {
                this.valide(childSchema, childStructure);
            }
        }
    }

    public static isTyped(schema: any) {
        return schema.prototype?.jstypes != undefined;
    }

    private static valideVector(code: string, schema: any, structure: any) {
        if (!Array.isArray(structure))
            throw new JsTypeError(JsTypeMessages.JS_TYPE_003, code, this.typeOf(structure))
        for (const element of structure) {
            this.valide(schema, element)
        }
    }

    public static validePrimitive(code: string, schema: any, structure: any) {
        const schemaType = this.typeofPrimitiveSchema(schema)
        const structureType = this.typeOf(structure)
        if (schemaType !== structureType)
            throw new JsTypeError(JsTypeMessages.JS_TYPE_004, schemaType, code, structureType);
    }

    public static valideStruct(code: string, schema: any, structure: any) {
        const exists = Object.values(schema).includes(structure);
        if (!exists)
            throw new JsTypeError(JsTypeMessages.JS_TYPE_005, structure, code, Object.values(schema));
    }

    private static types(schema: any) {
        if (this.isTyped(schema))
            return schema.prototype.jstypes;
        return {};
    }

    private static typeofPrimitiveSchema(schema: any) {
        if (this.isPrimitive(schema)) {
            const instance = new schema();
            return this.typeOf(instance.valueOf());
        }
        return "undefined";
    }

    private static typeOf(structure: any) {
        return typeof structure;
    }

    private static isPrimitive(schema: any): boolean {
        return this.typeOf(schema) === 'function' && schema.valueOf != undefined
    }

    private static isStruct(schema: any): boolean {
        return this.typeOf(schema) === 'object' && schema instanceof Object
    }

    private static isVector(schema: any): boolean {
        return Array.isArray(schema) && schema.length > 0;
    }

}