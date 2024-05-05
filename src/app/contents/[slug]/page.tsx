import styles from "@/app/contents/[slug]/page.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@/highlight-js/github-dark.css";
import Image from "next/image";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

const options: any = {
  mdxOptions: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      rehypeSlug,
      rehypeHighlight,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [styles.anchor],
          },
        },
      ],
    ],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("contents"));
  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  return paths;
}

function getContent({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("contents", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    slug,
    content,
  };
}

export async function generateMetadata({ params }: any) {
  const content = getContent(params);
  return {
    title: content.frontMatter.title,
    description: content.frontMatter.description,
    openGraph: {
      title: content.frontMatter.title,
      description: content.frontMatter.description,
      url: `https://localhost:3000/contents/${content.slug}`,
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default function Post({ params }: any) {
  const props = getContent(params);

  return (
    <article>
      <div>
        <div>{props.frontMatter.date}</div>
        <div>{props.frontMatter.tag}</div>
      </div>
      <h1>{props.frontMatter.title}</h1>
      <p>{props.frontMatter.description}</p>
      <div className={styles.content}>
        <MDXRemote source={props.content} options={options} />
      </div>
    </article>
  );
}
