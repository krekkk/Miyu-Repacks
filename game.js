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
    },

    {
        title: "Game Baru Miyu",
        developer: "Miyu Repacks",
        year: "2026",
        page: "gamebaru.html",
        category: "pc"
    }

];


// =====================================================
// PENGATURAN PAGINATION
// =====================================================

const gamesPerPage = 3;

let currentPage = 1;


// =====================================================
// RENDER GAME
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

    // Cari footer
    const footer = document.querySelector(".footer");

    // Hitung posisi game
    const start =
        (currentPage - 1) * gamesPerPage;

    const end =
        start + gamesPerPage;

    const visibleGames =
        games.slice(start, end);


    visibleGames.forEach(function (game, index) {

        const link =
            document.createElement("a");

        link.className = "js-game";

        link.id =
            "js-game-" + (start + index);

        link.dataset.category =
            game.category || "all";

        link.href =
            game.page;


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


        if (footer) {

            container.insertBefore(
                link,
                footer
            );

        } else {

            container.appendChild(link);

        }

    });


    renderPagination();

}


// =====================================================
// STYLE GAME
// =====================================================

function loadGameStyle() {

    if (document.getElementById("js-game-style")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "js-game-style";


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

            text-shadow:
                0 0 8px #1e90ff;

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

            text-shadow:
                0 0 8px #00ffcc;

        }


        .pagination {

            width:700px;

            max-width:100%;

            display:flex;

            justify-content:center;

            align-items:center;

            gap:10px;

            margin-top:20px;

            margin-bottom:10px;

        }


        .pagination button {

            padding:10px 22px;

            background:transparent;

            color:#1e90ff;

            border:2px solid #1e90ff;

            border-radius:8px;

            font-family:'Oswald',sans-serif;

            cursor:pointer;

            box-shadow:
                0 0 8px #1e90ff;

            transition:.2s;

        }


        .pagination button:hover {

            background:#1e90ff;

            color:#000;

            box-shadow:
                0 0 10px #1e90ff,
                0 0 20px #1e90ff;

        }


        .pagination button:disabled {

            opacity:.3;

            cursor:not-allowed;

            box-shadow:none;

        }


        .page-number {

            color:#00ffcc;

            font-family:Consolas,monospace;

            font-size:14px;

        }

    `;


    document.head.appendChild(style);

}


// =====================================================
// PAGINATION
// =====================================================

function renderPagination() {

    const container =
        document.querySelector(".container");

    const footer =
        document.querySelector(".footer");


    if (!container) {
        return;
    }


    // Hapus pagination lama

    const oldPagination =
        document.querySelector(".pagination");

    if (oldPagination) {
        oldPagination.remove();
    }


    // Hitung total halaman

    const totalPages =
        Math.ceil(
            games.length / gamesPerPage
        );


    // Kalau cuma satu halaman
    // tidak perlu tombol

    if (totalPages <= 1) {
        return;
    }


    const pagination =
        document.createElement("div");

    pagination.className =
        "pagination";


    // Tombol PREVIOUS

    const previous =
        document.createElement("button");

    previous.innerText =
        "PREVIOUS";

    previous.disabled =
        currentPage === 1;


    previous.onclick =
        function () {

            if (currentPage > 1) {

                currentPage--;

                renderGames();

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }

        };


    // Nomor halaman

    const pageNumber =
        document.createElement("span");

    pageNumber.className =
        "page-number";

    pageNumber.innerText =
        "PAGE " +
        currentPage +
        " / " +
        totalPages;


    // Tombol NEXT

    const next =
        document.createElement("button");

    next.innerText =
        "NEXT";

    next.disabled =
        currentPage === totalPages;


    next.onclick =
        function () {

            if (currentPage < totalPages) {

                currentPage++;

                renderGames();

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }

        };


    pagination.appendChild(previous);

    pagination.appendChild(pageNumber);

    pagination.appendChild(next);


    // Masukkan sebelum footer

    if (footer) {

        container.insertBefore(
            pagination,
            footer
        );

    } else {

        container.appendChild(
            pagination
        );

    }

}


// =====================================================
// SEARCH
// =====================================================

function searchGame() {

    const searchInput =
        document.getElementById("search");


    if (!searchInput) {
        return;
    }


    const input =
        searchInput.value
        .toLowerCase()
        .trim();


    const htmlGames =
        document.querySelectorAll(".cmd");


    const jsGames =
        document.querySelectorAll(".js-game");


    const allGames = [

        ...htmlGames,
        ...jsGames

    ];


    const noResult =
        document.getElementById("no-result");


    let found = false;


    allGames.forEach(function (game) {

        const titleElement =
            game.querySelector(".cmd-title") ||
            game.querySelector(".js-game-title");


        if (!titleElement) {
            return;
        }


        const title =
            titleElement.innerText
            .toLowerCase()
            .trim();


        if (input === "") {

            game.style.display = "";

            return;

        }


        if (title.includes(input)) {

            game.style.display = "";

            found = true;

        }

        else {

            game.style.display = "none";

        }

    });


    if (noResult) {

        if (
            input !== "" &&
            !found
        ) {

            noResult.classList.add("show");

        }

        else {

            noResult.classList.remove("show");

        }

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


    htmlGames.forEach(function (game) {

        const gameCategory =
            game.dataset.category;


        if (
            category === "all" ||
            gameCategory === category
        ) {

            game.style.display = "";

        }

        else {

            game.style.display = "none";

        }

    });


    jsGames.forEach(function (game) {

        const gameCategory =
            game.dataset.category;


        if (
            category === "all" ||
            gameCategory === category
        ) {

            game.style.display = "";

        }

        else {

            game.style.display = "none";

        }

    });


    searchGame();

}


// =====================================================
// SEARCH EVENT
// =====================================================

function setupSearch() {

    const searchInput =
        document.getElementById("search");


    if (!searchInput) {

        console.error(
            "Input search tidak ditemukan!"
        );

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
