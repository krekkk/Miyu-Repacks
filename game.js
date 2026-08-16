const games = [

    {
        title: "Miyu Windows Toolkit",
        developer: "Miyu",
        year: "2026",
        page: "miyutoolkit.html"
    }

];


// =====================================================
// RENDER GAME
// =====================================================

function renderGames(){

    const container =
        document.querySelector(".container");

    if(!container){
        console.error("Container tidak ditemukan!");
        return;
    }


    document
        .querySelectorAll(".js-game")
        .forEach(function(item){
            item.remove();
        });


    games.forEach(function(game){

        const link =
            document.createElement("a");

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

        container.appendChild(link);

    });

}


// =====================================================
// STYLE
// =====================================================

const style =
    document.createElement("style");

style.textContent = `

    .js-game{

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


    .js-game:hover{

        padding-left:12px;

        border-bottom-color:#1e90ff;

    }


    .js-game-title{

        display:block;

        color:#1e90ff;

        font-family:'Oswald',sans-serif;

        font-size:24px;

        text-shadow:0 0 8px #1e90ff;

    }


    .js-game-info{

        display:inline-block;

        margin-top:5px;

        margin-right:18px;

        color:#777;

        font-size:13px;

    }


    .js-game:hover .js-game-title{

        color:#00ffcc;

        text-shadow:0 0 8px #00ffcc;

    }

`;

document.head.appendChild(style);


// =====================================================
// SEARCH
// =====================================================

function searchGame(){

    const input =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const items =
        document.querySelectorAll(
            ".cmd, .js-game"
        );


    let firstMatch = null;


    items.forEach(function(item){

        const titleElement =
            item.querySelector(".cmd-title") ||
            item.querySelector(".js-game-title");


        if(!titleElement){
            return;
        }


        const title =
            titleElement
                .innerText
                .toLowerCase();


        if(title.includes(input)){

            item.style.display = "";

            if(
                firstMatch === null &&
                input !== ""
            ){
                firstMatch = item;
            }

        }
        else{

            item.style.display = "none";

        }

    });


    if(firstMatch){

        firstMatch.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }

}


// =====================================================
// FILTER
// =====================================================

function filterCategory(category){

    const games =
        document.querySelectorAll(".cmd");


    games.forEach(function(game){

        if(category === "all"){

            game.style.display = "";

        }
        else if(
            game.dataset.category === category
        ){

            game.style.display = "";

        }
        else{

            game.style.display = "none";

        }

    });

}


// =====================================================
// LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        renderGames();

    }
);
