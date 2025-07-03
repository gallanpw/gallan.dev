import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.resolve('src/lib/posts');
const PER_PAGE = 12;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    // Pagination
    const page = parseInt(url.searchParams.get('page')) || 1;

    // Ambil semua file .md di folder posts
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

    // Baca & parsing frontmatter semua post
    const posts = files.map(filename => {
        const fileContent = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
        const { data } = matter(fileContent);
        const slug = filename.replace(/\.md$/, '');
        return {
            slug,
            title: data.title,
            date: data.date,
            thumbnail: data.thumbnail ?? null
        };
    })
    // Urutkan terbaru dulu
    .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination logic
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / PER_PAGE);
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const paginatedPosts = posts.slice(start, end);

    return {
        posts: paginatedPosts,
        page,
        totalPages
    };
}