import { Article } from "../blog/types";

export interface BrandSignatureOptions {
  includeCompanyInfo?: boolean;
}

export const BrandSignature = {
  getMarkdownSignature(article: Article, _options: BrandSignatureOptions = {}): string {
    const isHindi = article.language === "hi";
    const authorName = article.author?.name || "Rudram Joshi";
    const authorRole = isHindi 
      ? "संस्थापक एवं लीड आर्किटेक्ट, WebVibez" 
      : (article.author?.role || "Founder & Lead Architect, WebVibez");
    const canonical = article.canonicalUrl || `https://www.webvibez.com/blog/${article.slug}`;

    if (isHindi) {
      return `

---

### 👨‍💻 लेखक एवं संपर्क जानकारी (Author & Contact)
- **लेखक (Author):** ${authorName} (${authorRole})
- **कंपनी (Company):** WebVibez Software Developer
- **ईमेल (Official Email):** [webvibezsoftdev@gmail.com](mailto:webvibezsoftdev@gmail.com)
- **ऑफिशियल वेबसाइट (Website):** [https://www.webvibez.com](https://www.webvibez.com)
- **सॉफ्टवेयर सॉल्यूशंस (Services):** [https://www.webvibez.com/services](https://www.webvibez.com/services)
- **मूल स्रोत (Canonical Source):** [*मूल रूप से WebVibez पर प्रकाशित*](${canonical})

*कस्टम सॉफ्टवेयर, कोचिंग मैनेजमेंट ऐप्स और वेब आर्किटेक्चर समाधान के लिए WebVibez से संपर्क करें।*
`;
    }

    return `

---

### 👨‍💻 About the Author & Engineering Team
- **Author:** ${authorName} (${authorRole})
- **Company:** WebVibez Software Developer
- **Official Email:** [webvibezsoftdev@gmail.com](mailto:webvibezsoftdev@gmail.com)
- **Official Website:** [https://www.webvibez.com](https://www.webvibez.com)
- **Enterprise Solutions:** [https://www.webvibez.com/services](https://www.webvibez.com/services)
- **Original Source:** [*Originally published at WebVibez*](${canonical})

*Building bespoke coaching management platforms, high-performance web systems, and mobile applications.*
`;
  },

  getHtmlSignature(article: Article): string {
    const isHindi = article.language === "hi";
    const authorName = article.author?.name || "Rudram Joshi";
    const authorRole = isHindi 
      ? "संस्थापक एवं लीड आर्किटेक्ट, WebVibez" 
      : (article.author?.role || "Founder & Lead Architect, WebVibez");
    const canonical = article.canonicalUrl || `https://www.webvibez.com/blog/${article.slug}`;

    if (isHindi) {
      return `
        <hr style="margin-top: 30px; margin-bottom: 20px; border: 0; border-top: 1px solid #e2e8f0;" />
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0066FF;">
          <h3 style="margin-top: 0; color: #0f172a;">👨‍💻 लेखक एवं संपर्क जानकारी</h3>
          <p style="margin: 6px 0;"><strong>लेखक (Author):</strong> ${authorName} (${authorRole})</p>
          <p style="margin: 6px 0;"><strong>कंपनी (Company):</strong> WebVibez Software Developer</p>
          <p style="margin: 6px 0;"><strong>ईमेल (Official Email):</strong> <a href="mailto:webvibezsoftdev@gmail.com" style="color: #0066FF;">webvibezsoftdev@gmail.com</a></p>
          <p style="margin: 6px 0;"><strong>ऑफिशियल वेबसाइट (Website):</strong> <a href="https://www.webvibez.com" style="color: #0066FF;">https://www.webvibez.com</a></p>
          <p style="margin: 6px 0;"><strong>सॉफ्टवेयर सॉल्यूशंस (Services):</strong> <a href="https://www.webvibez.com/services" style="color: #0066FF;">https://www.webvibez.com/services</a></p>
          <p style="margin: 6px 0;"><strong>मूल स्रोत:</strong> <a href="${canonical}" style="color: #0066FF;">WebVibez पर पूरा तकनीकी लेख पढ़ें</a></p>
        </div>
      `.trim();
    }

    return `
      <hr style="margin-top: 30px; margin-bottom: 20px; border: 0; border-top: 1px solid #e2e8f0;" />
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0066FF;">
        <h3 style="margin-top: 0; color: #0f172a;">👨‍💻 About the Author & Engineering Team</h3>
        <p style="margin: 6px 0;"><strong>Author:</strong> ${authorName} (${authorRole})</p>
        <p style="margin: 6px 0;"><strong>Company:</strong> WebVibez Software Developer</p>
        <p style="margin: 6px 0;"><strong>Official Email:</strong> <a href="mailto:webvibezsoftdev@gmail.com" style="color: #0066FF;">webvibezsoftdev@gmail.com</a></p>
        <p style="margin: 6px 0;"><strong>Official Website:</strong> <a href="https://www.webvibez.com" style="color: #0066FF;">https://www.webvibez.com</a></p>
        <p style="margin: 6px 0;"><strong>Enterprise Solutions:</strong> <a href="https://www.webvibez.com/services" style="color: #0066FF;">https://www.webvibez.com/services</a></p>
        <p style="margin: 6px 0;"><strong>Original Source:</strong> <a href="${canonical}" style="color: #0066FF;">Read complete article at WebVibez</a></p>
      </div>
    `.trim();
  },
};
