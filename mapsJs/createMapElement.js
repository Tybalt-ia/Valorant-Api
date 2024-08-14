export function createMapElement(map) {
    let mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';

    let title = document.createElement('h2');
    title.className = 'map-title';
    title.textContent = map.displayName;
    mapContainer.appendChild(title);

    let description = document.createElement('p');
    description.className = 'map-description';
    description.textContent = map.tacticalDescription || "No description available.";
    mapContainer.appendChild(description);

    let mainImage = document.createElement('img');
    mainImage.className = 'map-image';
    mainImage.src = map.splash;
    mapContainer.appendChild(mainImage);

    let thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'thumbnails';

    createThumbnail(thumbnailsContainer, map.displayIcon, mainImage);
    createThumbnail(thumbnailsContainer, map.listViewIcon, mainImage);
    createThumbnail(thumbnailsContainer, map.listViewIconTall, mainImage);
    createThumbnail(thumbnailsContainer, map.splash, mainImage);
    createThumbnail(thumbnailsContainer, map.stylizedBackgroundImage, mainImage);
    createThumbnail(thumbnailsContainer, map.premierBackgroundImage, mainImage);

    mapContainer.appendChild(thumbnailsContainer);

    return mapContainer;
}

function createThumbnail(container, src, mainImage) {
    let thumbnail = document.createElement('img');
    thumbnail.className = 'thumbnail';
    thumbnail.src = src;
    thumbnail.addEventListener('click', () => {
        mainImage.src = src;
    });
    container.appendChild(thumbnail);
}