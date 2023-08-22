import { JsTypeCorrelationItem } from "./JsTypeCorrelationItem";
import { RelationTypes } from "./Relationtypes";

export class JsTypeCorrelationQuery {

    private items: {[key:string]: JsTypeCorrelationItem}

    private constructor() {
        this.items = {};
    }

    public static instance(): JsTypeCorrelationQuery {
        return new JsTypeCorrelationQuery();
    }

    public getFilter() {
        return Object.values(this.items).filter(item => item.types.includes(RelationTypes.FILTER));
    }

    public addFilter(key: string, value: any) {
        this.addItem(key, RelationTypes.FILTER, value);
        return this;
    }

    public getCoincidence() {
        return Object.values(this.items).filter(item => item.types.includes(RelationTypes.COINCIDENCE));
    }

    public addCoincidence(key: string) {
        this.addItem(key, RelationTypes.COINCIDENCE, undefined);
        return this;
    }

    private addItem(key: string, type:RelationTypes, value: any) {
        const item = this.items[key];
        if(item == undefined) {
            this.items[key] = new JsTypeCorrelationItem(key, [type], value);
            return;
        }
        item.addType(type);
        item.value = value;
    }

}