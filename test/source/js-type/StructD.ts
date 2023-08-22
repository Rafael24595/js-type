import { JsTypeDefine } from '../../../src/module/Decorators';

export class StructD {

    @JsTypeDefine(StructD)
    public self: StructD;

    public constructor(self: StructD) {
        this.self = self;
    };

}