const scrollTopBtn = document.querySelector(".scroll-top");
const sectionSluzby = document.querySelector(".sluzby");
const sectionOffer = document.querySelector(".offer");
const sectionOfferItems = document.querySelectorAll(".offer__item");
const breakpoint = window.innerHeight * 0.85;
let didScroll = false;
let counter = 0;
let isLoaded = false;

window.addEventListener("scroll", () => {
	didScroll = true;
});

setInterval(() => {
	if (didScroll) {
		didScroll = false;

		console.log("sluzby", sectionSluzby.getBoundingClientRect().top);
		console.log("breakpoint", breakpoint);

		// scroll-up button
		if (window.scrollY > 500) {
			scrollTopBtn.style.opacity = 1;
		} else {
			scrollTopBtn.style.opacity = 0;
		}

		// section sluzby
		if (sectionSluzby.getBoundingClientRect().top < breakpoint) {
			sectionSluzby.classList.add("sluzby--visible");
		}

		// section offer
		if (sectionOffer.getBoundingClientRect().top < breakpoint && !isLoaded) {
			sectionOfferItems.forEach((item, idx) => {
				setTimeout(() => {
					item.classList.add("offer__item--visible");
				}, idx * 500);
			});
			isLoaded = true;
		}
	}
}, 200);
