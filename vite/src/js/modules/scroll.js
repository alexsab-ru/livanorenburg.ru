let prevScrollpos = window.scrollY;
let $header = document.querySelector("header");
let $nav = document.getElementById('site_nav');
let hideHeaderPos = $header.offsetHeight;

window.addEventListener("resize", () => {
	hideHeaderPos = $header.clientHeight;
});

window.addEventListener("scroll", () => {
	var currentScrollPos = window.scrollY;
	if (currentScrollPos > hideHeaderPos) {
		if (prevScrollpos > currentScrollPos) {
			$header.style.top = 0;
			$nav.style.top = hideHeaderPos + "px";
		} else {
			$header.style.top = -hideHeaderPos + "px";
            $nav.style.top = 0;
		}
		prevScrollpos = currentScrollPos;
	} else {
		$header.style.top = 0;
        $nav.style.top = hideHeaderPos + "px";
	}
});