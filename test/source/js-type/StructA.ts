import { JsTypeDefine, JsTypeStrictBounds } from '../../../src/module/Decorators'
import { JsType } from '../../../src/module/JsType';
import { MyEnum } from './MyEnum';
import { StructB } from './StructB';

@JsTypeStrictBounds(true)
export class StructA extends JsType {

    @JsTypeDefine(MyEnum)
    public id: MyEnum;
    @JsTypeDefine(Object)
    public some: any;
    @JsTypeDefine(StructB)
    public parent: StructB;
    @JsTypeDefine(Array(StructB))
    public childs: StructB[];

    public constructor(id: MyEnum, some: any, parent: StructB, childs: StructB[]) {
        super();
        this.id = id;
        this.some = some;
        this.parent = parent;
        this.childs = childs;
    };

}