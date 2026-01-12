import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    // theme: {
    //     extend: {
    //         fontFamily: {
    //             sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    //         },
    //     },
    // },

     theme: {
        extend: {
            colors: {
                app: {
                    bg: 'var(--app-bg)',
                    surface: 'var(--app-surface)',
                    text: 'var(--app-text)',
                    primary: 'var(--app-primary)',
                },
            },
        },
    },

    plugins: [forms],
};
