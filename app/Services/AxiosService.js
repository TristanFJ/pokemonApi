export const pokeApi = axios.create({

  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 5000

})

export const sandboxApi = axios.create({

  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Tristan/pokemon',
  timeout: 5000
})