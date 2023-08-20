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
         if(!target.jstypes)
            target.jstypes = {};
        target.jstypes[key] = value;
    });
}