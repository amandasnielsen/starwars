// Setup all the element references
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
const errorText = document.querySelector('#error-text')
const result = document.querySelector('.result')

// Setup all the character fields inside an object to make it easier to access them
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

// Add an event listener to the search button
searchButton.addEventListener('click', getInfoFromApi)

// Function to get the character information from the API
async function getInfoFromApi() {
    // Before we start the API request, we reset the character fields and form
    // This is to make sure that the user gets a clean slate to search for a new character
    resetCharacterFieldsAndForm()

    // Get the character search input value
    const characterSearchInputValue = searchInput.value.trim()

    // Make sure that the user has entered a valid search term
    if (!characterSearchInputValue) {
        displayError('Please enter a valid search term.')
        return
    }

    // Create the base URL for the API request
    const baseUrl = `https://swapi.dev/api/people/?search=${characterSearchInputValue}`

    // Add a try/catch block to handle any errors that might occur during the API request
    try {
        // Send the API request
        const response = await fetch(baseUrl)

        // Make sure that the API request was successful
        if (!response.ok) {
            console.error('Something went wrong with the API-request:', response.status)

            displayError('Character was not found. Try Again.')
            return
        }

        // Parse the response data
        const data = await response.json()

        // Get the character from the response data
        const character = data.results[0]
        
        // Make sure that the character was found
        if (data.count === 0 || !data) {
            displayError('Character was not found. Try Again.')
            return
        }

        // Set each character fields with the character information
        setCharacterFields(character)

    } catch (error) {
        console.error('Something went wrong:', error)

        displayError('Something went wrong. Try again later.')
        return
    }

    // Show the result section
    result.classList.remove('hidden')
}

// Function to display an error message
function displayError(errorMessage) {
    errorText.innerText = errorMessage
    errorText.classList.remove('hidden')
}

// Function to set the character fields with the character information
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

// Function to reset the character fields and form before a new search
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