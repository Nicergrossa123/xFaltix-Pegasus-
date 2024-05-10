class ViewBase {
    bridge;
  
    constructor() {
      this.bridge = window.Bridge;
      this.attachEvents();
    }
  
 
    get(el) {
      return document.querySelector(el);
    }
  
    getAll(els) {
      return document.querySelectorAll(el);
    }
  
    attachEvents() {}
  }
  