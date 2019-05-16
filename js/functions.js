const imagePath = "images";
let contentWipeIncrement = 0;
let toggleFullscreenState = false;
let resizeFlag = false;

getAspectRatio = () => {
  if (window.innerWidth > window.innerHeight) {
    return "horizontal";
  } else {
    return "vertical";
  }
};

getHomeContent = (articles, newElem, type) => {
  for (let j = 0; j < articles.length; j++) {
    const articleElem = document.createElement("article");
    articleElem.classList.add(...articles[j][1].classList);
    const articleContent = document.createElement("div");
    articleContent.classList.add(`${type}__Content`);
    articleElem.appendChild(articleContent);
    newElem.appendChild(articleElem);
  }
};

getCardContent = (cardList, newElem, type) => {
  for (let i = 0; i < cardList.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card", `card__${type}`);

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card__Wrapper");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card__Image", `${type}__Image`);
    cardImage.src = `${imagePath}/${cardList[i][1].thumbnail}`;
    cardImage.alt = cardList[i][1].alt;

    cardWrapper.appendChild(cardImage);

    if (cardList[i][1].text) {
      const cardDescription = document.createElement("p");
      cardDescription.classList.add("card__Description");
      cardDescription.innerText = cardList[i][1].text;
      cardWrapper.appendChild(cardDescription);
    }

    card.appendChild(cardWrapper);
    newElem.appendChild(card);

    if (cardList[i][1].fullsize) {
      card.addEventListener("click", function() {
        toggleFullscreen(newElem, card, cardList[i][1]);
      });
    }
    if (cardList[i][1].link) {
      card.addEventListener("click", function(e) {
        e.preventDefault;
        window.open(cardList[i][1].link, "_blank");
      });
    }
  }
};

getWrapperTranslate = elem => {
  wrapperElem = document.querySelector(`.${elem}`);
  const wrapperWidth = document.querySelector(".wrapper").offsetWidth;

  if (!isMobile()) {
    let wrapperPos = parseInt(wrapperElem.style.left);
    let wrapperValue = 0 - window.scrollY * 4;

    let wrapperEnd = wrapperPos * -1 + wrapperWidth * 0.4;
    if (wrapperValue <= wrapperEnd) {
      wrapperValue = wrapperEnd;
    }

    wrapperElem.style.transform = `translateX(${wrapperValue}px)`;
  } else {
    wrapperElem.style.transform = "translateX(0px)";
    wrapperElem.style.left = "0px";
  }
};

getWrapperLeft = elem => {
  const wipeWrapper = document.querySelector(`.${elem}`);
  const wrapperWidth = document.querySelector(".wrapper").offsetWidth;

  if (!isMobile()) {
    wipeWrapper.style.left = `${wrapperWidth * 2}px`;
  } else {
    wipeWrapper.style.left = "0px";
  }
};

