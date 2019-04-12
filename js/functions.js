getAspectRatio = () => {
  if (window.innerWidth > window.innerHeight) {
    return "horizontal";
  } else {
    return "vertical";
  }
};

getArticles = (articles, newElem, type) => {
  for (let j = 0; j < articles.length; j++) {
    const articleElem = document.createElement("article");
    articleElem.classList.add(...articles[j][1].classList);
    articleElem.dataset.speed = articles[j][1].speed ? articles[j][1].speed : "";
    const articleContent = document.createElement("div");
    articleContent.classList.add(`${type}__Content`);
    if (articles[j][1] !== "scale__Article") {
      articleContent.innerHTML = articles[j][1].text;
    }
    articleElem.appendChild(articleContent);
    newElem.appendChild(articleElem);
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
  document.querySelector(".wrapper").style.backgroundColor = "#02ca98";
  if (window.scrollY === 0) {
    scaleValue = 1;
  } else {
    scaleValue = 1 / (window.scrollY / 10);
  }
  if (scaleValue <= 1) {
    element.style.transform = `scale(${scaleValue})`;
  }
};

animation_1 = (element, wrapperWidth, articles) => {
  element.style.position = `fixed`;
  element.style.top = 0;
  element.style.height = "100%";

  const wipeBgElem = element.querySelector(".wipe__Background");
  const wipeBgElemPos = parseInt(wipeBgElem.style.left);
  let wipeBgElemValue =
    (wipeBgElemPos + (wrapperWidth - window.scrollY * 2)) * -1;
  if (wipeBgElemValue >= wrapperWidth) {
    wipeBgElemValue = wrapperWidth;
  }

  wipeBgElem.style.transform = `translateX(${wipeBgElemValue}px)`;

  const wipeArticlesWrapper = document.querySelector(".wipe__Content");

  let wipeArticlePos = parseInt(wipeArticlesWrapper.style.left);
  let wipeArticleValue = 0 - window.scrollY * 4;

  let wipeArticleEnd = wipeArticlePos * -1 + wrapperWidth * 0.4;
  if (wipeArticleValue <= wipeArticleEnd) {
    wipeArticleValue = wipeArticleEnd;
  }

  wipeArticlesWrapper.style.transform = `translateX(${wipeArticleValue}px)`;
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
  contentHomeTextElem.classList.add("content__Home__Text");

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

  // init - configure homepage header
  isTablet()
    ? (headerHome.style.transform = `rotate(-10.5deg) translateX(${offsetLeft}px)`)
    : (headerHome.style.transform = `rotate(0deg) translateX(0px)`);

  // init - configure content
  let contentHomeText = document.querySelector(".content__Home__Text");
  let contentHomeString = obj.content.article1.text.split(/(\s+)/);

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
    setTimeout(function() {
      contentHome.classList.add("content__Home--active");
      for (let i = 0; i < contentHomeString.length; i++) {
        setTimeout(function() {
          contentHomeText.innerHTML += contentHomeString[i];
        }, i * 10);
      }
    }, 500);
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
  const contentHome = document.querySelector(".content__Home")

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
