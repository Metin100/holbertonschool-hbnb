function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let c = decodedCookie.split(';');

    for (let i = 0; i < c.length; i++) {
        let ca = c[i];
        while (ca.charAt(0) == ' ') {
            ca = ca.substring(1);
        }
        if (ca.indexOf(name) == 0) {
            return ca.substring(name.length, ca.length);
        }
    }
    return "";
}


function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        fetchPlaces(token);
    }
}

document.addEventListener('DOMContentLoaded', async function fetchPLaces(token){
    try {
        const response = await fetch("http://127.0.0.1:6010/api/v1/places", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            data = response.json();
            displayPlaces(data);
        } else {
            console.error('We have problem about response.');
        }
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
})

function displayPlaces(places) {
    const placeList = document.querySelector('#places-list');
    placeList.textContent = '';

    for (let i = 0; i < places.length; i++) {
        const placeCard = document.createElement('div');
        placeCard.classList.add("place-card");

        const placeContent = document.createElement('div');
        placeContent.classList.add("place-content");
        placeCard.appendChild(placeContent);

        const placeHeader = document.createElement('div');
        placeHeader.classList.add("place-header");
        placeHeader.textContent = `${places[i].get('title')}`;

        const placePrice = document.createElement('div');
        placePrice.classList.add("place-price");
        placeHeader.textContent = `Price per night: ${places[i].get('price')}`;

        const placeButton = document.createElement('button');
        placeButton.classList.add("place-button");
        placeButton.textContent = 'View Details';

        placeContent.append(placeHeader, placePrice, placeButton);
        placeList.append(placeCard);
    }

    // document.getElementById('price-filter').addEventListener('change', (event) => {
    //     // Get the selected price value
    //     // Iterate over the places and show/hide them based on the selected price
    // });
}