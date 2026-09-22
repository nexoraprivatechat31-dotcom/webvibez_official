import { Article } from "../blog/types";
import { DistributionResult } from "../distribution/types";

export interface TelegramNotificationResult {
  success: boolean;
  messageId?: number;
  errorMessage?: string;
}

export const TelegramNotifier = {
  isConfigured(): boolean {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    return Boolean(token && chatId);
  },

  async sendMessage(htmlText: string, inlineButtons?: Array<Array<{ text: string; url: string }>>): Promise<TelegramNotificationResult> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        success: false,
        errorMessage: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.",
      };
    }

    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const body: any = {
        chat_id: chatId,
        text: htmlText,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      };

      if (inlineButtons && inlineButtons.length > 0) {
        body.reply_markup = {
          inline_keyboard: inlineButtons,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        return {
          success: false,
          errorMessage: data.description || `Telegram API returned ${res.status}`,
        };
      }

      return {
        success: true,
        messageId: data.result?.message_id,
      };
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.message || "Failed to communicate with Telegram API.",
      };
    }
  },

  async sendPhoto(
    photoUrl: string,
    captionHtml: string,
    inlineButtons?: Array<Array<{ text: string; url: string }>>
  ): Promise<TelegramNotificationResult> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        success: false,
        errorMessage: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.",
      };
    }

    try {
      const url = `https://api.telegram.org/bot${token}/sendPhoto`;
      const body: any = {
        chat_id: chatId,
        photo: photoUrl,
        caption: captionHtml.slice(0, 1024), // Telegram caption max limit is 1024 chars
        parse_mode: "HTML",
      };

      if (inlineButtons && inlineButtons.length > 0) {
        body.reply_markup = {
          inline_keyboard: inlineButtons,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        // Fallback to text message if photo URL is rejected
        console.warn("Telegram sendPhoto failed, falling back to text message:", data.description);
        return this.sendMessage(captionHtml, inlineButtons);
      }

      return {
        success: true,
        messageId: data.result?.message_id,
      };
    } catch (err: any) {
      // Fallback to sendMessage
      return this.sendMessage(captionHtml, inlineButtons);
    }
  },

  async sendPublishedAlert(
    article: Article,
    distributionResults?: Record<string, DistributionResult>
  ): Promise<TelegramNotificationResult> {
    const pubDateIST = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(article.publicationDate));

    const inlineButtons: Array<Array<{ text: string; url: string }>> = [];
    const buttonRow1: Array<{ text: string; url: string }> = [];
    const buttonRow2: Array<{ text: string; url: string }> = [];

    const platformIcons: Record<string, string> = {
      DEVTO: "🌐 DEV.to",
      HASHNODE: "⚡ Hashnode",
      MEDIUM: "✍️ Medium",
      TUMBLR: "🔷 Tumblr",
      BLOGGER: "🅱️ Blogger",
      NOTION: "📓 Notion",
    };

    const isHindi = article.language === "hi";

    let syndicatedChannels = "";
    if (distributionResults && Object.keys(distributionResults).length > 0) {
      const channelLines: string[] = [];
      for (const [plat, res] of Object.entries(distributionResults)) {
        const platLabel = platformIcons[plat] || `🌐 ${plat}`;
        const viewLinkText = isHindi ? "लाइव पोस्ट देखें ↗" : "View Live Post ↗";
        const importLinkText = isHindi ? "ऑफिशियल मीडियम इंपोर्ट ↗" : "Official Import Link ↗";
        const readOnText = isHindi ? `📖 ${plat} पर पढ़ें` : `📖 Read on ${plat}`;
        const mediumBtnText = isHindi ? "📖 Medium इंपोर्ट" : "📖 Medium Import";

        if (res.success && res.externalUrl) {
          channelLines.push(`• <b>${platLabel}:</b> <a href="${res.externalUrl}">${viewLinkText}</a>`);
          if (buttonRow1.length < 2) {
            buttonRow1.push({ text: readOnText, url: res.externalUrl });
          } else if (buttonRow2.length < 2) {
            buttonRow2.push({ text: readOnText, url: res.externalUrl });
          }
        } else if (plat === "MEDIUM" && res.manualActionUrl) {
          channelLines.push(`• <b>${platLabel}:</b> <a href="${res.manualActionUrl}">${importLinkText}</a>`);
          if (buttonRow2.length < 2) {
            buttonRow2.push({ text: mediumBtnText, url: res.manualActionUrl });
          }
        } else if (res.success) {
          channelLines.push(`• <b>${platLabel}:</b> ✅ ${isHindi ? "सिंक हुआ" : "Synced"}`);
        }
      }
      if (channelLines.length > 0) {
        const channelHeading = isHindi ? "📡 <b>लाइव प्लेटफॉर्म लिंक्स:</b>" : "📡 <b>Live Platform Links:</b>";
        syndicatedChannels = `\n\n${channelHeading}\n${channelLines.join("\n")}`;
      }
    }

    if (buttonRow1.length > 0) inlineButtons.push(buttonRow1);
    if (buttonRow2.length > 0) inlineButtons.push(buttonRow2);
    
    const companyBtnText = isHindi ? "🚀 WebVibez सॉफ्टवेयर सॉल्यूशंस" : "🚀 WebVibez Software Solutions";
    inlineButtons.push([
      { text: companyBtnText, url: "https://webvibez.com/services" },
    ]);

    let message = "";

    if (isHindi) {
      const directAns = article.aeoDirectAnswer
        ? `\n\n💡 <b>मुख्य सारांश (Direct Answer):</b>\n<i>${article.aeoDirectAnswer.slice(0, 140)}...</i>`
        : "";

      message = `
🚀 <b>WebVibez नया ब्लॉग प्रकाशित! (09:30 AM IST)</b>

📌 <b>शीर्षक:</b> ${article.title}
🇮🇳 <b>भाषा:</b> हिन्दी (Hindi)
🏷️ <b>श्रेणी:</b> ${article.category} | ⏱️ ${article.readingTime || "7 मिनट"}
👨‍💻 <b>लेखक:</b> ${article.author?.name || "Rudram Joshi"} (WebVibez)
✉️ <b>ईमेल:</b> webvibezsoftdev@gmail.com
🌐 <b>वेबसाइट:</b> https://webvibez.com
🕒 <b>समय:</b> ${pubDateIST}${directAns}${syndicatedChannels}

✅ <i>रियल बैकलिंक्स और कैनोनिकल SEO के साथ ऑटोमैटिक डिस्ट्रीब्यूटेड!</i>
      `.trim();
    } else {
      const directAns = article.aeoDirectAnswer
        ? `\n\n💡 <b>Direct Answer:</b>\n<i>${article.aeoDirectAnswer.slice(0, 140)}...</i>`
        : "";

      message = `
🚀 <b>WebVibez Article Published! (09:30 AM IST)</b>

📌 <b>Title:</b> ${article.title}
🇬🇧 <b>Language:</b> English
🏷️ <b>Category:</b> ${article.category} | ⏱️ ${article.readingTime || "7 min read"}
👨‍💻 <b>Author:</b> ${article.author?.name || "Rudram Joshi"} (Founder & Lead Architect)
✉️ <b>Email:</b> webvibezsoftdev@gmail.com
🌐 <b>Website:</b> https://webvibez.com
🕒 <b>Time:</b> ${pubDateIST}${directAns}${syndicatedChannels}

✅ <i>Distributed automatically with real backlinks & canonical SEO!</i>
      `.trim();
    }

    // If featured image exists, send as Photo with Caption + Buttons!
    if (article.featuredImage && article.featuredImage.startsWith("http")) {
      return this.sendPhoto(article.featuredImage, message, inlineButtons);
    }

    return this.sendMessage(message, inlineButtons);
  },

  async sendWarningAlert(warningMessage: string): Promise<TelegramNotificationResult> {
    const nowIST = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const message = `
⚠️ <b>WebVibez Publishing Engine Alert</b>

🕒 <b>Time (IST):</b> ${nowIST}
📝 <b>Notice:</b> ${warningMessage}

🛡️ <i>Anti-spam quality gate prevented publishing low-quality filler.</i>
    `.trim();

    return this.sendMessage(message);
  },
};
