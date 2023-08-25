import { JsTypeCorrelationItem } from "./JsTypeCorrelationItem";
import { RelationTypes } from "./Relationtypes";

export class JsTypeCorrelationQuery {

    private items: { [key:string]: JsTypeCorrelationItem }
    private strictBounds: boolean;

    private constructor() {
        this.items = {};
        this.strictBounds = false;
    }

    public static instance(): JsTypeCorrelationQuery {
        return new JsTypeCorrelationQuery();
    }

    public getFilter(): JsTypeCorrelationItem[] {
        return Object.values(this.items).filter(item => item.types.includes(RelationTypes.FILTER));
    }

    public addFilter(key: string, value: any): JsTypeCorrelationQuery {
        this.addItem(key, RelationTypes.FILTER, value);
        return this;
    }

    /** 
     * @returns The status value of bounds treatment, false by default.
     */
    public isStrictBounds(): boolean {
        return this.strictBounds;
    }

    /** 
     * Changes the status value of bounds treatment to true, the existence of values out of bounds throws an JsTypeError.
     */
    public restrictBounds(): JsTypeCorrelationQuery {
        this.strictBounds = true;
        return this;
    }

    /** 
     * Changes the status value of bounds treatment to false, the values out of bounds are allowed.
     */
    public unrestrictBounds(): JsTypeCorrelationQuery {
        this.strictBounds = false;
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