
let options = {};

        // Загружаем данные из JSON-файла
        fetch('./json/themes.json')
            .then(response => response.json())
            .then(data => {
                options = data; // Сохраняем загруженные данные в переменную options
            })
            .catch(error => console.error('Ошибка загрузки JSON:', error));

        function updateForms() {
            const select = document.getElementById("mainSelect");
            const additionalForms = document.getElementById("additionalForms");
            const form1 = document.getElementById("form1");

            if (select.value && options[select.value]) {
                additionalForms.classList.remove("hidden-for-form");
                form1.innerHTML = options[select.value].map(option => `<option value="${option}">${option}</option>`).join('');
            } else {
                additionalForms.classList.add("hidden-for-form");
                form1.innerHTML = '';
            }
        }


var city = document.getElementById('form2');

let cities = [];

        // Загрузка городов из JSON
        async function loadCities() {
            try {
                const response = await fetch('./json/region_ru.json');
                cities = await response.json();
            } catch (error) {
                console.error('Ошибка загрузки городов:', error);
            }
        }

        // Фильтрация городов по введенному тексту
        function filterCities() {
            const input = document.getElementById('city').value.toLowerCase();
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = ''; // Очистить предыдущие результаты

            if (input) {
                const filteredCities = cities.filter(item =>
                    item.city.toLowerCase().includes(input)
                );

                filteredCities.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = item.city;
                    div.onclick = function () {
                        document.getElementById('city').value = item.city;
                        suggestionsDiv.innerHTML = '';
                    };
                    suggestionsDiv.appendChild(div);
                });
            }
        }

        document.addEventListener('DOMContentLoaded', loadCities);


// fetch('./json/region_ru.json')
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then(data => {
//     data.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.city;
//         option.textContent = item.city; 
//         city.appendChild(option);
//     });
// })
// .catch(error => console.error('Error:', error));

// $(document).ready(function() {
//     $('#citySelect').select2({
//         placeholder: "начните вводить"
//     });
// });

