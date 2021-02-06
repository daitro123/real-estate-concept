const images = document.querySelectorAll(".banner__single");
let cnt = 0;

setInterval(() => {
	images.forEach((image, index) => {
		if (index === cnt) {
			image.classList.remove("banner__single--invisible");
			image.querySelector(".banner__title").classList.remove("banner__title--invisible");
			image
				.querySelector(".banner__location")
				.classList.remove("banner__location--invisible");
			image.querySelector(".banner__price").classList.remove("banner__price--invisible");
		} else {
			image.classList.add("banner__single--invisible");
			image.querySelector(".banner__title").classList.add("banner__title--invisible");
			image.querySelector(".banner__location").classList.add("banner__location--invisible");
			image.querySelector(".banner__price").classList.add("banner__price--invisible");
		}
	});

	if (cnt < images.length - 1) {
		cnt++;
	} else {
		cnt = 0;
	}
}, 5000);
