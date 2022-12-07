// put all places for the selected category in selectPlace
$("#selectCategory").change(function (e) {
  $("#selectBlog").html("");
  $("#selectBlog").removeAttr("disabled");
  $("#titleCategory").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  for (const key in allBlogs) {
    if (this.value == key) {
      allBlogs[key].map((item) => {
        $("#selectBlog").append(`<option value="${item}">${item}</option>`);
      });
    }
  }
});

$("#editBlogBtn").click(function (e) {
  $("form").removeAttr("hidden");
});

// edit blog
$("#editBlogForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  let blog = $("#selectBlog option:selected").val();
  if (!blog) {
    blog = titleBlog;
  }
  const title = $("#titleCategory").val();
  const description = $("#description").val();

  let date = new Date().toDateString().split(" ");
  date = `Edited: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();

  formData.append("blog", blog);
  formData.append("date", date);

  if (title) {
    formData.append("titleCategory", title);
  }
  if (description) {
    formData.append("description", description);
  }

  if (title || description) {
    fetch("/category/blog/edit-blog", {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#formResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titleBlog").html(res.updateBlog.title);
        titleBlog = res.updateBlog.title;
        $("#descriptionBlog").html(res.updateBlog.description);
        $("#dateBlog").html(res.updateBlog.date);
        console.log(res.updateBlog);
      })
      .catch((err) => {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      });
  } else {
    $("#formResponse").append(
      '<div class="error-block">All fields are empty</div>'
    );
  }
});

// delete blog post
$("#deleteBlogBtn").click(function (e) {
  e.preventDefault();

  fetch("/category/blog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blog: titleBlog }),
  }).then(() => (window.location = "../../"));
});
