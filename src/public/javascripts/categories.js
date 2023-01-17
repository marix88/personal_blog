// see the content of the blog post when pressing the "Read More" button on home page
const readMore = document.getElementById("readMoreFromCategory"); 
console.log(readMore);
readMore?.addEventListener("click", () => {
    fetch("/blogpost", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({ selectCategory: titleBlog }),
  }).then(() => (window.location = "../blog/:blogId"));
});

$("#editCategoryBtn").click(function (e) {
  $("form").removeAttr("hidden");
});
const titleCategory = $("#titleCategory").val();
const description = $("#description").val();

// edit category
$("#editCategoryForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  let formData = new FormData();
  formData.append("category", titleCategory);

  if (titleCategory) {
    formData.append("titleCategory", titleCategory);
  }
  if (descriptionCategory) {
    formData.append("description", description);
  }

  if (titleCategory || description) {
    fetch("/category", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#editCategoryFormResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titleCategory").html(res.updateCategory.titleCategory);
        updatedTitleCategory = res.updateCategory.titleCategory;
        $("#description").html(res.updateCategory.description);
        console.log(res.updateCategory);
      })
      .catch((err) => {
        console.error(err);
        $("#editCategoryFormResponse").append('<div class="error-block">Error</div>');
      });
  } else {
    $("#editCategoryFormResponse").append(
      '<div class="error-block">All fields are empty</div>'
    );
  }
});

// delete category
$("#deleteCategoryBtn").click(function (e) {
  e.preventDefault();

  fetch("/category", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: titleCategory }),
  }).then(() => (window.location = "../../"));
});
