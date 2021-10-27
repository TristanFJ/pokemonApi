export class Pokemon {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.nickname = data.nickname || ''
    this.img = data.img || data.sprites.other.dream_world.front_default
    this.weight = data.weight || 1
    this.height = data.height || 1
    this.types = data.types || ''
    this.inParty = data.inParty || false
  }

  get Template() {
    return `
    <div class="w-75 bg-white elevation-1 p-3 d-flex flex-column">
      <div class="text-center">
        <h3>${this.name}</h3>
        <p></p>
        <p></p>
      </div>
      <div class="d-flex justify-content-between justify-self-end mt-auto">
        <div>
        ${this.Checkbox}
        </div>
        ${this.Button}
      </div>
    </div>
    `
  }

  get Checkbox() {
    if (!this.id) {
      return ''
    }
    return `
    <input type="checkbox" ${this.inParty ? 'checked' : ''} name="inparty" id="inparty" onclick="app.pokemonController.inParty()"><label for="inparty">In Party</label>
    
    `
  }

  get Button() {
    if (this.name) {
      return '<button class="btn btn-success" onclick="app.pokemonController.addPokemon()">add</button>'
    }
    return `<button class="btn btn-danger" onclick="app.pokemonController.removePokemon()">remove</button>`
  }
}