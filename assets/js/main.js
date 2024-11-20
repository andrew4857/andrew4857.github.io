// Set up breakpoints without jQuery (requires a breakpoint library, or implement custom logic)
const breakpoints = {
  wide: [961, 1880],
  normal: [961, 1620],
  narrow: [961, 1320],
  narrower: [737, 960],
  mobile: [null, 736],
};

// Initial animations on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("is-preload");
  }, 100);
});

// Navigation link handling
const nav = document.getElementById("nav");
const navLinks = nav.querySelectorAll("a"); // Declared here

navLinks.forEach((link) => {
  link.classList.add("scrolly");

  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (!href.startsWith("#")) return; // Skip external links

    e.preventDefault();

    // Deactivate all links
    navLinks.forEach((navLink) => navLink.classList.remove("active"));

    // Activate clicked link and lock it
    link.classList.add("active", "active-locked");
  });

  const section = document.querySelector(link.getAttribute("href"));
  if (section) {
    section.classList.add("inactive"); // Initially deactivate the section

    // Intersection Observer to trigger activation on view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.remove("inactive");
            if (!document.querySelector(".active-locked")) {
              navLinks.forEach((navLink) => navLink.classList.remove("active"));
              link.classList.add("active");
            }
            if (link.classList.contains("active-locked")) {
              link.classList.remove("active-locked");
            }
          }
        });
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0.5 }
    );

    observer.observe(section);
  }
});

// Header toggle for mobile (creating elements dynamically)
const headerToggle = document.createElement("div");
headerToggle.id = "headerToggle";
headerToggle.innerHTML = '<a href="#header" class="toggle"></a>';
document.body.appendChild(headerToggle);

// Panel functionality for header (replace with custom behavior if needed)
const header = document.getElementById("header");
const headerToggleLink = headerToggle.querySelector(".toggle");

headerToggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("header-visible");
  header.classList.toggle("visible");
});

// Set the copyright year
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copyright-year").textContent =
    new Date().getFullYear();

  // Handle project card click to open links
  const projectContainer = document.querySelector(".project-container");
  if (projectContainer) {
    projectContainer.addEventListener("click", (event) => {
      const card = event.target.closest(".project-card");
      if (card && card.dataset.url) {
        window.open(card.dataset.url, "_blank");
      }
    });
  }

  // Modal functionality for the "coming soon" project
  const comingSoonProject = document.getElementById("comingSoonProject");
  const comingSoonModal = document.getElementById("comingSoonModal");
  const closeButton = comingSoonModal?.querySelector(".close-button");

  if (comingSoonProject && comingSoonModal) {
    comingSoonProject.addEventListener("click", (event) => {
      event.preventDefault();
      comingSoonModal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
      comingSoonModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === comingSoonModal) {
        comingSoonModal.style.display = "none";
      }
    });
  }

  // Fallback image handling for broken images
  document.querySelectorAll("img").forEach((img) => {
    img.onerror = () => {
      img.src = "./images/fallback-image.png"; // Path to fallback image
    };
  });
});

// ===== New Vanilla JavaScript Additions ===== //

// Smooth scrolling for anchor links
// Avoid redeclaration by reusing `navLinks`
navLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll activation using IntersectionObserver
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`#nav a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        entry.target.classList.remove("inactive");
        link?.classList.add("active");
      } else {
        entry.target.classList.add("inactive");
        link?.classList.remove("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

// Fallback images for broken links (already handled above, no need to repeat)

// Update copyright year dynamically (already handled above)

// Project card navigation (already handled above)

// Modal handling for "coming soon" project (already handled above)
