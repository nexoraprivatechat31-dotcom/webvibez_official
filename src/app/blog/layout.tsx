import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | WebVibez Blog",
    default: "WebVibez Blog | Software Development, Mobile Apps & Tech Insights",
  },
  description:
    "In-depth guides, technical architecture insights, and software development best practices from the engineers at WebVibez.",
  openGraph: {
    title: "WebVibez Engineering & Technology Blog",
    description:
      "Explore articles on Next.js, React Native, custom business software, mobile app development costs, and educational tech platforms.",
    url: "https://webvibez.com/blog",
    siteName: "WebVibez",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebVibez Blog",
    description:
      "In-depth engineering guides, mobile app cost breakdowns, and tech architecture insights.",
  },
  alternates: {
    canonical: "https://webvibez.com/blog",
    types: {
      "application/rss+xml": "https://webvibez.com/blog/rss.xml",
    },
  },
};

import PageWrapper from "@/components/layout/PageWrapper";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
