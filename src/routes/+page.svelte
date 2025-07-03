<script> 
    export let data;
    const { blogs, projects } = data;

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
    <title>Home | Gallan Widyanto</title>
    <meta name="title" content="Home Page Gallan Widyanto">
    <meta name="description" content="This page is a home page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="keywords" content="blog, writing, website, developer, backend, fullstack, programmer, gallan.dev, gallan widyanto, gallanpw">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content="Home Page Gallan Widyanto">
    <meta property="og:description" content="This page is a home page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Home Page Gallan Widyanto">
    <meta name="twitter:description" content="This page is a home page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

<div class="container py-5 px-0 px-md-4 px-xl-5">
    <!-- Welcome Message -->
    <section class="card mb-5 mx-5 p-4 rounded-4 shadow-lg"> <!-- border border-danger -->
        <div class="col-lg-8 mx-auto text-center">
            <h1>Hi 👋, I'm Gallan!</h1>
            <p class="lead community-link">
                I am currently working as a freelance <strong>Software Developer</strong> with experience as a <strong>Backend Developer</strong>, <strong>Full Stack Developer</strong>, and <strong>Software Quality Assurance</strong>.<br/><br/>
                I am very passionate about exploring modern backend technologies, including API development, databases, and scalable service architectures. In addition, I actively contribute as an IT community administrator at <strong><a href="https://t.me/surabayapy"> Surabaya.py </a></strong> and <strong><a href="https://t.me/isqa_surabaya"> ISQA Chapter Surabaya </a></strong>, where I continue to learn and share knowledge.<br/><br/>
                If you have found me on the internet, let's explore my work and writings.
            </p>
            <div class="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                <a href="/blog" class="btn btn-outline-primary">Read my blog</a>
                <a href="/about" class="btn btn-outline-secondary">Learn more about me</a>
                <a href="/project" class="btn btn-outline-success">See my portfolio</a>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="mb-5 mx-5"> <!-- border border-primary -->
        <h2 class="mb-4 text-center">Latest Projects</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
            {#each projects as project}
                <div class="col">
                    <div class="card h-100 shadow-lg border-0 rounded-4 overflow-hidden hover-lift-shadow">
                        {#if project.thumbnail}
                            <a href={`/project/${project.slug}`} class="card-img-top-wrapper">
                                <img src={project.thumbnail} class="card-img-top" alt={project.title} style="object-fit: cover; height: 180px;">
                            </a>
                        {/if}
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2">
                                <a href={`/project/${project.slug}`} class="text-decoration-none text-dark">
                                    {project.title}
                                    <br/>
                                    <span class="badge bg-info mt-2">On Progress</span>
                                </a>
                            </h5>
                            {#if project.date}
                                <p class="card-text text-color-date"><small>{project.date}</small></p>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Blog Section -->
    <section class="mb-5 mx-5"> <!-- border border-primary -->
        <h2 class="mb-4 text-center">Latest Blog</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
            {#each blogs as blog}
                <div class="col">
                    <div class="card h-100 shadow-lg border-0 rounded-4 overflow-hidden hover-lift-shadow">
                        {#if blog.thumbnail}
                            <a href={`/blog/${blog.slug}`} class="card-img-top-wrapper">
                                <img src={blog.thumbnail} class="card-img-top" alt={blog.title} style="object-fit: cover; height: 180px;">
                            </a>
                        {/if}
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2">
                                <a href={`/blog/${blog.slug}`} class="text-decoration-none text-dark">
                                    {blog.title}
                                    <br/>
                                    <span class="badge bg-info mt-2">On Progress</span>
                                </a>
                            </h5>
                            {#if blog.date}
                                <p class="card-text text-color-date"><small>{blog.date}</small></p>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>