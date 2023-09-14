import { MyEnum } from "./MyEnum";

export const PlainStructI: any = {
    id: MyEnum['I'],
    some: "1",
    parent: {
        str: "o_string",
        int: 0,
        bool: false
    },
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}

export const PlainStructI_I: any = {
    id: MyEnum['I'],
    some: 1,
    parent: {
        str: "o_string",
        int: 0,
        bool: false
    },
    childs: []
}

export const PlainStructI_II: any = {
    self: undefined as any
}

export const PlainStructI_III: any = {
    self: undefined as any
}

export const PlainStructII: any = {
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
    parent: {
        str: "o_string",
        int: 0,
        bool: false
    },
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
    parent: {
        str: "o_string",
        int: 0,
        bool: false
    },
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}

export const PlainStructVII: any = {
    untyped: {
        str: "o_string",
        int: 0,
        bool: false
    }
}

export const PlainStructVIII: any = {
    id: MyEnum['I'],
    some: "1",
    parent: false,
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ]
}

export const PlainStructIX: any = {
    id: MyEnum['I'],
    some: "1",
    parent: {
        str: "o_string",
        int: 0,
        bool: false
    },
    childs: [
        {
            str: "o_string",
            int: 0,
            bool: false
        }
    ],
    outOfBoundsField: true
}