/**
 * AMUN CAFÉ - Luxury Editorial Main Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Reveal Observer
  const revealElements = document.querySelectorAll(".reveal-item");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.08
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Sticky Header Behavior
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add("scrolled");
    } else {
      siteHeader?.classList.remove("scrolled");
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer
  const mobileToggleBtn = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("active");
      if (isOpen) {
        mobileDrawer.classList.remove("active");
        document.body.style.overflow = "";
        mobileToggleBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"6\" x2=\"20\" y2=\"6\"/><line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\"/><line x1=\"4\" y1=\"18\" x2=\"20\" y2=\"18\"/></svg>";
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileDrawer.classList.add("active");
        document.body.style.overflow = "hidden";
        mobileToggleBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>";
        mobileToggleBtn.setAttribute("aria-expanded", "true");
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("active");
        document.body.style.overflow = "";
        mobileToggleBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"6\" x2=\"20\" y2=\"6\"/><line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\"/><line x1=\"4\" y1=\"18\" x2=\"20\" y2=\"18\"/></svg>";
      });
    });
  }

  // 4. Menu Filtering Tabs
  const menuTabs = document.querySelectorAll(".menu-tab-btn");
  const menuCategories = document.querySelectorAll(".menu-category-group");

  if (menuTabs.length > 0 && menuCategories.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetCategory = tab.dataset.category;
        
        menuTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        menuCategories.forEach(cat => {
          if (targetCategory === "all" || cat.dataset.category === targetCategory) {
            cat.style.display = "block";
            cat.classList.add("reveal-item", "is-visible");
          } else {
            cat.style.display = "none";
          }
        });
      });
    });
  }

  // 5. Image Lightbox Modal
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const zoomableImages = document.querySelectorAll(".img-frame-zoom");

  if (lightboxModal && lightboxImg) {
    zoomableImages.forEach(frame => {
      frame.addEventListener("click", () => {
        const img = frame.querySelector("img");
        if (!img) return;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "AMUN CAFÉ";
        if (lightboxCaption) {
          lightboxCaption.textContent = frame.dataset.caption || img.alt || "AMUN CAFÉ — Lisboa";
        }
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // 6. Toast Notification Helper
  window.showToast = (message) => {
    let toast = document.getElementById("siteToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "siteToast";
      toast.className = "toast-msg";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> <span>${message}</span>`;
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  };

  // 7. Copy Address Action
  const copyAddressBtns = document.querySelectorAll(".btn-copy-address");
  copyAddressBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const addressText = "R. da Escola Politécnica 94, 1250-100 Lisboa, Portugal";
      navigator.clipboard.writeText(addressText).then(() => {
        window.showToast("Address copied to clipboard");
      }).catch(() => {
        window.showToast("R. da Escola Politécnica 94, 1250-100 Lisboa");
      });
    });
  });

  // 8. Active Page Link Indicator
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && (currentPath.endsWith(href) || (currentPath.endsWith("/") && href === "index.html"))) {
      link.classList.add("active");
    }
  });
});
