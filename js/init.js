window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

window.onresize = function() {
  document.querySelector("#elem0").style.transform = `scale(1)`;
  layoutUpdate();
};

document.addEventListener("DOMContentLoaded", function() {
  showLayout = obj => {
    const wrapper = document.querySelector(".wrapper");
    let windowHeight = window.innerHeight;
    let wrapperHeight = wrapper.offsetHeight;
    let wrapperWidth = wrapper.offsetWidth;
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
        wipeBg.classList.add("wipe", "wipe__Background");
        newSection.appendChild(wipeBg);

        // background presentation elements
        for (let i=0; i<3; i++) {
          let wipeElem = document.createElement("span");
          wipeElem.classList.add("wipeElem", "wipeElem__"+i);
          wipeElem.setAttribute("role", "presentation");
          wipeBg.appendChild(wipeElem);
        }
        for (let i=0; i<4; i++) {
            let shadowElem = document.createElement("span");
            shadowElem.classList.add("shadowElem", "shadowElem__"+i);
            shadowElem.setAttribute("role","presentation");
            wipeBg.appendChild(shadowElem);
        }

        const wipeWrapper = document.createElement("div");
        wipeWrapper.classList.add("wipe", "wipe__Wrapper");

        
        const articleIntro = document.createElement("div");
        articleIntro.classList.add("wipe__Intro");

        const articleDescription = document.createElement("p");
        articleDescription.classList.add("wipe__Description", "drawText");


        articleIntro.appendChild(articleDescription);


        newSection.appendChild(articleIntro);
        newSection.appendChild(wipeWrapper);
        getCardContent(Object.entries(obj[i].content), wipeWrapper, "wipe");
      }

      // generate personal page "parallax" view
      if (obj[i].id === "elem2") {
        let scrollBg = document.createElement("div");
        scrollBg.classList.add("fadeIn", "fadeIn__Background");
        newSection.appendChild(scrollBg);
        getCardContent(Object.entries(obj[i].content), newSection, "fadeIn");
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
    for (let j = 0; j < numberOfPages; j++) {
      pageBreaks[j] = wrapperHeight * j;
    }

    // elem0 - scalable element size
    if (document.querySelector("#elem0")) {
      elem0.style.transform = `scale(1)`;
      elem0.classList.add("scale");
    }

    // elem1 - set wipe elements
    if (document.querySelector("#elem1")) {
        getWipeWrapperLeft();
    }

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
