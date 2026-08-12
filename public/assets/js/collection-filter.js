document.addEventListener("DOMContentLoaded", () => {

    initCollectionFilter();

    initMythCards();

});


function initCollectionFilter() {

    const filterGroups = document.querySelectorAll("[data-filter-group]");

    console.log("Filter groups:", filterGroups.length);

    if (!filterGroups.length) return;


    filterGroups.forEach(group => {

        const buttons = group.querySelectorAll("[data-filter]");

        const targetSelector = group.dataset.target;

        if (!targetSelector) return;


        const target = document.querySelector(targetSelector);

        console.log("Target selector:", targetSelector);
        console.log("Target element:", target);

        if (!target) return;


        /*
        -----------------------------------------
        FIND FILTERABLE CARDS
        -----------------------------------------
        Supports:

        data-category
        data-status

        This means the same filter system can
        power myths, etiquette, events, etc.
        -----------------------------------------
        */

        const cards = target.querySelectorAll(
            "[data-category], [data-status]"
        );

        console.log("Cards found:", cards.length);


        const emptyState = document.querySelector(
            "[data-empty-state]"
        );


        /*
        -----------------------------------------
        FILTER BUTTONS
        -----------------------------------------
        */

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const filter = button.dataset.filter;


                // Update active state

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );

                button.classList.add("active");


                let visibleCards = 0;


                cards.forEach(card => {

                    /*
                    Check whether this card uses
                    category or status.
                    */

                    const category = card.dataset.category;
                    const status = card.dataset.status;


                    /*
                    Use whichever attribute exists.
                    */

                    const cardValue = category ?? status;


                    if (
                        filter === "all" ||
                        cardValue === filter
                    ) {

                        card.classList.remove("hidden");

                        visibleCards++;

                    } else {

                        card.classList.add("hidden");

                    }

                });


                /*
                -----------------------------------------
                EMPTY STATE
                -----------------------------------------
                */

                if (emptyState) {

                    if (visibleCards === 0) {

                        emptyState.classList.remove("hidden");

                    } else {

                        emptyState.classList.add("hidden");

                    }

                }

            });

        });


        /*
        -----------------------------------------
        RESET BUTTON
        -----------------------------------------
        */

        const resetButtons = document.querySelectorAll(
            "[data-reset-filters]"
        );


        resetButtons.forEach(resetButton => {

            resetButton.addEventListener("click", () => {

                const resetFilter =
                    group.querySelector(
                        "[data-filter='upcoming']"
                    ) ||
                    group.querySelector(
                        "[data-filter='all']"
                    
                    );


                if (resetFilter) {

                    resetFilter.click();

                }

            });

        });

    });

}


/*
=================================================
MYTH CARDS
=================================================
*/

function initMythCards() {

    const cards = document.querySelectorAll(".myth-card");

    if (!cards.length) return;


    cards.forEach(card => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

    });

}