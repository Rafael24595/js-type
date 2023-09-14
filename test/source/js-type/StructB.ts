import { JsTypeDefine } from "../../../src/module/Decorators";
import { JsType } from "../../../src/module/JsType";

export class StructB extends JsType {
    
    @JsTypeDefine(String)
    public str: string;
    @JsTypeDefine(Number)
    public int: number;
    @JsTypeDefine(Boolean)
    public bool: boolean;

    public constructor(str: string, int: number, bool: boolean) {
        super();
        this.str = str;
        this.int = int;
        this.bool = bool;
    };

}