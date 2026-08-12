document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.INCOIN_CONFIG || {};

  document.querySelectorAll(".register-link").forEach(a => {
    a.href = cfg.registerUrl || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".download-link").forEach(a => {
    a.href = cfg.downloadUrl || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".telegram-link").forEach(a => {
    a.href = cfg.telegramUrl || "https://t.me/";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  const loader = document.getElementById("loader");
  const loaderPercent = document.getElementById("loaderPercent");
  const loaderText = document.getElementById("loaderText");
  const loaderBar = document.getElementById("loaderBar");
  const messages = [
    "Scanning secure exchange channels...",
    "Syncing deposit networks...",
    "Preparing InCoin dashboard...",
    "Connection established..."
  ];
  let progress = 0;

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;
    loaderPercent.textContent = progress + "%";
    loaderBar.style.width = progress + "%";
    loaderText.textContent = messages[Math.min(3, Math.floor(progress / 26))];

    if (progress === 100) {
      clearInterval(timer);
      setTimeout(() => loader.classList.add("hidden"), 420);
    }
  }, 110);

  const header = document.querySelector(".header");
  const scrollProgress = document.getElementById("scrollProgress");
  const updateScroll = () => {
    header.classList.toggle("scrolled", scrollY > 20);
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollProgress.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
  };
  updateScroll();
  addEventListener("scroll", updateScroll, { passive: true });

  const nav = document.querySelector(".nav");
  document.querySelector(".menu-btn")?.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .13 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const content = item.querySelector(":scope > div");
      const active = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("active");
        other.querySelector(":scope > div").style.maxHeight = null;
      });

      if (!active) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  const input = document.getElementById("usdtAmount");
  const result = document.getElementById("inrResult");
  const rate = Number(cfg.usdtRate || 108);

  const updateResult = () => {
    const amount = Math.max(0, Number(input.value || 0));
    result.textContent = "â‚¹" + (amount * rate).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };
  input.addEventListener("input", updateResult);
  updateResult();
});