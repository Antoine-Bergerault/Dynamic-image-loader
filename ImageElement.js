class ImageElement extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.style.display = 'flex';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';
        this.style.overflow = 'hidden';

        if(this.dataset.src != null){
            this.loadImage();
        }
    }

    disconnectedCallback(){
        this.lazyOff();
    }

    static get observedAttributes() {
        return ['data-src', 'data-srcset', 'data-alt'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name === 'data-src' || name === 'data-srcset'){
            this.loadImage();
        }else if(name === 'data-alt'){
            if(this.img){
                this.img.alt = this.dataset.alt;
            }
        }
    }

    loadImage(){
        this.img = new Image();
        this.img.dataset.src = this.dataset.src;
        
        this.lazy();

        this.img.style.width = '100%';
        this.img.style.height = '100%';
        this.img.style.objectFit = 'contain';

        let loader = document.createElement('div');
        loader.classList.add('loader');
        loader.innerText = (typeof this.dataset.loader !== 'undefined') ? this.dataset.loader : 'Loading...';
        this.innerHTML = loader.outerHTML;

        this.img.onload = () => {
            this.innerHTML = this.img.outerHTML;
        };
    }

    lazy(){
        /**
         * @see https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
         */

        this.active = false;
          
        this.lazyLoad();

        document.addEventListener("scroll", this.lazyLoad);
        window.addEventListener("resize", this.lazyLoad);
        window.addEventListener("orientationchange", this.lazyLoad);
    }

    lazyOff(){
        document.removeEventListener("scroll", this.lazyLoad);
        window.removeEventListener("resize", this.lazyLoad);
        window.removeEventListener("orientationchange", this.lazyLoad);
    }

    lazyLoad(){
        if (this.active === false) {
            this.active = true;
            setTimeout(() => {
              if ((this.img.getBoundingClientRect().top <= window.innerHeight && this.img.getBoundingClientRect().bottom >= 0) && getComputedStyle(this.img).display !== "none") {
                  this.img.src = this.img.dataset.src;
                  if(typeof this.img.dataset.srcset != 'undefined'){
                      this.img.srcset = this.img.dataset.srcset;
                  }
      
                  document.removeEventListener("scroll", this.lazyLoad);
                  window.removeEventListener("resize", this.lazyLoad);
                  window.removeEventListener("orientationchange", this.lazyLoad);
              }
              this.active = false;
            }, 200);
          }
    }

}


customElements.define('image-element', ImageElement);