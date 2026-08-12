document.addEventListener("DOMContentLoaded", () => {

    const characterGrid = document.querySelector(
        "#character-buttons-grid"
    );

    const toggleLetters = document.querySelector("#toggle-az");
    const toggleNumbers = document.querySelector("#toggle-09");

    const previewAvatar = document.querySelector("#preview-avatar");
    const previewTitle = document.querySelector("#preview-title");
    const previewDescription = document.querySelector("#preview-desc");
    const previewTips = document.querySelector("#preview-tips");

    // --------------------------------------------------
    // SAFETY CHECK
    // --------------------------------------------------

    if (
        !characterGrid ||
        !toggleLetters ||
        !toggleNumbers ||
        !previewAvatar ||
        !previewTitle ||
        !previewDescription ||
        !previewTips
    ) {
        return;
    }


    // --------------------------------------------------
    // SIGN DATA
    // --------------------------------------------------

    const signs = {

        A: {
            title: 'Sign for "A"',
            description: "Closed fist, thumb rests along the side.",
            tips: [
                "Keep your dominant hand in a comfortable signing space near your shoulder.",
                "Palm usually faces the person you're signing to.",
                "Keep the fingers together and avoid unnecessary tension."
            ]
        },

        B: {
            title: 'Sign for "B"',
            description: "Hold your fingers straight together with your thumb folded across your palm.",
            tips: [
                "Keep your fingers together.",
                "Keep the palm facing outward.",
                "Relax the wrist while maintaining the handshape."
            ]
        },

        C: {
            title: 'Sign for "C"',
            description: "Curve your fingers and thumb into a C-shaped hand.",
            tips: [
                "Keep the fingers naturally curved.",
                "Leave a visible opening between the thumb and fingers.",
                "Keep the hand relaxed."
            ]
        },

        D: {
            title: 'Sign for "D"',
            description: "Extend the index finger while the remaining fingers and thumb form a circle.",
            tips: [
                "Keep the index finger upright.",
                "Keep the remaining fingers together.",
                "Maintain a relaxed wrist."
            ]
        },

        E: {
            title: 'Sign for "E"',
            description: "Curl the fingers downward while bringing the thumb across the front.",
            tips: [
                "Keep the fingers together.",
                "Avoid squeezing the hand too tightly.",
                "Practice the shape slowly before increasing speed."
            ]
        },

        F: {
            title: 'Sign for "F"',
            description: "Touch the thumb and index finger together while extending the remaining fingers.",
            tips: [
                "Keep the three extended fingers together.",
                "Make the thumb-index connection clear.",
                "Keep the hand relaxed."
            ]
        },

        G: {
            title: 'Sign for "G"',
            description: "Extend the index finger and thumb horizontally.",
            tips: [
                "Keep the index finger and thumb parallel.",
                "Curl the remaining fingers into the palm.",
                "Keep the hand steady."
            ]
        },

        H: {
            title: 'Sign for "H"',
            description: "Extend the index and middle fingers together horizontally.",
            tips: [
                "Keep the two fingers together.",
                "Curl the remaining fingers inward.",
                "Maintain a relaxed wrist."
            ]
        },

        I: {
            title: 'Sign for "I"',
            description: "Extend the little finger while keeping the other fingers folded.",
            tips: [
                "Keep the little finger upright.",
                "Keep the thumb across the folded fingers.",
                "Avoid excessive tension."
            ]
        },

        J: {
            title: 'Sign for "J"',
            description: "Begin with the little finger extended and trace a J-shaped movement.",
            tips: [
                "Start with the little finger upright.",
                "Move smoothly through the J shape.",
                "Keep the movement controlled."
            ]
        },

        K: {
            title: 'Sign for "K"',
            description: "Extend the index and middle fingers while positioning the thumb between them.",
            tips: [
                "Keep the index and middle fingers separated.",
                "Position the thumb carefully.",
                "Keep the remaining fingers folded."
            ]
        },

        L: {
            title: 'Sign for "L"',
            description: "Extend the thumb and index finger to form an L shape.",
            tips: [
                "Keep the thumb and index finger perpendicular.",
                "Fold the remaining fingers.",
                "Make the L shape clear."
            ]
        },

        M: {
            title: 'Sign for "M"',
            description: "Fold the thumb underneath three fingers.",
            tips: [
                "Keep the three fingers together.",
                "Position the thumb underneath them.",
                "Keep the hand relaxed."
            ]
        },

        N: {
            title: 'Sign for "N"',
            description: "Fold the thumb underneath two fingers.",
            tips: [
                "Keep the two fingers together.",
                "Keep the remaining fingers folded.",
                "Position the thumb underneath clearly."
            ]
        },

        O: {
            title: 'Sign for "O"',
            description: "Curve all the fingers and thumb together to form an O shape.",
            tips: [
                "Keep the fingers naturally curved.",
                "Create a clear circular opening.",
                "Avoid pressing the fingertips too hard."
            ]
        },

        P: {
            title: 'Sign for "P"',
            description: "Form a K-like handshape and orient it downward.",
            tips: [
                "Start with the correct K handshape.",
                "Orient the hand downward.",
                "Keep the movement and orientation consistent."
            ]
        },

        Q: {
            title: 'Sign for "Q"',
            description: "Form a G-like handshape and orient it downward.",
            tips: [
                "Extend the thumb and index finger.",
                "Point the hand downward.",
                "Keep the remaining fingers folded."
            ]
        },

        R: {
            title: 'Sign for "R"',
            description: "Cross the index and middle fingers while keeping the remaining fingers folded.",
            tips: [
                "Cross the two fingers clearly.",
                "Keep the remaining fingers folded.",
                "Relax the hand."
            ]
        },

        S: {
            title: 'Sign for "S"',
            description: "Make a closed fist with the thumb positioned across the front.",
            tips: [
                "Keep the fingers tightly together.",
                "Position the thumb across the fingers.",
                "Keep the wrist relaxed."
            ]
        },

        T: {
            title: 'Sign for "T"',
            description: "Position the thumb between the index and middle fingers.",
            tips: [
                "Keep the fingers folded.",
                "Make the thumb placement clear.",
                "Avoid squeezing the hand."
            ]
        },

        U: {
            title: 'Sign for "U"',
            description: "Extend the index and middle fingers together.",
            tips: [
                "Keep the two fingers touching.",
                "Keep the remaining fingers folded.",
                "Maintain a straight wrist."
            ]
        },

        V: {
            title: 'Sign for "V"',
            description: "Extend the index and middle fingers apart to form a V.",
            tips: [
                "Separate the two fingers clearly.",
                "Keep the remaining fingers folded.",
                "Keep the palm facing outward."
            ]
        },

        W: {
            title: 'Sign for "W"',
            description: "Extend the index, middle and ring fingers.",
            tips: [
                "Keep the three fingers separated.",
                "Fold the thumb and little finger.",
                "Keep the hand relaxed."
            ]
        },

        X: {
            title: 'Sign for "X"',
            description: "Extend the index finger and curl it into a hook.",
            tips: [
                "Keep the remaining fingers folded.",
                "Create a clear hook with the index finger.",
                "Keep the movement controlled."
            ]
        },

        Y: {
            title: 'Sign for "Y"',
            description: "Extend the thumb and little finger while folding the other fingers.",
            tips: [
                "Keep the thumb and little finger extended.",
                "Fold the three middle fingers.",
                "Keep the palm relaxed."
            ]
        },

        Z: {
            title: 'Sign for "Z"',
            description: "Extend the index finger and trace the shape of a Z.",
            tips: [
                "Start with the index finger extended.",
                "Trace the Z smoothly.",
                "Keep the movement clear and controlled."
            ]
        },

        0: {
            title: 'Sign for "0"',
            description: "Form a rounded handshape representing zero.",
            tips: [
                "Keep the hand relaxed.",
                "Make the circular shape clearly.",
                "Practice the shape slowly."
            ]
        },

        1: {
            title: 'Sign for "1"',
            description: "Extend the index finger while keeping the other fingers folded.",
            tips: [
                "Keep the index finger upright.",
                "Fold the remaining fingers.",
                "Keep the wrist relaxed."
            ]
        },

        2: {
            title: 'Sign for "2"',
            description: "Extend the index and middle fingers while folding the others.",
            tips: [
                "Keep the two fingers separated.",
                "Keep the remaining fingers folded.",
                "Maintain a clear handshape."
            ]
        },

        3: {
            title: 'Sign for "3"',
            description: "Extend the thumb, index and middle fingers.",
            tips: [
                "Keep the three fingers clearly extended.",
                "Fold the ring and little fingers.",
                "Keep the hand relaxed."
            ]
        },

        4: {
            title: 'Sign for "4"',
            description: "Extend four fingers while keeping the thumb folded.",
            tips: [
                "Keep the four fingers separated.",
                "Fold the thumb across the palm.",
                "Keep the fingers relaxed."
            ]
        },

        5: {
            title: 'Sign for "5"',
            description: "Extend all five fingers with the palm open.",
            tips: [
                "Spread the fingers naturally.",
                "Keep the palm open.",
                "Avoid excessive tension."
            ]
        },

        6: {
            title: 'Sign for "6"',
            description: "Form the appropriate number handshape while keeping the fingers controlled.",
            tips: [
                "Keep the handshape consistent.",
                "Practice slowly before increasing speed.",
                "Keep the wrist relaxed."
            ]
        },

        7: {
            title: 'Sign for "7"',
            description: "Form the appropriate number handshape with controlled finger positioning.",
            tips: [
                "Keep the fingers clearly positioned.",
                "Maintain a relaxed hand.",
                "Practice the shape repeatedly."
            ]
        },

        8: {
            title: 'Sign for "8"',
            description: "Form the appropriate number handshape with the fingers positioned clearly.",
            tips: [
                "Keep the hand relaxed.",
                "Make the finger positions clear.",
                "Practice until the shape feels natural."
            ]
        },

        9: {
            title: 'Sign for "9"',
            description: "Form the appropriate number handshape with controlled finger positioning.",
            tips: [
                "Keep the handshape clear.",
                "Avoid unnecessary tension.",
                "Practice slowly and deliberately."
            ]
        },

        10: {
            title: 'Sign for "10"',
            description: "Use the appropriate number handshape and movement for ten.",
            tips: [
                "Keep the movement controlled.",
                "Maintain a clear handshape.",
                "Practice the number repeatedly."
            ]
        }

    };


    // --------------------------------------------------
    // CHARACTER LISTS
    // --------------------------------------------------

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
    // UPDATE PREVIEW
    // --------------------------------------------------

    function updatePreview(character) {

        const sign = signs[character];

        if (!sign) return;

        previewAvatar.textContent = character;

        previewTitle.textContent = sign.title;

        previewDescription.textContent = sign.description;

        previewTips.innerHTML = "";

        sign.tips.forEach(tip => {

            const li = document.createElement("li");

            li.textContent = tip;

            previewTips.appendChild(li);

        });

    }


    // --------------------------------------------------
    // CREATE CHARACTER BUTTONS
    // --------------------------------------------------

    function renderCharacters(characters) {

        characterGrid.innerHTML = "";

        characters.forEach((character, index) => {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "char-select-item";

            button.textContent = character;

            if (index === 0) {

                button.classList.add(
                    "active-selection"
                );

            }

            button.addEventListener("click", () => {

                characterGrid
                    .querySelectorAll(".char-select-item")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active-selection"
                        );

                    });

                button.classList.add(
                    "active-selection"
                );

                updatePreview(character);

            });

            characterGrid.appendChild(button);

        });

        updatePreview(characters[0]);

    }


    // --------------------------------------------------
    // SWITCH TO LETTERS
    // --------------------------------------------------

    toggleLetters.addEventListener("click", () => {

        toggleLetters.classList.add("active");

        toggleNumbers.classList.remove("active");

        renderCharacters(letters);

    });


    // --------------------------------------------------
    // SWITCH TO NUMBERS
    // --------------------------------------------------

    toggleNumbers.addEventListener("click", () => {

        toggleNumbers.classList.add("active");

        toggleLetters.classList.remove("active");

        renderCharacters(numbers);

    });


    // --------------------------------------------------
    // INITIAL LOAD
    // --------------------------------------------------

    renderCharacters(letters);

});