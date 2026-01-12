<?php

use Illuminate\Support\Str;

if (! function_exists('seo')) {
    function seo($model, ?string $fallbackTitle = null): array
    {
        return [
            'title' => $model->seo_title
                ?? $fallbackTitle
                ?? ($model->title ?? config('app.name')),

            'description' => $model->seo_description
                ?? 'أفضل عروض العمرة والحج من شركات معتمدة داخل مصر',

            'image' => $model->seo_image
                ?? asset('images/default-og.jpg'),
        ];
    }
}

if (! function_exists('whatsapp_link')) {
    function whatsapp_link(string $number, ?string $text = null): string
    {
        $message = $text ? urlencode($text) : '';
        return "https://wa.me/{$number}?text={$message}";
    }
}
