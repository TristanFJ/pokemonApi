import {
  pokemonService
} from "../Services/PokemonService.js";
import {
  ProxyState
} from "../AppState.js"

function _drawApiPokemon() {
  const pokemon = ProxyState.apiPokemon
  let template = ''
  pokemon.forEach(p => template += `<p class="m-1 selectable" onclick="app.pokemonController.getPokemonIndex('${p.name}')">${p.name}</p>`)
  document.getElementById('pokemon').innerHTML = template
}

function _drawMyPokemon() {
  const pokemon = ProxyState.myPokemon
  let template = ''
  let inParty = pokemon.filter(p => p.inParty).length
  pokemon.forEach(p => template += `<p class="m-1 selectable" onclick="app.pokemonController.setActive('${p.id}')">
  ${p.name} ${p.inParty ? '<i class="text-info mdi mdi-book"></i>' : ''}</p>`)
  if (!template) {
    template = '<p class="text-gray darken-20">No Spells</p>'
  }
  template = `<h4 class="text-info"> ${inParty} / ${pokemon.length}</h4>` + template
  document.getElementById('my-pokemon').innerHTML = template
}

function _drawActivePokemon() {
  let template = ''
  if (ProxyState.activePokemon) {
    template = ProxyState.activePokemon.Template
  }
  document.getElementById('active-pokemon').innerHTML = template
}



export class PokemonController {
  constructor() {
    this.getPokemon()
    this.getMyPokemon()
    ProxyState.on('apiPokemon', _drawApiPokemon)
    ProxyState.on('myPokemon', _drawMyPokemon)
    ProxyState.on('activePokemon', _drawActivePokemon)
  }

  async getPokemon() {
    try {
      await pokemonService.getPokemon()
    } catch (error) {
      console.error(['GETPOKEMON() ERROR: ', error]);
    }
  }

  async getMyPokemon() {
    try {
      await pokemonService.getMyPokemon()
    } catch (error) {
      console.error('[GETMYPOKEMON() ERROR: ]', error);
    }

  }

  async getPokemonIndex(id) {
    try {
      await pokemonService.getPokemonIndex(id)
    } catch (error) {
      console.error('[GETPOKEMONINDEX() ERROR: ]', error);
    }
  }

  async addPokemon() {
    try {
      await pokemonService.addPokemon()
    } catch (error) {
      console.error(error);
    }
  }

  setActive(id) {
    pokemonService.setActive(id)
  }

  async inParty() {
    try {
      await pokemonService.inParty()
    } catch (error) {
      console.log(error);
    }
  }

}