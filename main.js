//! CRUD- create,read, update, delete

let imagesData = [];

let addFormBtn = $("#add-form-btn");
let addFormInp = $("#add-form-inp");
let imagesList = $("#images-list");
let editForm = $(".edit-form");
let editFormInp = $("#edit-form-inp");
let editFormInpId = $("#edit-form-inp-id");
let editformSaveBtn = $("#edit-form-save-btn");
let btnCloseModal = $("#btn-close-modal");
function addNewImage() {
  if (addFormInp.val().trim() == "") {
    alert("Fill the boxes");
    return;
  }
  let newImage = {
    imageURL: addFormInp.val(),
    id: Date.now(),
  };
  imagesData.push(newImage);
  render();
  //   console.log(imagesData);
  //   console.log(newImage);
  //   console.log(Date.now());
}
addFormBtn.on("click", addNewImage);

// console.log(Date.now);
// console.log(Date.now);
// console.log(Date.now);

// setTimeout(() => {
//   console.log(Date.now());
// }, 1000);

function render() {
  imagesList.empty();
  imagesData.forEach((item) => {
    imagesList.append(`
    <div id=${item.id} class="image-card">
    <img width= "200px" src=${item.imageURL}/>
    <button class="btn-delete">Delete</button>
    <button class="btn-edit">Edit</button>
    </div>`);
  });
}
function deleteImage(id) {
  imagesData = imagesData.filter((item) => item.id != id);
  render();
}
$(document).on("click", ".btn-delete", function (e) {
  let id = e.target.parentNode.id;
  deleteImage(id);
});
function getEditElem(id) {
  let editElem = imagesData.find((item) => item.id == id);
  console.log(editElem);
  editFormInp.val(editElem.imageURL);
  editFormInpId.val(editElem.id);
}
$(document).on("click", ".btn-edit", function (e) {
  let id = e.target.parentNode.id;
  getEditElem(id);
  editForm.css("display", "flex");
});

btnCloseModal.on("click", function () {
  editForm.css("display", "none");
});

editformSaveBtn.on("click", function () {
  let id = editFormInpId.val();
  let imageURL = editFormInp.val();
  let editImg = {
    id,
    imageURL,
  };
  imagesData = imagesData.map((item) => {
    if (item.id == id) {
      return editImg;
    } else {
      return item;
    }
  });
  render();
  editForm.css("display", "none");
});
