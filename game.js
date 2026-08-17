// =====================================================
// DATABASE GAME
// =====================================================

const games = [

    {
        title: "Miyu Windows Toolkit",
        developer: "Miyu",
        year: "2026",
        page: "miyutoolkit.html",
        category: "pc"
    },

    {
        title: "Grid Auto Sport Mobile",
        developer: "Codemasters",
        year: "2014",
        page: "gridauto.html",
        category: "mobile"
    },

    {
        title: "Grand Theft Auto 3 Mobile",
        developer: "Rockstar Games",
        year: "2011",
        page: "gta3mobile.html",
        category: "mobile"
    }

];


// =====================================================
// RENDER GAME DARI GAME.JS
// =====================================================

function renderGames() {

    const container = document.querySelector(".container");

    if (!container) {
        console.error("Container tidak ditemukan!");
        return;
    }

    // Hapus hasil render sebelumnya
    document.querySelectorAll(".js-game").forEach(function (item) {
        item.remove();
    });

    // Cari footer
    const footer = document.querySelector(".footer");

    games.forEach(function (game, index) {

        const link = document.createElement("a");

        link.className = "js-game";

        // ID unik untuk setiap game
        link.id = "js-game-" + index;

        // Data untuk search dan category
        link.dataset.category = game.category || "all";

        // Link halaman game
        link.href = game.page;

        link.innerHTML = `

            <span class="js-game-title">
                ${game.title}
            </span>

            <span class="js-game-info">
                Developer: ${game.developer}
            </span>

            <span class="js-game-info">
                ${game.year}
            </span>

        `;

        // Masukkan sebelum footer
        if (footer) {

            container.insertBefore(link, footer);

        } else {

            container.appendChild(link);

        }

    });

}


// =====================================================
// STYLE GAME.JS
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


        .js-game.hidden {

            display:none !important;

        }

    `;

    document.head.appendChild(style);

}


// =====================================================
// SEARCH SEMUA GAME
// HTML .CMD + GAME.JS
// =====================================================

function searchGame() {

    const searchInput = document.getElementById("search");

    if (!searchInput) {
        return;
    }


    const input = searchInput.value
        .toLowerCase()
        .trim();


    // Ambil game HTML
    const htmlGames = document.querySelectorAll(".cmd");

    // Ambil game dari game.js
    const jsGames = document.querySelectorAll(".js-game");


    // Gabungkan semuanya
    const allGames = [
        ...htmlGames,
        ...jsGames
    ];


    const noResult = document.getElementById("no-result");

    let firstMatch = null;

    let found = false;


    allGames.forEach(function (game) {

        // Cari judul HTML
        const titleElement =
            game.querySelector(".cmd-title") ||
            game.querySelector(".js-game-title");


        if (!titleElement) {
            return;
        }


        const title = titleElement.innerText
            .toLowerCase()
            .trim();


        // Kalau search kosong
        if (input === "") {

            game.style.display = "";

            return;

        }


        // Cocok
        if (title.includes(input)) {

            game.style.display = "";

            found = true;


            if (!firstMatch) {

                firstMatch = game;

            }

        }

        // Tidak cocok
        else {

            game.style.display = "none";

        }

    });


    // =================================================
    // HASIL SEARCH
    // =================================================

    if (noResult) {

        if (input !== "" && !found) {

            noResult.classList.add("show");

        } else {

            noResult.classList.remove("show");

        }

    }


    // =================================================
    // SCROLL KE HASIL PERTAMA
    // =================================================

    if (firstMatch && input !== "") {

        setTimeout(function () {

            firstMatch.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }

}


// =====================================================
// FILTER CATEGORY
// =====================================================

function filterCategory(category) {

    const htmlGames =
        document.querySelectorAll(".cmd");

    const jsGames =
        document.querySelectorAll(".js-game");


    // ============================
    // GAME HTML
    // ============================

    htmlGames.forEach(function (game) {

        const gameCategory =
            game.dataset.category;


        if (category === "all") {

            game.style.display = "";

        }

        else if (gameCategory === category) {

            game.style.display = "";

        }

        else {

            game.style.display = "none";

        }

    });


    // ============================
    // GAME DARI GAME.JS
    // ============================

    jsGames.forEach(function (game) {

        const gameCategory =
            game.dataset.category;


        if (category === "all") {

            game.style.display = "";

        }

        else if (gameCategory === category) {

            game.style.display = "";

        }

        else {

            game.style.display = "none";

        }

    });


    // Jalankan search lagi
    // supaya category + search tidak bentrok

    searchGame();

}


// =====================================================
// SEARCH EVENT
// =====================================================

function setupSearch() {

    const searchInput =
        document.getElementById("search");


    if (!searchInput) {
        console.error("Input search tidak ditemukan!");
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
