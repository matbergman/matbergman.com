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

        // wipe view - background presentation elements
        for (let i = 0; i < 3; i++) {
          const wipeElem = document.createElement("span");
          wipeElem.classList.add("wipeElem", "wipeElem__" + i);
          wipeElem.setAttribute("role", "presentation");
          wipeBg.appendChild(wipeElem);
        }
        for (let i = 0; i < 4; i++) {
          const shadowElem = document.createElement("span");
          shadowElem.classList.add("shadowElem", "shadowElem__" + i);
          shadowElem.setAttribute("role", "presentation");
          wipeBg.appendChild(shadowElem);
        }

        // wipe view - layout elements
        const wipeWrapper = document.createElement("ul");
        wipeWrapper.classList.add("wipe__Wrapper");

        const wipeIntro = document.createElement("div");
        wipeIntro.classList.add("wipe__Intro");

        const wipeHeader = document.createElement("h2");
        wipeHeader.classList.add("subhead", "wipe__Subhead", "drawText");
        wipeHeader.innerHTML = obj[i].header;

        const wipeDescription = document.createElement("p");
        wipeDescription.classList.add("wipe__Description", "drawText");

        if (isMobile) {
          wipeDescription.innerHTML = obj[i].intro;
        }

        wipeIntro.appendChild(wipeHeader);
        wipeIntro.appendChild(wipeDescription);

        newSection.appendChild(wipeIntro);

        newSection.appendChild(wipeWrapper);
        getCardContent(Object.entries(obj[i].content), wipeWrapper, "wipe");
      }

      // generate project page "fade" view
      if (obj[i].id === "elem2") {
        const scrollBg0 = document.createElement("div");
        scrollBg0.classList.add("fade__Background", "fade__Background__0");

        const scrollBg1 = document.createElement("div");
        scrollBg1.classList.add("fade__Background", "fade__Background__1");

        const fadeWrapper = document.createElement("ul");
        fadeWrapper.classList.add("fade__Wrapper");

        const fadeIntro = document.createElement("div");
        fadeIntro.classList.add("fade__Intro");

        const fadeHeader = document.createElement("h2");
        fadeHeader.classList.add("subhead", "fade__Subhead");
        fadeHeader.innerHTML = obj[i].header;

        const fadeDescription = document.createElement("p");
        fadeDescription.classList.add("fade__Description");

        fadeIntro.appendChild(fadeHeader);
        fadeIntro.appendChild(fadeDescription);

        newSection.appendChild(scrollBg0);
        newSection.appendChild(scrollBg1);
        newSection.appendChild(fadeIntro);
        newSection.appendChild(fadeWrapper);
        getCardContent(Object.entries(obj[i].content), fadeWrapper, "fade");
      }

      // generate contact form view
      if (obj[i].id === "elem3") {
        const contactBg = document.createElement("div");
        contactBg.classList.add("contact__Background");
        newSection.appendChild(contactBg);

        const contactElem = document.createElement("span");
        contactElem.classList.add("contactElem", "contactElem__0");
        contactElem.setAttribute("role", "presentation");
        contactBg.appendChild(contactElem);

        const contactWrapper = document.createElement("div");
        contactWrapper.classList.add("contact__Wrapper");

        const contactIntro = document.createElement("div");
        contactIntro.classList.add("contact__Intro");

        const contactHeader = document.createElement("h2");
        contactHeader.classList.add("subhead", "contact__Subhead");
        contactHeader.innerText = obj[i].header;

        const contactDescription = document.createElement("a");
        contactDescription.classList.add("contact__Description");
        contactDescription.setAttribute("href", obj[i].twitter);
        contactDescription.setAttribute("target", "_blank");
        contactDescription.innerText = obj[i].text;

        contactIntro.appendChild(contactHeader);
        contactIntro.appendChild(contactDescription);
        newSection.appendChild(contactIntro);

        newSection.appendChild(contactWrapper);

        const contactForm = document.createElement("form");
        contactForm.classList.add("form__Contact");
        contactForm.setAttribute("method", "POST");
        contactForm.setAttribute(
          "action",
          "https://formspree.io/matbergman@gmail.com"
        );

        const contactNameLabel = document.createElement("label");
        contactNameLabel.classList.add("form__Contact__Label");
        contactNameLabel.htmlFor = obj[i].contentName.contactNameId;
        contactNameLabel.innerText = obj[i].contentName.contactNameLabel;
        const contactName = document.createElement("input");
        contactName.type = "text";
        contactName.classList.add("form__Contact__Input");
        contactName.id = obj[i].contentName.contactNameId;
        contactName.setAttribute("name", "name");
        contactName.setAttribute("tabindex", "1");

        const contactEmailLabel = document.createElement("label");
        contactEmailLabel.classList.add("form__Contact__Label");
        contactEmailLabel.htmlFor = obj[i].contentEmail.contactEmailId;
        contactEmailLabel.innerText = obj[i].contentEmail.contactEmailLabel;
        const contactEmail = document.createElement("input");
        contactEmail.type = "email";
        contactEmail.classList.add("form__Contact__Input");
        contactEmail.id = obj[i].contentEmail.contactEmailId;
        contactEmail.setAttribute("name", "email");
        contactEmail.setAttribute("tabindex", "2");

        const contactSubjectLabel = document.createElement("label");
        contactSubjectLabel.classList.add("form__Contact__Label");
        contactSubjectLabel.htmlFor = obj[i].contentSubject.contactSubjectId;
        contactSubjectLabel.innerText =
          obj[i].contentSubject.contactSubjectLabel;
        const contactSubject = document.createElement("input");
        contactSubject.type = "text";
        contactSubject.classList.add("form__Contact__Input");
        contactSubject.id = obj[i].contentSubject.contactSubjectId;
        contactSubject.setAttribute("name", "subject");
        contactSubject.setAttribute("tabindex", "3");

        const contactMessageLabel = document.createElement("label");
        contactMessageLabel.classList.add("form__Contact__Label");
        contactMessageLabel.htmlFor = obj[i].contentMessage.contactMessageId;
        contactMessageLabel.innerText =
          obj[i].contentMessage.contactMessageLabel;
        const contactMessage = document.createElement("textarea");
        contactMessage.classList.add("form__Contact__Textarea");
        contactMessage.setAttribute("name", "message");
        contactMessage.setAttribute("tabindex", "4");

        const contactSubmit = document.createElement("button");
        contactSubmit.classList.add("form__Contact__Button");
        contactSubmit.innerText = "Submit Message";
        contactSubmit.setAttribute("type", "submit");
        contactSubmit.setAttribute("tabindex", "5");

        contactForm.appendChild(contactNameLabel);
        contactForm.appendChild(contactName);
        contactForm.appendChild(contactEmailLabel);
        contactForm.appendChild(contactEmail);
        contactForm.appendChild(contactSubjectLabel);
        contactForm.appendChild(contactSubject);
        contactForm.appendChild(contactMessageLabel);
        contactForm.appendChild(contactMessage);
        contactForm.appendChild(contactSubmit);
        contactWrapper.appendChild(contactForm);
      }

      // render elements
      wrapper.appendChild(newSection);
    }

    // ***** set interactive attributes for rendered elements *****

    // set height of each scroll section
    if (!isMobile()) {
      wrapper.style.height = windowHeight * numberOfPages + "px";
      for (let i = 0; i < numberOfPages; i++) {
        pageBreaks[i] = wrapperHeight * i;
      }
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
        animation_3(obj[2], elem2, wrapperHeight);
        elem0.style.visibility = "hidden";
        elem2.style.visibility = "visible";
      }

      if (window.scrollY >= pageBreaks[2]) {
        animation_4(wrapperHeight);
        elem3.style.visibility = "visible";
      }

      if (window.scrollY >= pageBreaks[3]) {
        elem3.classList.add("contact--active");
      }
    });

    // main navigation
    const headerMain = document.querySelector(".header__Main");
    const navMain = document.createElement("nav");
    navMain.classList.add("nav__Main");

    for (let i = 0; i < obj.length; i++) {
      const navButton = document.createElement("button");
      navButton.classList.add("button__Main");
      navButton.innerText = obj[i].label;

      navButton.addEventListener("click", function() {
        scrollNav(i, pageBreaks[i]);
      });
      navButton.setAttribute("data-scroll", pageBreaks[i]);
      navMain.appendChild(navButton);
    }
    headerMain.appendChild(navMain);
  };
});
