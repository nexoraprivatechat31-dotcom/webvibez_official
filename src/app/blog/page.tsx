import React from "react";
import { BlogRepository } from "@/lib/blog/repository";
import BlogClient from "./BlogClient";
import { Article } from "@/lib/blog/types";

export const revalidate = 60; // Incremental static regeneration

export default async function BlogIndexPage() {
  let articles: Article[] = [];
  try {
    articles = await BlogRepository.getPublishedArticles();
  } catch (err) {
    console.error("Failed to load published articles for server pre-render:", err);
  }

  return <BlogClient initialArticles={articles} />;
}
