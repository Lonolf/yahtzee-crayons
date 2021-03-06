const error = {
  error_reload_button: 'Ricarica la pagina',
  error_passedDownError_proposed_action: 'Azione proposta',
  error_passedDownError_text: 'Questo non era previsto!',
  error_passedDownError_title: 'Oops... ^^"',
}

const months = {
  month01: 'Gennaio',
  month02: 'Febbraio',
  month03: 'Marzo',
  month04: 'Aprile',
  month05: 'Maggio',
  month06: 'Giugno',
  month07: 'Luglio',
  month08: 'Agosto',
  month09: 'Settembre',
  month10: 'Ottobre',
  month11: 'Novembre',
  month12: 'Dicembre',
}

const dates = {
  Sun: 'Dom',
  Mon: 'Lun',
  Tue: 'Mar',
  Wed: 'Mer',
  Thu: 'Gio',
  Fri: 'Ven',
  Sat: 'Sab',

  Jan: 'Gen',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Apr',
  May: 'Mag',
  Jun: 'Giu',
  Jul: 'Lug',
  Aug: 'Ago',
  Sep: 'Set',
  Oct: 'Ott',
  Nov: 'Nov',
  Dec: 'Dic',
  datetime_string: 'HH:mm dd/MM/yyyy',
}

const toPrice = (price) => {
  return Number(price).toLocaleString() + ' CHF'
}

const generic = {
  generic_loading: 'Caricamento in corso',
  generic_email: 'Email',
  generic_password: 'Password',
  generic_name: 'Nome',
  generic_confirm: 'Conferma',
}

const commons = {
}

const labelCell = {
  labelCell_aces_label: 'Assi',
  labelCell_twos_label: 'Due',
  labelCell_threes_label: 'Tre',
  labelCell_fours_label: 'Quattro',
  labelCell_fives_label: 'Cinque',
  labelCell_sixes_label: 'Sei',
  labelCell_threeOf_label: 'Tris',
  labelCell_fourOf_label: 'Poker',
  labelCell_fullHouse_label: 'Full house',
  labelCell_smSt_label: 'Scala di 4',
  labelCell_lgSt_label: 'Scala di 5',
  labelCell_free_label: 'Somma',
  labelCell_yahtzee_label: 'Yahtzee',
  labelCell_aces_rule: 'Somma il valore dei dadi con punteggio pari a uno',
  labelCell_twos_rule: 'Somma il valore dei dadi con punteggio pari a due',
  labelCell_threes_rule: 'Somma il valore dei dadi con punteggio pari a tre',
  labelCell_fours_rule: 'Somma il valore dei dadi con punteggio pari a quattro',
  labelCell_fives_rule: 'Somma il valore dei dadi con punteggio pari a cinque',
  labelCell_sixes_rule: 'Somma il valore dei dadi con punteggio pari a sei',
  labelCell_threeOf_rule: 'Solo se ?? presente un tris di dadi uguali, somma il valore di TUTTI i dadi',
  labelCell_fourOf_rule: 'Solo se sono presenti quattro dadi uguali, somma il valore di TUTTI i dadi',
  labelCell_fullHouse_rule: '25 punti se tra i dadi c\'?? una coppia e un tris di dadi',
  labelCell_smSt_rule: '30 punti se tra i dadi c\'?? scala di quattro dadi consecutivi',
  labelCell_lgSt_rule: '40 punti se tra i dadi c\'?? scala di cinque dadi consecutivi',
  labelCell_free_rule: 'Somma liberamente il valore dei dadi',
  labelCell_yahtzee_rule: 'Yahtzee! Cinque dadi uguali',
}

const login = {
  login_google_button: 'Acced con Google',
  login_register_switch: 'Nuovo utente',
  login_recoverPassword_button: 'Recupera password',
  login_passwordRecovery_alert: 'Email recupero password inviata',
}

const mainMenu = {
  mainMenu_title: 'Men??',
  mainMenu_newGame: 'Nuovo',
  mainMenu_gameId_label: 'Game ID',
  mainMenu_loadGame: 'Carica',
  mainMenu_logout: 'Logout',
}

const scoreCard = {
  scoreCard_totals_title: 'Totali',
  gameMenu_title: 'Men?? di gioco',
  gameMenu_share_title: 'Url',
  gameMenu_share_text: 'Vieni a fare una partita con me!',
  gameMenu_share_error: 'Condivisione link non disponibile',
  gameMenu_gameId: 'GameId: ',
  gameMenu_gameStart: 'Inizio: ',
  gameMenu_endDate: 'Fine: ',
  gameMenu_copy_error: 'Appunti non disponibili',
  gameMenu_copyId_button: 'Copia id',
  gameMenu_shareId_button: 'Invita',
  gameMenu_backToMenu_button: 'Torna al menu principale',
  gameMenu_gameId_alert: 'Id del gioco copiato',
  gameMenu_noSleep_button: 'Mantieni lo schermo acceso',
  gameMenu_gameStatus_started: 'Status: iniziato',
  gameMenu_gameStatus_finished: 'Status: finito',
}

const victory = {
  victory_title: 'Vittoria!',
  victory_winner_text: 'Il giocare {{playerName}} ha vinto conquistando {{sets}} sets con un totale di {{total}} punti',
  victory_draw_text: 'La partita ?? finita in pareggio. Complimenti a tutti i giocatori!',
  victory_mainMenu: 'Torna al men?? principale',
}

const settings = {
  settings_button: 'Game Settings',
  settings_title: 'Settings',
  settings_players: 'Giocatori',
  settings_sets: 'Sets',
  settings_maxThrows: 'Numero di lanci',
  settings_virtualDices: 'Dadi virtuali',
}

const gameMessage = {
  gameMessage_gameEnded: 'Partita terminata',
  gameMessage_waitingNewPlayer: 'In attesa di un nuovo giocatore',
  gameMessage_goToPlayingPlayer: 'Vai al giocatore di turno',
  gameMessage_yourTurn: '?? il tuo turno. Gioca!',
  gameMessage_playingPlayer: 'In attesa della sua mossa...',
}

export const italian = {
  toPrice,
  locale: 'it',
  ...error,
  ...months,
  ...dates,
  ...generic,
  ...commons,
  ...labelCell,
  ...login,
  ...mainMenu,
  ...scoreCard,
  ...victory,
  ...settings,
  ...gameMessage,
}
