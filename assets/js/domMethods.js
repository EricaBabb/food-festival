function createEl(htmlString, attrs, ...children) {
    if (typeof htmlString !== "string") {
      throw Error("Argument 'htmlString' is required and must be a string");
    }
  
    const el = document.createElement(htmlString);
  
    if (typeof attrs === "object") {
      for (let key in attrs) {
        if (key.substring(0, 2) === "on") {
          el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
        } else if (key === "style") {
          for (let rule in attrs[key]) {
            el.style[rule] = attrs[key][rule];
          }
        } else {
          el.setAttribute(key, attrs[key]);
        }
      }
    }
  
    children.forEach(function(child) {
      let node;
  
      if (child.constructor.name.includes("Element")) {
        node = child;
      } else {
        node = document.createTextNode(child);
      }
  
      el.appendChild(node);
    });
  
    return el;
  }
  
  module.exports = createEl;

  //Remember that we are able to use require() and module.exports in the front-end environment because we created a Node.js application to handle our front-end asset management.

  //We searched createEl to find its dependencies so we knew what files needed to require it