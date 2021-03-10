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
  ...login,
  ...mainMenu,
  ...scoreCard,
  ...victory,
}
