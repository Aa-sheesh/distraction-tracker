let activeTab = null;
let startTime = null;

// Default category mapping for known websites
const defaultCategories = {
  "www.instagram.com": "distracting",
  "web.whatsapp.com": "distracting",
  "www.google.co.in": "productive",
  // add other mappings as needed
};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (startTime && activeTab) {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        chrome.storage.local.get(["categories"], (data) => {
            // Merge user-stored categories (if any) with the default mapping.
            // User-stored values take precedence over defaults.
            const storedCategories = data.categories || {};
            const categories = { ...defaultCategories, ...storedCategories };
            const category = categories[activeTab] || "uncategorized";
            
            fetch("https://distraction-tracker.onrender.com/api/log-time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: activeTab, category, duration }),
            });
        });
    }
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        activeTab = new URL(tab.url).hostname;
        startTime = Date.now();
    });
});
