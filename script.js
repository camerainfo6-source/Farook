/* COMFORT GIRLS - Site interactions
   Update the WhatsApp number and form integration before launch. */
document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  var navLinks = document.querySelectorAll(".nav-link");
  var backToTop = document.getElementById("backToTop");
  var currentYear = document.getElementById("currentYear");
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation open / close
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
  }

  // Close the mobile menu after selecting a section
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (mainNav) {
        mainNav.classList.remove("open");
      }
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  });

  // Show back-to-top button after scrolling
  window.addEventListener("scroll", function () {
    if (backToTop) {
      if (window.scrollY > 450) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Highlight the navigation item for the section currently in view
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Demo enquiry form. This validates fields and opens a pre-filled WhatsApp message.
  // Replace this with a PHP/API endpoint when you have a backend.
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var email = document.getElementById("email").value.trim();
      var enquiryType = document.getElementById("enquiryType").value;
      var message = document.getElementById("message").value.trim();

      var whatsappNumber = "919876543210"; // CHANGE TO YOUR REAL WHATSAPP NUMBER
      var text = "Hello Comfort Girls,%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Mobile: " + encodeURIComponent(phone) + "%0A" +
        "Email: " + encodeURIComponent(email || "Not provided") + "%0A" +
        "Enquiry: " + encodeURIComponent(enquiryType) + "%0A" +
        "Message: " + encodeURIComponent(message);

      if (formStatus) {
        formStatus.textContent = "Opening WhatsApp with your enquiry. Please press Send in WhatsApp.";
      }

      window.open("https://wa.me/" + whatsappNumber + "?text=" + text, "_blank", "noopener");
    });
  }
});

/* ==================================
   BABY CARE PRODUCT CAROUSEL
================================== */

document.addEventListener("DOMContentLoaded", function () {

    var slider = document.getElementById("babySlider");
    var prevBtn = document.getElementById("babyPrev");
    var nextBtn = document.getElementById("babyNext");

    if (!slider || !prevBtn || !nextBtn) {
        return;
    }

    var currentIndex = 0;

    function getVisibleProducts() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1050) {
            return 2;
        }

        return 3;
    }

    function moveCarousel() {

        var products = slider.querySelectorAll(".baby-product");
        var visible = getVisibleProducts();

        var maxIndex = Math.max(0, products.length - visible);

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        var productWidth = products[0].offsetWidth;
        var gap = parseFloat(getComputedStyle(slider).gap) || 0;

        var move = currentIndex * (productWidth + gap);

        slider.style.transform =
            "translateX(-" + move + "px)";

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;

        prevBtn.style.opacity =
            currentIndex === 0 ? "0.4" : "1";

        nextBtn.style.opacity =
            currentIndex === maxIndex ? "0.4" : "1";
    }

    nextBtn.addEventListener("click", function () {

        var products = slider.querySelectorAll(".baby-product");
        var maxIndex = Math.max(
            0,
            products.length - getVisibleProducts()
        );

        if (currentIndex < maxIndex) {
            currentIndex++;
            moveCarousel();
        }

    });

    prevBtn.addEventListener("click", function () {

        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }

    });

    window.addEventListener("resize", function () {
        moveCarousel();
    });

    moveCarousel();

});
