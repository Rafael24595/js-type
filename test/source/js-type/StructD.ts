import { JsTypeDefine } from '../../../src/module/Decorators';
import { JsType } from '../../../src/module/JsType';

export class StructD extends JsType {

    @JsTypeDefine(StructD)
    public self: StructD;

    public constructor(self: StructD) {
        super();
        this.self = self;
    };

}