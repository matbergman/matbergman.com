window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

window.onresize = function() {
  resizeView();
};

document.addEventListener("DOMContentLoaded", function() {
  showLayout = obj => {
    const wrapper = document.querySelector(".wrapper");
    let windowHeight = window.innerHeight;
    let wrapperHeight = wrapper.offsetHeight;
    let pageBreaks = [];
    let numberOfPages = obj.length;

    // ***** generate elements *****

    for (let i = 0; i < obj.length; i++) {
      const newSection = document.createElement("section");
      newSection.classList.add("view");
      newSection.id = obj[i].id;

      // generate home page "scale" view
      if (obj[i].id === "elem0") {
        getHomeContent(Object.entries(obj[i].content), newSection, "scale");
      }

      // generate portfolio page "wipe" view
      if (obj[i].id === "elem1") {
        const wipeBg = document.createElement("div");
        wipeBg.classList.add("wipe__Background");
        newSection.appendChild(wipeBg);

        // background presentation elements
        for (let i = 0; i < 3; i++) {
          let wipeElem = document.createElement("span");
          wipeElem.classList.add("wipeElem", "wipeElem__" + i);
          wipeElem.setAttribute("role", "presentation");
          wipeBg.appendChild(wipeElem);
        }
        for (let i = 0; i < 4; i++) {
          let shadowElem = document.createElement("span");
          shadowElem.classList.add("shadowElem", "shadowElem__" + i);
          shadowElem.setAttribute("role", "presentation");
          wipeBg.appendChild(shadowElem);
        }

        const wipeWrapper = document.createElement("div");
        wipeWrapper.classList.add("wipe__Wrapper");

        const wipeIntro = document.createElement("div");
        wipeIntro.classList.add("wipe__Intro");

        const articleDescription = document.createElement("p");
        articleDescription.classList.add("wipe__Description", "drawText");

        if (isMobile) {
          articleDescription.innerHTML = obj[i].intro;
        }

        wipeIntro.appendChild(articleDescription);

        newSection.appendChild(wipeIntro);

        newSection.appendChild(wipeWrapper);
        getCardContent(Object.entries(obj[i].content), wipeWrapper, "wipe");
      }

      // generate personal page "fade" view
      if (obj[i].id === "elem2") {
        let scrollBg = document.createElement("div");
        scrollBg.classList.add("fade__Background");

        const fadeWrapper = document.createElement("div");
        fadeWrapper.classList.add("fade__Wrapper");

        const fadeIntro = document.createElement("div");
        fadeIntro.classList.add("fade__Intro");

        const fadeDescription = document.createElement("p");
        fadeDescription.classList.add("fade__Description");

        fadeIntro.appendChild(fadeDescription);

        newSection.appendChild(scrollBg);
        newSection.appendChild(fadeIntro);
        newSection.appendChild(fadeWrapper);
        getCardContent(Object.entries(obj[i].content), fadeWrapper, "fade");
      }

      // generate contact form view
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
        newSection.appendChild(contactForm);
      }

      // render elements
      wrapper.appendChild(newSection);
    }

    // ***** set interactive attributes for rendered elements *****

    // set height of each scroll section
    wrapper.style.height = windowHeight * numberOfPages + "px";
    for (let i = 0; i < numberOfPages; i++) {
      pageBreaks[i] = wrapperHeight * i;
    }

    // elem0 - scalable element size
    if (document.querySelector("#elem0")) {
      elem0.style.transform = `scale(1)`;
      elem0.classList.add("scale");
      elem0.setAttribute("data-position", pageBreaks[0]);
    }

    // elem1 - set wipe elements
    if (document.querySelector("#elem1")) {
      elem1.classList.add("wipe");
      //      elem1.style.marginTop = wrapperHeight + "px";

      getWrapperLeft("wipe__Wrapper");
      elem1.setAttribute("data-position", pageBreaks[1]);
    }

    // elem2 - set fade elements
    elem2.classList.add("fade");
    elem2.setAttribute("data-position", pageBreaks[2]);

    // elem3 - set contact elements
    elem3.classList.add("contact");
    elem3.setAttribute("data-position", pageBreaks[3]);

    // scroll event listener
    window.addEventListener("scroll", function(e) {
      if (window.scrollY >= pageBreaks[0]) {
        animation_0(elem0, wrapperHeight, numberOfPages);
        animation_1(obj[1], elem1);
        elem0.style.visibility = "visible";
        elem2.style.visibility = "hidden";
        elem3.style.visibility = "hidden";
      }

      if (window.scrollY >= pageBreaks[1]) {
        animation_2(elem1, wrapperHeight);
        animation_3(obj[1], elem2, wrapperHeight);
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

    // main navigation
    const headerMain = document.querySelector(".header__Main");
    let navMain = document.createElement("nav");
    navMain.classList.add("nav__Main");

    for (let i = 0; i < obj.length; i++) {
      let navButton = document.createElement("button");
      navButton.classList.add("button__Main");
      navButton.innerText = obj[i].label;

      navButton.addEventListener("click", function() {
        scrollNav(i, pageBreaks[i]);
      });
      navMain.appendChild(navButton);
    }
    headerMain.appendChild(navMain);
  };
});
