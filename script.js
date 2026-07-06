/* ============================================================
   GKDK DIGITAL MARKETING — script.js
   Plain JS. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close menu after tapping a link (mobile)
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Mouse glow (ambient, page-level) ---------- */
  var glow = document.getElementById("mouseGlow");
  var glowActive = false;
  if (glow) {
    window.addEventListener(
      "mousemove",
      function (e) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
        if (!glowActive) {
          glow.classList.add("active");
          glowActive = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("mouseleave", function () {
      glow.classList.remove("active");
      glowActive = false;
    });
  }

  /* ---------- Hover spotlight on cards ---------- */
  var spotlightCards = document.querySelectorAll(".card-spotlight");
  spotlightCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  /* ---------- Ticker: pause on hover (nice-to-have) ---------- */
  var ticker = document.getElementById("ticker");
  var tickerTrack = ticker ? ticker.querySelector(".ticker-track") : null;
  if (ticker && tickerTrack) {
    ticker.addEventListener("mouseenter", function () {
      tickerTrack.style.animationPlayState = "paused";
    });
    ticker.addEventListener("mouseleave", function () {
      tickerTrack.style.animationPlayState = "running";
    });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var WHATSAPP_NUMBER = "910000000000"; // TODO: replace with the studio's real WhatsApp number (country code + number, no + or spaces)

  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = (document.getElementById("name") || {}).value || "";
      var business = (document.getElementById("business") || {}).value || "";
      var service = (document.getElementById("service") || {}).value || "";
      var message = (document.getElementById("message") || {}).value || "";

      var lines = [
        "Hi GKDK, I'd like to discuss a project.",
        "",
        "Name: " + name,
        business ? "Business: " + business : null,
        service ? "Interested in: " + service : null,
        message ? "Details: " + message : null
      ].filter(Boolean);

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;

      window.open(url, "_blank", "noopener");
    });
  }
})();
