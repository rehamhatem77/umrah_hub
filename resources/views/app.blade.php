<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- <title inertia>{{ config('app.name', 'Laravel') }}</title> --}}

        {{-- <title>عمرة هَب - بوابتك الذكية لإدارة رحلات العمرة باحترافية وسهولة</title> --}}
        

<meta name="application-name" content="عمرة هَب">

<title inertia>{{ $page['props']['meta']['title'] ?? 'عمرة هَب - بوابتك الذكية لإدارة رحلات العمرة' }}</title>

<meta property="og:type" content="website">

<meta property="og:title"
      content="{{ $page['props']['meta']['title'] ?? 'عمرة هَب - بوابتك الذكية لإدارة رحلات العمرة' }}">

<meta property="og:description"
      content="{{ $page['props']['meta']['description'] ?? 'أفضل نظام لإدارة رحلات العمرة' }}">

<meta property="og:image"
      content="{{ $page['props']['meta']['image'] ?? asset('images/preview.jpg') }}">

<meta property="og:url"
      content="{{ $page['props']['meta']['url'] ?? url()->current() }}">

<meta property="twitter:card" content="summary_large_image">

<meta property="twitter:title"
      content="{{ $page['props']['meta']['title'] ?? 'عمرة هَب' }}">

<meta property="twitter:description"
      content="{{ $page['props']['meta']['description'] ?? 'أفضل نظام لإدارة رحلات العمرة' }}">

<meta property="twitter:image"
      content="{{ $page['props']['meta']['image'] ?? asset('images/preview.jpg') }}">


        <link rel="icon" type="image/svg+xml" href="/fav.png">
        <link rel="alternate icon" href="/fav.png">
        <link rel="apple-touch-icon" href="/fav.png">
        <meta name="theme-color" content="#2563eb">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
