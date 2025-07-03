<script>
    export let data;

    // Tambahkan class bootstrap ke elemen hasil render markdown
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    // let parallaxContainer;

    // const updateParallax = () => {
    //     if (parallaxContainer && browser) {
    //         const scrollPos = window.scrollY;
    //         // Anda bisa menyesuaikan angka 0.3 untuk efek yang lebih kuat/lemah
    //         parallaxContainer.style.backgroundPositionY = `${scrollPos * 0.8}px`;
    //     }
    // };
    // window.addEventListener('scroll', updateParallax);
    // // Panggil sekali saat mount untuk posisi awal
    // updateParallax();

    onMount(() => {
        if (browser) {
            // const updateParallax = () => {
            //     if (parallaxContainer) {
            //         const scrollPos = window.scrollY;
            //         // Anda bisa menyesuaikan angka 0.3 untuk efek yang lebih kuat/lemah
            //         parallaxContainer.style.backgroundPositionY = `${scrollPos * 0.3}px`;
            //     }
            // };
            // window.addEventListener('scroll', updateParallax);
            // // Panggil sekali saat mount untuk posisi awal
            // updateParallax();

            // Tambah class pada gambar
            document.querySelectorAll('.markdown-body img').forEach(img => {
                img.classList.add('img-fluid', 'rounded', 'my-4', 'shadow');
            });

            // Tambah class pada code block
            // document.querySelectorAll('.markdown-body pre').forEach(pre => {
            //     pre.classList.add('bg-light', 'p-3', 'rounded', 'overflow-auto');
            // });
            // document.querySelectorAll('.markdown-body code').forEach(code => {
            //     code.classList.add('text-dark');
            // });
            document.querySelectorAll('pre code').forEach(code => {
                // Dapatkan bahasa dari class (misal 'language-js' atau 'language-bash')
                const match = [...code.classList].find(c => c.startsWith('language-'));
                if (match) {
                    // Cek sudah ada badge sebelumnya agar tidak double
                    if (!code.parentElement.querySelector('.language-badge')) {
                        const badge = document.createElement('div');
                        badge.className = 'language-badge position-absolute top-0 end-0 px-2 py-1 text-white text-uppercase rounded-bottom-start small text-monospace';
                        badge.style.background = 'rgba(0,0,0,0.6)';
                        badge.style.fontFamily = 'monospace';
                        badge.textContent = match.replace('language-', '');
                        code.parentElement.style.position = 'relative'; // pastikan pre relative
                        code.parentElement.appendChild(badge);
                    }
                }
            });

            // onDestroy(() => {
            //     // Hapus event listener saat komponen dihancurkan
            //     window.removeEventListener('scroll', updateParallax);
            // });
        }
    });

    // onDestroy(() => {
    //     if (browser) {
    //         // Hapus event listener saat komponen dihancurkan
    //         window.removeEventListener('scroll', updateParallax);
    //     }
    // });

    // Ambil base URL untuk canonical dan Open Graph image
    // Ini bisa diatur sebagai environment variable atau dari svelte.config.js
    const SITE_URL = 'https://gallan.dev'; // Ganti dengan domain Anda
    let fullPageUrl;

    // Untuk memastikan URL lengkap (termasuk slug)
    // SvelteKit menyediakan $page store untuk mendapatkan URL saat ini
    import { page as urlPage } from '$app/stores';
    $: fullPageUrl = $urlPage.url.href; // Reaktif, akan update saat URL berubah
</script>

<svelte:head>
    <title>{data.title} | Gallan Widyanto</title>
    <meta name="title" content={data.title}>
    <meta name="description" content={data.description}>
    {#if data.keywords}
    <meta name="keywords" content={data.keywords}>
    {/if}
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content={data.title}>
    <meta property="og:description" content={data.description}>
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    {#if data.heroImage}
    <meta property="og:image" content={`${SITE_URL}${data.heroImage}`}>
    <meta property="og:image:alt" content={data.title}>
    {/if}
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content={data.title}>
    <meta name="twitter:description" content={data.description}>
    {#if data.heroImage}
    <meta name="twitter:image" content={`${SITE_URL}${data.heroImage}`}>
    {/if}
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

{#if data}
<div class="container mt-5 py-0 px-0 px-md-4 px-xl-5"> <!-- border border-danger -->
    <div class="card bg-white rounded-4 shadow-lg overflow-hidden mx-5">
        {#if data.heroImage}
            <!-- <div class="blog-hero-image" style="background-image: url('{data.heroImage}');" bind:this={parallaxContainer}></div> -->
            <div class="blog-hero-image" style="background-image: url('{data.heroImage}');"></div>
        {/if}
        <div class="card-body p-4 p-md-5">
            <h1 class="card-title display-5 fw-bold mb-4 text-center">{data.title}</h1>
            <div style="text-align: center;"><span class="badge bg-info my-2">On Progress</span></div>
            <!-- <div class="mb-3 text-muted text-center">Published at {data.date}</div> -->
            <p class="text-center text-color-date"><small>Published at {data.date}</small></p>
            <!-- <div class="markdown-body"> {@html data.html} </div> -->
            <article class="markdown-body">
                {@html data.html}
            </article>
        </div>
    </div>
</div>
{:else}
    <h2>Not found.</h2>
{/if}