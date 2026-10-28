/*
    All the work lives here. Add a project by adding an object
    to this list: work.html and project.html pick it up by themselves.

    kicker   = the platform / client
    title    = boventitel
    subtitle = ondertitel
    info     = short text about the piece
    image    = file next to the html files ("" shows a placeholder)
*/
const PROJECTS = [
    {
        kicker: "Culture Weekly",
        title: "Behind its mask",
        subtitle: "Analyse: postkoloniale mimicry in Radna Fabia’s gedicht ‘aantoonbaar geleverde inspanning’",
        info: "Rosalie Blom schreef dit artikel op basis van haar scriptie voor de bacheloropleiding Algemene Cultuurwetenschappen.",
        url: "https://culture-weekly.com/2024/04/30/behind-its-mask-postkoloniale-mimicry-in-radna-fabias-gedicht-aantoonbaar-geleverde-inspanning/",
        image: "artikelpalmbomen.png"
    },
    {
        kicker: "Radboud Creative Collective",
        title: "Leertraject duurzaam leiderschap",
        subtitle: "Vergroot jouw impact als duurzame leider",
        info: "Tekst over de cursus ‘Young Leadership for Sustainability’ van Radboud Academy, in opdracht van het Radboud Creative Collective.",
        url: "https://www.duurzaam-ondernemen.nl/vergroot-jouw-impact-als-duurzame-leider/",
        image: "_DSC9365.png"
    },
    {
        kicker: "Jeugdbescherming",
        title: "Zeg wat je doet, doe wat je zegt",
        subtitle: "Interview met trainee gezinsmanager Lotte",
        info: "Over de uitdagingen en keuzes binnen een loopbaan in de jeugdzorg.",
        url: "https://openhartig.jeugdbescherming.nl/17-2026/zeg-wat-je-doet-en-doe-wat-je-zegt/",
        image: "_DSC9364.png"
    },
    {
        kicker: "Tijdschrift Lover",
        title: "Good for her",
        subtitle: "De groeiende populariteit van fictieve vrouwelijke woede",
        info: "Analyse van de trend van ‘female rage’ binnen westerse visuele popcultuur.",
        url: "https://www.tijdschriftlover.nl/cultuur/good_for_her_de_groeiende_populariteit_van_fictieve_vrouwelijke_woede",
        image: "_DSC9357.png"
    },
    {
        kicker: "Tijdschrift Lover",
        title: "Inclusie in de Nijmeegse skatescene",
        subtitle: "Interview met collectief de Rollende Minas",
        info: "In samenwerking met culturele Stichting Hubert realiseerden de Rollende Mina’s Nijmegens eerste skate-café. En niet zomaar een skate-café: een ruimte waar iedereen welkom is.",
        url: "https://www.tijdschriftlover.nl/maatschappij/de_inclusieve_skatescene_van_de_rollende_minas",
        image: ""
    },
    {
        kicker: "3voor12 Lokaal",
        title: "Zingen zonder erbij na te denken",
        subtitle: "Een rapportage over Koor Duniya",
        info: "Een stuk over de Afghaanse, gevluchte ‘mevrouw O’, die in Utrecht lid werd van Koor Duniya. Over de meerwaarde van muziek en over hoe ook vrijheid aangeleerd moet worden.",
        url: "https://3voor12lokaal.vpro.nl/artikelen/zingen-zonder-erbij-na-te-denken",
        image: ""
    },
    {
        kicker: "3voor12 Lokaal",
        title: "Maria Iskariot komt (terug) naar Utrecht",
        subtitle: "Interview met Helena Cazaerk van punkband Maria Iskariot",
        info: "",
        url: "https://3voor12lokaal.vpro.nl/artikelen/maria-iskariot-komt-terug-naar-utrecht",
        image: ""
    }
];


/*
    Builds the picture for a project. When there is no image
    (or the file is missing) a quiet placeholder with the
    platform name is shown instead of a broken image.
*/
function createProjectImage(project) {

    function placeholder() {
        const div = document.createElement("div");
        div.className = "image-placeholder";
        div.textContent = project.kicker;
        return div;
    }

    if (!project.image) {
        return placeholder();
    }

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;

    img.addEventListener("error", () => {
        img.replaceWith(placeholder());
    });

    return img;
}
