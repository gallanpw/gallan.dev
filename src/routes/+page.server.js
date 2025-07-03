import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function loadMarkdownFiles(folder) {
    const dir = path.resolve(`src/lib/${folder}`);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    return files.map(filename => {
        const fullPath = path.join(dir, filename);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(content);
        const slug = filename.replace(/\.md$/, '');
        return { slug, title: data.title ?? slug, date: data.date ?? null, thumbnail: data.thumbnail ?? null };
    }).sort((a, b) => (b.date && a.date ? new Date(b.date) - new Date(a.date) : 0));
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const blogs = loadMarkdownFiles('posts').slice(0, 2);      // 2 blog terbaru
    const projects = loadMarkdownFiles('projects').slice(0, 2); // 2 project terbaru

    return {
        blogs,
        projects
    };
}
