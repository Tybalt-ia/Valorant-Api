fetch("https://valorant-api.com/v1/buddies")
    .then(response => response.json())
    .then(data => {
        const buddies = data.data;
        const container = document.getElementById('main-content');
        const searchInput = document.getElementById('searchInput');

        function displayBuddies(filteredBuddies) {
            container.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos elementos
            const cardCount = document.getElementById('card-count');
            
            if (filteredBuddies.length === 0) {
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results';
                noResultsMessage.innerText = 'No se encontraron tarjetas';
                container.appendChild(noResultsMessage);
                cardCount.innerText = 'Total de tarjetas: 0';
            } else {
                filteredBuddies.forEach(buddy => {
                    const card = document.createElement('div');
                    card.className = 'col';
                    card.innerHTML = `
                        <div class="card h-100">
                            <img src="${buddy.displayIcon}" class="card-img-top" alt="${buddy.displayName}" loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${buddy.displayName}</h5>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
                cardCount.innerText = `Total de tarjetas: ${filteredBuddies.length}`;
            }
        }

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBuddies = buddies.filter(buddy => 
                buddy.displayName.toLowerCase().includes(searchTerm)
            );
            displayBuddies(filteredBuddies);
        });

        // Display all buddies initially
        displayBuddies(buddies);
    })
    .catch(error => console.error('Error fetching data:', error));

    document.getElementById('darkModeToggle').addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('navbar-dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
    
        // Alternar clases para las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.toggle('dark-mode'));
    
        // Cambiar el texto del botón según el estado
        this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    });
    
