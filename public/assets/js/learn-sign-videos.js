document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.querySelector("#video-search-input");

    const topicFilter =
        document.querySelector("#filter-topic");

    const sortOrder =
        document.querySelector("#sort-order");

    const grid =
        document.querySelector("#video-grid-matrix");

    const emptyState =
        document.querySelector("#empty-state-notice");

    const resetButton =
        document.querySelector("#reset-video-filters");

    if (!searchInput || !topicFilter || !sortOrder || !grid) {
        return;
    }


    function getCards() {

        return Array.from(
            grid.querySelectorAll(".video-dir-card")
        );

    }


    function filterVideos() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();

        const selectedTopic =
            topicFilter.value;


        const cards = getCards();

        let visibleCount = 0;


        cards.forEach(card => {

            const title =
                card.dataset.title || "";

            const topic =
                card.dataset.topic || "";


            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm);


            const matchesTopic =
                selectedTopic === "all" ||
                topic === selectedTopic;


            const shouldShow =
                matchesSearch &&
                matchesTopic;


            if (shouldShow) {

                card.classList.remove("hidden");

                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    function sortVideos() {

        const cards = getCards();

        const direction =
            sortOrder.value;


        cards.sort((a, b) => {

            const dateA =
                new Date(a.dataset.date);

            const dateB =
                new Date(b.dataset.date);


            if (direction === "oldest") {

                return dateA - dateB;

            }

            return dateB - dateA;

        });


        cards.forEach(card => {

            grid.appendChild(card);

        });

    }


    searchInput.addEventListener(
        "input",
        filterVideos
    );


    topicFilter.addEventListener(
        "change",
        filterVideos
    );


    sortOrder.addEventListener(
        "change",
        () => {

            sortVideos();

            filterVideos();

        }
    );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                topicFilter.value = "all";

                sortOrder.value = "latest";

                sortVideos();

                filterVideos();

            }
        );

    }


    sortVideos();

    filterVideos();

});