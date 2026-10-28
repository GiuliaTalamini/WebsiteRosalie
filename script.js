const portrait = document.getElementById("portrait");
const image = document.getElementById("portrait-image");

/*
    The photo looks to the right by default.
    Cursor to the right → as the photo is.
    Cursor to the left  → mirrored.
*/
let facingLeft = false;


function setDirection(cursorIsLeft) {

    if (cursorIsLeft === facingLeft) {
        return;
    }

    facingLeft = cursorIsLeft;

    image.style.transform = cursorIsLeft ? "scaleX(-1)" : "scaleX(1)";
}


/*
    Work out whether the cursor is to
    the left or right of the portrait.
*/
function updateDirection(clientX) {

    const rect = portrait.getBoundingClientRect();

    const centre = rect.left + rect.width / 2;

    setDirection(clientX < centre);
}


/*
    Desktop / trackpad: follows the cursor anywhere on the page.
*/
window.addEventListener("pointermove", (event) => {

    if (event.pointerType === "mouse") {
        updateDirection(event.clientX);
    }

});


/*
    Phone / touchscreen: tapping anywhere on the page
    makes her look towards that side.
*/
window.addEventListener("pointerdown", (event) => {

    updateDirection(event.clientX);

});
