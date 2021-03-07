import { italian } from 'locales/italian'

const replacer = (string = '', props = {}) =>
  string.replace(/{{[a-zA-Z]*}}/g, match => props[match.replace(/{|}/g, '')] ?? match)

class Translator {
  constructor() {
    this.language = italian
    this.unmatchedLabels = new Set()
    this.printUnmatchedLabels = false // set to true to debug missing label
  }

  setLanguage = (language) => {
    this.language = language
  }

  fromLabel = (label, props) => {
    if (this.language[label] != null)
      return props != null ? replacer(this.language[label], props) : this.language[label]

    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return props != null ? JSON.stringify({ label, ...props }) : label
  }

  toPrice = price => {
    price = Number.isNaN(price) ? 0 : Number(price)

    if (this.language.toPrice != null)
      return this.language.toPrice(price)
    else
      return price
  }
}

export default new Translator()
