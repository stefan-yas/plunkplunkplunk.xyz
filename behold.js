// The only thing you need to change here are the parts under Settings.

// Settings:
const EYE_IDS = ["leftEye", "rightEye"]; // Add IDs of each eye into this array
const PROJECTION = 0.03 // default: 0.03 Drag/projection effect - decrease number to increase it or set to 1 to remove it (% between base center and mouse position)
const DELAY = 100; // default: 100

window.onload = () => {

    console.log("page loaded"); // Things in this section run after the page loaded

    EYE_IDS.forEach(e => {
        const container = document.getElementById(e);
        const baseElement = container.querySelector(".eye-base");
        const dotElement = baseElement.querySelector(".eye-dot");
        renderEye(baseElement, dotElement);
    })
}

function renderEye(baseEl, dotEl) {
    // Things in this section run after the page loaded

    const baseBox = baseEl.getBoundingClientRect();
    const baseRadius = baseBox.height / 2;
    const dotBox = dotEl.getBoundingClientRect();
    const dotRadius = dotBox.height / 2;
    const r = baseRadius - dotRadius + 1; // moved inwards by the side of eye dot, but minus 1px (which makes it look smoother)

    console.log(baseRadius, dotRadius);

    // Find center of the base element
    const Xb = baseBox.x + (baseBox.width / 2);
    const Yb = baseBox.y + (baseBox.height / 2);

    const linearInterpolation = (a, b, p) => (1-p)*a + p*b;

    function dotPosition(e) { // e is mouse movement event
        // Things in this section happen every time mouse moves

        // Get mouse position
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // Add drag/prejection/3d effect (amount can be changed in the settings section)
        function dotPositionWithProjection(mouse,center) {
            if (mouseX < Xb) {
                return linearInterpolation(mouse, center, 1-PROJECTION);
            } else {
                return  linearInterpolation(center, mouse, PROJECTION);
            }
        }
        let Xd = dotPositionWithProjection(mouseX,Xb);
        let Yd = dotPositionWithProjection(mouseY,Yb);
    
        // Calculate distance between center of the eye and the dot
        const d = Math.sqrt( Math.pow( Xd-Xb, 2) + Math.pow( Yd-Yb, 2));
        //console.log(d);

        // Limit the dot within the eye
        let Xr;
        let Yr;
        const dotPositionContained = () => {
            if (d+dotRadius < baseRadius) { // -> it is inside of the circle
                Xr = Xd;
                Yr = Yd; 
            } else { // -> not inside of the circle
                Xr = ( r * (Xd - Xb) / d) + Xb;
                Yr = ( r * (Yd - Yb) / d) + Yb;
            }
        }
        dotPositionContained();

        // Update position of the dot
        Xr = Xr - dotRadius;
        Yr = Yr - dotRadius;
        console.log(Xr);
        console.log(Yr);
        setTimeout(function(){
            dotEl.style.left = `${Xr}px`;
            dotEl.style.top = `${Yr}px`;

        }, DELAY); 
    }

    addEventListener("mousemove", (e) => { dotPosition(e); })

}