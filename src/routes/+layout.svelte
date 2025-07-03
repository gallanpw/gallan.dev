<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../app.css';

    // Import $page store untuk mendapatkan URL saat ini
    import { page } from '$app/stores';
    import { theme } from '$lib/stores/themeStore';
  
    // Buat reactive state nav collapsed
    let isNavCollapsed = true;

    function toggleNav() {
        isNavCollapsed = !isNavCollapsed;
    }

    // Fungsi untuk memeriksa apakah link adalah link aktif
    // Perhatikan bahwa untuk "Home" (/) kita perlu penanganan khusus
    function isActive(path) {
        // Untuk root path '/', kita pastikan hanya aktif jika pathname persis '/'
        if (path === '/') {
            return $page.url.pathname === '/';
        }
        // Untuk path lainnya, cek apakah pathname dimulai dengan path tersebut
        return $page.url.pathname.startsWith(path);
    }

    // Fungsi untuk mengganti tema
    function toggleTheme() {
        theme.update(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
    }

    // Tambahkan import highlight.js secara kondisional atau gunakan <svelte:head>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let hljsLightLink;
    let hljsDarkLink;

    onMount(() => {
        if (browser) {
            // Buat elemen link untuk stylesheet light mode
            hljsLightLink = document.createElement('link');
            hljsLightLink.rel = 'stylesheet';
            hljsLightLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai-sublime.min.css';
            document.head.appendChild(hljsLightLink);

            // Buat elemen link untuk stylesheet dark mode (contoh: atom-one-dark)
            hljsDarkLink = document.createElement('link');
            hljsDarkLink.rel = 'stylesheet';
            hljsDarkLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css';
            hljsDarkLink.disabled = true; // Nonaktifkan secara default
            document.head.appendChild(hljsDarkLink);

            // Perhatikan perubahan tema dan aktifkan/nonaktifkan stylesheet
            const unsubscribe = theme.subscribe(currentTheme => {
                if (currentTheme === 'dark') {
                    hljsLightLink.disabled = true;
                    hljsDarkLink.disabled = false;
                } else {
                    hljsLightLink.disabled = false;
                    hljsDarkLink.disabled = true;
                }
            });

            // Cleanup saat komponen dihancurkan
            return () => {
                unsubscribe();
                document.head.removeChild(hljsLightLink);
                document.head.removeChild(hljsDarkLink);
            };
        }
    });
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-3">
    <div class="container px-0 px-md-4 px-xl-5">
        <a class="navbar-brand brand-hover mx-5 logo-font-imperial-script" href="/">Gallan Widyanto</a> <!-- border border-danger -->
        <button class="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="{!isNavCollapsed}" aria-label="Toggle navigation" onclick={toggleNav} >
            <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class={"collapse navbar-collapse" + (isNavCollapsed ? "" : " show")} id="navbarNav">
            <ul class="navbar-nav ms-auto mx-5"> <!-- border border-danger -->
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/')} href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/blog')} href="/blog">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/project')} href="/project">Project</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/certificate')} href="/certificate">Certificate</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/resume')} href="/resume">Resume</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={isActive('/about')} href="/about">About</a>
                </li>
                <li class="nav-item ms-lg-2">
                    <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 mt-1" style="border: none; font-size: 1rem;" onclick={toggleTheme} aria-label="Toggle Dark Mode">
                        {#if $theme === 'dark'}
                            <i class="fa-solid fa-moon"></i> Dark
                        {:else}
                            <i class="fa-solid fa-sun"></i> Light
                        {/if}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</nav>

<slot />

<footer class="footer bg-light py-4 text-center">
    <div class="container">
        <p class="mb-1"> &copy; { new Date().getFullYear() } Gallan Widyanto. All rights reserved. </p>
        <p> Designed by <a href="https://svelte.dev/docs/kit/introduction"> SvelteKit </a> and <a href="https://getbootstrap.com/"> Bootstrap CSS </a> with ☕️ and ❤️ </p>
    </div>
</footer>