getAspectRatio = () => {
  if (window.innerWidth > window.innerHeight) {
    return "horizontal";
  } else {
    return "vertical";
  }
};

getArticles = (articles, newElem, type) => {
  for (let j = 0; j < articles.length; j++) {
    let articleElem = document.createElement("article");
    articleElem.classList.add(...articles[j][1].classList);
    articleElem.dataset.speed = articles[j][1].speed;
    let articleContent = document.createElement("div");
    articleContent.classList.add(`${type}__Content`);
    articleContent.innerText = articles[j][1].text;
    articleElem.appendChild(articleContent);
    newElem.appendChild(articleElem);
  }
};

isInViewport = elem => {
  let bounding = elem.getBoundingClientRect();
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

animation_0 = (element) => {
  if (window.scrollY === 0) {
    scaleValue = 100;
  } else {
    scaleValue = 100 / (window.scrollY / 10);
  }
  if (scaleValue <= 100) {
    element.style.transform = `scale(${scaleValue})`;
    }
  };

animation_1 = (element, wrapperWidth, articles) => {
  element.style.position = `fixed`;
  element.style.top = 0;
  element.style.height = "100%";

  let wipeBgElem = element.querySelector(".wipe__Background");
  let wipeBgElemPos = parseInt(wipeBgElem.style.left);
  let wipeBgElemValue =
    (wipeBgElemPos + (wrapperWidth - window.scrollY * 2)) * -1;
  if (wipeBgElemValue >= wrapperWidth) {
    wipeBgElemValue = wrapperWidth;
  }

  wipeBgElem.style.transform = `translateX(${wipeBgElemValue}px)`;

  for (let i = 0; i < articles.length; i++) {
    let wipeArticlePos = parseInt(articles[i].style.left);
    let wipeArticleValue = 0 - window.scrollY * articles[i].dataset.speed;

    let wipeArticleEnd = wipeArticlePos * -1 + wrapperWidth / 2;
    if (wipeArticleValue <= wipeArticleEnd) {
      wipeArticleValue = wipeArticleEnd;
    }

    articles[i].style.transform = `translateX(${wipeArticleValue}px)`;
  }
};

animation_2 = (element, windowHeight) => {
  element.style.position = `relative`;
  setView(element, windowHeight);
};

animation_3 = (element, windowHeight) => {
  setView(element, windowHeight);
  let fadeInArticles = element.querySelectorAll(".fadeIn__Article");
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
