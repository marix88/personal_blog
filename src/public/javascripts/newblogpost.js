// send the form to the server

// select category
$("#selectCategory").change(function (e) {
  $("#title").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  $("#img").removeAttr("disabled");
});

// add new blog post
$("#addBlogPostForm").submit(function (e) {
  e.preventDefault();

  const category = $("#selectCategory option:selected").val();
  const title = $("#title").val();
  const snippet = $("#snippet").val();
  const content = $("#content").val();
  const file = $("#img")[0].files[0];

  let date = new Date().toDateString().split(" ");
  date = `Added: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();

  if (!title || !snippet || !content || !file) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    formData.append("category", category);
    formData.append("title", title);
    formData.append("snippet", snippet.value);
    formData.append("content", content.value);
    formData.append("date", date);

    fetch("/category/blog/create", {
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
