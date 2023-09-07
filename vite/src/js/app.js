import "./modules/functions";
import "./modules/slider";
import "./modules/scroll";
import "./modules/color.links";
import "./modules/map";
import "./modules/form";
import "./modules/modals";
import "./modules/alpine";

import GLightbox from 'glightbox';

const lightbox = GLightbox();


const spoilerLinks = document.querySelectorAll('.spoiler-link');
if(spoilerLinks.length){
    spoilerLinks.forEach(function(link){
        const parent = link.closest('.spoiler-item');
        const content = parent.querySelector('.spoiler-content');
        const iconPlus = parent.querySelector('svg.plus');
        const iconMinus = parent.querySelector('svg.minus');
        link.onclick = () => {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            iconPlus.style.display = iconPlus.style.display === 'none' ? 'block' : 'none';
            iconMinus.style.display = iconMinus.style.display === 'none' ? 'block' : 'none';
        }
    })
}
