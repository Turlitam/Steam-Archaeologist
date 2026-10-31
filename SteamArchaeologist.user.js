// ==UserScript==
// @name         Steam Archaeologist
// @namespace    steam.archaeologist
// @version      0.4
// @description  Filter Steam games by release year
// @match        https://store.steampowered.com/search/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let selectedYear = Number(localStorage.getItem("SteamArchaeologist_Rok")) || 2012;
    let resultCount = 0;

    function filterGame(game) {
        game.style.display = "";

        const releaseDate = game.querySelector(".search_released");

        if (!releaseDate) {
            game.style.display = "none";
            return;
        }

        const yearMatch = releaseDate.innerText.match(/\b\d{4}\b/);
        const releaseYear = yearMatch ? Number(yearMatch[0]) : null;

        if (releaseYear !== selectedYear) {
            game.style.display = "none";
        }
    }

    function updateResultLabel() {
        if (resultCount !== 0) {
            resultLabel.innerText = "Found: " + resultCount;
        }
        else {
            resultLabel.innerText = "No results";
        }
    }

    function filterGames() {
        resultCount = 0;
        const games = document.querySelectorAll(".search_result_row");

        for (const game of games) {

            filterGame(game);

            if (game.style.display !== "none") {
                resultCount++;
            }
        }

        yearLabel.innerText = "Year: " + selectedYear;

        updateResultLabel();
    }

    function updateButtons() {
        nextYearButton.disabled = selectedYear >= new Date().getFullYear() + 2;
        previousYearButton.disabled = selectedYear <= 1980;
    }

    const controlPanel = document.createElement("div");

    const previousYearButton = document.createElement("button");
    previousYearButton.innerText = "◀";

    const yearLabel = document.createElement("div");
    const resultLabel = document.createElement("div");

    const nextYearButton = document.createElement("button");
    nextYearButton.innerText = "▶";

    controlPanel.append(previousYearButton);
    controlPanel.append(yearLabel);
    controlPanel.append(resultLabel);
    controlPanel.append(nextYearButton);

    controlPanel.style.display = "flex";
    controlPanel.style.flexDirection = "row";
    controlPanel.style.justifyContent = "center";
    controlPanel.style.alignItems = "center";
    controlPanel.style.gap = "6px";
    controlPanel.style.borderRadius = "6px";

    controlPanel.style.position = "fixed";
    controlPanel.style.top = "10px";
    controlPanel.style.left = "50%";
    controlPanel.style.transform = "translateX(-50%)";
    controlPanel.style.zIndex = "1000";

    controlPanel.style.backgroundColor = "#1b2838";
    controlPanel.style.padding = "2px 6px";
    controlPanel.style.border = "2px solid #2a475e";

    document.body.prepend(controlPanel);


    updateButtons();

    previousYearButton.addEventListener("click", function () {
        selectedYear--;
        updateButtons();
        localStorage.setItem("SteamArchaeologist_Rok", selectedYear);
        filterGames();
    });

    nextYearButton.addEventListener("click", function () {
        if (selectedYear < new Date().getFullYear() + 2) {
            selectedYear++;
            updateButtons();
            localStorage.setItem("SteamArchaeologist_Rok", selectedYear);
            filterGames();
        }
    });

    filterGames();


    const observer = new MutationObserver(function (mutations) {
        let resultsChanged = false;

        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                resultsChanged = true;
                break;
            }
        }

        if (resultsChanged) {
            filterGames();
        }
    });

    observer.observe(document.querySelector("#search_resultsRows"), {
        childList: true,
        subtree: true
    });

})();