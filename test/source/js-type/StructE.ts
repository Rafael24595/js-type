import { JsTypeDefine } from '../../../src/module/Decorators';
import { JsType } from '../../../src/module/JsType';
import { StructC } from './StructC';

export class StructE extends JsType {

    @JsTypeDefine(StructC)
    public untyped: StructC;

    public constructor(untyped: StructC) {
        super();
        this.untyped = untyped;
    }

}