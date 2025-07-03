<script>
    export let data;
    const { certificates } = data;

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
    <title>Certificate | Gallan Widyanto</title>
    <meta name="title" content="Certificate Page Gallan Widyanto">
    <meta name="description" content="This page is a certificate page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="keywords" content="blog, writing, website, developer, backend, fullstack, programmer, gallan.dev, gallan widyanto, gallanpw">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content="Certificate Page Gallan Widyanto">
    <meta property="og:description" content="This page is a certificate page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Certificate Page Gallan Widyanto">
    <meta name="twitter:description" content="This page is a certificate page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

<div class="container my-5 px-0 px-md-4 px-xl-5">
    <h2 class="text-center">My Certificates</h2>
    <p class="mb-5 text-center">"A collection of my achievements and skills."</p>
    <div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center mx-5">
        {#each certificates as cert}
            <div class="col mb-4">
                <div class="card h-100 shadow hover-lift-shadow rounded-4 overflow-hidden">
                    {#if cert.thumbnail}
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" class="card-img-top-wrapper">
                            <img src={cert.thumbnail} class="card-img-top" alt={cert.title} style="object-fit: cover; height: 180px;">
                        </a>
                    {/if}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" class="text-decoration-none text-dark">{cert.title}</a>
                        </h5>
                        <p class="card-text text-color-date"><small>Issued {cert.date}</small></p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>