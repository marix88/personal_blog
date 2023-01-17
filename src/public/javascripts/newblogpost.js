// add new blog post
const addBlogPostForm = document.getElementById("addBlogPostForm");

addBlogPostForm.addEventListener("submit", async (e) => { // if the form is submitted
  e.preventDefault(); // prevent submitting the form, send the formData to the server instead

  // select category
$("#selectCategory").change(function (e) {
  $("#titleCategory").removeAttr("disabled");
});

// get the entire form fields
// get the element attached to the event handler.
let form = e.currentTarget;

// get the URL for API endpoint
// take the URL from the form's `action` attribute.
let url = form.action;

try {
  // Takes all the form fields and make the field values available through a `FormData` instance.
  let formData = new FormData(form);
  console.log("formData: ", formData);
  //Call the `postFormFieldsJson()` function 
  let responseData = await postFormFieldsAsJson({ url, formData });
  // Destructure the response data
    console.log("responseData: ", responseData);
    let { serverDataResponse } = responseData;
    //Display the response data in the console (for debugging)
    console.log("serverDataResponse ", serverDataResponse);

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
  let formDataObject = Object.fromEntries(formData.entries());
  console.log("formDataObject: ", formDataObject);
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);
  console.log("formDataJsonString: ", formDataJsonString);
  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    // mode:"no-cors",
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
