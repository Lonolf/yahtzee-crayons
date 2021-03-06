# Yahtzee
## Introduction

A simple app to keep scores in game of yahtzee.

##  Views

1. MainMenu
  1. Create New Game
  2. Enter Game
  3. Enter Name (saved in localStorage?)
2. ScoreCard
  1. Game
3. Victory

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
* React-Router

## TODO

- [ ] sistemare il translator
