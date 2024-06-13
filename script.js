const searchInput = document.querySelector('#searchInput')
const searchButton = document.querySelector('#searchButton')
const display = document.querySelector('.textAbout')

searchButton.addEventListener('click', getInfoFromApi)

async function getInfoFromApi() {
    const characterId = searchInput.value.trim()
    const baseUrl = `https://swapi.dev/api/people/?search=${characterId}`

    console.log('Character ID:', characterId)
    console.log('URL:', baseUrl)

    try {
        const response = await fetch(baseUrl)

        if (!response.ok) {
            console.error('Something went wrong with the API-request:', response.status)
            display.innerText = 'Character was not found. Try Again.'
            return;
        }

        const data = await response.json();
        
        if (data.count === 0) {
            display.innerText = 'Character was not found. Try Again.'
            return;
        }

        const character = data.results[0]
        const infoList = `
            <ul class="infoList">
                <li>Name: ${character.name}</li>
                <li>Height: ${character.height} cm</li>
                <li>Weight: ${character.mass} kg</li>
                <li>Haircolor: ${character.hair_color}</li>
                <li>Skincolor: ${character.skin_color}</li>
                <li>Eyecolor: ${character.eye_color}</li>
                <li>Birthyear: ${character.birth_year}</li>
                <li>Gender: ${character.gender}</li>
            </ul>
        `;

        display.innerHTML = infoList;
    } catch (error) {
        console.error('Something went wrong:', error);
        display.innerText = 'Something went wrong. Try again later.';
    }
}