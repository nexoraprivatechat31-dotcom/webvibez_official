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
      DEVTO: "ðŸŒ DEV.to",
      HASHNODE: "âš¡ Hashnode",
      MEDIUM: "âœï¸ Medium",
      TUMBLR: "ðŸ”· Tumblr",
      BLOGGER: "ðŸ…±ï¸ Blogger",
      NOTION: "ðŸ““ Notion",
    };

    const isHindi = article.language === "hi";

    let syndicatedChannels = "";
    if (distributionResults && Object.keys(distributionResults).length > 0) {
      const channelLines: string[] = [];
      for (const [plat, res] of Object.entries(distributionResults)) {
        const platLabel = platformIcons[plat] || `ðŸŒ ${plat}`;
        const viewLinkText = isHindi ? "à¤²à¤¾à¤‡à¤µ à¤ªà¥‹à¤¸à¥à¤Ÿ à¤¦à¥‡à¤–à¥‡à¤‚ â†—" : "View Live Post â†—";
        const importLinkText = isHindi ? "à¤‘à¤«à¤¿à¤¶à¤¿à¤¯à¤² à¤®à¥€à¤¡à¤¿à¤¯à¤® à¤‡à¤‚à¤ªà¥‹à¤°à¥à¤Ÿ â†—" : "Official Import Link â†—";
        const readOnText = isHindi ? `ðŸ“– ${plat} à¤ªà¤° à¤ªà¤¢à¤¼à¥‡à¤‚` : `ðŸ“– Read on ${plat}`;
        const mediumBtnText = isHindi ? "ðŸ“– Medium à¤‡à¤‚à¤ªà¥‹à¤°à¥à¤Ÿ" : "ðŸ“– Medium Import";

        if (res.success && res.externalUrl) {
          channelLines.push(`â€¢ <b>${platLabel}:</b> <a href="${res.externalUrl}">${viewLinkText}</a>`);
          if (buttonRow1.length < 2) {
            buttonRow1.push({ text: readOnText, url: res.externalUrl });
          } else if (buttonRow2.length < 2) {
            buttonRow2.push({ text: readOnText, url: res.externalUrl });
          }
        } else if (plat === "MEDIUM" && res.manualActionUrl) {
          channelLines.push(`â€¢ <b>${platLabel}:</b> <a href="${res.manualActionUrl}">${importLinkText}</a>`);
          if (buttonRow2.length < 2) {
            buttonRow2.push({ text: mediumBtnText, url: res.manualActionUrl });
          }
        } else if (res.success) {
          channelLines.push(`â€¢ <b>${platLabel}:</b> âœ… ${isHindi ? "à¤¸à¤¿à¤‚à¤• à¤¹à¥à¤†" : "Synced"}`);
        }
      }
      if (channelLines.length > 0) {
        const channelHeading = isHindi ? "ðŸ“¡ <b>à¤²à¤¾à¤‡à¤µ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¥‰à¤°à¥à¤® à¤²à¤¿à¤‚à¤•à¥à¤¸:</b>" : "ðŸ“¡ <b>Live Platform Links:</b>";
        syndicatedChannels = `\n\n${channelHeading}\n${channelLines.join("\n")}`;
      }
    }

    if (buttonRow1.length > 0) inlineButtons.push(buttonRow1);
    if (buttonRow2.length > 0) inlineButtons.push(buttonRow2);

    // Primary Canonical Source Button
    if (!isHindi) {
      inlineButtons.unshift([
        { text: "ðŸŒ Read on WebVibez (Canonical)", url: `https://www.webvibez.com/blog/${article.slug}` },
      ]);
    }
    
    const companyBtnText = isHindi ? "ðŸš€ WebVibez à¤¸à¥‰à¤«à¥à¤Ÿà¤µà¥‡à¤¯à¤° à¤¸à¥‰à¤²à¥à¤¯à¥‚à¤¶à¤‚à¤¸" : "ðŸš€ WebVibez Software Solutions";
    inlineButtons.push([
      { text: companyBtnText, url: "https://www.webvibez.com/services" },
    ]);

    let message = "";

    const kwBlock = article.primaryKeyword
      ? `\nðŸŽ¯ <b>Target Keyword:</b> <code>${article.primaryKeyword}</code>`
      : "";

    const seoScoreBlock = article.seoScores
      ? `\n\nðŸ“Š <b>Diagnostic Quality Scores:</b>\nâ€¢ Content Depth: ${article.seoScores.contentQuality}/100\nâ€¢ SEO Structure: ${article.seoScores.seoQuality}/100\nâ€¢ AEO Direct Answer: ${article.seoScores.aeoQuality}/100\nâ€¢ Technical SEO: ${article.seoScores.technicalSeo}/100\nâ€¢ Overall Score: <b>${article.seoScores.overall}/100</b>`
      : "";

    if (isHindi) {
      const directAns = article.aeoDirectAnswer
        ? `\n\nðŸ’¡ <b>à¤®à¥à¤–à¥à¤¯ à¤¸à¤¾à¤°à¤¾à¤‚à¤¶ (Direct Answer):</b>\n<i>${article.aeoDirectAnswer.slice(0, 140)}...</i>`
        : "";

      message = `
ðŸš€ <b>WebVibez à¤¨à¤¯à¤¾ à¤¬à¥à¤²à¥‰à¤— à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤! (09:30 AM IST)</b>

ðŸ“Œ <b>à¤¶à¥€à¤°à¥à¤·à¤•:</b> ${article.title}
ðŸ‡®ðŸ‡³ <b>à¤­à¤¾à¤·à¤¾:</b> à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)
ðŸ·ï¸ <b>à¤¶à¥à¤°à¥‡à¤£à¥€:</b> ${article.category} | â±ï¸ ${article.readingTime || "7 à¤®à¤¿à¤¨à¤Ÿ"}${kwBlock}
ðŸ‘¨â€ðŸ’» <b>à¤²à¥‡à¤–à¤•:</b> ${article.author?.name || "Rudram Joshi"} (WebVibez)
âœ‰ï¸ <b>à¤ˆà¤®à¥‡à¤²:</b> webvibezsoftdev@gmail.com
ðŸŒ <b>à¤•à¥ˆà¤¨à¥‹à¤¨à¤¿à¤•à¤²:</b> ${article.canonicalUrl}
ðŸ•’ <b>à¤¸à¤®à¤¯:</b> ${pubDateIST}${directAns}${seoScoreBlock}${syndicatedChannels}

âœ… <i>à¤°à¤¿à¤¯à¤² à¤¬à¥ˆà¤•à¤²à¤¿à¤‚à¤•à¥à¤¸ à¤”à¤° à¤•à¥ˆà¤¨à¥‹à¤¨à¤¿à¤•à¤² SEO à¤•à¥‡ à¤¸à¤¾à¤¥ à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤• à¤¡à¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€à¤¬à¥à¤¯à¥‚à¤Ÿà¥‡à¤¡!</i>
      `.trim();
    } else {
      const directAns = article.aeoDirectAnswer
        ? `\n\nðŸ’¡ <b>Direct Answer:</b>\n<i>${article.aeoDirectAnswer.slice(0, 140)}...</i>`
        : "";

      message = `
ðŸš€ <b>WebVibez Article Published! (09:30 AM IST)</b>

ðŸ“Œ <b>Title:</b> ${article.title}
ðŸ‡¬ðŸ‡§ <b>Language:</b> English
ðŸ·ï¸ <b>Category:</b> ${article.category} | â±ï¸ ${article.readingTime || "7 min read"}${kwBlock}
ðŸ‘¨â€ðŸ’» <b>Author:</b> ${article.author?.name || "Rudram Joshi"} (Founder & Lead Architect)
âœ‰ï¸ <b>Email:</b> webvibezsoftdev@gmail.com
ðŸŒ <b>Canonical:</b> https://www.webvibez.com/blog/${article.slug}
ðŸ•’ <b>Time:</b> ${pubDateIST}${directAns}${seoScoreBlock}${syndicatedChannels}

âœ… <i>Distributed automatically with real backlinks & canonical SEO!</i>
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
âš ï¸ <b>WebVibez Publishing Engine Alert</b>

ðŸ•’ <b>Time (IST):</b> ${nowIST}
ðŸ“ <b>Notice:</b> ${warningMessage}

ðŸ›¡ï¸ <i>Anti-spam quality gate prevented publishing low-quality filler.</i>
    `.trim();

    return this.sendMessage(message);
  },
  async sendLeadAlert(lead: {
    name: string;
    phone: string;
    email?: string;
    organization?: string;
    solutionType?: string;
    studentVolume?: string;
    timeline?: string;
    message?: string;
  }): Promise<TelegramNotificationResult> {
    const nowIST = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const message = `
🚀 <b>NEW CLIENT INQUIRY RECEIVED! (webvibez.com)</b>

🏢 <b>Organization:</b> ${lead.organization || "Direct Prospect"}
👤 <b>Contact Person:</b> ${lead.name}
📞 <b>Phone:</b> <code>${lead.phone}</code>
✉️ <b>Email:</b> ${lead.email || "N/A"}
🛠️ <b>Solution:</b> ${lead.solutionType || "Mobile App + ERP"}
👥 <b>Volume:</b> ${lead.studentVolume || "N/A"}
⏱️ <b>Timeline:</b> ${lead.timeline || "7-Day Fast Track"}
💬 <b>Message:</b> <i>${lead.message || "No custom note"}</i>

🕒 <b>Received At:</b> ${nowIST}
📲 <i>Lead automatically synced to WebVibez Mobile CRM!</i>
    `.trim();

    return this.sendMessage(message);
  },
};
