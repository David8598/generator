
var themes = document.getElementById('theme').value;

console.log(themes)






// скрипт вывода всез регионов РФ 
fetch('./json/region_ru.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})  
.then(data => {

    city = document.getElementById('city');

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.city;
        option.textContent = item.city; 
        city.appendChild(option);
    });
})
.catch(error => console.error('Error:', error));



// скрипт для формы 
$(document).ready(function() {
    $('#citySelect').select2({
        placeholder: "начните вводить"
    });
});