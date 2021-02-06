const galleryImages = document.querySelectorAll(".property__gallery img");
const carouselImgEl = document.querySelector(".carousel__images");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
let currentImage = 0;
let carouselWidth = carouselImgEl.offsetWidth;

galleryImages.forEach((image, idx) => {
	image.addEventListener("click", () => {
		carouselWidth = carouselImgEl.offsetWidth;
		carouselImgEl.style.transform = `translateX(-${idx * carouselWidth}px)`;
		currentImage = idx;
	});
});

function setTranslateX() {
	carouselWidth = carouselImgEl.offsetWidth;
	let translateXVal = currentImage * carouselWidth;
	carouselImgEl.style.transform = `translateX(-${translateXVal}px)`;
}

prevBtn.addEventListener("click", () => {
	if (currentImage > 0) {
		currentImage--;
		setTranslateX();
	}
});

nextBtn.addEventListener("click", () => {
	if (currentImage < galleryImages.length - 1) {
		currentImage++;
		setTranslateX();
	}
});
