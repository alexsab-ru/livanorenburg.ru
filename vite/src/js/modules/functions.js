window.addEventListener("resize", setLeftPos);

function setLeftPos() {
	const ww = window.innerWidth;
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

document
	.querySelector(".disclamer_switch")
	.addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector(".disclamer").style.display =
			document.querySelector(".disclamer").style.display === "none"
				? "block"
				: "none";
		window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	});

const siteNav = document.getElementById("site_nav");

if (siteNav) {
	document.getElementById("mobile-btn-menu").addEventListener("click", () => {
		siteNav.classList.remove("translate-x-full");
	});

	document.getElementById("close-mobile-menu").addEventListener("click", () => {
		siteNav.classList.add("translate-x-full");
	});

	document.addEventListener("keydown", (e) => {
		if (e.key.toLocaleLowerCase() === "escape") {
			siteNav.classList.add("translate-x-full");
		}
	});
}
