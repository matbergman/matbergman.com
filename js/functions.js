const imagePath = "images";
let contentWipeIncrement = 0;
let toggleFullscreenState = false;

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

getCardContent = (articles, newElem, type) => {
  for (let j = 0; j < articles.length; j++) {
    const articleImage = document.createElement("img");
    articleImage.classList.add("article__Image", `${type}__Image`);
    articleImage.src = `${imagePath}/${articles[j][1].thumbnail}`;

    newElem.appendChild(articleImage);
    articleImage.addEventListener("click", function() {
      toggleFullscreen(newElem, articleImage, articles[j][1]);
    });
  }
};

getWrapperTranslate = elem => {
  articlesWrapper = document.querySelector(`.${elem}`);
  const wrapperWidth = document.querySelector(".wrapper").offsetWidth;

  if (!isMobile()) {
    let articlePos = parseInt(articlesWrapper.style.left);
    let articleValue = 0 - window.scrollY * 4;

    let articleEnd = articlePos * -1 + wrapperWidth * 0.4;
    if (articleValue <= articleEnd) {
      articleValue = articleEnd;
    }

    articlesWrapper.style.transform = `translateX(${articleValue}px)`;
  } else {
    articlesWrapper.style.transform = "translateX(0px)";
    articlesWrapper.style.left = "0px";
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

  console.log(parentElem.parentNode);

  if (toggleFullscreenState === false) {
    const fullscreenElem = document.createElement("div");
    fullscreenElem.classList.add("fullscreen");

    const buttonClose = document.createElement("div");
    buttonClose.classList.add("fas", "fa-times", "button__Close");
    buttonClose.setAttribute("role", "presentation");

    const imageElem = document.createElement("img");
    imageElem.classList.add("article__Image__Fullscreen");
    imageElem.src = `${imagePath}/${obj.fullsize}`;

    const articleContent = document.createElement("div");
    articleContent.classList.add(`article__Content__Fullscreen`);

    const articleText = document.createElement("p");
    articleText.classList.add("article__Text");
    obj.text ? (articleText.innerHTML = obj.text) : null;

    const articleTech = document.createElement("p");
    articleTech.classList.add("article__Tech");
    if (obj.tech) {
      articleTech.innerText = "Technologies: ";
      for (let i = 0; i < obj.tech.length; i++) {
        articleTech.innerText += obj.tech[i];
        i < obj.tech.length - 1
          ? (articleTech.innerText += ", ")
          : (articleTech.innerText += ".");
      }
    }

    fullscreenElem.appendChild(imageElem);
    articleContent.appendChild(articleText);
    articleContent.appendChild(articleTech);
    fullscreenElem.appendChild(articleContent);
    fullscreenElem.appendChild(buttonClose);

    parentElem.parentNode.appendChild(fullscreenElem);

    fullscreenElem.addEventListener("click", function() {
      toggleFullscreen(parentElem, elem, obj);
    });

    headerMain.classList.add("header__Main--hide");

    toggleFullscreenState = true;
  } else {
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

setView = (element, windowHeight) => {
  if (isMobile()) {
    element.style.top = "0px";
    element.style.height = "auto";
  } else {
    element.style.top = windowHeight + "px";
    element.style.height = windowHeight + "px";
  }
};

setBodyClass = className => {
  const bodyTag = document.getElementsByTagName("body")[0];
  while (bodyTag.classList.length > 0) {
    bodyTag.classList.remove(bodyTag.classList.item(0));
  }
  bodyTag.classList.add(className);
};

animation_0 = element => {
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
};

animation_1 = (obj, element) => {
  element.style.position = `fixed`;
  element.style.top = 0;
  element.style.height = "100%";

  const wipeElem0 = element.querySelector(".wipeElem__0");
  let wipeElem0Pos = wipeElem0.offsetLeft + wipeElem0.offsetWidth;
  let wipeElem0Value = wipeElem0Pos * -1 + window.scrollY;
  const contentWipeElem = document.querySelector(".wipe__Description");

  if (wipeElem0Value >= 0) {
    wipeElem0Value = 0;

    // content - animate
    if (contentWipeIncrement === 0) {
      contentWipeElem.innerHTML = "";
      const contentWipeText = obj.intro;
      const contentWipeString = obj.intro.split(/(\s+)/);
      drawText(contentWipeText, contentWipeString, contentWipeElem);
      contentWipeIncrement++;
    }
  }

  // content - hide on scrollup
  if (wipeElem0Value < 0) {
    contentWipeElem.classList.remove("drawText--Active");
    contentWipeIncrement = 0;
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

animation_2 = (element, windowHeight) => {
  element.style.position = `relative`;
  setView(element, windowHeight);
};

animation_3 = (element, windowHeight) => {
  setView(element, windowHeight);
  const fadeInArticles = element.querySelectorAll(".fadeIn__Article");
  for (let i = 0; i < fadeInArticles.length; i++) {
    fadeInArticles[i].classList.remove("fade");
    if (isInViewport(fadeInArticles[i])) {
      fadeInArticles[i].classList.add("fade");
    }
  }
};

animation_4 = windowHeight => {
  const elementScroll = document.querySelector("#elem3");
  elementScroll.style.top = windowHeight + "px";
  elementScroll.style.height = windowHeight + "px";
};

drawText = (text, str, elem) => {
  if (!isMobile()) {
    setTimeout(function() {
      elem.classList.add("drawText--Active");
      for (let i = 0; i < str.length; i++) {
        setTimeout(function() {
          elem.innerHTML += str[i];
        }, i * 10);
      }
    }, 500);
  } else {
    elem.classList.add("drawText--Active");
    elem.innerHTML = text;
  }
};

homeInit = obj => {
  document.getElementsByTagName("body")[0].classList.add("view0");
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
    const contentHomeString = obj.content.article1.text.split(/(\s+)/);
    drawText(contentHomeText, contentHomeString, contentHomeElem);
  }, 100);
};

function isMobile() {
  return window.innerWidth < 768;
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

  if (window.innerHeight >= 1080) {
  }
}
