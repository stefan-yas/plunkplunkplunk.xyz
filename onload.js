window.onload = () => {

    console.log("page loaded"); // Things in this section run after the page loaded

    // Initiate eye movement
    EYE_IDS.forEach(e => {
        const container = document.getElementById(e);
        const baseElement = container.querySelector(".eye-base");
        const dotElement = baseElement.querySelector(".eye-dot");        
        renderEye(baseElement, dotElement);          
    });

    // Initiate emoji
    randomEmoji();
}