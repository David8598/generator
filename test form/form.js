var city = document.getElementById('form2');

fetch('./region_ru.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.city;
        option.textContent = item.city; 
        city.appendChild(option);
    });
})
.catch(error => console.error('Error:', error));

$(document).ready(function() {
    $('#citySelect').select2({
        placeholder: "начните вводить"
    });
});