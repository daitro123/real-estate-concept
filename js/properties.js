const listingsGrid = document.querySelector(".listings__grid");
const sortBy = document.querySelector("#sortby");
const searchForm = document.querySelector(".searchbar__form");
const searchOptionsForm = document.querySelector(".listings__search-options");
const searchBtn = searchForm.querySelector("button");
const searchInputEl = searchForm.querySelector("input");
const selectCountry = document.getElementById("select-country");
const selectCity = document.getElementById("select-city");
const selectType = document.getElementById("select-type");
const selectStatus = document.getElementById("select-status");
const resultsCnt = document.getElementById("results-count");
let minPrice = 0;
let maxPrice = 2500000;

// Truncate description
function truncateDesc(text) {
	if (text.length > 125) {
		return text.slice(0, 125) + "...";
	}
}

const properties = [
	{
		title: "Large family home",
		street: "ulice Hradebni",
		city: "Cheb",
		country: "Czechia",
		type: "house",
		price: 420000,
		status: "sale",
		area: "152",
		bedrooms: 4,
		bathrooms: 2,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/house-building-home-1946371.jpg",
	},
	{
		title: "Luxurious apartment",
		street: "ulice Chlebova",
		city: "Praha",
		country: "Czechia",
		type: "apartment",
		price: 125000,
		status: "sale",
		area: "85",
		bedrooms: 2,
		bathrooms: 1,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/caroline-minor-christensen-rPA3BqS1FBU-unsplash.jpg",
	},
	{
		title: "Spacious offices",
		street: "Talos",
		city: "Whiterun",
		country: "Skyrim",
		type: "office",
		price: 56000,
		status: "rent",
		area: "256",
		bedrooms: 0,
		bathrooms: 4,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/photo-1586251810121-d58e64441cf1.webp",
	},
	{
		title: "Modern suburbia house",
		street: "Kona st.",
		city: "Los Angeles",
		country: "USA",
		type: "house",
		price: 640000,
		status: "sale",
		area: "142",
		bedrooms: 6,
		bathrooms: 2,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/stephen-leonardi-8xn_PWT_6d0-unsplash.jpg",
	},
	{
		title: "Two stories house",
		street: "Mahadja",
		city: "Marakesh",
		country: "Morroco",
		type: "house",
		price: 150000,
		status: "sale",
		area: "168",
		bedrooms: 5,
		bathrooms: 2,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/faiq-daffa.jpg",
	},
	{
		title: "Cozy suburban house",
		street: "New Hampshire",
		city: "Manchester",
		country: "USA",
		type: "house",
		price: 189000,
		status: "sale",
		area: "156",
		bedrooms: 4,
		bathrooms: 2,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodioptio tempora ipsam molestiae neque eum. Soluta saepe pariatur quis cum omnis voluptate cumque laudantium officiis voluptatum provident consectetur eaque tempore mollitia necessitatibus maxime quas sint magnam, ullam aliquam amet id ad quos minus deleniti! Delectus temporibus fuga repudiandae perspiciatis impedit vero et atque praesentium ducimus!",
		featuredImage: "/img/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
	},
];

let currentResults = [...properties];

// Get available search options from properties array
function getOptions(array, key) {
	let allValues = [];
	array.forEach((item) => {
		allValues.push(item[key]);
	});
	const uniqueValues = new Set(allValues);
	return [...uniqueValues];
}

const optionCountries = getOptions(properties, "country");
const optionCities = getOptions(properties, "city");
const optionTypes = getOptions(properties, "type");
const optionStatus = getOptions(properties, "status");

function createOptions(selectEl, options) {
	options.forEach((option) => {
		const optionEl = `<option value="${option}">${option}</option>`;
		selectEl.insertAdjacentHTML("beforeend", optionEl);
	});
}

createOptions(selectCountry, optionCountries);
createOptions(selectCity, optionCities);
createOptions(selectType, optionTypes);
createOptions(selectStatus, optionStatus);

// Card function
function createCardElement(property) {
	const card = `
        <div class="card">
            <div class="card__image-container">
                <img
                    src="${property.featuredImage}"
                    alt=""
                    class="card__image"
                />
                <button
                    class="btn btn__detail btn--pdmedium"
                    onclick="location.href='/single-property.html'"
                >
                    Detail
                </button>
            </div>
            <div class="card__type">${property.status}</div>
            <h3 class="card__title"><a href="/single-property.html">${property.title}</a></h3>
            <p class="card__location">
                <svg>
                    <use
                        xlink:href="img/fa-solid-sprite.svg#map-marker-alt"
                    ></use>
                </svg>
                ${property.city}, ${property.street}
            </p>
            <p class="card__price">${property.price.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})}</p>
            <p class="card__excerpt">
                ${truncateDesc(property.description)}
            </p>
            <ul class="card__features">
                <li class="card__bedrooms--icon">
                    <svg>
                        <use xlink:href="img/fa-solid-sprite.svg#bed"></use>
                    </svg>
                </li>
                <li class="card__bedrooms--count">${property.bedrooms}</li>
                <li class="card__bathrooms--icon">
                    <svg>
                        <use xlink:href="img/fa-solid-sprite.svg#bath"></use>
                    </svg>
                </li>
                <li class="card__bathrooms--count">${property.bathrooms}</li>
                <li class="card__area--icon">
                    <svg>
                        <use xlink:href="img/fa-solid-sprite.svg#square"></use>
                    </svg>
                </li>
                <li class="card__area--count">${property.area} m<sup>2</sup></li>
            </ul>
        </div>
    `;

	return card;
}

function renderProperties(propertyArray) {
	listingsGrid.innerHTML = "";
	propertyArray.forEach((property) => {
		listingsGrid.insertAdjacentHTML("beforeend", createCardElement(property));
	});
	resultsCnt.innerHTML = propertyArray.length;
}

sortBy.addEventListener("change", (e) => {
	let order = e.target.value;
	if (order === "Lowest price") {
		currentResults.sort((a, b) => a.price - b.price);
	} else {
		currentResults.sort((a, b) => b.price - a.price);
	}

	renderProperties(currentResults);
});

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let searchedWord = searchInputEl.value.toLowerCase();
	searchInputEl.value = "";
	if (searchedWord) {
		const result = properties.filter((property) =>
			property.title.toLowerCase().includes(searchedWord)
		);
		currentResults = [...result];
		renderProperties(result);
	} else {
		currentResults = [...properties];
		renderProperties(currentResults);
	}
});

searchOptionsForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let searchedObj = {
		country: selectCountry.value,
		city: selectCity.value,
		type: selectType.value,
		status: selectStatus.value,
	};

	let result = [...properties];
	for (const [key, value] of Object.entries(searchedObj)) {
		// e.g. if key country !== default option 'Country'
		if (key !== value.toLowerCase()) {
			result = result.filter((property) => property[key] === value);
		}

		result = result.filter(
			(property) => property.price >= minPrice && property.price <= maxPrice
		);
	}
	currentResults = [...result];
	renderProperties(currentResults);
});

// Slider

$(function () {
	$("#slider-price").slider({
		range: true,
		min: 0,
		max: 2500000,
		values: [0, 2500000],
		step: 10000,
		slide: function (event, ui) {
			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			minPrice = ui.values[0];
			maxPrice = ui.values[1];
		},
	});
	$("#amount").val(
		"$" +
			$("#slider-price").slider("values", 0) +
			" - $" +
			$("#slider-price").slider("values", 1)
	);
});

renderProperties(currentResults);
