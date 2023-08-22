import { JsTypeError } from "../../commons/error/JsTypeError";
import { JsTypeMessages } from "../../commons/error/JsTypeMessages";
import { JsTypeCorrelationQuery } from "./JsTypeCorrelationQuery";

export class JsTypeCorrelation {

    private filter: JsTypeCorrelationQuery
    private valides: object[];
    private conflicts: {[key:string]: any};

    private constructor(relation: JsTypeCorrelationQuery) {
        this.filter = relation;
        this.valides = [];
        this.conflicts = {};
    }

    public static valide(schema: any, structure: any, relation: JsTypeCorrelationQuery) {
        const instance = new JsTypeCorrelation(relation);
        instance._valide(schema, structure);
    }

    public _valide(schema: any, structure: any) {
        let schemas = schema;
        let structures = structure;
        if(!this.isVector(schema, structure)) {
            schemas = [schema]
            structures = [structure]
        }
        this.valideVector(schemas, structures);
    }

    private valideVector(schema: any[], structure: any[]) {
        for (const childSchema of schema) {
            if(this.isValidable(childSchema) && !this.existsStructure(childSchema, structure))
                throw new JsTypeError(JsTypeMessages.JS_TYPE_101, JSON.stringify(this.conflicts));
        }
    }

    private existsStructure(childSchema: any, structure: any[]) {
        for (const childStructure of structure) {
            if(!this.valides.includes(childStructure) && this.valideItem(childSchema, childStructure)) {
                this.valides.push(childStructure);
                return true;
            }
        }
        return false;
    }

    private valideItem(schema: any, structure: any) {
        for (const coincidence of this.filter.getCoincidence()) {
            const schemaValue = schema[coincidence.key];
            const structureValue = structure[coincidence.key];
            const isObjectSchema = schemaValue instanceof Object
            const isObjectStructure = structureValue instanceof Object
            if(isObjectSchema || isObjectStructure) {
                if(isObjectSchema != isObjectStructure)
                    throw new JsTypeError(JsTypeMessages.JS_TYPE_103, isObjectSchema, isObjectStructure);
                const childFilter = coincidence.value;
                if(!(childFilter instanceof JsTypeCorrelationQuery))
                    throw new JsTypeError(JsTypeMessages.JS_TYPE_104, JsTypeCorrelationQuery.name);
                JsTypeCorrelation.valide(schemaValue, structureValue, coincidence.value);
                continue;
            }
            if(structureValue != schemaValue){
                this.conflicts[coincidence.key] = schemaValue;
                return false;
            }
        }
        return true;
    }

    public isValidable(schema: any) {
        for (const filter of this.filter.getFilter()) {
            if(!(filter.value instanceof JsTypeCorrelationQuery) && schema[filter.key] != filter.value)
                return false;
        }
        return true;
    }

    private isVector(schema: any, structure: any): boolean {
        const isSchemaArray = Array.isArray(schema);
        const isStructureArray = Array.isArray(structure);
        if(isSchemaArray && ! isStructureArray || !isSchemaArray && isStructureArray)
            throw new JsTypeError(JsTypeMessages.JS_TYPE_102);
        return isSchemaArray;
    }

}