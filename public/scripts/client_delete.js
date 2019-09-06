const delete_btns = document.querySelectorAll(".fa-trash");

function removeSneaker(evt) {
  console.log("clicked");
  console.log(evt.target);
  console.log(evt.target.dataset.idSneaker);
  const id = evt.target.dataset.idSneaker;
  evt.preventDefault();
  axios
    .get(`http://localhost:4000/product-delete/${id}`)
    .then(serverRes => {
      console.log(serverRes.data);
      deleteSneaker(evt.target);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
}

function deleteSneaker(evtTarget) {
  console.log("deleting");
  let row = evtTarget.parentElement.parentElement;
  row.parentElement.removeChild(row);
  if (!document.querySelector("tbody tr")) {
    document.querySelector("tbody").innerHTML = `
    <tr>
    <td colspan="6">sorry no sneakers left</td>
    </tr>`;
  }
}

delete_btns.forEach(delete_btn => {
  delete_btn.onclick = removeSneaker;
});
