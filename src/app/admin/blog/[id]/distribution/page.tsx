"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Article, DistributionPlatform, PlatformCapability } from "@/lib/blog/types";
import { PlatformConfig } from "@/lib/distribution/types";

export default function ArticleDistributionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [platforms, setPlatforms] = useState<PlatformConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [distributing, setDistributing] = useState<string | null>(null);
  const [distributeAllLoading, setDistributeAllLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key) {
      router.push("/admin/login");
      return;
    }

    try {
      const [artRes, platRes] = await Promise.all([
        fetch(`/api/blog/articles/${id}`, {
          headers: { "x-admin-key": key },
        }),
        fetch("/api/blog/platforms"),
      ]);

      const artData = await artRes.json();
      const platData = await platRes.json();

      if (artData.success && artData.article) {
        setArticle(artData.article);
      }
      if (platData.success && platData.platforms) {
        setPlatforms(platData.platforms);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load distribution state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handlePublishFirst = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key || !article) return;

    try {
      const res = await fetch(`/api/blog/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({ status: "PUBLISHED" }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDistribute = async (platform: DistributionPlatform) => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key || !article) return;

    setDistributing(platform);
    setError("");

    try {
      const res = await fetch("/api/blog/distribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({
          articleId: article.id,
          platform,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Distribution failed");
      }

      setResults((prev: any) => ({
        ...prev,
        [platform]: data.result,
      }));

      await fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to syndicate to platform");
    } finally {
      setDistributing(null);
    }
  };

  const handleDistributeAll = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key || !article) return;

    setDistributeAllLoading(true);
    setError("");

    try {
      const res = await fetch("/api/blog/distribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({
          articleId: article.id,
          platform: "ALL",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Distribution failed");
      }

      setResults(data.results);
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to syndicate to platforms");
    } finally {
      setDistributeAllLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Loading distribution hub...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-rose-400 text-sm mb-4">Article not found.</p>
        <Link href="/admin/blog" className="text-cyan-400 text-xs font-semibold hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  const isPublishedOnWebVibez = article.status === "PUBLISHED";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Distribution Engine
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-400">Multi-Channel Syndication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {article.title}
          </h1>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Canonical Source Verification Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Primary Canonical Source
              </h2>
            </div>
            <p className="text-xs font-mono text-cyan-300 break-all">
              {article.canonicalUrl}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              All distributed platforms are strictly configured with canonical attribution pointing to this WebVibez URL.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isPublishedOnWebVibez
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              WebVibez: {article.status}
            </span>
            {!isPublishedOnWebVibez && (
              <button
                onClick={handlePublishFirst}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Publish on WebVibez First
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Global Syndication CTA */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Platform Channels</h2>
          <p className="text-xs text-slate-400">
            Publish automatically to developer platforms and editorial databases.
          </p>
        </div>

        <button
          onClick={handleDistributeAll}
          disabled={!isPublishedOnWebVibez || distributeAllLoading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40"
        >
          {distributeAllLoading ? "Distributing to all..." : "⚡ Distribute to All Configured"}
        </button>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {platforms.map((plat) => {
          const record = article.distribution?.[plat.platform];
          const isDistributing = distributing === plat.platform;

          return (
            <div
              key={plat.platform}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white">{plat.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                      record?.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : plat.capability === "MANUAL_REQUIRED"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : plat.isConfigured
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {record?.status || plat.capability}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {plat.description}
                </p>

                {record?.externalUrl && (
                  <div className="mb-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      Live URL:
                    </p>
                    <a
                      href={record.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline font-mono truncate block"
                    >
                      {record.externalUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-4">
                {plat.platform === "MEDIUM" ? (
                  <a
                    href={`https://medium.com/p/import?url=${encodeURIComponent(
                      article.canonicalUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 font-bold text-xs text-center transition-all"
                  >
                    Open Medium Official Import Flow ↗
                  </a>
                ) : (
                  <button
                    onClick={() => handleDistribute(plat.platform)}
                    disabled={
                      !isPublishedOnWebVibez ||
                      !plat.isConfigured ||
                      isDistributing ||
                      distributeAllLoading
                    }
                    className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition-all disabled:opacity-40 disabled:hover:bg-slate-800 disabled:hover:text-slate-200"
                  >
                    {isDistributing
                      ? "Publishing..."
                      : record?.status === "PUBLISHED"
                      ? "Re-sync to " + plat.name
                      : "Publish to " + plat.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
