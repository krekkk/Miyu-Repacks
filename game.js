const games = [
    {
        title: "Miyu Windows Toolkit",
        developer: "Miyu",
        year: "2026",
        page: "miyutoolkit.html"
    },

    {
        title: "Grid Auto Sport Mobile",
        developer: "Codemasters",
        year: "2014",
        page: "gridauto.html"
    },

    {
        title: "Grand Theft Auto 3 Mobile",
        developer: "rokstar Games",
        year: "2011",
        page: "gta3mobile.html"
            
];


// =====================================================
// GAME LIST
// =====================================================

function renderGames() {

    const container = document.querySelector(".container");

    if (!container) {
        console.error("Container tidak ditemukan!");
        return;
    }

    // Hapus game hasil render sebelumnya
    document.querySelectorAll(".js-game").forEach(function (item) {
        item.remove();
    });


    // Cari posisi sebelum footer
    const footer = document.querySelector(".footer");


    games.forEach(function (game) {

        const link = document.createElement("a");

        link.className = "js-game";

        link.href = game.page;

        link.innerHTML = `
            <span class="js-game-title">
                ${game.title}
            </span>

            <span class="js-game-info">
                ${game.developer}
            </span>

            <span class="js-game-info">
                ${game.year}
            </span>
        `;


        if (footer) {
            container.insertBefore(link, footer);
        } else {
            container.appendChild(link);
        }

    });

}


// =====================================================
// STYLE GAME
// =====================================================

function loadGameStyle() {

    if (document.getElementById("js-game-style")) {
        return;
    }


    const style = document.createElement("style");

    style.id = "js-game-style";

    style.textContent = `

        .js-game {

            width:700px;

            max-width:100%;

            display:block;

            padding:14px 5px;

            text-decoration:none;

            color:white;

            font-family:Consolas,monospace;

            border-bottom:1px solid #222;

            transition:.2s;

            scroll-margin-top:20px;

        }


        .js-game:hover {

            padding-left:12px;

            border-bottom-color:#1e90ff;

        }


        .js-game-title {

            display:block;

            color:#1e90ff;

            font-family:'Oswald',sans-serif;

            font-size:24px;

            text-shadow:0 0 8px #1e90ff;

            transition:.2s;

        }


        .js-game-info {

            display:inline-block;

            margin-top:5px;

            margin-right:18px;

            color:#777;

            font-size:13px;

        }


        .js-game:hover .js-game-title {

            color:#00ffcc;

            text-shadow:0 0 8px #00ffcc;

        }

    `;


    document.head.appendChild(style);

}


// =====================================================
// SEARCH
// =====================================================

function searchGame() {

    const searchInput = document.getElementById("search");

    if (!searchInput) {
        return;
    }


    const input =
        searchInput.value
        .toLowerCase()
        .trim();


    const items =
        document.querySelectorAll(
            ".cmd, .js-game"
        );


    let firstMatch = null;


    items.forEach(function (item) {

        const titleElement =
            item.querySelector(".cmd-title") ||
            item.querySelector(".js-game-title");


        if (!titleElement) {
            return;
        }


        const title =
            titleElement.innerText
            .toLowerCase();


        if (input === "") {

            item.style.display = "";

            return;
        }


        if (title.includes(input)) {

            item.style.display = "";


            if (firstMatch === null) {

                firstMatch = item;

            }

        } else {

            item.style.display = "none";

        }

    });


    if (firstMatch) {

        firstMatch.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =====================================================
// FILTER CATEGORY
// =====================================================

function filterCategory(category) {

    const items =
        document.querySelectorAll(".cmd");


    items.forEach(function (game) {

        const gameCategory =
            game.dataset.category;


        if (category === "all") {

            game.style.display = "";

            return;

        }


        if (gameCategory === category) {

            game.style.display = "";

        } else {

            game.style.display = "none";

        }

    });


    // Game dari game.js tetap ditampilkan
    document.querySelectorAll(".js-game").forEach(function (game) {

        game.style.display = "";

    });

}


// =====================================================
// SEARCH EVENT
// =====================================================

function setupSearch() {

    const searchInput =
        document.getElementById("search");


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            searchGame();

        }
    );

}


// =====================================================
// LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadGameStyle();

        renderGames();

        setupSearch();

    }
);
