export function noValidPhone(phoneValue) {
	return ([...new Set(phoneValue.replace(/^(\+7)/g, "").replace(/\D/g, ""))].length === 1);
};

export function maskphone(e) {
	let num = this.value.replace(/^(\+7|8)/g, "").replace(/\D/g, "").split(/(?=.)/),
		i = num.length;

	let errorMes = this.nextSibling.nextElementSibling;

	if (0 <= i) num.unshift("+7");
	if (1 <= i) num.splice(1, 0, " ");
	if (4 <= i) num.splice(5, 0, " ");
	if (7 <= i) num.splice(9, 0, "-");
	if (9 <= i) num.splice(12, 0, "-");
	if (11 <= i) num.splice(15, num.length - 15);
	// num[2] = 9;
	this.value = num.join("");
	if (num.length == 1 && num[0] == "") {
		errorMes.innerText = "Поле обязательно для заполнения";
		errorMes.classList.remove("hidden");
		return;
	}
	if (num.length != 15 || noValidPhone(this.value)) {
		errorMes.innerText = "Некорректный номер телефона";
		errorMes.classList.remove("hidden");
		return;
	}
	errorMes.classList.add("hidden");
}

export default { noValidPhone, maskphone }