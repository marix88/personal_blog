// add new category
$("#addCategoryForm").submit(function (e) {
  e.preventDefault();

const titleCategory = $("#titleCategory").val();
const description = $("#description").val();

const formData = new FormData();

  if (!titleCategory || !description) {
    $("#addCategoryFormResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    // parameters: name (from the form), value, filename(optional)
    formData.append("titleCategory", titleCategory); 
    formData.append("description", description);

    fetch("/add-category", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
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
