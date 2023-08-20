import { JsTypeError } from "../commons/error/JsTypeError";
import { JsTypeMessages } from "../commons/error/JsTypeMessages";

export class JsType {

    private history: Object[];

    private constructor() {
        this.history = [];
    }

    /** 
     * Validate if an structure implements a JsType schema.
     * @param schema object.
     * @param structure object.
     * @throws an exception if the structure does not implement correctly the given schema or if the schema does not implement JsType.
     */
    public static valide(schema: Object, structure: Object): void {
        const instance = new JsType();
        instance._valide(schema, structure);
    }

    /** 
     * Validate if a structure implements JsType.
     * @param schema object.
     */
    public static isTyped(schema: any): boolean {
        return schema.prototype?.jstypes != undefined;
    }

    private _valide(schema: any, structure: any): void {
        if (!JsType.isTyped(schema))
            throw new JsTypeError(JsTypeMessages.JS_TYPE_001, schema.name);
        if(this.isValidated(structure))
            return;
        const types = this.types(schema)
        for (const code of Object.keys(types)) {
            const childSchema = types[code];
            const childStructure = structure[code];
            this.valideField(code, childSchema, childStructure);
        }
    }

    private isValidated(structure: any): boolean {
        if (this.typeOf(structure) === 'object') {
            if (this.history.indexOf(structure) !== -1) 
                return true;
            this.history.push(structure);
        }
        return false;
    }

    private valideField(code: string, schema: any, structure: any): void {
        if(this.isAny(schema)) {
            return;
        }
        if (structure == undefined) {
            throw new JsTypeError(JsTypeMessages.JS_TYPE_002, code);
        }
        if (this.isVector(schema)) {
            const vectorSchema = schema[0];
            this.valideVector(code, vectorSchema, structure);
            return;
        }
        if (this.isPrimitive(schema)) {
            this.validePrimitive(code, schema, structure);
            return;
        }
        if (this.isStruct(schema)) {
            this.valideStruct(code, schema, structure);
            return;
        }
        this._valide(schema, structure);
    }

    private valideVector(code: string, schema: any, structure: any): void {
        if (!Array.isArray(structure))
            throw new JsTypeError(JsTypeMessages.JS_TYPE_003, code, this.typeOf(structure));
        for (const element of structure) {
            this._valide(schema, element);
        }
    }

    public validePrimitive(code: string, schema: any, structure: any): void {
        const schemaType = this.typeofSchemaInstance(schema);
        const structureType = this.typeOf(structure);
        if (schemaType !== structureType)
            throw new JsTypeError(JsTypeMessages.JS_TYPE_004, schemaType, code, structureType);
    }

    public valideStruct(code: string, schema: any, structure: any): void {
        const exists = Object.values(schema).includes(structure);
        if (!exists)
            throw new JsTypeError(JsTypeMessages.JS_TYPE_005, structure, code, Object.values(schema));
    }

    private types(schema: any): any {
        if (JsType.isTyped(schema))
            return schema.prototype.jstypes;
        return {};
    }

    private typeofSchemaInstance(schema: any) {
        if (schema instanceof Object) {
            const instance = new schema();
            return this.typeOf(instance.valueOf());
        }
        return 'undefined';
    }

    private typeOf(structure: any) {
        return typeof structure;
    }

    private isPrimitive(schema: any): boolean {
        return schema === String || schema === Number || schema === Boolean;
    }

    private isAny(schema: any): boolean {
        return schema === Object;
    }

    private isStruct(schema: any): boolean {
        return this.typeOf(schema) === 'object' && schema instanceof Object;
    }

    private isVector(schema: any): boolean {
        return Array.isArray(schema) && schema.length > 0;
    }

}