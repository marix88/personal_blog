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

// $("#editCategoryBtn").click(function (e) {
const editCategory = document.getElementById("editCategoryBtn");
editCategory?.addEventListener("click", () => {
  fetch("/edit-category", {
    method: "GET",
    headers: { 
      Accept: "application/json",
      "Content-Type": "application/json" 
    },
  }).then(() => (window.location = "../../edit-category/:categoryId"));
});

// edit category
/*$("#editCategoryForm").submit(function (e) {
  e.preventDefault();

  const titleCategory = $("#titleCategory").val();
  const description = $("#description").val();

  let formData = new FormData();

  if (titleCategory) {
    formData.append("titleCategory", titleCategory);
    console.log(titleCategory);
  }
  if (description) {
    formData.append("description", description);
  }

  if (titleCategory || description) {
    fetch("/edit-category", {
      method: "PATCH",
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json" 
      },
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#editCategoryFormResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titleCategory").html(res.updateCategory.titleCategory);
        updatedTitleCategory = res.updateCategory.titleCategory;
        console.log(res.updateCategory);
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
  )};
});*/
// add new category

const editCategoryForm = document.getElementById("editCategoryForm");
editCategoryForm.addEventListener("submit", async (e) => { // if the form is submitted
  e.preventDefault(); // prevent submitting the form, send the formData to the server instead

// get the entire form fields
// get the element attached to the event handler.
let form = e.currentTarget;
console.log(form);
// get the URL for API endpoint
// take the URL from the form's `action` attribute.
let url = form.action;

try {
  // Takes all the form fields and make the field values available through a `FormData` instance.
  let formData = new FormData(form);

  //Call the `postFormFieldsJson()` function 
  let responseData = await postFormFieldsAsJson({ url, formData });

  // Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);

} catch (error) {
  // Handle the error here.
  console.error(error);
}

});

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  // let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  // let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "PATCH",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}

// delete category
$("#deleteCategoryBtn").click(function (e) {
  e.preventDefault();

  fetch("/category", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: titleCategory }),
  }).then(() => (window.location = "../../"));
});
