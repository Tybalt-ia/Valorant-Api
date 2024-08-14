import { fetchMaps } from './fetchData.js';
import { createMapElement } from './createMapElement.js';

async function init() {
    let maps = await fetchMaps();
    let mapsContainer = document.getElementById('maps-container');
    let searchBar = document.getElementById('searchBarMaps');
    let noResultsMessage = document.getElementById('no-results-message');

    let renderMaps = (mapsToRender) => {
        mapsContainer.innerHTML = '';
        if (mapsToRender.length > 0) {
            noResultsMessage.classList.add('hidden');
            mapsToRender.forEach(map => {
                let mapElement = createMapElement(map);
                mapsContainer.appendChild(mapElement);
            });
        } else {
            noResultsMessage.classList.remove('hidden');
        }
    }

    searchBar.addEventListener('input', (event) => {
        let searchTerm = event.target.value.toLowerCase();
        let filteredMaps = maps.filter(map => 
            map.displayName.toLowerCase().includes(searchTerm)
        );
        renderMaps(filteredMaps);
    });

    renderMaps(maps);
}

init();