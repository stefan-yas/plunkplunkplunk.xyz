window.onload = () => {
    console.log("load");
    // things in this section happen every time the page loads

    /* I moved this here because the element does keep moving around. If you leave it in the event listener section, the function reads the location and size of the stationary element every time the mouse moves, which isn't necessary, */
    const baseElement = document.getElementById("behold");
    const baseBox = baseElement.getBoundingClientRect();
    console.log(baseBox);

    const anchorX = baseBox.left + baseBox.width / 2;
    const anchorY = baseBox.top + baseBox.height / 2;
    console.log(anchorX);

    addEventListener("mousemove", (e) => {
        // things in this section happen every time mouse changes position

        //console.log(e);
    
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        //console.log("x,y: " + mouseX + ", " + mouseY);
    
        const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    
        const eyes = document.querySelectorAll(".eye")
        eyes.forEach(eye => {
            eye.style.transform = `rotate(${90 + angleDeg}deg)`;
        })
    
    })
    
    function angle(cx, cy, ex, ey) {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        const deg = rad * 180 / Math.PI;
    
        return deg;
    }
}

