import Alpine from 'alpinejs';
 
// window.Alpine = Alpine
document.addEventListener("alpine:init", ()=>{
    Alpine.data("cookieAgreement", ()=>({
            show: localStorage.getItem('cookie') || false,
            onClick() {
                localStorage.setItem('cookie', true);
                this.$root.remove();
            }
        })
    );
    Alpine.data("scrollTop", t=>({
        scrolled: !1,
            init() {
                this.scrolled = document.documentElement.scrollTop > window.innerHeight / 1,
                document.addEventListener("scroll", e=>this.onScroll(e))
            },
            onScroll(e) {
                this.scrolled = document.documentElement.scrollTop > window.innerHeight / 1
            },
            onClick() {
                document.documentElement.scroll({
                    top: 0,
                    behavior: "smooth"
                })
            }
        })
    );
});
 
Alpine.start();