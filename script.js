/* =========================================================
   CHATBOT PROFILE IMAGE CONFIG (MUST BE AT TOP)
   ========================================================= */

const botPfp = document.getElementById('botPfp');

const OPENING_IMAGE = 'Opening.jpg';
const THINKING_IMAGES = [
    'Thinking 1.png',
    'Thinking 2.png',
    'Thinking 3.png'
];
const FINAL_IMAGE = 'Final Image.png';


/* =========================================================
   CHATBOT LOGIC
   ========================================================= */

// Toggle Chat Window
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        botPfp.src = OPENING_IMAGE; // ✅ SHOW OPENING IMAGE
    }
}


// Handle User Input
function addTypingIndicator() {
    const chatBody = document.getElementById('chat-body');

    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-msg', 'bot-msg');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerText = '...';

    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}
function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function handleChatInput() {
    const inputField = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Add User Message
    addMessage(userText, 'user-msg');
    inputField.value = "";
    playThinkingAnimation(); // ✅ START THINKING ANIMATION
    addTypingIndicator();


    // 3. Generate Bot Response (Simulated Delay)
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getGauriResponse(userText);
        addMessage(botResponse, 'bot-msg');
        clearInterval(thinkingInterval); // ✅ STOP THINKING ANIMATION
        botPfp.src = FINAL_IMAGE; // ✅ settle image
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 2000);
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

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! I am Gauri, the ECODE assistant. How can I help you today?";
    } 
    else if (input.includes("event") || input.includes("register")) {
        return "You can check out our latest events in the 'Events' tab. Registration links are available there!";
    }
    else if (input.includes("insights") || input.includes("newsletter")) {
        return "Our 'Insights by ECODE' newsletter is published monthly. Visit the Insights tab to read them.";
    }
    else if (input.includes("member") || input.includes("join")) {
        return "We recruit at the beginning of the semester. Keep an eye on the Announcements section!";
    }
    else if ((input.includes("head") || input.includes("president")) || input.includes("Shivam") || input.includes("Gauri")) {
        return "Our current heads are Shivam and Gauri Agarwal.";
    }
    else if (input.includes("mission")) {
        return "Our mission is to bridge the gap between Economics and Data Science through practical application.";
    }
    else if (input.includes("dashhack")) {
        return "DASHHACK is an idea-driven hackathon by ECODE: The Economics and Data Science Club of the Department of Economics, Christ (Deemed to be University), Bannerghatta Road Campus, Bangalore. It is a beginner-friendly, high-energy event where ideas matter more than coding. Participants will work on creative website or app concepts that solve real-life student problems. It is designed to spark creativity and problem-solving among students.";
    }
    else if (input.includes("thank you") || input.includes("thanks")) {
        return "You're welcome! If you have any more questions, feel free to ask.";
    }
    else {
        return "I'm not sure about that. Try asking about events, insights, or our members.";
    }
}


/* =========================================================
   BOT PROFILE IMAGE ANIMATIONS
   ========================================================= */


let thinkingInterval;
function playThinkingAnimation() {
    let index = 0;

    // 🔴 stop any previous animation first
    clearInterval(thinkingInterval);

    thinkingInterval = setInterval(() => {
        botPfp.src = THINKING_IMAGES[index % THINKING_IMAGES.length];
        index++;
    }, 400);
}


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                handleChatInput();
            }
        });
    }
});


/* =========================================================
   MOBILE MENU CONTROLLER
   ========================================================= */

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const body = document.body;

    menu.classList.toggle('active');
    body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.menu-toggle');

    if (
        menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            window.location.href = 'index.html';
        }
    });
}


/* =========================================================
   SLIDESHOW FUNCTIONALITY
   ========================================================= */

let slideIndex = 1;
showSlide(slideIndex);

function moveSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let slide of slides) slide.classList.remove("active");
    for (let dot of dots) dot.classList.remove("active");

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

setInterval(() => moveSlide(1), 5000);


/* =========================================================
   RAILWAY SNAPSHOT DRAG
   ========================================================= */

const track = document.getElementById("railwayTrack");
let isDragging = false;
let startX;

if (track) {
    track.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        track.style.cursor = "grabbing";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        track.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.pageX - startX;
        track.style.transform = `translateX(${x}px)`;
    });
}
