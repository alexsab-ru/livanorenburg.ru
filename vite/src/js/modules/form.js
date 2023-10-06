import { getCookie } from "./cookie";

const $$ = (el) => {
	return document.querySelectorAll(el);
};

// PHONE MASK
function maskphone(e) {
	let num = this.value
			.replace(/^(\+7|8)/g, "")
			.replace(/\D/g, "")
			.split(/(?=.)/),
		i = num.length;
	if (0 <= i) num.unshift("+7");
	if (1 <= i) num.splice(1, 0, " ");
	if (4 <= i) num.splice(5, 0, " ");
	if (7 <= i) num.splice(9, 0, "-");
	if (9 <= i) num.splice(12, 0, "-");
	if (11 <= i) num.splice(15, num.length - 15);
	this.value = num.join("");
	this.nextSibling.nextElementSibling.classList.add("hidden");
}

$$("input[name=phone]").forEach(function (element) {
	element.addEventListener("focus", maskphone);
	element.addEventListener("input", maskphone);
});


// AGREE CHECKBOX
// Проверка на состояние чекбокса, показ/скрытие ошибки
$$("input[name=agree]").forEach(function (element) {
	let errorMes = element.parentElement.querySelector(".agree");
	element.addEventListener("change", (e) => {
		if (!e.target.checked) {
			errorMes.classList.remove("hidden");
		} else {
			errorMes.classList.add("hidden");
		}
	});
});


// TEXTAREA
const minLengthTextareaField = 10; // минимальное кол-во символов
// проверка на минимальное кол-во символов и скрытие ошибки
const checkTextareaLength = (textarea, minLength) => {
	if (textarea.value.length >= minLength) {
		textarea.nextSibling.nextElementSibling.classList.add("hidden");
	}
};


// CHANGE textarea для всез браузеров
// $$("textarea").forEach(function (textarea) {
// 	if (textarea.addEventListener) {
// 		textarea.addEventListener(
// 			"input",
// 			function () {
// 				// event handling code for sane browsers
// 				checkTextareaLength(textarea, minLengthTextareaField);
// 			},
// 			false
// 		);
// 	} else if (textarea.attachEvent) {
// 		textarea.attachEvent("onpropertychange", function () {
// 			// IE-specific event handling code
// 			checkTextareaLength(textarea, minLengthTextareaField);
// 		});
// 	}
// });


// BUTTON
// Состояние кнопки
const stateBtn = (btn, value, disable = false) => {
	btn.value = value;
	btn.disabled = disable;
};

const showErrorMes = (form, el, text) => {
	let field = form.querySelector(el);
	field.innerText = text;
	field.classList.remove("hidden");
};

const showMessageModal = (messageModal, icon, message) => {
	document.querySelectorAll(".modal-overlay").forEach((el) => {
		el.classList.add("hidden");
	});
	messageModal.querySelector("#icon").innerHTML = icon;
	messageModal.querySelector("p").innerHTML = message;
	messageModal.classList.remove("hidden");
};


// FORMS
// Отправка всех форм
$$("form").forEach((form) => {
	const btn = form.querySelector('input[type="submit"]');
	form.onsubmit = async (event) => {
		event.preventDefault();
		stateBtn(btn, "Отправляем...", true);

		const agree = form.querySelector('[name="agree"]');
		const phone = form.querySelector('[name="phone"]');
		const errorIcon =
			'<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path fill="#ed1c24" d="M26,0A26,26,0,1,0,52,26,26,26,0,0,0,26,0Zm9.6,17.5a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2Zm-19.2,0a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2ZM39.65,40.69a.93.93,0,0,1-.45.11,1,1,0,0,1-.89-.55,13.81,13.81,0,0,0-24.62,0,1,1,0,1,1-1.78-.9,15.8,15.8,0,0,1,28.18,0A1,1,0,0,1,39.65,40.69Z"></path></svg>';
		const successIcon =
			'<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path fill="#279548" d="M26,0A26,26,0,1,0,52,26,26,26,0,0,0,26,0Zm9.6,17.5a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2Zm-19.2,0a2,2,0,1,1-2,2A2,2,0,0,1,16.4,17.5ZM40.09,32.15a15.8,15.8,0,0,1-28.18,0,1,1,0,0,1,1.78-.9,13.81,13.81,0,0,0,24.62,0,1,1,0,1,1,1.78.9Z"></path></svg>';
		const errorText =
			'<b class="text-bold block text-2xl mb-4">Упс!</b> Что-то пошло не так. Перезагрузите страницу и попробуйте снова. ';
		let successText = '<b class="text-bold block text-2xl mb-4">Спасибо!</b> В скором времени мы свяжемся с Вами!';
		const messageModal = document.getElementById("message-modal");

		if (!phone.value.length) {
			showErrorMes(form, ".phone", "Телефон является обязательным полем");
			stateBtn(btn, "Отправить");
			return;
		} else {
			const phoneRe = new RegExp(/^\+7 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}$/);
			if (!phoneRe.test(phone.value)) {
				showErrorMes(form, ".phone", "Введен некорректный номер телефона");
				stateBtn(btn, "Отправить");
				return;
			}
		}

		// если флажок не установлен - фронт
		if (!agree.checked) {
			showErrorMes(form, ".agree", "Чтобы продолжить, установите флажок");
			stateBtn(btn, "Отправить");
			return;
		}
		let formData = new FormData(form);
		if(getCookie('fta')) {
			formData.append("fta", true);
		}
		if(getCookie('__gtm_campaign_url')) {
			var source = new URL(getCookie('__gtm_campaign_url'));
			source.search.slice(1).split("&").forEach(function(pair) {
				var param = pair.split("=");
				formData.append(param[0], param[1]);
			});
		}
		formData.append(
			"page_url",
			window.location.origin + window.location.pathname
		);
		window.location.search
			.slice(1)
			.split("&")
			.forEach(function (pair) {
				var param = pair.split("=");
				if(formData.get(param[0])){
					formData.set(param[0], decodeURIComponent(param[1]));
				} else {
					formData.append(param[0], decodeURIComponent(param[1]));
				}
			});
		const params = new URLSearchParams([...formData]);
		var formDataObj = window.WebsiteAnalytics.getFormDataObject(formData, form.id);
		// await fetch('https://alexsab.ru/lead/test/', {
		await fetch("https://alexsab.ru/lead/livan/orenburg/", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				stateBtn(btn, "Отправить");
				if (data.answer == "required") {
					window.WebsiteAnalytics.dataLayer("form-required");
					showErrorMes(form, data.field, data.message);
					return;
				} else if (data.answer == "error") {
					window.WebsiteAnalytics.dataLayer("form-error");
					showMessageModal(messageModal, errorIcon, errorText + "<br>" + data.error);
				} else {
					window.WebsiteAnalytics.dataLayer("form-success", formDataObj);
					showMessageModal(messageModal, successIcon, successText);
				}
				form.reset();
			})
			.catch((error) => {
				window.WebsiteAnalytics.dataLayer("form-error");
				console.error("Ошибка отправки данных формы: " + error);
				showMessageModal(messageModal, errorIcon, errorText + "<br>" + error);
				stateBtn(btn, "Отправить");
			});
		return false;
	};
});
