const form = document.querySelector('#search-form');
const addressInput = document.querySelector('#address-input');
const spinner = document.querySelector('#spinner');
const error = document.querySelector('#error');

spinner.classList.add('d-none');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const address = addressInput.value;
    spinner.classList.remove('d-none');
    error.classList.add('d-none');
    document.querySelector('#coordinates').style.display = 'none';
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === 'OK') {
            document.getElementById('map').style.display='block';
            const location = results[0].geometry.location;
            const map = new google.maps.Map(document.querySelector('#map'), {
                zoom: 12,
                center: location
            });
            const marker = new google.maps.Marker({
                position: location,
                map: map
            });
            document.querySelector('#coordinates').innerHTML = 'Longitude: ' + location.lng() + '<br>Latitude: ' + location.lat();
            document.querySelector('#coordinates').style.display = 'block';
        }
        else {
            document.getElementById('map').style.display='none';
            error.innerHTML = 'Error: ' + status;
            error.classList.remove('d-none');
        }
        spinner.classList.add('d-none');
    });
});