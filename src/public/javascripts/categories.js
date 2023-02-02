let checkFetch = (response) => {
  if (!response.ok) {
    throw Error(response.statusText + "-" + response.url + ": Network response was not OK");
  }
  return response;
}

// see the content of the blog post when pressing the "Read More" button on home page
const readMore = document.getElementById("readMoreFromCategory"); 
readMore?.addEventListener("click", () => {
    fetch("/blogpost", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json", 
       "Accept": "application/json"
    },
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

// edit category
editCategoryForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  // const titleCategory = formData.get("titleCategory");
  // const description = formData.get("description");
  // console.log({ titleCategory });
  // console.log({ description });
  const updatedValues = Object.fromEntries(formData.entries());
  console.log({ updatedValues })

  const editCategoryFormResponse = document.getElementById("editCategoryFormResponse");

  if (titleCategory) {
    formData.set("titleCategory", updatedValues.titleCategory);
    console.log("First titleCategory: ", updatedValues.titleCategory);
  }
  if (description) {
    formData.set("description", updatedValues.description);
    console.log("First description: ", updatedValues.description);
  }

  if (titleCategory || description) {
    fetch("/category/idCategory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }, // default: application/x-www-form-urlencoded;charset=UTF-8
      body: JSON.stringify(updatedValues), 
    })
    .then(checkFetch)
    // .then(text => console.log(text))
    // .then(response => response.text())
    .then(response => response.json())
    .then((res) => {
      console.log("Good fetch!");
      let titleCategory = res.updatedCategory.titleCategory;
      titleCategory.html(res.titleCategory);
      console.log(res.category);
      let description = res.updatedCategory.description;
      description.html(res.description);
      console.log(res.category);
      editCategoryFormResponse.append(
        '<div class="success-block">Update successfully</div>'
      );
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
