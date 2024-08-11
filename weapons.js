document.addEventListener('DOMContentLoaded', function () {
    fetch('https://valorant-api.com/v1/weapons')
        .then(response => response.json())
        .then(data => {
            populateCategoryFilter(data.data);
            renderWeaponCards(data.data);

            document.getElementById('filter-text').addEventListener('input', () => filterWeapons(data.data));
            document.getElementById('filter-category').addEventListener('change', () => filterWeapons(data.data));
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderWeaponCards(weapons) {
    const weaponCards = document.getElementById('weapon-cards');
    weaponCards.innerHTML = ''; // Limpiar cualquier contenido anterior

    weapons.forEach(weapon => {
        const card = createWeaponCard(weapon);
        weaponCards.appendChild(card);

        // Agregar el evento de clic a cada tarjeta
        card.querySelector('.btn-details').addEventListener('click', () => {
            window.location.href = `weapon-details.html?uuid=${weapon.uuid}`;
        });
    });
}

function createWeaponCard(weapon) {
    const card = document.createElement('div');
    card.classList.add('col-md-3', 'col-sm-1', 'mb-4');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card', 'h-100');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'd-flex', 'flex-column', 'justify-content-center');

    const img = document.createElement('img');
    img.src = weapon.displayIcon;
    img.alt = weapon.displayName;
    img.classList.add('card-img-top', 'img-fluid');

    const name = document.createElement('h5');
    name.classList.add('card-title', 'mt-3');
    name.textContent = weapon.displayName;

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-primary', 'btn-details');
    detailsButton.textContent = 'View Details';

    cardBody.appendChild(img);
    cardBody.appendChild(name);
    cardBody.appendChild(detailsButton);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);

    return card;
}

function populateCategoryFilter(weapons) {
    const categoryFilter = document.getElementById('filter-category');
    const categories = new Set(weapons.map(weapon => weapon.category.replace("EEquippableCategory::", "")));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = `EEquippableCategory::${category}`;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterWeapons(weapons) {
    const searchText = document.getElementById('filter-text').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category').value;

    const filteredWeapons = weapons.filter(weapon => {
        const textMatch = weapon.displayName.toLowerCase().includes(searchText);
        const categoryMatch = selectedCategory ? weapon.category === selectedCategory : true;
        return textMatch && categoryMatch;
    });

    if (filteredWeapons.length > 0) {
        document.getElementById('no-results-message').style.display = 'none'; // Ocultar mensaje
        renderWeaponCards(filteredWeapons);
    } else {
        document.getElementById('no-results-message').style.display = 'block'; // Mostrar mensaje
        document.getElementById('weapon-cards').innerHTML = ''; // Limpiar las tarjetas de armas
    }
}
