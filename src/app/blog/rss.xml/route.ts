import { NextResponse } from "next/server";
import { BlogRepository } from "@/lib/blog/repository";
import { Article } from "@/lib/blog/types";

export async function GET() {
  const allPublished = await BlogRepository.getPublishedArticles();
  const articles = allPublished.filter((a: Article) => !a.language || a.language === "en");
  const baseUrl = "https://www.webvibez.com";

  const feedItems = articles
    .map(
      (a: Article) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${baseUrl}/blog/${a.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${a.slug}</guid>
      <description><![CDATA[${a.description || a.excerpt}]]></description>
      <pubDate>${new Date(a.publicationDate).toUTCString()}</pubDate>
      <category><![CDATA[${a.category}]]></category>
      <author><![CDATA[${a.author.name}]]></author>
    </item>
  `
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WebVibez Engineering &amp; Technology Blog</title>
    <link>${baseUrl}/blog</link>
    <description>In-depth technical articles on software development, mobile architectures, and scalable business systems.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
