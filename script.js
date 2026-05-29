/* ================================================================
   SAGAR SRINIVASA — PORTFOLIO JAVASCRIPT
   ================================================================
   Features:
   - Sticky navbar with scroll detection
   - Mobile hamburger menu
   - Typing animation
   - Scroll-reveal animation
   - Animated skill bars
   - Contact form validation
   - Back-to-top button
   - Active nav link highlighting
   - Footer year auto-update
   ================================================================ */


/* ----------------------------------------------------------------
   1. TYPING ANIMATION
   EDIT: Add/remove roles in the array below
   ---------------------------------------------------------------- */
const typingRoles = [
  "Python Developer",
  "AI & ML Enthusiast",
  "Web Developer",
  "Problem Solver",
  "CSE Student",
  "Future Innovator"
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeLoop() {
  if (!typingEl) return;

  const currentRole = typingRoles[roleIndex];

  if (isDeleting) {
    // Remove characters
    typingEl.textContent = currentRole.slice(0, charIndex--);
  } else {
    // Add characters
    typingEl.textContent = currentRole.slice(0, charIndex++);
  }

  // Decide next action
  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex > currentRole.length) {
    // Finished typing — pause then delete
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    // Finished deleting — move to next role
    isDeleting = false;
    charIndex  = 0;
    roleIndex  = (roleIndex + 1) % typingRoles.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

// Start typing after a short delay
setTimeout(typeLoop, 600);


/* ----------------------------------------------------------------
   2. NAVBAR — SCROLL + ACTIVE LINK + HAMBURGER
   ---------------------------------------------------------------- */
const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");
const allLinks  = document.querySelectorAll(".nav-link");

// Sticky navbar on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  updateActiveLink();
  updateBackToTop();
});

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
});

// Close menu when a link is clicked (mobile)
allLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// Active nav link based on scroll position
function updateActiveLink() {
  const scrollY = window.scrollY + 80;

  document.querySelectorAll("section[id]").forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute("id");
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        allLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}


/* ----------------------------------------------------------------
   3. SCROLL-REVEAL ANIMATION
   ---------------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Small stagger based on sibling index for cards/grids
        const siblings = [...entry.target.parentElement.querySelectorAll(".reveal")];
        const delay    = siblings.indexOf(entry.target) * 80;

        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ----------------------------------------------------------------
   4. ANIMATED SKILL BARS
   ---------------------------------------------------------------- */
const skillBars = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar       = entry.target;
        const targetPct = bar.getAttribute("data-width") || "0";
        bar.style.width = targetPct + "%";
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach(bar => skillObserver.observe(bar));


/* ----------------------------------------------------------------
   5. CONTACT FORM VALIDATION
   EDIT: To send real emails, integrate Formspree or EmailJS.
   ---------------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Validate each field
    const fields = [
      { id: "name",    errorId: "nameError"    },
      { id: "email",   errorId: "emailError"   },
      { id: "subject", errorId: "subjectError" },
      { id: "message", errorId: "messageError" }
    ];

    fields.forEach(({ id, errorId }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);

      if (!input || !error) return;

      const isEmpty = input.value.trim() === "";
      const isEmailInvalid =
        id === "email" && input.value.trim() && !isValidEmail(input.value.trim());

      if (isEmpty || isEmailInvalid) {
        input.classList.add("error");
        error.classList.add("visible");
        valid = false;
      } else {
        input.classList.remove("error");
        error.classList.remove("visible");
      }
    });

    if (!valid) return;

    // --- OPTION A: Formspree (Recommended — FREE) ---
    // 1. Go to formspree.io and create a free form
    // 2. Get your endpoint URL e.g. https://formspree.io/f/xxxxxxx
    // 3. Uncomment and replace the URL below, then remove the fake-success block

    /*
    const formData = new FormData(contactForm);
    fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
    .then(res => {
      if (res.ok) {
        showSuccess();
        contactForm.reset();
      }
    })
    .catch(() => alert("Something went wrong. Please email me directly."));
    */

    // --- PLACEHOLDER SUCCESS (remove once you add Formspree above) ---
    showSuccess();
    contactForm.reset();
    fields.forEach(({ id, errorId }) => {
      document.getElementById(id)?.classList.remove("error");
      document.getElementById(errorId)?.classList.remove("visible");
    });
  });

  // Remove error styling on input
  contactForm.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("input", () => {
      field.classList.remove("error");
      const errorEl = document.getElementById(field.id + "Error");
      if (errorEl) errorEl.classList.remove("visible");
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccess() {
  const successEl = document.getElementById("formSuccess");
  if (successEl) {
    successEl.classList.add("visible");
    setTimeout(() => successEl.classList.remove("visible"), 5000);
  }
}


/* ----------------------------------------------------------------
   6. BACK-TO-TOP BUTTON
   ---------------------------------------------------------------- */
const backToTopBtn = document.getElementById("backToTop");

function updateBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ----------------------------------------------------------------
   7. FOOTER YEAR — auto-updates every year
   ---------------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ----------------------------------------------------------------
   8. SMOOTH SCROLL for anchor links (fallback for older browsers)
   ---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


/* ----------------------------------------------------------------
   9. LAZY LOADING — images in the assets folder
   ---------------------------------------------------------------- */
document.querySelectorAll("img[data-src]").forEach(img => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  observer.observe(img);
});


/* ----------------------------------------------------------------
   10. CURSOR GLOW (subtle accent glow following the cursor)
       Disabled on touch devices.
   ---------------------------------------------------------------- */
if (window.matchMedia("(pointer: fine)").matches) {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.18s ease;
    transform: translate(-50%, -50%);
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
  });
}
