// scroll to anchor for sticky menu
export const scrollToAnchor = (fromTop, links) => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const offsetTop = document.querySelector(href).offsetTop;

      scroll({
        top: offsetTop - fromTop,
        behavior: "smooth",
      });
    });
  });
};

// set active link on scroll for sticky menu
export const setActiveLinkOnScroll = (fromTop, links, activeClassName) => {
  let scrollY = window.scrollY;

  links.forEach((link) => {
    let section = document.querySelector(link.hash);

    scrollY > section.offsetTop - fromTop - 1 &&
    scrollY <= section.offsetTop - fromTop - 1 + section.clientHeight
      ? link.classList.add(activeClassName)
      : link.classList.remove(activeClassName);
  });
};

// set active link on click
export const setActiveLink = (links, activeClassName) => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach(
        (item) =>
          item.classList.contains(activeClassName) &&
          item.classList.remove(activeClassName)
      );
      link.classList.add(activeClassName);
    });
  });
};

// scroll to top fn
export const scrollToTop = (value) => {
  window.scrollTo({
    top: value,
    behavior: "smooth",
  });
};
