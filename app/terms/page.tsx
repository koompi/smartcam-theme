import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { notFound } from "next/navigation";
import "@/styles/markdown-styles.css";

// This is a server component by default in Next.js app directory
export default async function TermsConditionPage() {
  // Read the Markdown file from the content directory
  const filePath = path.join(
    process.cwd(),
    "contents",
    "tmers_and_condition.md"
  );
  const content = fs.readFileSync(filePath, "utf-8");

  if (!content) {
    notFound(); // Handle missing services
  }

  return (
    <section className="container mx-auto max-w-4xl py-9 sm:py-9 lg:py-20 px-6">
      <div className="markdown">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown (GFM)
          rehypePlugins={[rehypeRaw, rehypeSanitize]} // Allow and sanitize raw HTML in Markdown
        />
      </div>
    </section>
  );
}
