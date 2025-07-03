<script>
    // Ambil base URL untuk canonical dan Open Graph image
    // Ini bisa diatur sebagai environment variable atau dari svelte.config.js
    const SITE_URL = 'https://gallan.dev'; // Ganti dengan domain Anda
    let fullPageUrl;

    // Untuk memastikan URL lengkap (termasuk slug)
    // SvelteKit menyediakan $page store untuk mendapatkan URL saat ini
    import { page as urlPage } from '$app/stores';
    $: fullPageUrl = $urlPage.url.href; // Reaktif, akan update saat URL berubah

    // --- Path ke file resume PDF di direktori static ---
    const resumePdfPath = '/resume-gallan.pdf'; // Path ke PDF lokal

    // Untuk "View in native" dan "Download file"
    const resumeNativeViewUrl = resumePdfPath; // Browser akan menanganinya
    const resumeDownloadUrl = resumePdfPath; // Browser akan memicu download

    import { onMount } from 'svelte';
    let PdfViewer;
    let isClient = false;

    onMount(async () => {
        const { default: LoadedPdfViewer } = await import('$lib/components/PdfViewer.svelte');
        PdfViewer = LoadedPdfViewer;
        isClient = true;
    });
</script>

<svelte:head>
    <title>Resume | Gallan Widyanto</title>
    <meta name="title" content="Resume Page Gallan Widyanto">
    <meta name="description" content="This page is a resume page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="keywords" content="blog, writing, website, developer, backend, fullstack, programmer, gallan.dev, gallan widyanto, gallanpw">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content="Resume Page Gallan Widyanto">
    <meta property="og:description" content="This page is a resume page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Resume Page Gallan Widyanto">
    <meta name="twitter:description" content="This page is a resume page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

<div class="container my-5 px-0 px-md-4 px-xl-5">
    <h2 class="text-center mb-4">My Resume</h2>

    <div class="d-flex justify-content-center gap-3 mb-4">
        <a href={resumeNativeViewUrl} target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary">
            View in Native
        </a>
        <a href={resumeDownloadUrl} download="resume-gallan.pdf" class="btn btn-outline-success">
            Download File
        </a>
    </div>

    <div class="card bg-white rounded-4 shadow-lg overflow-hidden mx-auto" style="max-width: 900px;">
        {#if isClient && PdfViewer}
            <PdfViewer fileUrl={resumePdfPath} maxWidth={900} />
        {:else}
            <div style="height: 800px; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0;">
                <p>Loading resume viewer...</p>
            </div>
        {/if}
    </div>
</div>