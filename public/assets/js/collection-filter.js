document.addEventListener("DOMContentLoaded", () => {

    initCollectionFilter();

    initMythCards();

});

function initCollectionFilter() {

    const filterGroups = document.querySelectorAll("[data-filter-group]");
    // added this line below
    console.log("Filter groups:", filterGroups.length);

    if (!filterGroups.length) return;

    filterGroups.forEach(group => {

        const buttons = group.querySelectorAll("[data-filter]");

        const targetSelector = group.dataset.target;

        if (!targetSelector) return;

        const target = document.querySelector(targetSelector);
        // Added this two lines below
        console.log("Target selector:", targetSelector);
        console.log("Target element:", target);

        if (!target) return;

        const cards = target.querySelectorAll("[data-category]");
        // Added this line below
        console.log("Cards found:", cards.length);

        const emptyState = document.querySelector("[data-empty-state]");
                  
        // -------------------------
        // FILTER BUTTONS
        // -------------------------

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const filter = button.dataset.filter;

                // Update active state
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                let visibleCards = 0;

                cards.forEach(card => {

                    const category = card.dataset.category;

                    if (filter === "all" || category === filter) {

                        card.classList.remove("hidden");
                        visibleCards++;

                    } else {

                        card.classList.add("hidden");

                    }

                });

                if (emptyState) {

                    if (visibleCards === 0) {

                        emptyState.classList.remove("hidden");

                    } else {

                        emptyState.classList.add("hidden");

                    }

                }

            });

        });

        // -------------------------
        // RESET BUTTON
        // -------------------------

        const resetButtons = target.querySelectorAll("[data-reset-filters]");

        resetButtons.forEach(resetButton => {

            resetButton.addEventListener("click", () => {

                const firstButton = group.querySelector("[data-filter='all']");

                if (firstButton) {

                    firstButton.click();

                }

            });

        });

    });

}

function initMythCards() {

    const cards = document.querySelectorAll(".myth-card");

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

    });

}