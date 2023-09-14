/** 
 * Define the type of the data structure field using JavaScript base objects.
 * @param value Must be one of this entities:
 * - Object: for 'any' type.
 * - String: for 'string' type.
 * - Number: for 'number' type.
 * - Boolean: for 'boolean' type.
 * - Array(T): for vector type of T.
 * - Enum reference for value range.
 * - Structure with one or more fields that implements JsType.
 */
export const JsTypeDefine = (value: Object) => {
     return((target: any, key: string) => {
         if(!target.jstype)
            target.jstype = {
                types: {},
                strict_bounds: false
            };
        target.jstype.types[key] = value;
    });
}

/** 
 * @param value Must be 'boolean' type.
 * 
 * if the value is "true", out of bounds fields will be evaluated,
 * otherwise these fields will be ignored.
 */
export const JsTypeStrictBounds = (value: boolean) => {
    return((target: any) => {
        const constructor = target.prototype
        if(!constructor.jstype)
        constructor.jstype = {
               types: {},
               strict_bounds: false
           };
        constructor.jstype.strict_bounds = value;
   });
}