toggleFullscreen = (parentElem, elem, obj) => {
  const headerMain = document.querySelector(".header__Main");

  if (!isMobile()) {
    window.scrollTo({
      top: parseInt(parentElem.parentNode.dataset.position),
      left: 0,
      behavior: "smooth"
    });
  }

  if (toggleFullscreenState === false) {
    document.getElementsByTagName("body")[0].classList.add("noscroll");

    const fullscreenElem = document.createElement("div");
    fullscreenElem.classList.add("fullscreen");

    const buttonClose = document.createElement("div");
    buttonClose.classList.add("fas", "fa-times", "button__Close");
    buttonClose.setAttribute("role", "presentation");

    const imageElem = document.createElement("img");
    imageElem.classList.add("card__Image__Fullscreen");
    imageElem.src = `${imagePath}/${obj.fullsize}`;
    imageElem.alt = obj.alt;

    const fullscreenContent = document.createElement("div");
    fullscreenContent.classList.add(`card__Content__Fullscreen`);

    const fullscreenHead = document.createElement("h3");
    fullscreenHead.classList.add("card__Head");
    obj.text ? (fullscreenHead.innerHTML = obj.text + " ") : null;

    if (obj.textLink) {
      const fullscreenLink = document.createElement("a");
      fullscreenLink.classList.add("card__Link");
      fullscreenLink.href = obj.textLink;
      fullscreenLink.setAttribute("target", "_blank");
      fullscreenLink.innerText = `(${obj.textLink})`;
      fullscreenHead.appendChild(fullscreenLink);
    }

    const fullscreenTech = document.createElement("p");
    fullscreenTech.classList.add("card__Tech");
    if (obj.tech) {
      fullscreenTech.innerText = "Tech: ";
      for (let i = 0; i < obj.tech.length; i++) {
        fullscreenTech.innerText += obj.tech[i];
        i < obj.tech.length - 1
          ? (fullscreenTech.innerText += ", ")
          : (fullscreenTech.innerText += ".");
      }
    }

    fullscreenElem.appendChild(imageElem);
    fullscreenContent.appendChild(fullscreenHead);
    fullscreenContent.appendChild(fullscreenTech);
    fullscreenElem.appendChild(fullscreenContent);
    fullscreenElem.appendChild(buttonClose);

    parentElem.parentNode.appendChild(fullscreenElem);

    fullscreenElem.addEventListener("click", function() {
      toggleFullscreen(parentElem, elem, obj);
    });

    headerMain.classList.add("header__Main--hide");

    toggleFullscreenState = true;
  } else {
    document.getElementsByTagName("body")[0].classList.remove("noscroll");

    parentElem.parentNode.removeChild(document.querySelector(".fullscreen"));

    headerMain.classList.remove("header__Main--hide");

    toggleFullscreenState = false;
  }
};

isInViewport = elem => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

setView = element => {
  if (isMobile()) {
    element.style.top = "auto";
    element.style.height = "auto";
  } else {
    for (let i = 0; i < document.querySelectorAll(".view").length; i++) {
      document.querySelectorAll(".view")[i].style.top =
        document.querySelectorAll(".view")[i].dataset.position + "px";
    }
    element.style.height = window.innerHeight + "px";
  }
};

// homepage "scale" animation
animation_0 = element => {
  if (!isMobile()) {
    if (window.scrollY === 0) {
      scaleValue = 1;
    } else {
      scaleValue = 1 / (window.scrollY / 5);
    }
    if (scaleValue <= 1) {
      element.style.transform = `scale(${scaleValue})`;
      element.style.opacity = 1;
    }
    if (scaleValue <= 0.025) {
      element.style.opacity = scaleValue;
    }
  } else {
    element.style.opacity = 1;
  }
};

// professional page "wipe" animation
animation_1 = (obj, element) => {
  if (!isMobile()) {
    element.style.position = `fixed`;
    element.style.top = 0;
    element.style.height = "100%";
  } else {
    element.style.position = `relative`;
  }

  const shadowElem = element.querySelector(".shadowElem__4");

  const wipeElem0 = element.querySelector(".wipeElem__0");
  let wipeElem0Pos = wipeElem0.offsetLeft + wipeElem0.offsetWidth;
  let wipeElem0Value = wipeElem0Pos * -1 + window.scrollY;
  const contentWipeHeaderElem = document.querySelector(".wipe__Subhead");
  const contentWipeTextElem = document.querySelector(".wipe__Description");

  if (wipeElem0Value >= 0) {
    wipeElem0Value = 0;

    // content - animate
    if (contentWipeIncrement === 0) {
      contentWipeTextElem.innerHTML = "";
      const contentWipeHeader = obj.header;
      const contentWipeText = obj.intro;
      drawText(contentWipeHeader, contentWipeHeaderElem);
      drawText(contentWipeText, contentWipeTextElem);
      shadowElem.classList.add("shadowElem__4--active");
      contentWipeIncrement++;
    }
  }

  // content - hide on scrollup
  if (wipeElem0Value < 0) {
    contentWipeHeaderElem.classList.remove("drawText--Active");
    contentWipeTextElem.classList.remove("drawText--Active");
    contentWipeIncrement = 0;
    shadowElem.classList.remove("shadowElem__4--active");
  }

  // animate - scale homepage view
  wipeElem0.style.transform = `translateX(${wipeElem0Value}px) rotate(11deg) scaleY(100)`;

  const wipeElem1 = element.querySelector(".wipeElem__1");
  let wipeElem1Pos = wipeElem1.offsetHeight;
  let wipeElem1Value = wipeElem1Pos - window.scrollY;
  if (wipeElem1Value <= 0) {
    wipeElem1Value = 0;
  }

  // animate - wipe views
  wipeElem1.style.transform = `translateY(${wipeElem1Value}px)`;

  const wipeElem2 = element.querySelector(".wipeElem__2");
  let wipeElem2Pos = window.innerWidth;
  let wipeElem2Value = wipeElem2Pos - window.scrollY * 2;
  if (wipeElem2Value <= 0) {
    wipeElem2Value = 0;
  }

  wipeElem2.style.transform = `translateX(${wipeElem2Value}px) rotate(-38deg) scaleX(100)`;

  getWrapperTranslate("wipe__Wrapper");
};

