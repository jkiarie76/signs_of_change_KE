const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});
// ===========================
// MOBILE ACCORDION
// ===========================

const accordionButtons = document.querySelectorAll(".mobile-dropdown-toggle");

accordionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const dropdown = button.parentElement;

        // Close every other accordion
        document.querySelectorAll(".mobile-dropdown").forEach((item) => {

            if (item !== dropdown) {

                item.classList.remove("open");

            }

        });

        // Toggle the current one
        dropdown.classList.toggle("open");

    });

});
// ===========================
// CLOSE MENU AFTER CLICK
// ===========================

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        mobileBtn.classList.remove("active");

        document.body.classList.remove("menu-open");

        document
            .querySelectorAll(".mobile-dropdown")
            .forEach((item) => {

                item.classList.remove("open");

            });

    });

});
// ===========================
// CLOSE WHEN CLICKING OUTSIDE
// ===========================

document.addEventListener("click", (event) => {

    const clickedInsideHeader = event.target.closest(".header");

    if (!clickedInsideHeader && mobileNav.classList.contains("open")) {

        mobileNav.classList.remove("open");

        mobileBtn.classList.remove("active");

        document.body.classList.remove("menu-open");

        document
            .querySelectorAll(".mobile-dropdown")
            .forEach((item) => item.classList.remove("open"));

    }

});