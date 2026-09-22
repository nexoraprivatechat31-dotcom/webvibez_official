import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Sanitize and clamp parameter lengths to avoid abuse/overflow
    const rawTitle = searchParams.get("title") || "WebVibez Software Developer";
    const rawCategory = searchParams.get("category") || "Custom Software & Mobile Apps";
    const rawTag = searchParams.get("tag") || "Ahmedabad, Gujarat • India";

    const title = rawTitle.slice(0, 110);
    const category = rawCategory.slice(0, 65);
    const tag = rawTag.slice(0, 55);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#060913",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "60px 70px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Top subtle ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "-150px",
              right: "-100px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, rgba(139, 0, 255, 0.15) 50%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              left: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0, 229, 163, 0.15) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Header Branding Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #0066FF 0%, #8B00FF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "24px",
                  fontWeight: "bold",
                  boxShadow: "0 0 25px rgba(0, 102, 255, 0.6)",
                }}
              >
                W
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                  }}
                >
                  WebVibez
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    color: "#38BDF8",
                    textTransform: "uppercase",
                  }}
                >
                  Software Developer &bull; Ahmedabad
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                borderRadius: "30px",
                background: "rgba(0, 102, 255, 0.12)",
                border: "1px solid rgba(0, 102, 255, 0.35)",
                color: "#38BDF8",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00E5A3",
                }}
              />
              {tag}
            </div>
          </div>

          {/* Central Content Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 10,
              maxWidth: "1000px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#94A3B8",
                textTransform: "uppercase",
              }}
            >
              // {category}
            </span>
            <h1
              style={{
                fontSize: "50px",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                lineHeight: 1.15,
                color: "#F8FAFC",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Footer Info Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <span style={{ fontSize: "14px", color: "#94A3B8", fontWeight: 600 }}>
                ⚡ Next.js &amp; Web Portals
              </span>
              <span style={{ fontSize: "14px", color: "#94A3B8", fontWeight: 600 }}>
                📱 React Native Mobile Apps
              </span>
              <span style={{ fontSize: "14px", color: "#94A3B8", fontWeight: 600 }}>
                🔒 Custom Software &amp; Cloud ERP
              </span>
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#38BDF8",
                letterSpacing: "0.5px",
              }}
            >
              webvibez.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OpenGraph image", { status: 500 });
  }
}
