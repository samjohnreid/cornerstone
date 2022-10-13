import PageManager from './page-manager';
import { buildTlWidget } from './buildTlWidget';

export default class Page extends PageManager {
    constructor(context) {
        super(context);
        this.pathname = window.location.pathname;
    }

    addVideoClickLayer() {
        const videoContainer = document.getElementsByClassName('video-container-realmax');
        if (videoContainer.length > 0) {
            // 1. add a click layer over the top of the video
            const videoClickLayer = document.createElement('div');
            videoClickLayer.classList.add('video-click-layer');
            videoContainer[0].appendChild(videoClickLayer);

            videoClickLayer.addEventListener('click', (el) => {
                // 2. reload the video into the iframe, but with mute removed and controls showing
                const videoIframe = document.getElementById('realmax-iframe');
                videoIframe.setAttribute('src', 'https://www.youtube.com/embed/bfctwig1HUQ?enablejsapi=1&start=0&end=0&autoplay=1&loop=1&playlist=bfctwig1HUQ&version=3&rel=0');
                
                // 3. remove the click layer
                el.target.style.display = 'none';
            });
        }
    }

    addMarginBottom0() {
        const mainContainer = document.querySelector('main.body');
        mainContainer.style.marginBottom = 0;
    }

    thoughtLeadershipWidget() {
        const tlwContainer = document.getElementById('tl-widget-container');
        if (tlwContainer) {
            buildTlWidget();
        }
    }
    
    onReady() {
        if (this.pathname === '/') {
            this.addVideoClickLayer();
            this.thoughtLeadershipWidget();
        }
        this.pathname === '/gas-water-heaters' && this.addMarginBottom0();
    }
}