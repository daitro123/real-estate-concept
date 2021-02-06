// Burger menu toggling
const burger = document.querySelector(".burger");
const navList = document.querySelector("nav ul");
const burgerLines = document.querySelectorAll(".burger-line");

burger.addEventListener("click", () => {
	navList.classList.toggle("burger-active");
	navList.classList.toggle("nav__list--shown");
	burgerLines.forEach((line) => {
		line.classList.toggle("burger-toggle");
	});
});

window.addEventListener("click", (e) => {
	const burgerActive = document.querySelector(".burger-active");
	if (burgerActive) {
		console.log(e.target);
		if (
			!burgerActive.contains(e.target) &&
			e.target !== burger &&
			!e.target.classList.contains("burger-line")
		) {
			burgerActive.classList.remove("burger-active");
			navList.classList.remove("nav__list--shown");
			burgerLines.forEach((line) => {
				line.classList.remove("burger-toggle");
			});
		}
	}
});
