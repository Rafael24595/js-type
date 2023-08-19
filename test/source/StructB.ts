import { JsTypeDefine } from "../../src/module/Decorators";

export class StructB {
    
    @JsTypeDefine(String)
    public str: string;
    @JsTypeDefine(Number)
    public int: number;
    @JsTypeDefine(Boolean)
    public bool: boolean;

    public constructor(str: string, int: number, bool: boolean) {
        this.str = str;
        this.int = int;
        this.bool = bool;
    };

}