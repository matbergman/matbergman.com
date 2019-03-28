window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

window.onresize = function() {
  document.querySelector("#elem0").style.transform = `scale(100)`;
}


document.addEventListener("DOMContentLoaded", function() {
  showLayout = obj => {
    const wrapper = document.querySelector(".wrapper");
    const imagePath = "images";
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let wrapperHeight = wrapper.offsetHeight;
    let wrapperWidth = wrapper.offsetWidth;
    let pageBreaks = [];
    let numberOfPages = obj.length;

    // ***** generate elements *****

    for (let i = 0; i < obj.length; i++) {
      let newElem = document.createElement("section");
      newElem.classList.add("view");
      newElem.id = obj[i].id;
      if (obj.background) {
        newElem.style.backgroundImage = `url(${imagePath}/${elem.background})`;
      }

      let newHeader = document.createElement("header");
      newHeader.classList.add("view__Header");
      newHeader.innerText = obj[i].header;

      if (obj[i].id === "elem0") {
        getArticles(Object.entries(obj[i].content), newElem, "scale");
      }

      if (obj[i].id === "elem1") {
        let wipeBg = document.createElement("div");
        wipeBg.classList.add("wipe", "wipe__Background");
        newElem.appendChild(wipeBg);
        getArticles(Object.entries(obj[i].content), newElem, "wipe");
      }

      if (obj[i].id === "elem2") {
        let scrollBg = document.createElement("div");
        scrollBg.classList.add("fadeIn", "fadeIn__Background");
        newElem.appendChild(scrollBg);
        getArticles(Object.entries(obj[i].content), newElem, "fadeIn");
      }

      if (obj[i].id === "elem3") {
        let contactForm = document.createElement("form");
        contactForm.classList.add("form__Contact");

        let contactInputLabel = document.createElement("label");
        contactInputLabel.classList.add("form__Contact__Label");
        contactInputLabel.htmlFor = obj[i].content.contactInputFor;
        contactInputLabel.innerText = obj[i].content.contactInputLabel;

        let contactInput = document.createElement("input");
        contactInput.type = "text";
        contactInput.classList.add("form__Contact__Input");

        let contactTextarea = document.createElement("textarea");
        contactTextarea.classList.add("form__Contact__Textarea");

        let contactSubmit = document.createElement("button");
        contactSubmit.classList.add("form__Contact__Button");
        contactSubmit.innerText = "Submit";

        contactForm.appendChild(contactInputLabel);
        contactForm.appendChild(contactInput);
        contactForm.appendChild(contactTextarea);
        contactForm.appendChild(contactSubmit);
        newElem.appendChild(contactForm);
      }

      // render elements
      newElem.appendChild(newHeader);
      wrapper.appendChild(newElem);

      // ***** set interactive attributes for rendered elements *****

      // set height of each scroll section
      wrapper.style.height = windowHeight * numberOfPages + "px";
      for (let j = 0; j < numberOfPages; j++) {
        pageBreaks[j] = wrapperHeight * j;
      }

      // elem0 - scalable element size
      if (document.querySelector("#elem0")) {
        elem0.style.transform = `scale(100)`;
        elem0.classList.add("scale");
      }

      // elem1 - set wipe elements
      if (document.querySelector("#elem1")) {
        const wipeElem = elem1.querySelectorAll(".wipe__Article");
        const wipeBg = elem1.querySelector(".wipe__Background");

        // Get top position value to vertically align articles
        let wipeTopPos = 0;
        for (let i = 0; i < wipeElem.length; i++) {
          wipeTopPos = wipeTopPos + wipeElem[i].offsetHeight;
        }
        wipeTopPos = (windowHeight - wipeTopPos) / (wipeElem.length * 2);

        wipeBg.style.width = `${wrapperWidth}px`;
        wipeBg.style.left = `-${wrapperWidth}px`;
        for (let i = 0; i < wipeElem.length; i++) {
          wipeElem[i].style.left = `${wrapperWidth * 2}px`;
          wipeElem[i].style.top = `${wipeTopPos}px`;
          wipeTopPos = wipeTopPos + windowHeight / wipeElem.length;
        }
      }

      // scroll event listener
      window.addEventListener("scroll", function(e) {
        const wipeElem = elem1.querySelectorAll(".wipe__Article");
        if (window.scrollY >= pageBreaks[0]) {
          animation_0(elem0, wrapperHeight, numberOfPages);
          animation_1(elem1, wrapperWidth, wipeElem);
          elem0.style.visibility = "visible";
          elem2.style.visibility = "hidden";
          elem3.style.visibility = "hidden";
        }

        if (window.scrollY >= pageBreaks[1]) {
          animation_2(elem1, wrapperHeight);
          animation_3(elem2, wrapperHeight);
          elem0.style.visibility = "hidden";
          elem2.style.visibility = "visible";
        }

        if (window.scrollY >= pageBreaks[2]) {
          animation_4(wrapperHeight);
          elem3.style.visibility = "visible";
        }

        if (window.scrollY >= pageBreaks[3]) {
        }
      });
    }

      // main navigation
      const headerMain = document.querySelector(".header__Main");
      let navMain = document.createElement("nav");
      navMain.classList.add("nav__Main");

      for (let i = 0; i < obj.length; i++) {
        let navButton = document.createElement("button");
        navButton.classList.add("button__Main");
        navButton.innerText = obj[i].label;
        navButton.addEventListener("click", function(e) {
          window.scrollTo({
            top: pageBreaks[i],
            left: 0,
            behavior: "smooth"
          });
        });
        navMain.appendChild(navButton);
      }
      headerMain.appendChild(navMain);
  };
});
