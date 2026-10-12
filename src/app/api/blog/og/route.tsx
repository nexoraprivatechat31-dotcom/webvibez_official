import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "WebVibez Software Engineering";
    const category = searchParams.get("category") || "Custom Software & Technology";
    const author = searchParams.get("author") || "Rudram Joshi • Lead Architect";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#030712",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "60px 80px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.20) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Top Bar: Brand & Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                W
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}
              >
                WEBVIBEZ
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#60a5fa",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {category}
            </div>
          </div>

          {/* Middle: Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "auto",
              marginBottom: "auto",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? "46px" : "56px",
                fontWeight: 900,
                color: "#f8fafc",
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Bar: Meta & Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              {author}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                color: "#10b981",
                fontWeight: 600,
              }}
            >
              Verified Architecture Guide • webvibez.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err: any) {
    return new Response(`Failed to generate image: ${err.message}`, { status: 500 });
  }
}
