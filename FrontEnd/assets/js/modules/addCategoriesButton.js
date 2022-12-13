import { createElement } from "./createElement.mjs";

fetch("http://localhost:5678/api/categories", {
  headers: {
    Accept: "application/json",
  },
})
  .then(function (r) {
    if (r.ok) {
      return r.json();
    }
  })
  .then((categories) => {
    for (const category of categories) {
      createElement(
        "div",
        { class: "btn-filter", id: category.name },
        "#grp-btn-filter",
        category.name
      );
    }
  });
