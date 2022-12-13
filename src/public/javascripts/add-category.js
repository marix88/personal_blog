// add new category
const form = document.getElementById("addCategoryForm");
form.submit(function (e) {
  e.preventDefault();

let titleCategory = $("#titleCategory").val();
let description = $("#description").val();

let formData = new FormData(form);

  if (!titleCategory || !description) {
    $("#addCategoryFormResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    // parameters: name (from the form), value, filename(optional)
    formData.append("titleCategory", titleCategory); 
    formData.append("descriptionCategory", description);

    fetch("/category", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        $("#addCategoryFormResponse").append(
          '<div class="success-block">Added new category successfully</div>'
        );
      })
      .catch((err) => {
        console.error(err);
        $("#addCategoryFormResponse").append('<div class="error-block">Error</div>');
      });
  }
});
