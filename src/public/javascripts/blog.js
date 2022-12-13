let title = $("#titleBlog").val();
let snippet = $("#snippet").val();
let content = $("#content").val();
let date = new Date().toDateString().split(" ");

// put all blog posts for the selected category in selectCategory dropdown
$("#selectCategory").change(function (e) {
  $("#selectCategory").html("");
  $("#selectCategory").removeAttr("disabled");
  $("#titleCategory").removeAttr("disabled");
  $("#descriptionCategory").removeAttr("disabled");
  for (const key in allBlogs) {
    if (this.value == key) {
      allBlogs[key].map((item) => {
        $("#selectCategory").append(`<option value="${item}">${item}</option>`);
      });
    }
  }
});

// see the content of the blog post when pressing the "Read More" button
$("#readMoreBtn").click(function (e) {
  res.render("blog", {title,
  snippet,
  content,
  date, })
});

$("#editBlogBtn").click(function (e) {
  $("#editBlogForm").removeAttr("hidden");
});

// edit blog
$("#editBlogForm").submit(function (e) {
  e.preventDefault();

  let blogCategorySelected = $("#selectCategory option:selected").val();
  if (!blogCategorySelected) {
    blogCategorySelected = titleBlog;
  }

  let formData = new FormData();

  formData.append("categoryUpdated", blogCategorySelected);
  formData.append("createdAtEdit", date);

  if (title) {
    formData.append("titleBlog", title);
  }
  if (snippet) {
    formData.append("snippet", snippet);
  }

  if (content) {
    formData.append("content", content);
  }

  if (date) {
    formData.append("createdAtEdit", date);
  }

  if (title || snippet || content || date) {
    fetch("/blog", {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#editFormResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titleBlog").html(res.updateBlog.title);
        titleBlog = res.updateBlog.title;
        $("#snippet").html(res.updateBlog.snippet);
        snippet = res.updateBlog.snippet;
        $("#content").html(res.updateBlog.content);
        content = res.updateBlog.content;
        $("#createdAtEdit").html(res.updateBlog.date);
        console.log(res.updateBlog);
      })
      .catch((err) => {
        console.error(err);
        $("#editFormResponse").append('<div class="error-block">Error</div>');
      });
  } else {
    $("#editFormResponse").append(
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
    //body: JSON.stringify({ selectCategory: titleBlog }),
  }).then(() => (window.location = "../../"));
});
