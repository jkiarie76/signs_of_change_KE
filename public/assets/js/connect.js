document.addEventListener("DOMContentLoaded", () => {

    initWelcomeVideo();
    initFaqAccordion();
    initBackToTop();
    initContactForm();

});


/* =========================================================
   WELCOME VIDEO MODAL
========================================================= */

function initWelcomeVideo() {

    const openButton = document.querySelector("#open-welcome-modal");
    const modal = document.querySelector("#welcome-video-modal");
    const closeButton = document.querySelector("#close-welcome-modal");
    const backdrop = document.querySelector("#modal-backdrop");
    const player = document.querySelector("#modal-player");

    if (!openButton || !modal) return;


    function openModal() {

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (player) {
            player.currentTime = 0;
            player.play().catch(() => {});
        }

        closeButton?.focus();
    }


    function closeModal() {

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (player) {
            player.pause();
            player.currentTime = 0;
        }

        openButton.focus();
    }


    openButton.addEventListener("click", openModal);

    closeButton?.addEventListener("click", closeModal);

    backdrop?.addEventListener("click", closeModal);


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }

    });

}


/* =========================================================
   FAQ ACCORDION
========================================================= */

function initFaqAccordion() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;


    faqItems.forEach(item => {

        const trigger = item.querySelector(".faq-trigger");

        if (!trigger) return;


        trigger.addEventListener("click", () => {

            const isOpen = item.classList.contains("is-open");


            // Close all other FAQ items
            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("is-open");

                    const otherTrigger =
                        otherItem.querySelector(".faq-trigger");

                    otherTrigger?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            // Toggle current item
            item.classList.toggle("is-open", !isOpen);

            trigger.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button = document.querySelector("#back-to-top");

    if (!button) return;


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    updateButton();

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form = document.querySelector("#connect-contact-form");
    const result = document.querySelector("#form-result");

    if (!form || !result) return;


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            form.querySelector(".form-submit-button");


        const originalText =
            submitButton?.textContent;


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

        }


        result.textContent = "";
        result.style.color = "";


        try {

            const formData = new FormData(form);


            const response = await fetch(
                form.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );


            const data = await response.json();


            if (response.ok && data.success !== false) {

                result.textContent =
                    "Thank you. Your message has been sent successfully.";

                result.style.color = "#008f89";

                form.reset();

            } else {

                throw new Error(
                    data.message || "Unable to send message."
                );

            }


        } catch (error) {

            console.error("Contact form error:", error);

            result.textContent =
                "Something went wrong. Please try again or email us directly.";

            result.style.color = "#c0392b";

        } finally {

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent =
                    originalText || "Send Message";

            }

        }

    });

}