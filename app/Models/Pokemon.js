export class Pokemon {
  constructor(data) {
    this.id = data.id || ''
    this.index = data.index || ''
    this.name = data.name
    this.inParty = data.inParty || false
  }
}