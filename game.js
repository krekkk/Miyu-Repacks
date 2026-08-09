const games = [
    {
        title: "Max Payne 2 Miyu Repacks",
        category: "pc",
        platform: "PC",
        os: "Windows XP ke atas",
        image: "0000003274.1920x1080.jpg",

        description: "Max Payne 2 Miyu Repacks.",

        tutorial: [
            "Ekstrak Max Payne 2 Miyu Repacks.",
            "Jalankan setup.exe.",
            "Tunggu proses instalasi sampai selesai.",
            "Jalankan game.",
            "Selamat bermain!"
        ],

        download: "https://drive.google.com/file/d/130pwhmiDhw8dmMty6_uFDi9RJXvBrmuY/view?usp=drive_link"
    }
];


// ================================
// RENDER GAME
// ================================

function renderGames(list = games) {

    // Hapus game yang sebelumnya dibuat oleh game.js
    document.querySelectorAll(".js-game").forEach(game => {
        game.remove();
    });

    const container = document.querySelector(".container");

    if (!container) {
        console.error("Container tidak ditemukan.");
        return;
    }

    const script = document.querySelector('script[src="game.js"]');

    list.forEach(game => {

        const gameBox = document.createElement("div");

        gameBox.className = "cmd js-game";
        gameBox.dataset.category = game.category;

        gameBox.innerHTML = `
            <div class="cmd-title">${game.title}</div>

            <div class="line status">
                PLATFORM : ${game.platform}
            </div>

            <div class="line soon">
                MINIMUM OS : ${game.os}
            </div>

            <img
                src="${game.image}"
                class="game-img"
                alt="${game.title}"
            >

            <div class="line">
                ${game.description}
            </div>

            <div class="line">
                TUTORIAL INSTALL:
            </div>

            ${game.tutorial.map((step, index) => `
                <div class="line">
                    ${index + 1}. ${step}
                </div>
            `).join("")}

            <button class="btn install-game">
                INSTALL ${game.title}
            </button>
        `;

        // Tombol download
        const button = gameBox.querySelector(".install-game");

        button.addEventListener("click", () => {
            window.open(game.download, "_blank");
        });

        // Masukkan game sebelum script game.js
        if (script) {
            container.insertBefore(gameBox, script);
        } else {
            container.appendChild(gameBox);
        }
    });
}


// ================================
// SEARCH
// ================================

function searchGame() {

    const searchInput = document.getElementById("search");

    if (!searchInput) {
        return;
    }

    const input = searchInput.value.toLowerCase().trim();

    const games = document.querySelectorAll(".cmd");

    let firstMatch = null;

    games.forEach(game => {

        const title = game.querySelector(".cmd-title");

        if (!title) {
            return;
        }

        const gameTitle = title.innerText.toLowerCase();

        if (gameTitle.includes(input)) {

            game.style.display = "block";

            if (!firstMatch && input !== "") {
                firstMatch = game;
            }

        } else {

            game.style.display = "none";

        }
    });

    if (firstMatch && input !== "") {

        firstMatch.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
}


// ================================
// FILTER CATEGORY
// ================================

function filterCategory(category) {

    document.querySelectorAll(".cmd").forEach(game => {

        const gameCategory = game.dataset.category;

        if (category === "all") {

            game.style.display = "block";

        } else if (gameCategory === category) {

            game.style.display = "block";

        } else {

            game.style.display = "none";

        }

    });
}


// ================================
// LOAD GAME
// ================================

document.addEventListener("DOMContentLoaded", () => {
    renderGames();
});
