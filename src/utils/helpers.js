export const scrollToAnchor = (links) => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const offsetTop = document.querySelector(href).offsetTop;

      scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
};

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
