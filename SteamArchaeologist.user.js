// ==UserScript==
// @name         Steam Archaeologist
// @namespace    steam.archaeologist
// @version      0.1
// @description  Add year persistence and result counter
// @match        https://store.steampowered.com/search/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const gry = document.querySelectorAll(".search_result_row");
    let wybranyRok = Number(localStorage.getItem("SteamArchaeologist_Rok")) || 2012;

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
        napisLicznik.innerText = "Znaleziono: " + licznik;

        console.log("Steam Archaeologist:", wybranyRok, "→", licznik);
    }

    function aktualizujPrzyciski() {
    nastepnyRok.disabled = wybranyRok >= new Date().getFullYear();
    poprzedniRok.disabled = wybranyRok <= 1980;
	}

const panel = document.createElement("div");

const poprzedniRok = document.createElement("button");
poprzedniRok.innerText = "◀";

const napisRoku = document.createElement("div");
const napisLicznik = document.createElement("div");

const nastepnyRok = document.createElement("button");
nastepnyRok.innerText = "▶";

panel.append(poprzedniRok);
panel.append(napisRoku);
panel.append(napisLicznik);
panel.append(nastepnyRok);

panel.style.display = "flex";
panel.style.justifyContent = "center";
panel.style.alignItems = "center";
panel.style.gap = "10px";

document.body.prepend(panel);

poprzedniRok.addEventListener("click", function () {
        wybranyRok--;
        localStorage.setItem("SteamArchaeologist_Rok", wybranyRok);
        filtruj();
    });

nastepnyRok.addEventListener("click", function () {
    if (wybranyRok < new Date().getFullYear()) {
        wybranyRok++;
        aktualizujPrzyciski();
        localStorage.setItem("SteamArchaeologist_Rok", wybranyRok);
        filtruj();
    }});

aktualizujPrzyciski();

filtruj();

})();