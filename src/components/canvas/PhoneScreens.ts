export interface MobileScreenDef {
  id: string;
  name: string;
  src: string;
  category: string;
}

export const MOBILE_SCREENS: MobileScreenDef[] = [
  {
    id: "home",
    name: "Home Dashboard",
    src: "/mobile-images/home.jpeg",
    category: "Overview",
  },
  {
    id: "chat",
    name: "Direct Chat",
    src: "/mobile-images/chat.jpeg",
    category: "Messaging",
  },
  {
    id: "conversation",
    name: "Conversation Thread",
    src: "/mobile-images/conversation.jpeg",
    category: "Communication",
  },
  {
    id: "profile",
    name: "Member Profile",
    src: "/mobile-images/profile.jpeg",
    category: "Account & Hub",
  },
];

// Cache of preloaded HTMLImageElements
const imageCache: (HTMLImageElement | null)[] = new Array(MOBILE_SCREENS.length).fill(null);
let onImageLoadedCallback: (() => void) | null = null;

export function setOnMobileImageLoaded(cb: () => void) {
  onImageLoadedCallback = cb;
}

if (typeof window !== "undefined") {
  MOBILE_SCREENS.forEach((screen, index) => {
    const img = new Image();
    img.src = screen.src;
    img.onload = () => {
      imageCache[index] = img;
      if (onImageLoadedCallback) {
        onImageLoadedCallback();
      }
    };
    imageCache[index] = img;
  });
}

// Draw image covering the entire target rectangle without distortion
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) return;

  const imgAspect = imgW / imgH;
  const targetAspect = w / h;

  let renderW = w;
  let renderH = h;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > targetAspect) {
    renderW = h * imgAspect;
    offsetX = (w - renderW) / 2;
  } else {
    renderH = w / imgAspect;
    offsetY = (h - renderH) / 2;
  }

  ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);
}

// UV hit tester (clicking anywhere cycles to next screen)
export function getAppIconAtUV(u: number, v: number): number | "home" | null {
  if (v <= 0.05) return "home";
  return 1;
}

export function createScreenCanvas(
  screenIndex: number,
  brandVariant: string = "webvibez-core",
  targetIndex: number = screenIndex,
  transitionT: number = 1,
  parallaxX: number = 0,
  parallaxY: number = 0,
  hoveredIconIndex: number | null = null,
  isHoveringHomeBar: boolean = false
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 2280;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const count = MOBILE_SCREENS.length;
  const fromIdx = ((screenIndex % count) + count) % count;
  const toIdx = ((targetIndex % count) + count) % count;

  // Helper to render a specific screen
  const renderSingleScreen = (idx: number, alpha: number, offsetY: number, scaleFactor: number = 1) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.translate(540 + parallaxX * 6, 1140 + offsetY + parallaxY * 6);
    ctx.scale(scaleFactor, scaleFactor);
    ctx.translate(-540, -1140);

    const img = imageCache[idx];
    if (img && img.complete && (img.naturalWidth || img.width) > 0) {
      drawImageCover(ctx, img, 0, 0, 1080, 2280);
    } else {
      // Sleek placeholder gradient while asset prepares
      const grad = ctx.createLinearGradient(0, 0, 0, 2280);
      grad.addColorStop(0, "#0E1322");
      grad.addColorStop(0.5, "#080B14");
      grad.addColorStop(1, "#030408");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 2280);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("WebVibez Mobile OS", 540, 1140);
    }

    ctx.restore();
  };

  // Screen transition
  if (transitionT < 0.99 && fromIdx !== toIdx) {
    const t = transitionT * transitionT * (3 - 2 * transitionT); // smoothstep
    renderSingleScreen(fromIdx, 1 - t, -t * 80, 1 - t * 0.04);
    renderSingleScreen(toIdx, t, (1 - t) * 80, 0.96 + t * 0.04);
  } else {
    renderSingleScreen(toIdx, 1, 0, 1);
  }

  // Authentic Dynamic Island Overlay on iPhone 16 Pro display
  ctx.save();
  ctx.fillStyle = "#010204";
  ctx.beginPath();
  ctx.roundRect(410, 48, 260, 64, 32);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Dynamic Island subtle sensor glints
  ctx.fillStyle = "#051329";
  ctx.beginPath();
  ctx.arc(442, 80, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#030814";
  ctx.beginPath();
  ctx.arc(636, 80, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Bottom Home Indicator Bar
  ctx.save();
  ctx.fillStyle = isHoveringHomeBar ? "#38bdf8" : "rgba(255, 255, 255, 0.85)";
  ctx.beginPath();
  ctx.roundRect(430, 2220, 220, 12, 6);
  ctx.fill();
  if (isHoveringHomeBar) {
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 18;
    ctx.fill();
  }
  ctx.restore();

  return canvas;
}
