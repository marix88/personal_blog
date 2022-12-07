// send the form to the server

// select category
$("#selectCategory").change(function (e) {
  $("#title").removeAttr("disabled");
  $("#description").removeAttr("disabled");
});

// add new blog post
$("#addBlogPostForm").submit(function (e) {
  e.preventDefault();

  const category = $("#selectCategory option:selected").val();
  const title = $("#title").val();
  const snippet = $("#snippet").val();
  const content = $("#content").val();

  const createdAt = new Date().toDateString().split(" ");
  createdAt = `Creation date: ${date[2]} ${date[1]} ${date[3]}`;

  const updatedAt = new Date().toDateString().split(" ");
  updatedAt = `Updated on: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();

  if (
    !category ||
    !title ||
    !snippet ||
    !content ||
    !createdAt ||
    !updatedAt
  ) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    formData.append("category", category);
    formData.append("title", title);
    formData.append("snippet", snippet.value);
    formData.append("content", content.value);
    formData.append("createdAt", date);
    formData.append("updatedAt", date);

    fetch("/create", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        $("#formResponse").append(
          '<div class="success-block">Added new blog post successfully</div>'
        );
      })
      .catch((err) => {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      });
  }
});
