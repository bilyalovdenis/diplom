export default defineI18nConfig(() => ({
    messages: {
        ru: {
            zodI18n: {
                errors: {
                    invalid_type:
                        "Ожидался тип - {expected}, получено - {received}",
                    invalid_type_received_undefined: "Обязательное поле",
                    invalid_type_received_null: "Обязательное поле",
                    invalid_literal:
                        "Неверное значение литерала, ожидалось {expected}",
                    unrecognized_keys: "Неверные ключи в объекте: {- keys}",
                    invalid_union:
                        "Результаты пересечения не могут быть объединены",
                    invalid_union_discriminator:
                        "Неверное значение дискриминатора. Ожидалось {- options}",
                    invalid_enum_value:
                        "Неверное значение перечисления. Ожидалось {- options}, получено '{received}'",
                    invalid_arguments: "Неверный тип аргументов функции",
                    invalid_return_type:
                        "Неверный тип возвращаемого значения функции",
                    invalid_date: "Неверный формат даты",
                    custom: "Неверный ввод",
                    invalid_intersection_types:
                        "Результаты пересечения не могут быть объединены",
                    not_multiple_of: "Число должно быть кратно {multipleOf}",
                    not_finite: "Число должно быть конечным",
                    invalid_string: {
                        email: "Неверный {validation}",
                        url: "Неверный {validation}",
                        uuid: "Неверный {validation}",
                        cuid: "Неверный {validation}",
                        regex: "Неверное {validation}",
                        datetime: "Неверная {validation}",
                        startsWith:
                            'Неверный формат, должен начинаться с "{startsWith}"',
                        endsWith:
                            'Неверный формат, должен заканчиваться на "{endsWith}"',
                    },
                    too_small: {
                        array: {
                            exact: "Массив должен содержать ровно {minimum} элемента(ов)",
                            inclusive:
                                "Массив должен содержать не менее {minimum} элемента(ов)",
                            not_inclusive:
                                "Массив должен содержать более {minimum} элемента(ов)",
                        },
                        string: {
                            exact: "Строка должна содержать ровно {minimum} символа(ов)",
                            inclusive:
                                "Строка должна содержать не менее {minimum} символа(ов)",
                            not_inclusive:
                                "Строка должна содержать более {minimum} символа(ов)",
                        },
                        number: {
                            exact: "Число должно быть ровно {minimum}",
                            inclusive:
                                "Число должно быть больше или равно {minimum}",
                            not_inclusive: "Число должно быть больше {minimum}",
                        },
                        set: {
                            exact: "Неверный ввод",
                            inclusive: "Неверный ввод",
                            not_inclusive: "Неверный ввод",
                        },
                        date: {
                            exact: "Дата должна быть {- minimum, datetime}",
                            inclusive:
                                "Дата должна быть больше или равна {- minimum, datetime}",
                            not_inclusive:
                                "Дата должна быть больше {- minimum, datetime}",
                        },
                    },
                    too_big: {
                        array: {
                            exact: "Массив должен содержать ровно {maximum} элемента(ов)",
                            inclusive:
                                "Массив должен содержать не более {maximum} элемента(ов)",
                            not_inclusive:
                                "Массив должен содержать менее {maximum} элемента(ов)",
                        },
                        string: {
                            exact: "Строка должна содержать ровно {maximum} символа(ов)",
                            inclusive:
                                "Строка должна содержать не более {maximum} символа(ов)",
                            not_inclusive:
                                "Строка должна содержать менее {maximum} символа(ов)",
                        },
                        number: {
                            exact: "Число должно быть ровно {maximum}",
                            inclusive:
                                "Число должно быть меньше или равно {maximum}",
                            not_inclusive: "Число должно быть меньше {maximum}",
                        },
                        set: {
                            exact: "Неверный ввод",
                            inclusive: "Неверный ввод",
                            not_inclusive: "Неверный ввод",
                        },
                        date: {
                            exact: "Дата должна быть {- maximum, datetime}",
                            inclusive:
                                "Дата должна быть меньше или равна {- maximum, datetime}",
                            not_inclusive:
                                "Дата должна быть меньше {- maximum, datetime}",
                        },
                    },
                },
                validations: {
                    email: "Email",
                    url: "URL",
                    uuid: "UUID",
                    cuid: "CUID",
                    regex: "регулярное выражение",
                    datetime: "дата и время",
                },
                types: {
                    function: "функция",
                    number: "число",
                    string: "строка",
                    nan: "NaN",
                    integer: "целое число",
                    float: "число с плавающей точкой",
                    boolean: "булево значение",
                    date: "дата",
                    bigint: "bigint",
                    undefined: "undefined",
                    symbol: "символ",
                    null: "null",
                    array: "массив",
                    object: "объект",
                    unknown: "unknown",
                    promise: "promise",
                    void: "void",
                    never: "never",
                    map: "хеш-таблица",
                    set: "множество",
                },
            },
        },
    },
}));
