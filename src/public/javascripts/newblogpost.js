// send the form to the server

// select category
/*$("#selectCategory").change(function (e) {
  $("#titleCategory").removeAttr("disabled");
  $("#description").removeAttr("disabled");
});
*/
// add new blog post
$("#addBlogPostForm").submit(function (e) {
  e.preventDefault();

  const category = $("#selectCategory option:selected").val();
  const title = $("#title").val();
  const snippet = $("#snippet").val();
  const content = $("#content").val();
  const createdAt = new Date().toDateString().split(" ");

  let formData = new FormData();

  if (
    !category ||
    !title ||
    !snippet ||
    !content ||
    !createdAt 
  ) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    formData.append("category", category);
    formData.append("title", title);
    formData.append("snippet", snippet);
    formData.append("content", content);
    formData.append("createdAt", createdAt);

    
    fetch("/create", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log((data)); // make the return value available to me
        $("#createFormResponse").append(
          '<div class="success-block">Added new blog post successfully</div>'
        );
      })
      .catch((err) => {
        console.error(err);
        $("#createFormResponse").append('<div class="error-block">Error</div>');
      });
  }
});
