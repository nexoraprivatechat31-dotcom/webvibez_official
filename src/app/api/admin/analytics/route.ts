import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db/turso";

export async function GET() {
  const analyticsData = {
    overview: {
      totalVisitorsMonth: 14250,
      uniqueInstitutes: 3840,
      totalLeadsMonth: 48,
      conversionRate: "3.4%",
      pipelineValue: "₹18,40,000",
      avgDealVelocity: "4.8 Days",
    },
    funnel: [
      { stage: "Website Visitors", count: 14250, dropoff: "—", percentage: 100 },
      { stage: "Viewed Coaching App Solution", count: 6840, dropoff: "52%", percentage: 48 },
      { stage: "Interacted with 3D Phone & Modules", count: 4120, dropoff: "39%", percentage: 29 },
      { stage: "Opened Consultation Lead Modal", count: 1890, dropoff: "54%", percentage: 13 },
      { stage: "Submitted Phone & Requirement", count: 48, dropoff: "97%", percentage: 3.4 },
    ],
    trafficSources: [
      { source: "Google Organic Search (SEO)", visitors: 8240, percentage: 58, leads: 31 },
      { source: "Direct Navigation & Brand Recall", visitors: 3120, percentage: 22, leads: 10 },
      { source: "Referral (Client Coaching Apps)", visitors: 1850, percentage: 13, leads: 5 },
      { source: "Social & LinkedIn Tech Posts", visitors: 1040, percentage: 7, leads: 2 },
    ],
    topRequestedServices: [
      { name: "Native Android & iOS Coaching App (All-in-One)", share: "45%", demand: "Very High" },
      { name: "Apps on Rent (Zero Upfront / Monthly Subscription)", share: "30%", demand: "High" },
      { name: "CBT Mock Test & Question Paper Engine", share: "15%", demand: "Moderate" },
      { name: "Next.js Custom ERP & Multi-Branch Sync", share: "10%", demand: "Growing" },
    ],
  };

  return NextResponse.json({ success: true, ...analyticsData });
}
