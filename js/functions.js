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
    const articleElem = document.createElement("article");
    articleElem.classList.add(...articles[j][1].classList);
    articleElem.dataset.speed = articles[j][1].speed
      ? articles[j][1].speed
      : null;

    const articleImage = document.createElement("img");
    articleImage.classList.add("article__Image");
    articleImage.src = `${imagePath}/${articles[j][1].thumbnail}`;
    articleImage.setAttribute("data-thumbnail", articles[j][1].thumbnail);
    articleImage.setAttribute("data-fullsize", articles[j][1].fullsize);

    const articleContent = document.createElement("div");
    articleContent.classList.add(`${type}__Content`);

    const articleText = document.createElement("p");
    articleText.classList.add("article__Text", `${type}__Text`);
    articles[j][1].text ? (articleText.innerHTML = articles[j][1].text) : null;

    const articleTech = document.createElement("p");
    articleTech.classList.add("article__Tech", `${type}__Tech`);
    if (articles[j][1].tech) {
      articleTech.innerText = "Technologies: ";
      for (let i = 0; i < articles[j][1].tech.length; i++) {
        articleTech.innerText += articles[j][1].tech[i];
        i < articles[j][1].tech.length - 1
          ? (articleTech.innerText += ", ")
          : (articleTech.innerText += ".");
      }
    }

    articleElem.appendChild(articleImage);

    articleContent.appendChild(articleText);
    articleContent.appendChild(articleTech);
    articleElem.appendChild(articleContent);
    newElem.appendChild(articleElem);
    //    newElem.appendChild(articleImage);

    articleElem.addEventListener("click", function() {
      toggleFullscreen(articleElem);
    });
  }
};

getWipeWrapperTranslate = () => {
  const wrapperWidth = document.querySelector(".wrapper").offsetWidth;
  const wipeArticlesWrapper = document.querySelector(".wipe__Wrapper");
  let wipeArticlePos = parseInt(wipeArticlesWrapper.style.left);
  let wipeArticleValue = 0 - window.scrollY * 4;

  let wipeArticleEnd = wipeArticlePos * -1 + wrapperWidth * 0.4;
  if (wipeArticleValue <= wipeArticleEnd) {
    wipeArticleValue = wipeArticleEnd;
  }
  wipeArticlesWrapper.style.transform = `translateX(${wipeArticleValue}px)`;
};

getWipeWrapperLeft = () => {
  const wipeWrapper = elem1.querySelector(".wipe__Wrapper");
  const wrapperWidth = document.querySelector(".wrapper").offsetWidth;
  wipeWrapper.style.left = `${wrapperWidth * 2}px`;
};

toggleFullscreen = elem => {
  const headerMain = document.querySelector(".header__Main");
  const parentElem = elem.parentNode;
  const imageElem = elem.querySelector(".article__Image");

  if (toggleFullscreenState === false) {
    parentElem.style.transform = "translateX(0px)";
    parentElem.style.left = "0px";
    parentElem.classList.add("wipe__Wrapper--active");
    elem.classList.add("wipe__Article--active");

    const buttonClose = document.createElement("div");
    buttonClose.classList.add("fas", "fa-times", "button__Close");
    elem.appendChild(buttonClose);

    imageElem.src = `${imagePath}/${imageElem.dataset.fullsize}`;
    headerMain.classList.add("header__Main--hide");

    toggleFullscreenState = true;
  } else {
    getWipeWrapperTranslate();
    getWipeWrapperLeft();
    parentElem.classList.remove("wipe__Wrapper--active");
    elem.classList.remove("wipe__Article--active");
    document
      .querySelector(".wipe__Article")
      .removeChild(document.querySelector(".button__Close"));

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
  element.style.top = windowHeight + "px";
  element.style.height = windowHeight + "px";
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
  const contentWipeText = document.querySelector(".wipe__Description");

  if (wipeElem0Value >= 0) {
    wipeElem0Value = 0;

    // content - animate
    if (contentWipeIncrement === 0) {
      contentWipeText.innerHTML = "";
      let contentWipeString = obj.intro.split(/(\s+)/);
      drawText(contentWipeString, contentWipeText);
      contentWipeIncrement++;
    }
  }

  // content - hide on scrollup
  if (wipeElem0Value < 0) {
    contentWipeText.classList.remove("drawText--Active");
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

  getWipeWrapperTranslate();
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

drawText = (str, elem) => {
  setTimeout(function() {
    elem.classList.add("drawText--Active");
    for (let i = 0; i < str.length; i++) {
      setTimeout(function() {
        elem.innerHTML += str[i];
      }, i * 10);
    }
  }, 500);
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
    let contentHomeText = document.querySelector(".content__Home__Text");
    let contentHomeString = obj.content.article1.text.split(/(\s+)/);
    drawText(contentHomeString, contentHomeText);
  }, 100);
};

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
