<script>
    // Ambil base URL untuk canonical dan Open Graph image
    // Ini bisa diatur sebagai environment variable atau dari svelte.config.js
    const SITE_URL = 'https://gallan.dev'; // Ganti dengan domain Anda
    let fullPageUrl;

    // Untuk memastikan URL lengkap (termasuk slug)
    // SvelteKit menyediakan $page store untuk mendapatkan URL saat ini
    import { page as urlPage } from '$app/stores';
    $: fullPageUrl = $urlPage.url.href; // Reaktif, akan update saat URL berubah

    // Path ke foto Anda di direktori static
    const photoPath = '/photo-gallan.jpg';

    // Link media sosial Anda
    const socialLinks = [
        { name: 'Email', url: 'mailto:gallan.widyanto@gmail.com', icon: 'fa-regular fa-envelope' },
        { name: 'GitHub', url: 'https://github.com/gallanpw', icon: 'fa-brands fa-github' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gallanpw/', icon: 'fa-brands fa-linkedin' },
        { name: 'X / Twitter', url: 'https://x.com/gallanpw', icon: 'fa-brands fa-twitter' },
        { name: 'Telegram', url: 'https://t.me/gallanpw', icon: 'fa-brands fa-telegram' }
    ];
</script>

<svelte:head>
    <title>About | Gallan Widyanto</title>
    <meta name="title" content="About Page Gallan Widyanto">
    <meta name="description" content="This page is a about page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="keywords" content="blog, writing, website, developer, backend, fullstack, programmer, gallan.dev, gallan widyanto, gallanpw">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gallan Widyanto">
    <link rel="canonical" href={fullPageUrl}>

    <meta property="og:title" content="About Page Gallan Widyanto">
    <meta property="og:description" content="This page is a about page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta property="og:url" content={fullPageUrl}>
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gallan Widyanto's Portfolio & Blog">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="About Page Gallan Widyanto">
    <meta name="twitter:description" content="This page is a about page from Gallan Widyanto, now you see coding, work, writing, activities, life, and anything I do with love.">
    <meta name="twitter:creator" content="@gallanpw">
</svelte:head>

<div class="container mt-5 py-0 px-0 px-md-4 px-xl-5">
    <h2 class="text-center">About Me</h2>
    <p class="mb-5 text-center">"If you're strong enough, go for it; if not, just chill with a coffee. ☕"</p>
    <div class="card bg-white rounded-4 shadow-lg p-4 mx-5">
        <div class="about-content">
            <div class="left-column">
                <div class="photo-container mb-4">
                    <!-- <img src={photoPath} alt="Gallan Widyanto" class="profile-photo" /> -->
                    <img src="https://res.cloudinary.com/gallanpw/image/upload/v1755070157/jr5hya3oqxdajsfih4qc.jpg" alt="Gallan Widyanto" class="profile-photo" />
                </div>
                <h3 class="text-center">Gallan Probo Widyanto</h3>
                <h6 class="text-color-date">Software Developer</h6>
                <div class="social-links d-flex justify-content-center gap-4">
                    {#each socialLinks as link}
                        <a href={link.url} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="{link.name}" title="{link.name}">
                            <i class="{link.icon}"></i>
                        </a>
                    {/each}
                </div>
            </div>

            <div class="right-column">
                <p class="lead">
                    Hi! I'm Gallan, a passionate <strong> Software Developer </strong> with a focus on <strong> Backend </strong> and <strong> Frontend </strong> development. I love learning new things and building efficient solutions. Here you can find information about my work experience, projects and interests.
                </p>
                <p class="lead">🔧 Tech stack I use</p>
                <ul class="lead">
                    <li>Backend: ExpressJS, HapiJS, Laravel, CodeIgniter</li>
                    <li>Frontend: Svelte, SvelteKit, Bootstrap CSS, Tailwind CSS</li>
                    <li>Database: MySQL, PostgreSQL, MongoDB, Redis</li>
                    <li>DevOps: Git, Docker, CI/CD</li>
                    <li>Deployment: DigitalOcean, Fly.io, Vercel, Netlify, Render</li>
                    <li>Testing: Jest, Cypress, Selenium</li>
                    <li>Version Control: GitHub, GitLab, Bitbucket</li>
                    <li>Management Tools: Jira, Confluence, Notion, ClickUp, Trello</li>
                    <li>Other: RESTful APIs, JWT/Auth, Postman, Swagger</li>
                </ul>
                <p class="lead">
                    Aside from coding, I also love reading books, learning new things, and exploring the latest technologies. I am always looking for new challenges and opportunities to grow as a developer. Feel free to connect with me on social media on the side!
                </p>
            </div>
        </div>
    </div>
</div>