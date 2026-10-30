// ==UserScript==
// @name         Steam Archaeologist
// @namespace    steam.archaeologist
// @version      0.1
// @description  Filtrowanie gier Steam według roku wydania
// @match        https://store.steampowered.com/search/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const gry = document.querySelectorAll(".search_result_row");
    let wybranyRok = 2012;

    function filtruj() {

        let licznik = 0;

        for (const gra of gry) {

            gra.style.display = "";

            const nazwa = gra.querySelector(".title").innerText;

            const rok = Number(
                gra.querySelector(".search_released").innerText.trim().slice(-4)
            );

            if (rok === wybranyRok) {
                licznik++;
            }
            else {
                gra.style.display = "none";
            }
        }
        napisRoku.innerText = "Rok: " + wybranyRok;

        console.log("Steam Archaeologist:", wybranyRok, "→", licznik);
    }

const nastepnyRok = document.createElement("button");
nastepnyRok.innerText = "▶";
document.body.prepend(nastepnyRok);

nastepnyRok.addEventListener("click", function () {
    wybranyRok++;
    filtruj();
});


const napisRoku = document.createElement("div");
document.body.prepend(napisRoku);


const poprzedniRok = document.createElement("button");
poprzedniRok.innerText = "◀";
document.body.prepend(poprzedniRok);

poprzedniRok.addEventListener("click", function () {
    wybranyRok--;
    filtruj();
});

filtruj();

})();