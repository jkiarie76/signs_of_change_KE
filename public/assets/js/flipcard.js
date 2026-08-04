document.addEventListener("DOMContentLoaded", () => {

    const flipCards = document.querySelectorAll(".flip-card");

    flipCards.forEach((card) => {

        // Flip on mouse click or mobile tap
        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

        // Accessibility: flip using keyboard
        card.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                card.classList.toggle("flipped");

            }

        });

    });

});