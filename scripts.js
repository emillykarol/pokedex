const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')


const form = document.querySelector('.form')
const input = document.querySelector('.buscar')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let pokemonAtual = 1
// recebe como parametro o nome ou o número
async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json(response)
        return data
    }
}
// recebe o dado
async function renderPokemon(data){
    pokemonName.innerText = 'Carregando...'
    pokemonNumber.innerText = ''

    const pokemon = await fetchPokemon(data)
    if (pokemon){
        pokemonImage.style.display = 'block'
        pokemonName.innerText = pokemon.name
        pokemonNumber.innerText = pokemon.id
        if (pokemon.id < 650){
            pokemonImage.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }else{
            pokemonImage.src = pokemon['sprites']['front_default']
        }
        
        input.value = ''
        pokemonAtual = pokemon.id
    }
    else{
        pokemonImage.style.display = 'none'
        pokemonName.innerText = 'Não encontrado'
        pokemonNumber.innerText = ''
    }
}
// previne de o forms atualizar a pagina quando clicar no botao
form.addEventListener('submit', (e) => {
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    pokemonAtual++
    renderPokemon(pokemonAtual)
    if (pokemonAtual > 1025){
        pokemonAtual = 1
        renderPokemon(pokemonAtual)
    }
    
})

btnPrev.addEventListener('click', () => {
    if (pokemonAtual > 1){
        pokemonAtual--
        renderPokemon(pokemonAtual)
    }else{
        pokemonAtual = 1025
        renderPokemon(pokemonAtual)
    }
})


renderPokemon(pokemonAtual)