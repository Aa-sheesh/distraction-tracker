🧠 distraction-tracker
======================

**distraction-tracker** is a lightweight and customizable browser extension that helps users understand how they spend their time online. It categorizes browsing activity into **productive**, **distracted**, and **unspecified** categories, allowing users to reconfigure these categories and visualize their behavior through insightful charts.

🚀 Features
-----------

*   ⏱️ **Time Tracking** – Monitor time spent on each website during browsing sessions.
    
*   🎯 **Custom Categories** – Assign websites to _productive_, _distracted_, or _unspecified_ categories.
    
*   📊 **Visual Insights** – View daily/weekly charts to analyze time distribution.
    
*   ⚙️ **Configurable Settings** – Update category rules in a simple UI.
    
*   🔒 **Privacy First** – All data is stored locally and never shared.
    


📁 Project Structure
--------------------

```
📦 
├─ .gitignore
├─ client
│  ├─ README.md
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ background.js
│  │  ├─ icons
│  │  │  ├─ icon128.png
│  │  │  ├─ icon16.png
│  │  │  └─ icon48.png
│  │  └─ manifest.json
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  └─ ReportChart.jsx
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Options.jsx
│  │  │  └─ Popup.jsx
│  │  └─ utils
│  │     └─ api.js
│  └─ vite.config.js
└─ server
   ├─ .env.sample
   ├─ config
   │  └─ db.js
   ├─ models
   │  ├─ Settings.js
   │  └─ TimeLog.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ categoryRoutes.js
   │  └─ timeLogRoutes.js
   └─ server.js
```

🛠️ Installation (Development)
------------------------------
1. Paste these in your terminal
```bashCopyEdit
git clone https://github.com/Aa-sheesh/distraction-tracker
npm install
npm run build
```
    
2.  Load it in your browser:
    
    *   Open Chrome and go to chrome://extensions/
        
    *   Enable **Developer mode**
        
    *   Click **Load unpacked**
        
    *   Select the dist/ folder
        

✨ Usage
-------

*   Click the extension icon to see your current session’s time breakdown.
    
*   Use the **Settings** tab to:
    
    *   Assign domains to _productive_, _distracted_, or _unspecified_
        
    *   Customize tracking preferences
        
*   View the **Dashboard** for graphical breakdowns over time.
    

📊 Tech Stack
-------------

*   **Frontend**: Vite + React
    
*   **Storage**: Chrome Extension Storage API (sync/local)+MongoDB
    
*   **Visualization**: Recharts
    
*   **State Management**: Zustand 
    

📌 Roadmap
----------

*   Export activity logs as CSV
    
*   Dark mode support
    
*   Pomodoro integration
    
*   Weekly email reports
    

🙌 Contributing
---------------

Feel free to fork this repo, open issues, or create pull requests. Contributions are welcome!

📄 License
----------

This project is licensed under the MIT License.