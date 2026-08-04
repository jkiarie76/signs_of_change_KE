const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileNav = document.getElementById("mobile-nav");

if (mobileBtn && mobileNav) {

    mobileBtn.addEventListener("click", () => {

        mobileBtn.classList.toggle("active");

        mobileNav.classList.toggle("open");

        document.body.classList.toggle("menu-open");

        const expanded = mobileBtn.classList.contains("active");

        mobileBtn.setAttribute("aria-expanded", expanded);

    });

}