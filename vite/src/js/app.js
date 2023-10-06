import './modules/analytics';
import './modules/slider';
import './modules/scroll';
import './modules/functions';
import './modules/color.links';
import './modules/map';
import './modules/form';
import './modules/modals';
import './modules/alpine';

import GLightbox from 'glightbox';

const lightbox = GLightbox();

// var elements = document.querySelectorAll('.car-item');
// var elementsArray = Array.from(elements);

// elementsArray.sort(function(a, b) {
//   var priceA = parseFloat(a.getAttribute('data-price'));
//   var priceB = parseFloat(b.getAttribute('data-price'));
//   return priceA - priceB; //увелечение
//   return priceB - priceA; //уменьшение
// });

// var parent = elements[0].parentNode;
// while (parent.firstChild) {
//   parent.removeChild(parent.firstChild);
// }

// elementsArray.forEach(function(element) {
//   parent.appendChild(element);
// });