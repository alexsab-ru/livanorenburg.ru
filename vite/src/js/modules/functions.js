window.addEventListener("resize", setLeftPos);
const ww = window.innerWidth;

function setLeftPos() {
	const cw = document.querySelector(".container").offsetWidth;
	const mapInfo = document.querySelector(".map-info");

	if (mapInfo != null) {
		if (ww >= 1024) {
			mapInfo.style.left = (ww - cw) / 2 + "px";
		} else {
			mapInfo.removeAttribute("style");
		}
	}
}

setLeftPos();

const siteNav = document.getElementById("site_nav");

if (siteNav) {
	document.getElementById("mobile-btn-menu").addEventListener("click", () => {
		siteNav.classList.remove("translate-x-full");
	});

	document.getElementById("close-mobile-menu").addEventListener("click", () => {
		siteNav.classList.add("translate-x-full");
	});

	document.addEventListener("keydown", function(e) {
		if (e.key && e.key.toLocaleLowerCase() === "escape") {
			siteNav.classList.add("translate-x-full");
		}
	});
}


const modelMenuBtn = document.getElementById('model-menu-btn');
const modelMenu = document.getElementById('mobile-models-menu');
if(modelMenuBtn && modelMenu){
	modelMenuBtn.addEventListener('click', e => {
		if (ww >= 1024) return;
		modelMenuBtn.querySelector('svg').classList.toggle('-rotate-180');
		modelMenu.classList.toggle('invisible')
		modelMenu.classList.toggle('opacity-0')
		modelMenu.classList.toggle('-translate-y-5')
	})
}