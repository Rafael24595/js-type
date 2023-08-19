import { JsTypeDefine } from '../../src/module/Decorators'
import { MyEnum } from './MyEnum';
import { StructB } from './StructB';

export class StructA {

    @JsTypeDefine(MyEnum)
    public id: MyEnum;
    @JsTypeDefine(Array(StructB))
    public childs: StructB[];

    public constructor(id: MyEnum, childs: StructB[]) {
        this.id = id;
        this.childs = childs;
    };

}