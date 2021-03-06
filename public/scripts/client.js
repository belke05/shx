const inputTag = document.getElementById("new_tag_name");
const btnTag = document.getElementById("btn_new_tag");
const listTags = document.getElementById("tags");

function postTag(evt) {
  console.log("clicked");
  evt.preventDefault(); // prevent default will prevent the default behaviour of a form which
  // is reloading
  axios
    .post("http://localhost:4000/tag-add", { label: inputTag.value })
    .then(serverRes => {
      console.log(serverRes);
      appendTag(serverRes.data);
    })
    .catch(serverErr => console.log(serverErr));
}
function appendTag(tag) {
  console.log("clicked");
  const option = document.createElement("option");
  option.value = tag._id;
  option.textContent = tag.label;
  listTags.appendChild(option);
  // listTags
}

btnTag.onclick = postTag;
