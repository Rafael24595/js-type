import { JsType } from "../../../src/module/JsType";

export class StructC extends JsType {
    
    public str: string;
    public int: number;
    public bool: boolean;

    public constructor(str: string, int: number, bool: boolean) {
        super();
        this.str = str;
        this.int = int;
        this.bool = bool;
    };

}