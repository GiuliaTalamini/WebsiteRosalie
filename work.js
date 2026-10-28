const carousel = document.getElementById("carousel");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");


/*
    Build one card per project. The list is placed three times
    after each other; the middle copy is the one you start on.
    Whenever you scroll into the first or last copy we silently
    jump one copy further, so the carousel never ends.
*/
function buildCard(project, index, isClone) {

    const card = document.createElement("a");
    card.className = "project-card";
    card.href = "project.html?project=" + (index + 1);
    card.draggable = false;

    if (isClone) {
        card.setAttribute("aria-hidden", "true");
        card.tabIndex = -1;
    }

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "project-image";
    imageWrapper.appendChild(createProjectImage(project));

    if (project.type) {
        const label = document.createElement("span");
        label.className = "project-label";
        label.textContent = project.type;
        imageWrapper.appendChild(label);
    }

    const info = document.createElement("div");
    info.className = "project-info";

    const title = document.createElement("h2");
    title.textContent = project.title;

    const subtitle = document.createElement("p");
    subtitle.textContent = project.subtitle;

    info.append(title, subtitle);
    card.append(imageWrapper, info);

    return card;
}

for (let copy = 0; copy < 3; copy++) {
    PROJECTS.forEach((project, index) => {
        carousel.appendChild(buildCard(project, index, copy !== 1));
    });
}


/*
    Width of one full copy of the list (cards + gaps).
*/
function copyWidth() {

    const cards = carousel.querySelectorAll(".project-card");

    return cards[PROJECTS.length].offsetLeft - cards[0].offsetLeft;
}


/*
    Keep the scroll position inside the middle copy.
    Returns how far we jumped (0 when nothing moved).
*/
function wrapScroll() {

    const width = copyWidth();
    const x = carousel.scrollLeft;

    let shift = 0;

    if (x < width * 0.5) {
        shift = width;
    } else if (x > width * 1.5) {
        shift = -width;
    }

    if (shift !== 0) {
        const before = carousel.style.scrollBehavior;
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = x + shift;
        carousel.style.scrollBehavior = before;
    }

    return shift;
}


function startInMiddle() {

    const first = carousel.querySelector(".project-card");
    const middle = carousel.querySelectorAll(".project-card")[PROJECTS.length];

    carousel.style.scrollBehavior = "auto";
    carousel.scrollLeft = middle.offsetLeft - first.offsetLeft;
    carousel.style.scrollBehavior = "";
}

startInMiddle();
window.addEventListener("load", startInMiddle);
window.addEventListener("resize", startInMiddle);


/*
    Wait until scrolling has stopped before jumping,
    so a smooth scroll or a swipe is never interrupted.
*/
let wrapTimer;

carousel.addEventListener("scroll", () => {

    clearTimeout(wrapTimer);
    wrapTimer = setTimeout(wrapScroll, 120);
});


/*
    Arrows scroll one card at a time.
*/
function scrollByCard(direction) {

    const card = carousel.querySelector(".project-card");

    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;

    carousel.scrollBy({
        left: direction * (card.offsetWidth + gap),
        behavior: "smooth"
    });
}

previousButton.addEventListener("click", () => scrollByCard(-1));
nextButton.addEventListener("click", () => scrollByCard(1));


/*
    Drag to scroll with the mouse.
    (Touch screens already scroll natively.)
*/
let isDragging = false;
let hasDragged = false;
let startX = 0;
let startScroll = 0;

carousel.addEventListener("pointerdown", (event) => {

    if (event.pointerType !== "mouse") {
        return;
    }

    isDragging = true;
    hasDragged = false;
    startX = event.clientX;
    startScroll = carousel.scrollLeft;
});

window.addEventListener("pointermove", (event) => {

    if (!isDragging) {
        return;
    }

    const distance = event.clientX - startX;

    if (Math.abs(distance) > 5) {
        hasDragged = true;
        carousel.style.scrollBehavior = "auto";
    }

    carousel.scrollLeft = startScroll - distance;

    // jumped to the other copy: keep the drag where it was
    startScroll += wrapScroll();
});

window.addEventListener("pointerup", () => {

    isDragging = false;
    carousel.style.scrollBehavior = "";
});

/*
    Letting go after a drag must not open the project.
*/
carousel.addEventListener("click", (event) => {

    if (hasDragged) {
        event.preventDefault();
        hasDragged = false;
    }
});
