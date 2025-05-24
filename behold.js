// The only thing you need to change here are the parts under Settings.

// Settings:
const EYES_CONTAINER = "alex-g"; // Add ID of the parent element (direct parent of eye-container class)
const PROJECTION = 0.03 // default 0.03 Drag/projection effect - decrease number to increase it or set to 1 to remove it (% between base center and mouse position)
const DELAY = 30; // default 30

const sumArray = (array) => {
    return array.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

let EYE_IDS = [];

function renderEyes() {
    
    // Find center of each eye
    let eyesX = [];
    let eyesY = [];
    EYE_IDS.forEach(e => {
        const container = document.getElementById(e);
        const baseElement = container.querySelector(".eye-base");          
        const baseBox = baseElement.getBoundingClientRect();
        const Xb = baseBox.x + (baseBox.width / 2) ;
        const Yb = baseBox.y + (baseBox.height / 2) ;
        console.log("center of base: " + Xb, Yb);

        eyesX.push(Xb);
        eyesY.push(Yb);
    });
   
    // Calculate center point between all eyes
    let centerX = (sumArray(eyesX))/eyesX.length; 
    console.log("x between eyes: " +centerX );
    let centerY = (sumArray(eyesY))/eyesY.length + window.pageYOffset;
    console.log("y between eyes: " +centerY );

    
    EYE_IDS.forEach(e => {
        const container = document.getElementById(e);
        const baseElement = container.querySelector(".eye-base");
        const dotElement = baseElement.querySelector(".eye-dot");        
        renderEye(baseElement, dotElement);
    });

    function renderEye(baseEl, dotEl) {
        // Things in this section run after the page loaded
    
        const baseRadius = baseEl.getBoundingClientRect().height / 2;
        const dotRadius = dotEl.getBoundingClientRect().height / 2;
        const r = baseRadius - dotRadius + 1; // moved inwards by the side of eye dot, but minus 1px (which makes it look smoother)
        //console.log("center of base: " + centerX, centerY);
    
        const linearInterpolation = (a, b, p) => (1-p)*a + p*b;
    
        function dotPosition(e) { // e is mouse movement event
    
            // Get mouse position
            let mouseX = e.clientX;
            let mouseY = e.clientY + window.pageYOffset;;
            //console.log("mouse: " + mouseX, mouseY);
    
            // Add drag/projection/3d effect (amount can be changed in the settings section)
            function dotPositionWithProjection(mouse,center) {
                if (mouseX < centerY) {
                    return linearInterpolation(mouse, center, 1-PROJECTION);
                } else {
                    return  linearInterpolation(center, mouse, PROJECTION);
                }
            }
            let Xd = dotPositionWithProjection(mouseX,centerX);
            let Yd = dotPositionWithProjection(mouseY,centerY);
        
            // Calculate distance between center of the eye and the dot
            const d = Math.sqrt( Math.pow( Xd-centerX, 2) + Math.pow( Yd-centerY, 2));
    
            // Limit the dot within the eye
            let Xr;
            let Yr;
            const dotPositionContained = () => {
                if (d+dotRadius < baseRadius) { // -> it is inside of the circle
                    Xr = Xd;
                    Yr = Yd; 
                    //console.log("IN THE CIRCLE");
                } else { // -> not inside of the circle
                    Xr = ( r * (Xd - centerX) / d) + centerX;
                    Yr = ( r * (Yd - centerY) / d) + centerY;
                }
            }
            dotPositionContained();
    
            // Update position of the dot
            setTimeout(function(){
          
                //how much to move from center
                const Xm = Xr-centerX;
                const Ym = Yr-centerY;
    
                // set new position
                dotEl.style.transform = `translate(${Xm}px,${Ym}px)`;
                //console.log("new pos: " + Xm, Ym);
    
            }, DELAY); 
        }
    
        addEventListener("mousemove", (e) => { dotPosition(e); });
    }
}