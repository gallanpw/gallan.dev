import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Fungsi untuk mendapatkan preferensi sistem atau dari localStorage
function getInitialTheme() {
    if (browser) {
        // Cek localStorage terlebih dahulu
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Jika tidak ada di localStorage, cek preferensi sistem
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light'; // Default jika tidak ada preferensi atau di server
}

const initialTheme = getInitialTheme();

// Buat writable store
export const theme = writable(initialTheme);

// Subscribe ke perubahan store dan simpan ke localStorage
theme.subscribe((value) => {
    if (browser) {
        localStorage.setItem('theme', value);
        // Tambahkan atau hapus class 'dark-mode' pada <body>
        if (value === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }
});