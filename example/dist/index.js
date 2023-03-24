(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TikiSdk = {}));
})(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$7 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap\");\n\n:root {\n  --tiki-font-family: \"Space Grotesk\", sans-serif;\n  --tiki-primary-text-color: rgb(28, 0, 0);\n  --tiki-secondary-text-color: rgba(28, 0, 0, 0.6);\n  --tiki-primary-background-color: rgb(255, 255, 255);\n  --tiki-secondary-background-color: rgb(246, 246, 246);\n  --tiki-accent-color: rgb(0, 178, 114);\n  --tiki-font-size-sm: 0.875rem;\n  --tiki-line-height-sm: 1.25rem;\n  --tiki-font-size: 1rem;\n  --tiki-line-height: 1.5rem;\n  --tiki-font-size-lg: 1.125rem;\n  --tiki-line-height-lg: 1.75rem;\n  --tiki-font-size-xl: 1.25rem;\n  --tiki-line-height-xl: 1.75rem;\n}\n";
  styleInject(css_248z$7);

  var css_248z$6 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n#tiki-offer-prompt {\n  width: 100vw;\n  background-color: var(--tiki-secondary-background-color);\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  font-family: var(--tiki-font-family);\n  border-radius: 2.5em 2.5em 0 0;\n}\n\n.tiki-offer-prompt-body {\n  width: 100%;\n  padding: 2em 0.9375em;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.tiki-offer-prompt-heading {\n  width: 100%;\n  padding: 0 0.9375em;\n  display: flex;\n  justify-content: space-between;\n  box-sizing: border-box;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin-bottom: 2em;\n}\n\n.tiki-offer-prompt-cta {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: border-box;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin-top: 2em;\n}\n\n.tiki-back-off-btn {\n  margin-right: 1.5em;\n}\n\n.tiki-used-for {\n  margin-top: 1.5em;\n  padding-left: 0.9375em;\n}\n\n@media (min-width: 1024px) {\n  #tiki-offer-prompt {\n    height: 300px;\n    width: 600px;\n  }\n}\n";
  styleInject(css_248z$6);

  var css_248z$5 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n#tiki-background-overlay {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100vw;\n  height: 100vh;\n}\n";
  styleInject(css_248z$5);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  const id$1 = "tiki-background-overlay";
  function display(show, onDismiss) {
      if (show) {
          const overlay = document.createElement("div");
          overlay.id = id$1;
          overlay.onclick = () => display(false, onDismiss);
          document.body.appendChild(overlay);
      }
      else {
          const overlay = document.getElementById(id$1);
          if (overlay !== null) {
              document.body.removeChild(overlay);
              if (onDismiss !== undefined)
                  onDismiss();
          }
      }
  }

  var css_248z$4 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-trade-your-data {\n  color: var(--tiki-primary-text-color);\n  font-family: var(--tiki-font-family);\n  font-size: var(--tiki-font-size-xl);\n  line-height: var(--tiki-line-height-xl);\n  font-weight: 700;\n}\n\n.tiki-trade-your-data-accent {\n  color: var(--tiki-accent-color);\n}\n";
  styleInject(css_248z$4);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  var template$1 = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n\nTRADE\n<strong class=\"tiki-trade-your-data-accent\">YOUR</strong>\nDATA\n";
  function html$1 () {
    return template$1.replace(/<!--[\s\S]*?-->/g, "");
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function tradeYourData () {
      const span = document.createElement("span");
      span.innerHTML = html$1();
      span.className = "tiki-trade-your-data";
      return span;
  }

  var css_248z$3 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-learn-more-button-icon {\n  fill: var(--tiki-secondary-text-color);\n  height: 100%;\n  width: auto;\n}\n\n.tiki-learn-more-button {\n  height: var(--tiki-line-height-xl);\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 1px;\n}\n";
  styleInject(css_248z$3);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  var template = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n<svg\n  viewBox=\"0 0 24 24\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"tiki-learn-more-button-icon\"\n>\n  <path\n    d=\"M12 24C8.81712 24 5.7648 22.7353 3.5148 20.4852C1.2648 18.2351 0 15.1826 0 12C0 8.81736 1.26468 5.7648 3.5148 3.5148C5.76492 1.2648 8.81736 0 12 0C15.1826 0 18.2352 1.26468 20.4852 3.5148C22.7352 5.76492 24 8.81736 24 12C23.9963 15.1819 22.7306 18.2316 20.4816 20.4816C18.2316 22.7307 15.1819 23.9964 12 24ZM12 1.84584C9.30744 1.84584 6.7248 2.91552 4.81968 4.81968C2.91562 6.72468 1.84584 9.30744 1.84584 12C1.84584 14.6926 2.91552 17.2752 4.81968 19.1803C6.72468 21.0844 9.30744 22.1542 12 22.1542C14.6926 22.1542 17.2752 21.0845 19.1803 19.1803C21.0844 17.2753 22.1542 14.6926 22.1542 12C22.1504 9.3084 21.0798 6.72744 19.1767 4.82352C17.2727 2.92039 14.6916 1.84968 12.0002 1.84608L12 1.84584Z\"\n  />\n  <path\n    d=\"M12 15.7001C11.49 15.7001 11.0766 15.2874 11.0766 14.7771C11.1966 13.6037 11.7956 12.5316 12.7322 11.8149C13.305 11.2418 13.8459 10.7006 13.8459 10.1594C13.8459 9.13886 13.02 8.3125 12 8.3125C10.98 8.3125 10.1541 9.13886 10.1541 10.1594C10.1541 10.6697 9.74062 11.0824 9.23062 11.0824C8.72062 11.0824 8.30811 10.6697 8.30811 10.1594C8.30811 8.83964 9.01123 7.61935 10.154 6.95997C11.2959 6.29962 12.704 6.29962 13.846 6.95997C14.9888 7.61937 15.6919 8.83969 15.6919 10.1594C15.5728 11.3328 14.9738 12.404 14.0372 13.1206C13.4644 13.6947 12.9235 14.2359 12.9235 14.7771C12.9235 15.0219 12.826 15.2564 12.6525 15.43C12.48 15.6035 12.2447 15.7001 12 15.7001Z\"\n  />\n  <path\n    d=\"M12.9245 17.5484C12.9245 18.7806 11.0767 18.7806 11.0767 17.5484C11.0767 16.3162 12.9245 16.3162 12.9245 17.5484Z\"\n  />\n</svg>\n";
  function html () {
    return template.replace(/<!--[\s\S]*?-->/g, "");
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function learnMoreBtn (onClick) {
      const button = document.createElement("button");
      button.innerHTML = html();
      button.onclick = () => onClick();
      button.className = "tiki-learn-more-button";
      return button;
  }

  var css_248z$2 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-text-btn {\n  width: 100%;\n  height: 2.75em;\n  border-radius: 0.625em;\n  border: solid 1px var(--tiki-accent-color);\n  cursor: pointer;\n  font-weight: 500;\n  font-size: var(--tiki-font-size-xl);\n  line-height: var(--tiki-line-height-xl);\n}\n\n.tiki-text-btn-solid {\n  background-color: var(--tiki-accent-color);\n  color: var(--tiki-primary-background-color);\n}\n\n.tiki-text-btn-outline {\n  background-color: var(--tiki-primary-background-color);\n  color: var(--tiki-primary-text-color);\n}\n";
  styleInject(css_248z$2);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function textBtn (text, onClick, isSolid = false) {
      const button = document.createElement("button");
      if (isSolid)
          button.className = "tiki-text-btn tiki-text-btn-solid";
      else
          button.className = "tiki-text-btn tiki-text-btn-outline";
      button.onclick = () => onClick();
      button.innerHTML = text;
      return button;
  }

  var css_248z$1 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-used-for-no-icon {\n  height: 0.75em;\n  width: auto;\n  fill: #c73000;\n  margin-right: 0.55em;\n}\n\n.tiki-used-for-yes-icon {\n  height: 0.75em;\n  width: auto;\n  fill: #00b272;\n  margin-right: 0.55em;\n}\n\n.tiki-used-for-title {\n  color: var(--tiki-primary-text-color);\n  font-weight: 700;\n  font-size: var(--tiki-font-size-lg);\n  line-height: var(--tiki-line-height-lg);\n}\n\n.tiki-used-for-list {\n  list-style-type: none;\n  padding-left: 0;\n  color: var(--tiki-secondary-text-color);\n  font-weight: 700;\n  font-size: var(--tiki-font-size-lg);\n  line-height: var(--tiki-line-height-lg);\n  margin-top: 0.888em;\n}\n\n.tiki-used-for-list-item {\n  display: flex;\n  align-items: center;\n  margin: 0.445em 0;\n}\n";
  styleInject(css_248z$1);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  var yesHtml = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n\n<svg\n  class=\"tiki-used-for-yes-icon\"\n  viewBox=\"0 0 12 12\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n>\n  <path\n    d=\"M11.476 0.778334C10.9345 0.486604 10.3305 1.04923 9.97642 1.38263C9.16421 2.17447 8.47692 3.09133 7.70629 3.92485C6.85238 4.84171 6.06096 5.75858 5.18623 6.65464C4.68638 7.15475 4.14488 7.69653 3.81165 8.32166C3.06188 7.59231 2.41625 6.80047 1.58317 6.15453C0.979187 5.6961 -0.0205066 5.36269 0.000320301 6.4671C0.0419742 7.90494 1.31242 9.44694 2.24963 10.4263C2.64534 10.843 3.16602 11.2806 3.77 11.3015C4.49894 11.3432 5.24871 10.468 5.68607 9.98869C6.45671 9.15518 7.08151 8.21744 7.7896 7.36312C8.70598 6.23788 9.64319 5.13344 10.5388 3.98736C11.1011 3.27887 12.8714 1.52846 11.476 0.778334ZM0.916672 6.38375C0.895845 6.38375 0.875018 6.38375 0.833364 6.40455C0.750056 6.38375 0.687575 6.36287 0.604268 6.3212C0.666748 6.27952 0.770883 6.30036 0.916672 6.38375Z\"\n  />\n</svg>\n";
  var noHtml = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n\n<svg\n  class=\"tiki-used-for-no-icon\"\n  viewBox=\"0 0 12 12\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n>\n  <path\n    d=\"M11.2893 8.79058C10.9827 8.44842 10.6515 8.12665 10.3281 7.80128C10.0874 7.5604 9.82203 7.34108 9.59984 7.08641C9.00633 6.39791 8.4284 5.69205 7.8307 4.97718C7.83789 4.958 7.84567 4.93943 7.85526 4.92205C8.56017 4.01125 9.31957 3.14355 10.1293 2.32501C10.2503 2.20517 10.379 2.09192 10.4928 1.96788C10.7474 1.68745 10.7629 1.49989 10.5084 1.23445L10.5078 1.23385C10.306 1.01454 10.0766 0.821594 9.82564 0.660402C9.32915 0.353605 8.76918 0.200206 8.21886 0.0132436C8.12244 -0.0233083 8.01464 0.0180373 7.96733 0.109718C7.74932 0.405731 7.51934 0.692755 7.28817 0.977985C6.82821 1.54544 6.36826 2.1087 5.9083 2.67442C5.87956 2.71277 5.85261 2.75292 5.82865 2.79426C5.10638 2.0135 4.46255 1.22791 3.7403 0.507089C3.61393 0.569408 3.49414 0.645507 3.38455 0.734196C3.14559 0.988869 2.9246 1.25551 2.69641 1.52395C2.52333 1.73129 2.35923 1.9458 2.19034 2.15613C2.02144 2.36645 1.86693 2.53783 1.71661 2.73616C1.54953 2.95846 1.5633 3.0873 1.76393 3.28683C2.20591 3.75002 2.68324 4.17906 3.19171 4.56915C3.47199 4.76989 3.71934 5.01737 3.98465 5.24866C3.26657 6.34522 2.59341 7.44058 1.76874 8.4257C1.38246 8.8859 1.02671 9.37067 0.663176 9.84763C0.509858 10.055 0.509858 10.188 0.698512 10.3785C0.796133 10.4786 0.903928 10.5691 1.01892 10.6482C1.53577 10.9921 2.01728 11.3864 2.45688 11.825C2.53893 11.8927 2.62757 11.9515 2.72219 12C2.79107 11.8448 2.87072 11.6956 2.95996 11.5518C3.93916 10.1814 4.92198 8.81576 5.90828 7.45435C5.9496 7.39743 5.99392 7.34709 6.04483 7.28537C6.09693 7.3315 6.14125 7.36985 6.18437 7.4112L7.65647 8.90983C8.06553 9.32388 8.47397 9.73734 8.88302 10.149C9.12079 10.3899 9.225 10.3899 9.51187 10.2335C10.0497 9.93628 10.5965 9.65045 11.1516 9.37662C11.4846 9.21064 11.5457 9.06503 11.2893 8.79058Z\"\n  />\n</svg>\n";
  function yes() {
    return yesHtml.replace(/<!--[\s\S]*?-->/g, "");
  }
  function no() {
    return noHtml.replace(/<!--[\s\S]*?-->/g, "");
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function usedFor (bullets) {
      const usedFor = document.createElement("div");
      const title = document.createElement("span");
      title.innerHTML = "HOW YOUR DATA WILL BE USED";
      title.className = "tiki-used-for-title";
      usedFor.appendChild(title);
      const list = document.createElement("ul");
      list.className = "tiki-used-for-list";
      bullets.forEach((value, key) => {
          const element = document.createElement("li");
          element.className = "tiki-used-for-list-item";
          const icon = document.createElement("template");
          if (value)
              icon.innerHTML = yes();
          else
              icon.innerHTML = no();
          element.appendChild(icon.content);
          const text = document.createElement("span");
          text.innerHTML = key;
          element.appendChild(text);
          list.appendChild(element);
      });
      usedFor.appendChild(list);
      return usedFor;
  }

  var css_248z = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-offer-card {\n  background-color: var(--tiki-primary-background-color);\n  padding: 1.25em;\n  box-sizing: border-box;\n  border-radius: 0.625em;\n  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);\n}\n\n.tiki-offer-card-img {\n  width: 100%;\n  height: 5.375em;\n  -o-object-fit: cover;\n     object-fit: cover;\n  box-sizing: border-box;\n}\n\n.tiki-offer-card-text {\n  color: var(--tiki-secondary-text-color);\n  font-weight: 700;\n  font-size: var(--tiki-font-size-lg);\n  line-height: var(--tiki-line-height-lg);\n  overflow: hidden;\n  height: calc(3 * var(--tiki-line-height-lg));\n  text-overflow: ellipsis;\n  display: block;\n}\n\n.tiki-offer-card-text-cell {\n  display: table-cell;\n  height: calc(3 * var(--tiki-line-height-lg));\n  vertical-align: middle;\n}\n";
  styleInject(css_248z);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function OfferCard (img, text, alt) {
      const card = document.createElement("div");
      card.className = "tiki-offer-card";
      const imageElement = document.createElement("img");
      imageElement.className = "tiki-offer-card-img";
      imageElement.src = img;
      imageElement.alt = alt;
      card.appendChild(imageElement);
      const textElement = document.createElement("span");
      textElement.className = "tiki-offer-card-text";
      const cell = document.createElement("div");
      cell.innerHTML = text;
      cell.className = "tiki-offer-card-text-cell";
      textElement.appendChild(cell);
      card.appendChild(textElement);
      return card;
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  const id = "tiki-offer-prompt";
  function OfferPrompt () {
      const prompt = document.createElement("div");
      prompt.id = id;
      const body = document.createElement("div");
      body.className = "tiki-offer-prompt-body";
      const heading = document.createElement("div");
      heading.className = "tiki-offer-prompt-heading";
      heading.appendChild(tradeYourData());
      heading.appendChild(learnMoreBtn(() => console.log("Learn More")));
      body.appendChild(heading);
      const offer = document.createElement("div");
      const used = usedFor(new Map([
          ["Learn how our ads perform", true],
          ["Reach you on other platforms", false],
          ["Sold to other companies", false],
      ]));
      used.className = "tiki-used-for";
      offer.appendChild(OfferCard("https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg", "Trade your IDFA (kind of like a serial # for your phone) for a discount."));
      offer.appendChild(used);
      body.appendChild(offer);
      const cta = document.createElement("div");
      cta.className = "tiki-offer-prompt-cta";
      const backOff = textBtn("Back Off", () => console.log("Back Off"));
      backOff.className = backOff.className + " tiki-back-off-btn";
      cta.appendChild(backOff);
      cta.appendChild(textBtn("I'm In", () => console.log("I'm In"), true));
      body.appendChild(cta);
      prompt.appendChild(body);
      display(true, () => {
          document.body.removeChild(prompt);
      });
      document.body.appendChild(prompt);
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function present() {
      OfferPrompt();
  }

  exports.present = present;

}));
