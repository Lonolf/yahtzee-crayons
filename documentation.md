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

## TODO

- [ ] sistemare il translator
- [ ] bloccare lo schermo acceso
- [ ] sull'Enter blur
- [ ] punteggi fissi
- [*] togliere gli zero per sapere dove hai segnato 
- [ ] account email 
