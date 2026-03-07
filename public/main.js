const servicesContainer = document.getElementById("services-container");

async function loadServices() {
  if (!servicesContainer) return;

  try {
    const res = await fetch("/api/services");
    const services = await res.json();

    servicesContainer.innerHTML = "";
    services.forEach((service) => {
      const div = document.createElement("div");
      div.className = "service-card";
      div.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
      servicesContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Failed to load services", error);
  }
}

loadServices();

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuBtn.textContent = nav.classList.contains("active") ? "X" : "☰";
  });
}

const words = ["empowers", "manages", "organizes", "optimizes", "modernizes"];
let i = 0;
const text = document.getElementById("changing-text");
if (text) {
  setInterval(() => {
    text.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % words.length;
      text.textContent = words[i];
      text.style.opacity = 1;
    }, 350);
  }, 2000);
}

const toggle = document.getElementById("theme-toggle");
if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("light-mode");
    toggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  };
}

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = Number(counter.getAttribute("data-target"));
    const current = Number(counter.innerText);
    const increment = target / 60;

    if (current < target) {
      counter.innerText = String(Math.ceil(current + increment));
      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = String(target);
    }
  };

  updateCounter();
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const subscribeBtn = document.getElementById("subscribe-btn");
const emailInput = document.getElementById("subscribe-email");
const subscribeMessage = document.getElementById("subscribe-message");

if (subscribeBtn && emailInput && subscribeMessage) {
  subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email) {
      subscribeMessage.textContent = "Please enter your email.";
      subscribeMessage.style.color = "red";
      return;
    }

    subscribeMessage.textContent = "Thank you for subscribing!";
    subscribeMessage.style.color = "#22c55e";
    emailInput.value = "";
  });
}

const sendBtn = document.querySelector(".send-btn");
if (sendBtn) {
  sendBtn.addEventListener("click", async () => {
    const name = document.querySelector('input[placeholder="Name"]')?.value?.trim() || "";
    const email = document.querySelector('input[placeholder="Email"]')?.value?.trim() || "";
    const company = document.querySelector('input[placeholder="Organization"]')?.value?.trim() || "";
    const message = document.querySelector("textarea")?.value?.trim() || "";

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      const data = await response.json();
      alert(data.message || "Message sent");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  });
}
