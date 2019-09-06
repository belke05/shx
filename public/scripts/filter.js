let inputTags = document.querySelectorAll("input");
let filterTags = [];

function updateTags() {
  filterTags = [];
  inputTags.forEach(inputTag => {
    if (inputTag.checked) {
      filterTags.push(inputTag.dataset.tagId);
    }
  });
  if (filterTags.length == 0) {
    return getAll();
  }
  // displayed = [];
  axios
    .post(`/filter/tags`, { tags: filterTags })
    .then(servRes => {
      console.log("data response", servRes.data);
      addsneakers(servRes.data);
      // displaycheck(allowedSneakers);
    })
    .catch(err => {
      console.log(err);
    });
}

function addsneakers(snks) {
  let products = document.getElementById("products_grid");
  products.innerHTML = "";
  snks.forEach(sneaker => {
    let sneak = document.createElement("a");
    sneak.href = `/one-product/${sneaker._id}`;
    sneak.className = "product-item-wrapper";
    sneak.innerHTML = `<div class="product-img">
                   <img src="${sneaker.imgPath}" alt=${sneaker.name} : what a nice pair of kicks">
             </div>
             <p class="product-name">${sneaker.name}</p>
              <p class="product-cat">${sneaker.category}</p>
              <p class="product-price">${sneaker.price}</p>`;
    products.appendChild(sneak);
  });
}

inputTags.forEach(tag => {
  tag.onclick = updateTags;
});

function getAll() {
  axios
    .post(`/nofilter`, { tags: filterTags })
    .then(servRes => {
      console.log("data response", servRes.data);
      addsneakers(servRes.data);
      // displaycheck(allowedSneakers);
    })
    .catch(err => {
      console.log(err);
    });
}
