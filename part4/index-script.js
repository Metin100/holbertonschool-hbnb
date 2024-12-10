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


function checkAuthentication(token) {
    const loginLink = document.getElementById('login-link');
    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const token = getCookie('token');
    checkAuthentication(token);
    try {
        const response = await fetch("http://127.0.0.1:6010/api/v1/places", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayPlaces(data);
        } else {
            console.error(`Response error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
});


function displayPlaces(places) {
    const placeList = document.querySelector('#places-list');
    const priceFilter = document.querySelector('#price-filter');
    placeList.textContent = '';
    console.log(places)

    for (let i = 0; i < places.length; i++) {
        const placeCard = document.createElement('div');
        placeCard.classList.add("place-card");

        const selectPrice = document.createElement('option');
        selectPrice.value = places[i].price;
        selectPrice.textContent = `${places[i].price}`

        const placeContent = document.createElement('div');
        placeContent.classList.add("place-content");

        const placeHeader = document.createElement('div');
        placeHeader.classList.add("place-header");
        placeHeader.textContent = `${places[i].title}`;

        const placePrice = document.createElement('div');
        placePrice.classList.add("place-price");
        placePrice.textContent = `Price per night: ${places[i].price}`;

        const placeButton = document.createElement('button');
        placeButton.classList.add("place-button");
        placeButton.textContent = 'View Details';

        priceFilter.append(selectPrice)
        placeContent.append(placeHeader, placePrice, placeButton);
        placeCard.appendChild(placeContent);
        placeList.append(placeCard);
    }
}