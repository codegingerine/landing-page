export const scrollToAnchor = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
};

export const setActiveLink = (e, links, activeClassName) => {
  e.preventDefault();
  links.forEach((link) => link.classList.contains(activeClassName) && link.classList.remove(activeClassName));
  e.currentTarget.classList.add(activeClassName);
};
