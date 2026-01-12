<?php

return [

    'accepted'             => 'يجب قبول :attribute.',
    'active_url'           => ':attribute ليس رابطًا صالحًا.',
    'after'                => 'يجب أن يكون :attribute تاريخًا بعد :date.',
    'after_or_equal'       => 'يجب أن يكون :attribute تاريخًا مساويًا أو بعد :date.',
    'alpha'                => 'يجب أن يحتوي :attribute على أحرف فقط.',
    'alpha_dash'           => 'يجب أن يحتوي :attribute على أحرف وأرقام وشرطات فقط.',
    'alpha_num'            => 'يجب أن يحتوي :attribute على أحرف وأرقام فقط.',
    'array'                => 'يجب أن يكون :attribute مصفوفة.',
    'before'               => 'يجب أن يكون :attribute تاريخًا قبل :date.',
    'before_or_equal'      => 'يجب أن يكون :attribute تاريخًا مساويًا أو قبل :date.',
    'between'              => [
        'numeric' => 'يجب أن تكون قيمة :attribute بين :min و :max.',
        'file'    => 'يجب أن يكون حجم الملف :attribute بين :min و :max كيلوبايت.',
        'string'  => 'يجب أن يكون طول نص :attribute بين :min و :max حرفًا.',
        'array'   => 'يجب أن يحتوي :attribute على عدد من العناصر بين :min و :max.',
    ],
    'boolean'              => 'يجب أن تكون قيمة :attribute صحيحة أو خاطئة.',
    'confirmed'            => 'تأكيد :attribute غير مطابق.',
    'email'                => 'يجب أن يكون :attribute بريدًا إلكترونيًا صالحًا.',
    'exists'               => ':attribute المحدد غير موجود.',
    'filled'               => ':attribute مطلوب.',
    'gt'                   => [
        'numeric' => 'يجب أن تكون قيمة :attribute أكبر من :value.',
        'file'    => 'يجب أن يكون حجم الملف :attribute أكبر من :value كيلوبايت.',
        'string'  => 'يجب أن يكون طول نص :attribute أكثر من :value حرفًا.',
        'array'   => 'يجب أن يحتوي :attribute على أكثر من :value عناصر.',
    ],
    'gte'                  => [
        'numeric' => 'يجب أن تكون قيمة :attribute أكبر من أو تساوي :value.',
        'file'    => 'يجب أن يكون حجم الملف :attribute أكبر من أو يساوي :value كيلوبايت.',
        'string'  => 'يجب أن يكون طول نص :attribute :value حرفًا على الأقل.',
        'array'   => 'يجب أن يحتوي :attribute على :value عناصر أو أكثر.',
    ],
    'image'                => ':attribute يجب أن يكون صورة.',
    'in'                   => ':attribute غير صالح.',
    'integer'              => 'يجب أن يكون :attribute عددًا صحيحًا.',
    'ip'                   => 'يجب أن يكون :attribute عنوان IP صالحًا.',
    'max'                  => [
        'numeric' => 'يجب ألا تكون قيمة :attribute أكبر من :max.',
        'file'    => 'يجب ألا يكون حجم الملف :attribute أكبر من :max كيلوبايت.',
        'string'  => 'يجب ألا يزيد طول نص :attribute عن :max حرفًا.',
        'array'   => 'يجب ألا يحتوي :attribute على أكثر من :max عناصر.',
    ],
    'min'                  => [
        'numeric' => 'يجب أن تكون قيمة :attribute على الأقل :min.',
        'file'    => 'يجب أن يكون حجم الملف :attribute على الأقل :min كيلوبايت.',
        'string'  => 'يجب أن يكون طول نص :attribute على الأقل :min حرفًا.',
        'array'   => 'يجب أن يحتوي :attribute على الأقل على :min عناصر.',
    ],
    'required'             => 'حقل :attribute مطلوب.',
    'string'               => 'يجب أن يكون :attribute نصًا.',
    'unique'               => ':attribute مستخدم بالفعل.',
    'url'                  => ':attribute صيغة الرابط غير صالحة.',
    // يمكنك إضافة باقي القواعد حسب الحاجة
];
