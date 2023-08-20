import { MyEnum } from "./MyEnum";
import { StructA } from "./StructA";
import { StructC } from "./StructC";
import { StructD } from "./StructD";
import { StructE } from "./StructE";

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

export const PlainStructI_II: StructD = {
    self: undefined as any
}

export const PlainStructI_III: StructD = {
    self: undefined as any
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

export const PlainStructVII: StructE = {
    untyped: {
        str: "o_string",
        int: 0,
        bool: false
    }
}
