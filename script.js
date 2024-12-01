document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const database = firebase.database();
    const messagesRef = database.ref('messages');

    // Fungsi untuk mengirim pesan
    sendBtn.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const newMessageRef = messagesRef.push();
            newMessageRef.set({
                text: messageText,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            messageInput.value = '';
        }
    });

    // Fungsi untuk menampilkan pesan
    messagesRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message.text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});