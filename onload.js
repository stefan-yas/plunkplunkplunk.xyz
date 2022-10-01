window.onload = () => {

    console.log("page loaded"); // Things in this section run after the page loaded

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    console.log(vw);

    // Initiate eye movement (only on screen bigger than 700)
    if (vw > 700) {
        EYE_IDS.forEach(e => {
            const container = document.getElementById(e);
            const baseElement = container.querySelector(".eye-base");
            const dotElement = baseElement.querySelector(".eye-dot");        
            renderEye(baseElement, dotElement);          
        });
    }

    // Initiate emoji
    randomEmoji();
}


