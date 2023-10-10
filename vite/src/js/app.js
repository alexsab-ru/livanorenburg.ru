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

const lightbox = GLightbox({
    moreLength: 0,
    descPosition: window.innerWidth <= 769 ? 'top' : 'bottom'
});