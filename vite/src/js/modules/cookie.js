export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook"),
    cookiewin = document.querySelector('.cookie_notice');

if (cookiecook != "no") {

    cookiewin.style.display="block";

    document.getElementById("cookie_close").addEventListener("click", function(e){
        e.preventDefault();
        cookiewin.style.display="none";

        let date = new Date;
        date.setDate(date.getDate() + 1);
        document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
    });
}