$("#addCategoryBtn").click(function (e) {
  $("#addCategoryForm").removeAttr("hidden");
});

// add new category
const form = document.getElementById("addCategoryForm");
form.submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const title = $("#titleCategory").val();
  const description = $("#description").val();

  let formData = new FormData(form);

  if (!title || !description) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    // parameters: name (from the form), value, filename(optional)
    formData.append("titleCategory", title); 
    formData.append("description", description);

    fetch("/add-category", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        $("#formResponse").append(
          '<div class="success-block">Added new category successfully</div>'
        );
      })
      .catch((err) => {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      });
  }
});