// project page "fade" animation
animation_2 = element => {
  element.style.position = isMobile() ? "relative" : "absolute";
  setView(element, window.innerHeight);
};

animation_3 = (obj, element) => {
  setView(element, window.innerHeight);
  const fadeCards = element.querySelectorAll(".card__fade");

  if (!isMobile()) {
    for (let i = 0; i < fadeCards.length; i++) {
      if (
        !fadeCards[i].classList.contains("fade--active") &&
        isInViewport(fadeCards[i])
      ) {
        fadeCards[i].classList.add("fade--active");
      }
      if (
        !isInViewport(fadeCards[i]) &&
        fadeCards[i].classList.contains("fade--active")
      ) {
        fadeCards[i].classList.remove("fade--active");
      }
    }
  }
};

// contact us page
animation_4 = () => {
  const elementScroll = document.querySelector("#elem3");
  if (isMobile()) {
    elementScroll.style.top = "auto";
    elementScroll.style.height = "auto";
  } else {
    elementScroll.style.height = window.innerHeight + "px";
  }
};

drawText = (text, elem) => {
  elem.classList.add("drawText--Active");
  elem.innerHTML = text;
};

homeInit = obj => {
  const contentElem = document.querySelector(".scale__Content");
  const stripeWrapper = document.createElement("div");
  stripeWrapper.classList.add("stripes");

  const headerHome = document.createElement("h1");
  headerHome.classList.add("header__Home");
  headerHome.innerText = obj.header;

  stripeWrapper.appendChild(headerHome);

  let classIncrement = 0;
  for (let i = 0; i < obj.stripeCount; i++) {
    const stripeElem = document.createElement("span");
    stripeElem.classList.add("stripe", "stripe__" + classIncrement);
    stripeElem.setAttribute("role", "presentation");
    stripeWrapper.appendChild(stripeElem);

    if (classIncrement < 2) {
      classIncrement++;
    } else {
      classIncrement = 0;
    }
  }

  const contentHome = document.createElement("div");
  contentHome.classList.add("content__Home");

  const contentHomePolygonElem = document.createElement("span");
  contentHomePolygonElem.classList.add("content__Home__Polygon");
  contentHomePolygonElem.setAttribute("role", "presentation");

  const contentHomeTextElem = document.createElement("p");
  contentHomeTextElem.classList.add("content__Home__Text", "drawText");

  contentHome.appendChild(contentHomePolygonElem);
  contentHome.appendChild(contentHomeTextElem);

  contentElem.appendChild(stripeWrapper);
  contentElem.appendChild(contentHome);

  // configure homepage stripes for animation
  const stripes = document.querySelectorAll(".stripe");
  const stripesRect = stripes[stripes.length - 1].getBoundingClientRect();
  const offsetLeft = (stripesRect.left + stripesRect.width) * -1;
  const startStripeAnimValue = 0.4;
  const endStripeAnimValue = 1;
  const stripeAnimValue =
    (endStripeAnimValue - startStripeAnimValue) / stripes.length;
  let stripeAnimIncrement = startStripeAnimValue;
  let stripeAnimArr = [];

  for (let i = 0; i < stripes.length; i++) {
    stripes[
      i
    ].style.transform = `translateY(-34px) translateX(${offsetLeft}px)`;
  }

  // stripes - timing values
  for (let i = 0; i < stripes.length; i++) {
    stripeAnimIncrement = stripeAnimIncrement + stripeAnimValue;
    stripeAnimArr[i] = stripeAnimIncrement;
  }
  stripeAnimArr.reverse();

  // header - config
  isTablet()
    ? (headerHome.style.transform = `rotate(-10.5deg) translateX(${offsetLeft}px)`)
    : (headerHome.style.transform = `rotate(0deg) translateX(0px)`);

  if (isHd()) {
    contentHome.style.maxWidth = window.innerWidth / 4 + "px";
  } else if (isDesktop()) {
    contentHome.style.maxWidth = window.innerWidth / 2 + "px";
  } else {
    contentHome.style.maxWidth = "none";
  }

  setTimeout(function() {
    // stripes - animate
    for (let i = 0; i < stripes.length; i++) {
      stripes[i].classList.add("stripe--active");
      stripes[i].style.transform = "translateY(-34px) translateX(0px)";
      stripes[i].style.transition = `${stripeAnimArr[i]}s`;
      stripes[i].style.transitionTimingFunction = "ease-out";
    }

    // header - animate
    if (isTablet()) {
      headerHome.style.transform = "rotate(-10.5deg) translateX(0px)";
      headerHome.style.transition = "0.5s";
      headerHome.style.transitionDelay = "0.5s";
      headerHome.style.transitionTimingFunction = "ease-out";
    }

    // content - animate
    const contentHomeElem = document.querySelector(".content__Home__Text");
    const contentHomeText = obj.content.article1.text;
    drawText(contentHomeText, contentHomeElem);

    // homepage links
    const homepageLinks = document.querySelectorAll(".scale__Link");
    const navButtons = document.querySelectorAll(".button__Main");
    for (let i = 0; i < homepageLinks.length; i++) {
      homepageLinks[i].addEventListener("click", function() {
        scrollNav(i, navButtons[i + 1].dataset.scroll);
      });
    }
  }, 100);
};

