export const SINGLE_PARAMETER_DEFINITION = {
    name: "param-I",
    force: true,
    type: "A"
}

export const SINGLE_PARAMETER_IMPLEMENTATION = {
    name: "param-I",
    value: "TAB"
}

export const SINGLE_PARAMETER_DEFINITION_SUB = {
    name: "param-I",
    force: true,
    type: "A",
    child: {
        name: "sub-param-I",
        is_child: true
    }
}

export const SINGLE_PARAMETER_IMPLEMENTATION_SUB = {
    name: "param-I",
    value: "TAB",
    child: {
        name: "sub-param-I",
        value: "SUB-TAB-I"
    }
}

export const SINGLE_PARAMETER_IMPLEMENTATION_SUB_ERROR_I = {
    name: "param-I",
    value: "TAB",
    child: false
}

export const VECTOR_PARAMETER_DEFINITION = [
    {
        name: "param-I",
        force: true,
        type: "A"
    },
    {
        name: "param-IV",
        force: true,
        type: "A"
    },
    {
        name: "param-II",
        force: false,
        type: "A"
    },
    {
        name: "param-III",
        force: true,
        type: "B"
    },
    {
        name: "param-V",
        force: true,
        type: "C"
    }
]

export const VECTOR_PARAMETER_IMPLEMENTATION = [
    {
        name: "param-I",
        value: "TABI"
    },
    {
        name: "param-II",
        value: "TABII"
    },
    {
        name: "param-IV",
        value: "TABIV"
    },
    {
        name: "param-III",
        value: "TABIII"
    }
]