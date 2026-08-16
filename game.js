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
            "Selamat bermain!",
            "Minimum Spec: Intel Core i5"
        ],
        download: "https://drive.google.com/file/d/130pwhmiDhw8dmMty6_uFDi9RJXvBrmuY/view?usp=sharing"
    },

    {
        title: "Miyu Windows Toolkit",
        category: "pc",
        platform: "Windows",
        os: "Windows 10 / Windows 11",
        image: "Screenshot 2026-08-09 212004.png",
        description: "Miyu Windows Toolkit untuk berbagai utilitas, troubleshooting, maintenance, dan tools Windows.",
        tutorial: [
            "Download Miyu Windows Toolkit.",
            "Ekstrak file Miyu TollKit.rar.",
            "Buka folder hasil ekstraksi.",
            "Jalankan Miyu Windows Toolkit.",
            "Gunakan menu sesuai kebutuhan."
        ],
        download: "https://www.mediafire.com/file/rfvxvsr1g6fw46d/Miyu+TollKit.rar/file"
    }
];


// ========================================
// RENDER GAME
// ========================================

function renderGames(list = games) {

    const container = document.querySelector(".container");

    if (!container) {
        console.error("Container tidak ditemukan!");
        return;
    }

    // Hapus game yang sebelumnya dibuat oleh game.js
    document.querySelectorAll(".js-game").forEach(game => {
        game.remove();
    });

    list.forEach(game => {

        const gameBox = document.createElement("div");

        gameBox.className = "cmd js-game";
        gameBox.dataset.category = game.category;

        gameBox.innerHTML = `
            <div class="cmd-title">
                ${game.title}
            </div>

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

            <button
                class="btn"
                onclick="window.open('${game.download}', '_blank')"
            >
                INSTALL ${game.title}
            </button>
        `;

        container.appendChild(gameBox);
    });

    console.log("Game berhasil dimuat:", list);
}


// ========================================
// SEARCH
// ========================================

function searchGame() {

    const input = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const gamesElements = document.querySelectorAll(".cmd");

    let firstMatch = null;

    gamesElements.forEach(game => {

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


// ========================================
// FILTER CATEGORY
// ========================================

function filterCategory(category) {

    document.querySelectorAll(".cmd").forEach(game => {

        if (category === "all") {

            game.style.display = "block";

        } else if (game.dataset.category === category) {

            game.style.display = "block";

        } else {

            game.style.display = "none";

        }

    });
}


// ========================================
// LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    renderGames();

});
