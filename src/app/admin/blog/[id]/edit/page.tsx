"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ArticleEditorForm from "@/components/admin/ArticleEditorForm";
import { Article } from "@/lib/blog/types";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      const key = localStorage.getItem("webvibez_admin_key");
      if (!key) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch(`/api/blog/articles/${id}`, {
          headers: { "x-admin-key": key },
        });

        if (!res.ok) {
          throw new Error("Article not found or unauthorized");
        }

        const data = await res.json();
        if (data.success && data.article) {
          setArticle(data.article);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Loading article details...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-rose-400 text-sm mb-4">{error || "Article not found"}</p>
        <Link href="/admin/blog" className="text-cyan-400 text-xs font-semibold hover:underline">
          &larr; Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Article</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updating: <span className="text-cyan-300">{article.title}</span>
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <ArticleEditorForm initialArticle={article} isEdit={true} />
    </div>
  );
}
