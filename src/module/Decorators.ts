export const JsTypeDefine = (value: Object) => {
     return((target: any, key: string) => {
         if(!target.jstypes)
            target.jstypes = {}
        target.jstypes[key] = value;
    });
}