// put all blog posts for the selected category in selectBlog
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

// see the content of the blog post when pressing the "Read More" button
$("#readMoreBtn").click(function (e) {
  const title = $("#title").val();
  const snippet = $("#snippet").val();
  const content = $("#content").val();
});

$("#editBlogBtn").click(function (e) {
  $("form").removeAttr("hidden");
});

// edit blog
$("#editBlogForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  let blogSelected = $("#selectBlog option:selected").val();
  if (!blogSelected) {
    blogSelected = titleBlog;
  }
  const title = $("#title").val();
  const snippet = $("#snippet").val();
  const content = $("#content").val();
  let date = new Date().toDateString().split(" ");

  let formData = new FormData();

  formData.append("categorySelected", blogSelected);
  formData.append("date", date);

  if (title) {
    formData.append("titleBlog", title);
  }
  if (snippet) {
    formData.append("snippet", snippet);
  }

  if (content) {
    formData.append("content", content);
  }

  if (title || snippet || content) {
    fetch("/edit-blog", {
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
        $("#snippet").html(res.updateBlog.snippet);
        snippet = res.updateBlog.snippet;
        $("#content").html(res.updateBlog.content);
        content = res.updateBlog.content;
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

  fetch("blog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blogSelected: titleBlog }),
  }).then(() => (window.location = "../../"));
});
