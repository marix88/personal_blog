let checkFetch = (res) => {
  if (!res.ok) {
    throw Error(res.statusText + "-" + res.url);
  }
  return res;
}

// see the content of the blog post when pressing the "Read More" button on home page
const readMore = document.getElementById("readMoreFromCategory"); 
readMore?.addEventListener("click", () => {
    fetch("/blogpost", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({ selectCategory: titleBlog }),
  })
  .then(checkFetch)
  .then((response) => {
    return response.json();
  })
  .then(() => (window.location = "../blog/:blogId"));
});

const editCategoryBtn = document.getElementById("editCategoryBtn");
const editCategoryForm = document.getElementById("editCategoryForm");

editCategoryBtn?.addEventListener("click", () => {
  editCategoryForm.removeAttribute("hidden");
})

// const editCategory = document.getElementById("editCategoryBtn");
// editCategory?.addEventListener("click", () => {
//   fetch("/edit-category/idCategory")
//   .then(checkFetch)
//   .then(() => {
//   (window.location = "../../edit-category/idCategory")
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// })

// edit category
editCategoryForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  let titleCategory = document.getElementById("titleCategory").value;
  let description = document.getElementById("description").value;
  const editCategoryFormResponse = document.getElementById("editCategoryFormResponse");
  
  let formData = new FormData(e.target);

  if (titleCategory) {
    formData.append("titleCategory", titleCategory);
    console.log("First titleCategory: ", titleCategory);
  }
  if (description) {
    formData.append("description", description);
    console.log("First description: ", description);
  }

  if (titleCategory || description) {
    fetch("/category/idCategory", {
      method: "PATCH",
      body: formData,
    })
    .then(checkFetch)
    .then((formData) => formData.json())
    .then((res) => console.log("Good fetch!", res))
    .then(() => {
      editCategoryFormResponse.append(
        '<div class="success-block">Update successfully</div>'
      );
      titleCategory.html(res.updateCategory.titleCategory);
      titleCategory = res.updateCategory.titleCategory;
      console.log(res.updateCategory);
      // description".html(description);
      // description = response.updateCategory.description;
      // console.log(response.updateCategory);
    })
    .catch((err) => {
      console.log(err);
      editCategoryFormResponse.append('<div class="error-block">Update error!</div>');
    });
  } else {
    editCategoryFormResponse.append(
    '<div class="error-block">All fields are empty</div>'
  )};
});

// delete category
$("#deleteCategoryBtn").click(function (e) {
  e.preventDefault();

  fetch("/category", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ titleCategory: titleCategory }),
  })
  .then(checkFetch)
  .then((response) => {
    return response.json();
  })
  .then(() => (window.location = "../../"));
});
