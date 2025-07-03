import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { slug } = params;
    const projectPath = path.resolve('src/lib/projects', `${slug}.md`);
    const fileContent = fs.readFileSync(projectPath, 'utf-8');

    const { data, content } = matter(fileContent);
    const html = marked.parse(content);

    return {
        title: data.title,
        date: data.date,
        description: data.description,
        keywords: data.keywords,
        html,
        heroImage: data.heroImage ?? null
    };
}