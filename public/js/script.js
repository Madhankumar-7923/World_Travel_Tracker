/*SEARCH SUGGESTION BAR*/
document.addEventListener('DOMContentLoaded', () => {

    const countries = [
        "Afghanistan",
        "Albania",
        "Armenia",
        "Angola",
        "Argentina",
        "Austria",
        "Australia",
        "Azerbaijan",
        "Bosnia and Herzegovina",
        "Bangladesh",
        "Belgium",
        "Burkina Faso",
        "Bulgaria",
        "Burundi",
        "Benin",
        "Brunei Darussalam",
        "Bolivia",
        "Brazil",
        "Bahamas",
        "Bhutan",
        "Botswana",
        "Belarus",
        "Belize",
        "Canada",
        "Democratic Republic of Congo",
        "Central African Republic",
        "Republic of Congo",
        "Switzerland",
        "Côte d'Ivoire",
        "Chile",
        "Cameroon",
        "China",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Cyprus",
        "Czechia",
        "Germany",
        "Djibouti",
        "Denmark",
        "Dominican Republic",
        "Algeria",
        "Ecuador",
        "Estonia",
        "Egypt",
        "Western Sahara",
        "Eritrea",
        "Spain",
        "Ethiopia",
        "Falkland Islands",
        "Finland",
        "Fiji",
        "France",
        "Gabon",
        "United Arab Emirates",
        "United Kingdom",
        "Georgia",
        "French Guiana",
        "Ghana",
        "Greenland",
        "Gambia",
        "Guinea",
        "Equatorial Guinea",
        "Greece",
        "Guatemala",
        "Guinea-Bissau",
        "Guyana",
        "Honduras",
        "Croatia",
        "Haiti",
        "Hungary",
        "Indonesia",
        "Ireland",
        "Israel",
        "India",
        "Iraq",
        "Iran",
        "Iceland",
        "Italy",
        "Jamaica",
        "Jordan",
        "Japan",
        "Kenya",
        "Kyrgyzstan",
        "Cambodia",
        "North Korea",
        "South Korea",
        "Kosovo",
        "Kuwait",
        "Kazakhstan",
        "Lao People's Democratic Republic",
        "Lebanon",
        "Sri Lanka",
        "Liberia",
        "Lesotho",
        "Lithuania",
        "Luxembourg",
        "Latvia",
        "Libya",
        "Morocco",
        "Moldova",
        "Montenegro",
        "Madagascar",
        "Macedonia",
        "Mali",
        "Myanmar",
        "Mongolia",
        "Mauritania",
        "Malawi",
        "Mexico",
        "Malaysia",
        "Mozambique",
        "Namibia",
        "New Caledonia",
        "Niger",
        "Nigeria",
        "Nicaragua",
        "Netherlands",
        "Norway",
        "Nepal",
        "New Zealand",
        "Oman",
        "Panama",
        "Peru",
        "Papua New Guinea",
        "Philippines",
        "Poland",
        "Pakistan",
        "Puerto Rico",
        "Palestinian Territories",
        "Portugal",
        "Paraguay",
        "Qatar",
        "Romania",
        "Serbia",
        "Russia",
        "Rwanda",
        "Saudi Arabia",
        "Solomon Islands",
        "Sudan",
        "Sweden",
        "Slovenia",
        "Svalbard and Jan Mayen",
        "Slovakia",
        "Sierra Leone",
        "Senegal",
        "Somalia",
        "Suriname",
        "South Sudan",
        "El Salvador",
        "Syria",
        "Swaziland",
        "Chad",
        "French Southern and Antarctic Lands",
        "Togo",
        "Thailand",
        "Tajikistan",
        "Timor-Leste",
        "Turkmenistan",
        "Tunisia",
        "Turkey",
        "Trinidad and Tobago",
        "Taiwan",
        "Tanzania",
        "Ukraine",
        "Uganda",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Vanuatu",
        "Yemen",
        "South Africa",
        "Zambia",
        "Zimbabwe"
    ];

    const input = document.getElementById('countryInput');
    const suggestionsContainer = document.getElementById('suggestions');

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query) {

            const filteredCountries = countries.filter(country => country.toLowerCase().includes(query.toLowerCase()));

            suggestionsContainer.innerHTML = '';

            if (filteredCountries.length > 0) {
                filteredCountries.forEach(country => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = country;

                    suggestionItem.addEventListener('click', () => {
                        input.value = country;
                        suggestionsContainer.innerHTML = '';
                    });

                    suggestionsContainer.appendChild(suggestionItem);
                });
            }

            else {
                const noMatchItem = document.createElement('div');
                noMatchItem.className = 'no-match';
                noMatchItem.textContent = 'No Country Found';
                suggestionsContainer.appendChild(noMatchItem);
            }

        }

    });

});