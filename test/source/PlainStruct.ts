import { MyEnum } from "./MyEnum";
import { StructA } from "./StructA";
import { StructC } from "./StructC";

export const PlainStructI: StructA = {
    id: MyEnum['I'],
    some: "1",
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}

export const PlainStructI_I: StructA = {
    id: MyEnum['I'],
    some: 1,
    childs: []
}

export const PlainStructII: StructC = {
    str: "o_string",
    int: 0,
    bool: false
}

export const PlainStructIII: any = {
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}

export const PlainStructIV: any = {
    id: MyEnum['I'],
    childs: {
        1: {
            str: "o_string",
            int: 0,
            bool: false
        }
    }
}

export const PlainStructV: any = {
    str: "o_string",
    int: 0,
    bool: "false"
}

export const PlainStructVI: any = {
    id: "Not-Found",
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}