/* --- CHATBOT LOGIC --- */

// Toggle Chat Window
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
}

// Handle User Input
function handleChatInput() {
    const inputField = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Add User Message
    addMessage(userText, 'user-msg');
    inputField.value = ""; // Clear input

    // 2. Generate Bot Response (Simulated Delay)
    setTimeout(() => {
        const botResponse = getGauriResponse(userText);
        addMessage(botResponse, 'bot-msg');
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

// Add message to UI
function addMessage(text, className) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', className);
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
}

// --- EDIT RESPONSES HERE (GAURI BRAIN) ---
function getGauriResponse(input) {
    input = input.toLowerCase();

    // Simple If-Else Logic
    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! I am Gauri, the ECODE assistant. How can I help you today?";
    } 
    else if (input.includes("event") || input.includes("register")) {
        return "You can check out our latest events in the 'Events' tab. Registration links are available there!";
    }
    else if (input.includes("insight") || input.includes("newsletter")) {
        return "Our 'Insight by ECODE' newsletter is published monthly. Visit the Insights tab to read them.";
    }
    else if (input.includes("member") || input.includes("join")) {
        return "We recruit at the beginning of the semester. Keep an eye on the Announcements section!";
    }
    else if (input.includes("head") || input.includes("president")) {
        return "Our current heads are Shivam and Gauri Agarwal.";
    }
    else if (input.includes("mission")) {
        return "Our mission is to bridge the gap between Economics and Data Science through practical application.";
    }
    else {
        return "I'm not sure about that. Try asking about events, insights, or our members.";
    }
}

// Allow "Enter" key to send message
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('user-input');
    if(inputField){
        inputField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                handleChatInput();
            }
        });
    }
});