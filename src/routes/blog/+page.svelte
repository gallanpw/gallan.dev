<script>
    export let data;
    let { posts, page, totalPages } = data;

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
    <title>Blog | Gallan Widyanto</title>
    <meta name="title" content="Blog Post Gallan Widyanto">
    <meta name="description" content="This page is a blog post from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="keywords" content="blog, writing, website, developer, backend, fullstack, programmer, gallan.dev, gallan widyanto, gallanpw">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content="Blog Post Gallan Widyanto">
    <meta property="og:description" content="This page is a blog post from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Blog Post Gallan Widyanto">
    <meta name="twitter:description" content="This page is a blog post from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

<div class="container my-5 px-0 px-md-4 px-xl-5"> <!-- border border-danger -->
    <h2 class="text-center">Blog Posts</h2>
    <p class="mb-5 text-center">"Coding, work, life, and whatever i want."</p>
    <div class="row g-4 justify-content-center mx-5">
        {#each posts as post}
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow hover-lift-shadow">
                    {#if post.thumbnail}
                        <a href={`/blog/${post.slug}`} class="card-img-top-wrapper">
                            <img src={post.thumbnail} class="card-img-top" alt={post.title} style="object-fit: cover; height: 180px;">
                        </a>
                    {/if}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            <a href={`/blog/${post.slug}`} class="text-decoration-none text-dark">
                                {post.title}
                                <br/>
                                <span class="badge bg-info mt-2">On Progress</span>
                            </a>
                        </h5>
                        <p class="card-text text-color-date"><small>{post.date}</small></p>
                        <!-- <a class="btn btn-outline-dark mt-auto" href={`/blog/${post.slug}`}>Read More</a> -->
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Pagination -->
    {#if totalPages > 1}
        <nav>
            <ul class="pagination justify-content-center">
                {#if page > 1}
                    <li class="page-item">
                        <a class="page-link" href={`/blog?page=${page - 1}`}>Previous</a>
                    </li>
                {/if}
                {#each Array(totalPages) as _, i}
                    <li class="page-item {page === i+1 ? 'active' : ''}">
                        <a class="page-link" href={`/blog?page=${i+1}`}>{i+1}</a>
                    </li>
                {/each}
                {#if page < totalPages}
                    <li class="page-item">
                        <a class="page-link" href={`/blog?page=${page + 1}`}>Next</a>
                    </li>
                {/if}
            </ul>
        </nav>
    {/if}
</div>