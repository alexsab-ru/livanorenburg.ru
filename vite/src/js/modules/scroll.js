let prevScrollpos = window.scrollY;
let $header = document.querySelector("header");
let $nav = document.getElementById('site_nav');
let $modelBar = document.getElementById('model-bar');
let hideHeaderPos = $header.offsetHeight;
let hideNavPos = $nav.offsetHeight;
let ww = window.innerWidth;

if($modelBar){
	$modelBar.style.top = ww > 1024 ? (hideHeaderPos + hideNavPos) + "px" : hideHeaderPos + "px";
}

$nav.style.top = hideHeaderPos + "px";

window.addEventListener("resize", () => {
	hideHeaderPos = $header.clientHeight;
	ww = window.innerWidth;
	if($modelBar){
		$modelBar.style.top = ww > 1024 ? (hideHeaderPos + hideNavPos) + "px" : hideHeaderPos + "px";
	}
});

window.addEventListener("scroll", () => {
	var currentScrollPos = window.scrollY;
	if (currentScrollPos > hideHeaderPos) {
		if (prevScrollpos > currentScrollPos) {
			$header.style.top = 0;
			$nav.style.top = hideHeaderPos + "px";
			if($modelBar){
				$modelBar.style.top = ww > 1024 ? (hideHeaderPos + hideNavPos) + "px" : hideHeaderPos + "px";
			}
		} else {
			$header.style.top = -hideHeaderPos + "px";
            $nav.style.top = 0;
			if($modelBar){
				$modelBar.style.top = ww < 1024 ? 0 + "px" : hideNavPos + "px";
			}
		}
		prevScrollpos = currentScrollPos;
	} else {
		$header.style.top = 0;
        $nav.style.top = hideHeaderPos + "px";
		if($modelBar){
			$modelBar.style.top = ww > 1024 ? (hideHeaderPos + hideNavPos) + "px" : hideHeaderPos + "px";
		}
	}
});

const modelMenuBtn = document.getElementById('model-menu-btn');
const modelMenu = document.getElementById('mobile-models-menu');

const anchors = document.querySelectorAll('.scroll-link')
for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		modelMenuBtn.querySelector('svg').classList.remove('-rotate-180');
		modelMenu.classList.add('invisible')
		modelMenu.classList.add('opacity-0')
		modelMenu.classList.add('-translate-y-5')
		let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = $modelBar.offsetHeight;
        // const topOffset = 0; // если не нужен отступ сверху 
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
	})
}

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;
	document.querySelectorAll('.section').forEach((el, i) => {
		if (el.offsetTop - $nav.offsetHeight * 2.5 <= scrollDistance) {
			document.querySelectorAll('.scroll-link').forEach((elem) => {
				if (elem.classList.contains('bg-white/10')) {
					elem.classList.remove('bg-white/10');
				}
			});

			document.querySelectorAll('.scroll-link')[i].classList.add('bg-white/10');
		}
		if(scrollDistance === 0){
			document.querySelectorAll('.scroll-link').forEach((elem) => {
				elem.classList.remove('bg-white/10');
			});
		}
	});
})