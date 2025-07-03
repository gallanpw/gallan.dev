import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        // fallback: auto detect
        return hljs.highlightAuto(code).value;
    }
}));

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { slug } = params;
    const postPath = path.resolve('src/lib/posts', `${slug}.md`);
    const fileContent = fs.readFileSync(postPath, 'utf-8');

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