const carousel = document.getElementById("carousel");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");


/*
    Build one card per project.
*/
PROJECTS.forEach((project, index) => {

    const card = document.createElement("a");
    card.className = "project-card";
    card.href = "project.html?project=" + (index + 1);
    card.draggable = false;

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "project-image";
    imageWrapper.appendChild(createProjectImage(project));

    const info = document.createElement("div");
    info.className = "project-info";

    const title = document.createElement("h2");
    title.textContent = project.title;

    const subtitle = document.createElement("p");
    subtitle.textContent = project.subtitle;

    info.append(title, subtitle);
    card.append(imageWrapper, info);
    carousel.appendChild(card);
});


/*
    Arrows scroll one card at a time.
*/
function scrollByCard(direction) {

    const card = carousel.querySelector(".project-card");

    if (!card) {
        return;
    }

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
