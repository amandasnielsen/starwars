const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
const errorText = document.querySelector('#error-text')
const result = document.querySelector('.result')
const characterFields = {
    name: document.querySelector('#character-name'),
    height: document.querySelector('#character-height'),
    mass: document.querySelector('#character-mass'),
    hair_color: document.querySelector('#character-hair_color'),
    skin_color: document.querySelector('#character-skin_color'),
    eye_color: document.querySelector('#character-eye_color'),
    birth_year: document.querySelector('#character-birth_year'),
    gender: document.querySelector('#character-gender'),
}

searchButton.addEventListener('click', getInfoFromApi)

async function getInfoFromApi() {
    resetCharacterFieldsAndForm()

    const characterId = searchInput.value.trim()

    if (!characterId) {
        errorText.innerText = 'Please enter a valid search term.'
        errorText.classList.remove('hidden')

        return
    }

    const baseUrl = `https://swapi.dev/api/people/?search=${characterId}`

    console.log('Character ID:', characterId)
    console.log('URL:', baseUrl)

    try {
        const response = await fetch(baseUrl)

        if (!response.ok) {
            console.error('Something went wrong with the API-request:', response.status)

            errorText.innerText = 'Character was not found. Try Again.'
            errorText.classList.remove('hidden')

            return
        }

        const data = await response.json()
        const character = data.results[0]
        
        if (data.count === 0 || !data) {
            errorText.innerText = 'Character was not found. Try Again.'
            errorText.classList.remove('hidden')

            return
        }

        setCharacterFields(character)

    } catch (error) {
        console.error('Something went wrong:', error)

        errorText.innerText = 'Something went wrong. Try again later.'
        errorText.classList.remove('hidden')
    }

    result.classList.remove('hidden')
}

function setCharacterFields(character) {
    characterFields.name.innerHTML = character.name
    characterFields.height.innerHTML = character.height
    characterFields.mass.innerHTML = character.mass
    characterFields.hair_color.innerHTML = character.hair_color
    characterFields.skin_color.innerHTML = character.skin_color
    characterFields.eye_color.innerHTML = character.eye_color
    characterFields.birth_year.innerHTML = character.birth_year
    characterFields.gender.innerHTML = character.gender
}

function resetCharacterFieldsAndForm() {
    result.classList.add('hidden')
    errorText.classList.add('hidden')

    errorText.innerText = ''

    characterFields.name.innerHTML = ""
    characterFields.height.innerHTML = ""
    characterFields.mass.innerHTML = ""
    characterFields.hair_color.innerHTML = ""
    characterFields.skin_color.innerHTML = ""
    characterFields.eye_color.innerHTML = ""
    characterFields.birth_year.innerHTML = ""
    characterFields.gender.innerHTML = ""
}