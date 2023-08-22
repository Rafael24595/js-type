import { JsTypeDefine } from '../../../src/module/Decorators';
import { StructC } from './StructC';

export class StructE {

    @JsTypeDefine(StructC)
    public untyped: StructC;

    public constructor(untyped: StructC) {
        this.untyped = untyped;
    }

}