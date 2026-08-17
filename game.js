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
    }

];


// =====================================================
// RENDER GAME
// =====================================================

function renderGames(){

    const container =
        document.querySelector(".container");


    if(!container){

        console.error(
            "Container tidak ditemukan!"
        );

        return;

    }


    /*
        Hapus game yang sebelumnya
        dibuat oleh JavaScript
    */

    document
        .querySelectorAll(".js-game")
        .forEach(function(game){

            game.remove();

        });


    /*
        Footer digunakan sebagai
        titik untuk memasukkan game
    */

    const footer =
        container.querySelector(".footer");


    games.forEach(function(game){

        const link =
            document.createElement("a");


        link.className =
            "game-link-box js-game";


        link.href =
            game.page;


        link.innerHTML = `

            <div class="game-link-title">
                ${game.title}
            </div>

            <div class="game-link-info">
                ${game.year}
            </div>

            <div class="game-link-info">
                Developer: ${game.developer}
            </div>

        `;


        /*
            Masukkan game sebelum footer
        */

        if(footer){

            container.insertBefore(
                link,
                footer
            );

        }
        else{

            container.appendChild(
                link
            );

        }

    });

}


// =====================================================
// STYLE
// =====================================================

function loadGameStyle(){

    /*
        Jangan membuat style
        berkali-kali
    */

    if(
        document.getElementById(
            "js-game-style"
        )
    ){

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "js-game-style";


    style.textContent = `

        .js-game{

            width:700px;

            max-width:100%;

            display:block;

            background:#000;

            border:1px solid #1e90ff;

            padding:20px;

            text-decoration:none;

            color:white;

            font-family:Consolas,monospace;

            box-shadow:
                0 0 10px #1e90ff,
                0 0 20px #1e90ff;

            transition:.2s;

            scroll-margin-top:20px;

        }


        .js-game:hover{

            border-color:#00ffcc;

            box-shadow:
                0 0 10px #00ffcc,
                0 0 25px #00ffcc;

            transform:scale(1.01);

        }


        .js-game-title{

            color:#1e90ff;

            font-size:24px;

            font-family:'Oswald',sans-serif;

            text-shadow:
                0 0 10px #1e90ff;

            margin-bottom:8px;

        }


        .js-game-info{

            color:#aaa;

            font-size:15px;

            margin:3px 0;

        }


        .js-game:hover
        .js-game-title{

            color:#00ffcc;

            text-shadow:
                0 0 10px #00ffcc;

        }


        @media(max-width:760px){

            .js-game{

                width:100%;

                padding:15px;

            }


            .js-game-title{

                font-size:20px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


// =====================================================
// SEARCH
// =====================================================

function searchGame(){

    const searchInput =
        document.getElementById(
            "search"
        );


    if(!searchInput){

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

    let matchCount = 0;


    items.forEach(function(item){

        const titleElement =
            item.querySelector(
                ".cmd-title"
            ) ||
            item.querySelector(
                ".js-game-title"
            );


        if(!titleElement){

            return;

        }


        const title =
            titleElement.innerText
                .toLowerCase();


        /*
            Kalau search kosong,
            tampilkan semuanya
        */

        if(input === ""){

            item.style.display =
                "";

            return;

        }


        /*
            Kalau judul cocok
        */

        if(
            title.includes(input)
        ){

            item.style.display =
                "";

            matchCount++;


            if(
                firstMatch === null
            ){

                firstMatch =
                    item;

            }

        }
        else{

            item.style.display =
                "none";

        }

    });


    /*
        Scroll ke hasil pertama
    */

    if(firstMatch){

        firstMatch.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }


    /*
        Pesan jika tidak ada hasil
    */

    const noResult =
        document.getElementById(
            "no-result"
        );


    if(noResult){

        if(
            input !== "" &&
            matchCount === 0
        ){

            noResult.classList.add(
                "show"
            );

        }
        else{

            noResult.classList.remove(
                "show"
            );

        }

    }

}


// =====================================================
// FILTER
// =====================================================

function filterCategory(
    category
){

    /*
        Filter game HTML
    */

    const htmlGames =
        document.querySelectorAll(
            ".cmd"
        );


    htmlGames.forEach(
        function(game){

            const gameCategory =
                game.dataset.category;


            if(
                category === "all"
            ){

                game.style.display =
                    "";

                return;

            }


            if(
                gameCategory ===
                category
            ){

                game.style.display =
                    "";

            }
            else{

                game.style.display =
                    "none";

            }

        }
    );


    /*
        Game dari game.js
        selalu ditampilkan
    */

    const jsGames =
        document.querySelectorAll(
            ".js-game"
        );


    jsGames.forEach(
        function(game){

            game.style.display =
                "";

        }
    );


    /*
        Bersihkan search
    */

    const searchInput =
        document.getElementById(
            "search"
        );


    if(searchInput){

        searchInput.value = "";

    }


    /*
        Hilangkan pesan
        GAME TIDAK DITEMUKAN
    */

    const noResult =
        document.getElementById(
            "no-result"
        );


    if(noResult){

        noResult.classList.remove(
            "show"
        );

    }

}


// =====================================================
// FILTER BUTTON
// =====================================================

function setupFilter(){

    const buttons =
        document.querySelectorAll(
            ".filter-buttons .btn"
        );


    buttons.forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    /*
                        Hapus active
                        dari semua tombol
                    */

                    buttons.forEach(
                        function(btn){

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                        Aktifkan tombol
                        yang diklik
                    */

                    button.classList.add(
                        "active"
                    );


                    /*
                        Ambil kategori
                    */

                    const category =
                        button.dataset.filter;


                    filterCategory(
                        category
                    );

                }
            );

        }
    );

}


// =====================================================
// SEARCH EVENT
// =====================================================

function setupSearch(){

    const searchInput =
        document.getElementById(
            "search"
        );


    if(!searchInput){

        return;

    }


    searchInput.addEventListener(
        "input",
        function(){

            searchGame();

        }
    );

}


// =====================================================
// START
// =====================================================

function init(){

    loadGameStyle();

    renderGames();

    setupSearch();

    setupFilter();

}


// =====================================================
// DOM READY
// =====================================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

}
else{

    init();

}
