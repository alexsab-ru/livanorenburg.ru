import Alpine from "alpinejs";

// window.Alpine = Alpine
document.addEventListener("alpine:init", () => {
	Alpine.data("cookieAgreement", () => ({
		show: localStorage.getItem("cookie") || false,
		onClick() {
			localStorage.setItem("cookie", true);
			this.$root.remove();
		},
	}));
	Alpine.data("reklama", () => ({
		init(){
			localStorage.getItem("reklama") ? Alpine.store('reklama').on = false : true;
			console.log(Alpine.store('reklama'));
		},
		show: localStorage.getItem("reklama") || false,
		onClick() {
			localStorage.setItem("reklama", true);
			Alpine.store('reklama').on = false;
			this.$root.remove();
		},
	}));
	Alpine.data("scrollTop", (t) => ({
		scrolled: !1,
		init() {
			(this.scrolled =
				document.documentElement.scrollTop > window.innerHeight / 1),
				document.addEventListener("scroll", (e) => this.onScroll(e));
		},
		onScroll(e) {
			this.scrolled = document.documentElement.scrollTop > window.innerHeight / 1;
		},
		onClick() {
			document.documentElement.scroll({
				top: 0,
				behavior: "smooth",
			});
		},
	}));

	Alpine.data("sorting", () => ({
		open: false,
		carItems: document.querySelectorAll(".car-item"),
		carListWrapper: document.querySelector(".car-list"), //wrapper
		cars: [],
		options: [
			{ id: "default", title: "По умолчанию" },
			{ id: "price_up", title: "По возрастанию цены" },
			{ id: "price_down", title: "По убыванию цены" },
			{ id: "asc", title: "По моделям" },
		],
		current: "default",
		value: "",
		setTitle() {
			this.options.find((c) => {
				if (c.id === this.current) {
					this.value = c.title;
				}
			});
		},
		sortBy(id) {
			this.current = id;
			this.setTitle();
			this.open = false;
            if(id != 'default'){
                this.cars.sort(function (a, b) {
                    var priceA = parseFloat(a.getAttribute("data-price"));
                    var priceB = parseFloat(b.getAttribute("data-price"));
                    var modelA = a.getAttribute('data-model').toLowerCase();
                    var modelB = b.getAttribute('data-model').toLowerCase();
                    if(id === "price_up"){
                        return priceA - priceB; //увелечение
                    }else if(id == "price_down"){
                        return priceB - priceA; //уменьшение
                    }else if(id === 'asc'){
                        if (modelA < modelB) {
                            return -1;
                        }
                    }
                })
            }else{
                this.cars = Array.from(this.carItems);
            }

			while (this.carListWrapper.firstChild) {
				this.carListWrapper.removeChild(this.carListWrapper.firstChild);
			}
			this.cars.forEach(function (element) {
				document.querySelector(".car-list").appendChild(element);
			});
		},
		init() {
			this.cars = Array.from(this.carItems);
			this.setTitle();
            // this.sortBy(this.current)
		},
	}));
	Alpine.store('reklama', {
		on: true,
	})
});

Alpine.start();
