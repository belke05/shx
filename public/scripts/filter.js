const inputTags = document.querySelectorAll("input");
let filterTags = [];
let displayed = [];

function updateTags() {
  filterTags = [];
  inputTags.forEach(inputTag => {
    if (inputTag.checked) {
      filterTags.push(inputTag.dataset.tagId);
    }
  });
  // displayed = [];
  axios
    .post(`/filter/tags`, { tags: filterTags })
    .then(servRes => {
      console.log("data response", servRes.data);
      servRes.data.forEach(res => {
        console.log(res._id);
      });
      let allowedSneakers = [];
      servRes.data.forEach(obj => {
        allowedSneakers.push(obj._id);
      });
      displaycheck(allowedSneakers);
    })
    .catch(err => {
      console.log(err);
    });
  // filterTags.forEach(filter => {
  //   axios
  //     .get(`/filter/${filter}`)
  //     .then(servRes => {
  //       displayed.push(servRes.data[0]._id);
  //       displaycheck(displayed, items);
  //       console.log(displayed, "display shoes");
  //     })
  //     .catch(dbErr => {});
  // });
}

function displaycheck(allowedSneakers) {
  let items = document.getElementsByClassName("product-item-wrapper");
  for (let i = 0; i < items.length; i++) {
    console.log(items[i].id, "yaya");
    console.log("item id", items[i].id);
    console.log(allowedSneakers, "allowed");
    if (allowedSneakers.includes(items[i].id)) {
      items[i].hidden = false;
    } else {
      items[i].hidden = true;
    }
  }
}

inputTags.forEach(inputTags => {
  inputTags.onchange = updateTags;
});