function isMobile() {
  return window.innerWidth < 767;
}

function isTablet() {
  return window.innerWidth >= 768;
}

function isDesktop() {
  return window.innerWidth >= 960;
}

function isHd() {
  return window.innerWidth >= 1600;
}

function layoutUpdate() {
  const headerHome = document.querySelector(".header__Home");
  const stripeWrapper = document.querySelector(".stripes");
  const contentHome = document.querySelector(".content__Home");

  headerHome.style.transition = "0s";
  stripeWrapper.style.transition = "0s";
  contentHome.style.transition = "0s";
  if (isHd()) {
    contentHome.style.maxWidth = window.innerWidth / 4 + "px";
  } else if (isTablet()) {
    headerHome.style.transform = `rotate(-10.5deg) translateX(0px)`;
    contentHome.style.maxWidth = window.innerWidth / 2 + "px";
  } else {
    headerHome.style.transform = `rotate(0deg) translateX(0px)`;
    contentHome.style.maxWidth = "none";
  }
}

scrollNav = (increment, pageBreak) => {
  let breakValue;

  if (resizeFlag === true) {
    breakValue = document.querySelectorAll(".view")[increment].dataset.position;
  } else {
    breakValue = pageBreak;
  }

  window.scrollTo({
    top: breakValue,
    left: 0,
    behavior: "smooth"
  });
};

function resizeView() {
  const views = document.querySelectorAll(".view");
  const wrapper = document.querySelector(".wrapper");

  resizeFlag = true; // to reset the page breaks if the browser is vertically resized

  // reset some animations
  document.querySelector("#elem0").style.transform = `scale(1)`;
  layoutUpdate();
  getWrapperTranslate("wipe__Wrapper");

  // set height of each scroll section
  wrapper.style.height = window.innerHeight * (views.length - 1) + "px";

  for (let i = 1; i < views.length; i++) {
    views[i].style.height = window.innerHeight + "px";
  }

  for (let i = 0; i < views.length; i++) {
    views[i].setAttribute("data-position", window.innerHeight * i);
  }

  // mobile refinements
  if (isMobile()) {
    document.querySelector(".wipe").style.position = "relative";
    document.querySelector(".wipe").style.top = "0px";
    document.querySelector(".wipe").style.height = "100%";
  }
}
