import Alpine from 'alpinejs';
window.Alpine = Alpine;

document.addEventListener('alpine:init', (data) => {

	Alpine.data('data', () => ({
		scroll: function(selector, offset = 450){
			const screenWidth = window.screen.width;

			if (screenWidth < 769)
				offset = 60;

            const el = document.getElementById(selector);

            if(el){
                window.scrollTo({
                    behavior: 'smooth',
                    top: el.getBoundingClientRect().top + window.scrollY - offset
                });
            }
		},
		mobile: false
	}));

	Alpine.store('modalShow', {
		on: 0,
		title: '',
		open: function($dispatch, title, descr, subject, button) {
			// https://support.calltouch.ru/hc/ru/articles/360017483240-Открытие-формы-виджета
			// window.ct('modules', 'widgets', 'openExternal', 'promotion', (result)=>{console.log(result)});
			if(typeof Calltouch != 'undefined') {
				Calltouch.Callback.onClickCallButton();
				var setTexts = setInterval(()=>{
					var iframe = document.querySelector('#CalltouchWidgetFrame').contentWindow.document;
					if(iframe.querySelectorAll('[class^="styles__TextDiv"]').length > 0) {
						clearInterval(setTexts);
						iframe.querySelectorAll('[class^="styles__TextDiv"]')[0].innerHTML = title;
						iframe.querySelectorAll('[class^="styles__TextDiv"]')[1].innerHTML = descr;
						iframe.querySelectorAll('[class^="styles__SvgContainer"]+span')[0].innerHTML = button;
					}
				},100);
			} else {
				this.on = 1;
				$dispatch('set-title', title);
				$dispatch('set-descr', descr);
				$dispatch('set-subject', subject);
				$dispatch('set-button', button);
			}
			// console.log('open1', this.on)
		}
	});

	Alpine.store('modalShowPrivacy', {
		on: false,
	});

	Alpine.store('state', {
		isModalOpen: false,
		isResponseModalOpen: false
	})	

})

Alpine.start();