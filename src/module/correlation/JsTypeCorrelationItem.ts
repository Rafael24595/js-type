import { RelationTypes } from "./Relationtypes";

export class JsTypeCorrelationItem {

    public key: string;
    public value: any;
    public types: RelationTypes[];

    public constructor(key: string, types: RelationTypes[], value: Object) {
        this.key = key;
        this.value = value;
        this.types = types;
    }

    public addType(type: RelationTypes) {
        if(!this.types.includes(type))
            this.types.push(type);
    }

}