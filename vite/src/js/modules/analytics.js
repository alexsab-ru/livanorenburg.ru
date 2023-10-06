window.WebsiteAnalytics = (function() {

	window.dataLayer = window.dataLayer || [];

	function dataLayer(event, t = {}) {
		void 0 !== window.dataLayer && window.dataLayer.push({
			event: event,
			...t
		})
	}

	function getFormDataObject(formData, form_id) {
		let obj = {"EventProperties":{}};
		formData.forEach((value, key) => (obj["EventProperties"][key] = value));
		obj['EventCategory'] = 'Lead';
		obj["EventProperties"]['formID'] = form_id;
		obj['sourceName'] = 'page';
		return obj;
	}

	function ymGoal(goalName,goalParams) {
		try {
			Ya._metrika.getCounters().forEach((me)=>{
				ym(me.id, "reachGoal", goalName, goalParams||{})
			})
		} catch (err) {
			console.error(goalName + ' - error send goal to Metrika');
		}
	}

	function ymPage(pageName,goalParams) {
		try {
			Ya._metrika.getCounters().forEach((me)=>{
				ym(me.id, "hit", pageName, goalParams||{})
			})
		} catch (err) {
			console.error(goalName + ' - error send page to Metrika');
		}
	}

	function addPhoneGoals(item) {
		item.addEventListener('click', function(evt) {
			// ymGoal('phone-click');
			dataLayer('phone-click');
		});
		item.addEventListener('copy', function(evt) {
			// ymGoal('phone-copy');
			dataLayer('phone-copy');
		});
		item.addEventListener('contextmenu', function(evt) {
			// ymGoal('phone-contextmenu');
			dataLayer('phone-contextmenu');
		});
	}

	function addEmailGoals(item) {
		item.addEventListener('click', function(evt) {
			// ymGoal('email-click');
			dataLayer('email-click');
		});
		item.addEventListener('copy', function(evt) {
			// ymGoal('email-copy');
			dataLayer('email-copy');
		});
		item.addEventListener('contextmenu', function(evt) {
			// ymGoal('email-contextmenu');
			dataLayer('email-contextmenu');
		});
	}

	var goals = [
		{
			selector: 'a[href^\="#common-modal"]',
			action: 'click',
			goal: 'form-open',
			title: 'Открыли любую форму',
		},
		{
			selector: 'form input',
			action: 'click',
			goal: 'form-click',
			title: 'Клик в поле любой формы',
		},
		{
			selector: 'form input',
			action: 'change',
			goal: 'form-change',
			title: 'Изменения полей любой формы',
		},
		{
			selector: 'form',
			action: 'submit',
			goal: 'form-submit',
			title: 'Отправили любую форму',
		},

	];

	goals.forEach(function(value, index, array){
		if(value.goal != null) {
			document.querySelectorAll(value.selector).forEach(function(element) {
				// console.log("Set \"" + value.goal + "\" goal");
				element.addEventListener(value.action, function(){
					// ymGoal(value.goal);
					dataLayer(value.goal);
				});
			});
		} else if(value.hit != null) {
			document.querySelectorAll(value.selector).forEach(function(element) {
				// console.log("Set \"" + value.goal + "\" hit");
				element.addEventListener(value.action, function(){
					// ymPage(value.goal);
					dataLayer.push({
						event:"pageView",
						eventAction: value.hit,
						title: value.title,
					});
				});
			});
		} else {
			console.warn(["Ошибка в списке целей", value]);
		}
	});

	document.querySelectorAll('a[href^\="tel:"]').forEach((tel)=>{
		addPhoneGoals(tel);
	});
	document.querySelectorAll('a[href^\="mailto:"]').forEach((tel)=>{
		addEmailGoals(tel);
	});

	// возвращаем объект с публичной функцией
	return {
		ymGoal: ymGoal,
		ymPage: ymPage,
		getFormDataObject: getFormDataObject,
		dataLayer: dataLayer,
	};

})();

/*
window.WebsiteAnalytics..ymGoal("phone-click");
window.WebsiteAnalytics..ymGoal("phone-copy");
window.WebsiteAnalytics..ymGoal("phone-contextmenu");
window.WebsiteAnalytics..ymGoal("email-click");
window.WebsiteAnalytics..ymGoal("email-copy");
window.WebsiteAnalytics..ymGoal("email-contextmenu");
window.WebsiteAnalytics..ymGoal("form-open");
window.WebsiteAnalytics..ymGoal("form-submit");
window.WebsiteAnalytics..ymGoal("video-click");
*/

/*
Вставляем на этапе обработки формы
var formDataObj = window.WebsiteAnalytics.getFormDataObject(formData, form.id);

Вставляем где происходит событие Success
window.WebsiteAnalytics.ymGoal("form-required");
window.WebsiteAnalytics.ymGoal("form-submit");
window.WebsiteAnalytics.ymGoal("form-error");
window.WebsiteAnalytics.dataLayer("form-success", formDataObj);
*/
