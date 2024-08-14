document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const weaponUuid = urlParams.get('uuid');

    if (weaponUuid) {
        fetchWeaponDetails(weaponUuid);
    } else {
        console.error('No UUID provided in the URL');
    }
});

function fetchWeaponDetails(uuid) {
    fetch(`https://valorant-api.com/v1/weapons/${uuid}`)
        .then(response => response.json())
        .then(data => {
            const weapon = data.data;
            displayWeaponDetails(weapon);
            setupSkinsCarousel(weapon.skins);
        })
        .catch(error => {
            console.error('Error fetching weapon details:', error);
        });
}

function displayWeaponDetails(weapon) {
    const detailsContainer = document.getElementById('weapon-details');
    detailsContainer.innerHTML = `
        <img src="${weapon.displayIcon}" alt="${weapon.displayName}" class="img-fluid mb-3">
        <h1 class="mb-3">${weapon.displayName}</h1>
        <p><strong>Category:</strong> ${weapon.category.replace('EEquippableCategory::', '')}</p>
        ${weapon.weaponStats ? `
            <p><strong>Fire Rate:</strong> ${weapon.weaponStats.fireRate}</p>
            <p><strong>Magazine Size:</strong> ${weapon.weaponStats.magazineSize}</p>
            <p><strong>Reload Time:</strong> ${weapon.weaponStats.reloadTimeSeconds} seconds</p>
        ` : ''}
    `;
}

function setupSkinsCarousel(skins) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Limpiar cualquier contenido anterior

    skins
        .filter(skin => skin.displayName !== "Random Favorite Skin" && skin.displayName !== `Standard ${skin.displayName}` && skin.displayIcon !== null)
        .forEach((skin, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const img = document.createElement('img');
            img.src = skin.displayIcon;
            img.alt = skin.displayName;
            img.classList.add('d-block', 'w-100');

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });
}
