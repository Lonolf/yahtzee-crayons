# Yahtzee
## Introduction

A simple app to keep scores in game of yahtzee.

##  Views

1. Login
2. MainMenu
  1. Create New Game
  2. Enter Game
  3. Enter Name (saved in localStorage?)
3. ScoreCard
  1. Game
4. Victory

## Models

* Game
  * gameId: '',
  * gameScores: { playerId: { playerId, playerScores } },
  * status: '', (started/finished)
  * winner: null, // id of winner player
* Player
  * playerId,
  * playerName,
  * playerEmail,

## Redux

* Game
* Players
* User

## Database

* Games
* Players

## Packages

* Redux
* Material-ui (core, icons, lab, data-grid)
* Date-fns
* Immer
* uniqid
* React-Router
* react-use

## TODO

- [*] sistemare il translator
- [*] bloccare lo schermo acceso
- [*] sull'Enter blur
- [*] punteggi programmati per le righe basse
- [*] togliere gli zero per sapere dove hai segnato 
- [*] account email
  - [*] signup con nome
- [*] inserire loading 
- [*] inserire error
- [*] selettore settings

- [*] Lanciatore di dadi
- [*] Dadi automatici
- [*] Escludere blocked dal sort dei dadi
- [ ] Turni giocatori
- [ ] Dadi spostabili
## BUGS
- [*] Login + link di invito bug
- [*] Concorrenza salvataggio dati
- [*] Bloccare proposte sul tabellone avversario
- [*] Errore conto scala 4 (1,2,3,4,2)
- [*] Errore full house (1,1,1,1,2)
## VERSIONS

1.0 First playthrough
1.1.0 Virtual dices
