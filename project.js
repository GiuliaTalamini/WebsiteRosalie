/*
    project.html?project=3 shows the third project in projects.js.
*/
const params = new URLSearchParams(window.location.search);
const number = parseInt(params.get("project"), 10);

const project = PROJECTS[number - 1] || PROJECTS[0];

document.title = project.title + " — Rosalie Blom";

document.getElementById("project-category").textContent = project.kicker;
document.getElementById("project-title").textContent = project.title;
document.getElementById("project-subtitle").textContent = project.subtitle;

const description = document.getElementById("project-description");

if (project.info) {
    description.textContent = project.info;
} else {
    description.remove();
}

document.getElementById("project-image").appendChild(
    createProjectImage(project)
);

document.getElementById("project-link").href = project.url;
