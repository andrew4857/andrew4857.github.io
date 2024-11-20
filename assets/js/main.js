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

// Initialize the IntersectionObserver first
const observer = new IntersectionObserver(
  (entries) => {
    // Track the section closest to the center of the viewport
    let closestSection = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    entries.forEach((entry) => {
      const link = document.querySelector(`#nav a[href="#${entry.target.id}"]`);
      const sectionCenter =
        entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceToCenter = Math.abs(sectionCenter - viewportCenter);

      // Update the closest section
      if (entry.isIntersecting && distanceToCenter < closestDistance) {
        closestSection = entry.target;
        closestDistance = distanceToCenter;
      }

      // Deactivate links not closest to the center
      link?.classList.remove("active");
      entry.target.classList.add("inactive");
    });

    // Activate the closest section and its link
    if (closestSection) {
      const link = document.querySelector(
        `#nav a[href="#${closestSection.id}"]`
      );
      link?.classList.add("active");
      closestSection.classList.remove("inactive");
    }
  },
  {
    threshold: 0, // Trigger at any intersection
    rootMargin: "0px 0px -50% 0px", // Ensure sufficient buffer for bottom sections
  }
);

// Select and observe all sections
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  observer.observe(section);
});

// Re-observe sections on every scroll to ensure visibility updates
window.addEventListener("scroll", () => {
  sections.forEach((section) => observer.observe(section));
});

// Navigation link handling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (!href.startsWith("#")) return; // Skip external links

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Deactivate all links
    navLinks.forEach((navLink) => navLink.classList.remove("active"));

    // Activate clicked link and lock it
    link.classList.add("active", "active-locked");
  });
});

// Fallback images for broken links (already handled above, no need to repeat)

// Update copyright year dynamically (already handled above)

// Project card navigation (already handled above)

// Modal handling for "coming soon" project (already handled above)
