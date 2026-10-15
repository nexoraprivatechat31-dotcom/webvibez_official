/**
 * WebVibez IndexNow Instant Search Engine Indexing Dispatcher
 * Submits all public URLs to api.indexnow.org and bing.com/indexnow
 */

const INDEXNOW_KEY = "f873e09b5ddd43f1844efe33a5837594";
const HOST = "www.webvibez.com";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

const URL_LIST = [
  `${BASE_URL}/`,
  `${BASE_URL}/services`,
  `${BASE_URL}/services/coaching-class-management-app`,
  `${BASE_URL}/services/website-development`,
  `${BASE_URL}/services/mobile-app-development`,
  `${BASE_URL}/services/custom-software-development`,
  `${BASE_URL}/services/mobile-apps-on-rent`,
  `${BASE_URL}/product`,
  `${BASE_URL}/pricing`,
  `${BASE_URL}/how-it-works`,
  `${BASE_URL}/portfolio`,
  `${BASE_URL}/portfolio/enzochat-web-platform`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/security`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/terms`,
  `${BASE_URL}/privacy`,
  `${BASE_URL}/refund-policy`,
  `${BASE_URL}/agreements`,
  `${BASE_URL}/disclaimer`
];

async function dispatchIndexNow() {
  console.log(`[IndexNow] Preparing dispatch for ${URL_LIST.length} URLs...`);
  console.log(`[IndexNow] Host: ${HOST}`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST
  };

  const endpoints = [
    { name: "IndexNow Central API", url: "https://api.indexnow.org/indexnow" },
    { name: "Bing Direct API", url: "https://www.bing.com/indexnow" }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n[IndexNow] Sending POST request to ${endpoint.name} (${endpoint.url})...`);
      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      console.log(`[IndexNow] Response Status: ${response.status} ${response.statusText}`);
      const text = await response.text();
      if (text) {
        console.log(`[IndexNow] Response Body:`, text);
      }

      if (response.status === 200 || response.status === 202) {
        console.log(`[IndexNow] SUCCESS: ${endpoint.name} accepted ${URL_LIST.length} URLs for instant crawling!`);
      } else {
        console.warn(`[IndexNow] Note: HTTP ${response.status} returned. Check key verification if not yet deployed live.`);
      }
    } catch (err) {
      console.error(`[IndexNow] Error pinging ${endpoint.name}:`, err.message);
    }
  }
}

dispatchIndexNow();
