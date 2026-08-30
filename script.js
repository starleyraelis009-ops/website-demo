/* =========================================================
LUMIÈRE CAFÉ
MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });

}

/* Close mobile menu after clicking a navigation link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu?.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

const updateActiveNavigation = () => {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            activeLink?.classList.add("active");
        }

    });

};

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* ================= MENU FILTER ================= */

const menuTabs = document.querySelectorAll(".menu-tab");
const menuItems = document.querySelectorAll(".menu-item");

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const category = tab.dataset.category;

        menuTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        menuItems.forEach(item => {

            const itemCategory = item.dataset.category;

            if (itemCategory === category) {

                item.style.display = "grid";

                requestAnimationFrame(() => {
                    item.style.opacity = "1";
                });

            } else {

                item.style.opacity = "0";

                setTimeout(() => {

                    if (item.style.opacity === "0") {
                        item.style.display = "none";
                    }

                }, 200);

            }

        });

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".image-reveal, .about-content, .menu-item, .gallery-item, .contact-block"
);

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

const handleBackToTop = () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

};

window.addEventListener(
    "scroll",
    handleBackToTop,
    { passive: true }
);

backToTop?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= IMAGE ERROR FALLBACK ================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("error", () => {

        image.style.background = "#d9d0c2";
        image.style.minHeight = "250px";
        image.style.objectFit = "cover";

    });

});


/* ================= KEYBOARD ACCESSIBILITY ================= */

menuToggle?.addEventListener("keydown", event => {

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        menuToggle.click();

    }

});

});
