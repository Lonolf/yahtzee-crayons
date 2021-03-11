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
}

const toPrice = (price) => {
  return Number(price).toLocaleString() + ' CHF'
}

const generic = {
  generic_loading: 'Caricamento in corso',
  generic_email: 'Email',
  generic_password: 'Password',
  generic_Name: 'Nome',
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
  labelCell_aces_rules: 'Somma il valore degli assi',
  labelCell_twos_rules: 'Somma il valore dei due',
  labelCell_threes_rules: 'Somma il valore dei tre',
  labelCell_fours_rules: 'Somma il valore dei quattro',
  labelCell_fives_rules: 'Somma il valore dei cinque',
  labelCell_sixes_rules: 'Somma il valore dei sei',
  labelCell_threeOf_rules: 'Solo se è presente un tris di dadi uguali, somma il valore di TUTTI i dadi',
  labelCell_fourOf_rules: 'Solo se sono presenti quattro dadi uguali, somma il valore di TUTTI i dadi',
  labelCell_fullHouse_rules: 'Una coppia e un tris di dadi',
  labelCell_smSt_rules: 'Scala di quattro dadi consecutivi',
  labelCell_lgSt_rules: 'Scala di cinque dadi consecutivi',
  labelCell_free_rules: 'Somma liberamente il valore dei dadi',
  labelCell_yahtzee_rules: 'Yahtzee! Cinque dadi uguali',
}

const login = {
  login_google_button: 'Acced con Google',
  login_register_switch: 'Nuovo utente',
  login_recoverPassword_button: 'Recupera password',
  login_passwordRecovery_alert: 'Email recupero password inviata',
}

const mainMenu = {
  mainMenu_title: 'Menù',
  mainMenu_newGame: 'Nuovo',
  mainMenu_gameId_label: 'Game ID',
  mainMenu_loadGame: 'Carica',
  mainMenu_logout: 'Logout',
}

const scoreCard = {
  scoreCard_totals_title: 'Totali',
  gameMenu_title: 'Menù di gioco',
  gameMenu_share_title: 'Url',
  gameMenu_share_text: 'Vieni a fare una partita con me!',
  gameMenu_share_error: 'Condivisione link non disponibile',
  gameMenu_gameId: 'GameId: ',
  gameMenu_copy_error: 'Appunti non disponibili',
}

const victory = {
  victory_title: 'Vittoria!',
  victory_winner_text: 'Il giocare {{playerName}} ha vinto conquistando {{sets}} sets con un totale di {{total}} punti',
  victory_draw_text: 'La partita è finita in pareggio. Complimenti a tutti i giocatori!',
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
}
