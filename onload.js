window.onload = () => {

    console.log("page loaded"); // Things in this section run after the page loaded

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    console.log(vw);

    // Initiate eye movement (only on screen bigger than 700)
    if (vw > 700) {
        const parent = document.getElementById(EYES_CONTAINER);
        const children = parent.querySelectorAll(":scope > .eye-container");
        children.forEach(e => {
            const id = e.id;
            EYE_IDS.push(id);
        });

        renderEyes();
    }

    // Initiate emoji
    randomEmoji();
}


