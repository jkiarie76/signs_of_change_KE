document.addEventListener("DOMContentLoaded", () => {

    const characterGrid = document.querySelector(
        "#character-buttons-grid"
    );

    const toggleLetters = document.querySelector(
        "#toggle-az"
    );

    const toggleNumbers = document.querySelector(
        "#toggle-09"
    );

    const languageSelect = document.querySelector(
        "#sign-language-select"
    );

    const previewAvatar = document.querySelector(
        "#preview-avatar"
    );

    const previewTitle = document.querySelector(
        "#preview-title"
    );

    const previewLanguage = document.querySelector(
        "#preview-language"
    );

    const previewDescription = document.querySelector(
        "#preview-desc"
    );

    const previewTips = document.querySelector(
        "#preview-tips"
    );

    const previewMedia = document.querySelector(
        "#preview-media"
    );

    const previewEmptyState = document.querySelector(
        "#preview-empty-state"
    );


    // --------------------------------------------------
    // SAFETY CHECK
    // --------------------------------------------------

    if (
        !characterGrid ||
        !toggleLetters ||
        !toggleNumbers ||
        !languageSelect ||
        !previewAvatar ||
        !previewTitle ||
        !previewLanguage ||
        !previewDescription ||
        !previewTips ||
        !previewMedia ||
        !previewEmptyState
    ) {
        return;
    }


    // --------------------------------------------------
    // CMS DATA
    // --------------------------------------------------

    const signs = Array.isArray(
        window.learnSignData
    )
        ? window.learnSignData
        : [];


    // --------------------------------------------------
    // CHARACTER LISTS
    // --------------------------------------------------

    const letters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const numbers = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ];


    // --------------------------------------------------
    // CURRENT STATE
    // --------------------------------------------------

    let currentMode = "letters";

    let currentLanguage = "";



    // --------------------------------------------------
    // GET AVAILABLE SIGN LANGUAGES
    // --------------------------------------------------

    const languages = [
        ...new Set(
            signs
                .map(
                    (sign) =>
                        sign.signLanguage
                )
                .filter(Boolean)
        )
    ];


    // --------------------------------------------------
    // POPULATE LANGUAGE SELECTOR
    // --------------------------------------------------

    function populateLanguages() {

        languageSelect.innerHTML = "";


        if (!languages.length) {

            const option =
                document.createElement("option");

            option.value = "";

            option.textContent =
                "No sign languages available";

            languageSelect.appendChild(
                option
            );

            return;
        }


        languages.forEach(
            (language) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    language;

                option.textContent =
                    language;

                languageSelect.appendChild(
                    option
                );

            }
        );


        // First available language

        currentLanguage =
            languages[0];

        languageSelect.value =
            currentLanguage;

    }



    // --------------------------------------------------
    // GET CHARACTERS FOR CURRENT LANGUAGE
    // --------------------------------------------------

    function getCharactersForCurrentLanguage() {

        const characterList =
            currentMode === "letters"
                ? letters
                : numbers;


        return characterList.map(
            (character) => {

                return signs.find(
                    (sign) =>
                        sign.signLanguage ===
                            currentLanguage &&
                        sign.characterType ===
                            (
                                currentMode ===
                                "letters"
                                    ? "letter"
                                    : "number"
                            ) &&
                        sign.character ===
                            character
                );

            }
        );

    }



    // --------------------------------------------------
    // SHOW EMPTY PREVIEW
    // --------------------------------------------------

    function showEmptyPreview(
        character = null
    ) {

        previewEmptyState.hidden =
            false;


        previewAvatar.textContent =
            character ?? "—";


        previewTitle.textContent =
            character
                ? `Sign for "${character}"`
                : "No sign available";


        previewLanguage.textContent =
            currentLanguage
                ? currentLanguage
                : "";


        previewDescription.textContent =
            character
                ? "Sign information for this character has not been published yet."
                : "No signs are currently available for this selection.";


        previewTips.innerHTML = "";


        previewMedia.innerHTML = "";

    }



    // --------------------------------------------------
    // UPDATE PREVIEW
    // --------------------------------------------------

    function updatePreview(sign) {

        if (!sign) {

            showEmptyPreview();

            return;
        }


        // Hide empty state

        previewEmptyState.hidden =
            true;


        // Character

        previewAvatar.textContent =
            sign.character;


        // Title

        previewTitle.textContent =
            sign.title;


        // Language + country

        previewLanguage.textContent =
            sign.country
                ? `${sign.signLanguage} · ${sign.country}`
                : sign.signLanguage;


        // Description

        previewDescription.textContent =
            sign.description;


        // Tips

        previewTips.innerHTML = "";


        sign.tips.forEach(
            (tip) => {

                const li =
                    document.createElement(
                        "li"
                    );

                li.textContent =
                    tip;

                previewTips.appendChild(
                    li
                );

            }
        );


        // Media

        previewMedia.innerHTML = "";


        if (
            sign.media &&
            sign.media.type === "image"
        ) {

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                sign.media.src;

            image.alt =
                sign.media.alt ||
                `Sign for ${sign.character}`;

            previewMedia.appendChild(
                image
            );

        }


        if (
            sign.media &&
            sign.media.type === "video"
        ) {

            const video =
                document.createElement(
                    "video"
                );

            video.src =
                sign.media.src;

            video.controls = true;

            video.playsInline = true;

            previewMedia.appendChild(
                video
            );

        }

    }



    // --------------------------------------------------
    // CREATE CHARACTER BUTTONS
    // --------------------------------------------------

    function renderCharacters() {

        characterGrid.innerHTML = "";


        const characterSigns =
            getCharactersForCurrentLanguage();


        if (!characterSigns.length) {

            showEmptyPreview();

            return;
        }


        characterSigns.forEach(
            (sign, index) => {

                const character =
                    currentMode === "letters"
                        ? letters[index]
                        : numbers[index];


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "char-select-item";


                button.textContent =
                    character;


                // --------------------------------------------------
                // AVAILABLE SIGN
                // --------------------------------------------------

                if (sign) {

                    if (index === 0) {

                        button.classList.add(
                            "active-selection"
                        );

                    }


                    button.addEventListener(
                        "click",
                        () => {

                            characterGrid
                                .querySelectorAll(
                                    ".char-select-item"
                                )
                                .forEach(
                                    (btn) => {

                                        btn.classList.remove(
                                            "active-selection"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active-selection"
                            );


                            updatePreview(
                                sign
                            );

                        }
                    );

                }


                // --------------------------------------------------
                // UNAVAILABLE SIGN
                // --------------------------------------------------

                else {

                    button.classList.add(
                        "character-unavailable"
                    );


                    button.addEventListener(
                        "click",
                        () => {

                            characterGrid
                                .querySelectorAll(
                                    ".char-select-item"
                                )
                                .forEach(
                                    (btn) => {

                                        btn.classList.remove(
                                            "active-selection"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active-selection"
                            );


                            showEmptyPreview(
                                character
                            );

                        }
                    );

                }


                characterGrid.appendChild(
                    button
                );

            }
        );


        // --------------------------------------------------
        // SELECT FIRST AVAILABLE SIGN
        // --------------------------------------------------

        const firstAvailable =
            characterSigns.find(
                (sign) => sign
            );


        if (firstAvailable) {

            const firstButton =
                [...characterGrid.children]
                    .find(
                        (button) =>
                            button.textContent ===
                            firstAvailable.character
                    );


            if (firstButton) {

                firstButton.classList.add(
                    "active-selection"
                );

            }


            updatePreview(
                firstAvailable
            );

        } else {

            showEmptyPreview();

        }

    }



    // --------------------------------------------------
    // LANGUAGE CHANGE
    // --------------------------------------------------

    languageSelect.addEventListener(
        "change",
        () => {

            currentLanguage =
                languageSelect.value;


            renderCharacters();

        }
    );



    // --------------------------------------------------
    // LETTERS
    // --------------------------------------------------

    toggleLetters.addEventListener(
        "click",
        () => {

            currentMode =
                "letters";


            toggleLetters.classList.add(
                "active"
            );


            toggleNumbers.classList.remove(
                "active"
            );


            renderCharacters();

        }
    );



    // --------------------------------------------------
    // NUMBERS
    // --------------------------------------------------

    toggleNumbers.addEventListener(
        "click",
        () => {

            currentMode =
                "numbers";


            toggleNumbers.classList.add(
                "active"
            );


            toggleLetters.classList.remove(
                "active"
            );


            renderCharacters();

        }
    );



    // --------------------------------------------------
    // INITIAL LOAD
    // --------------------------------------------------

    populateLanguages();

    renderCharacters();

});