// put all blog posts for the selected category in selectCategory dropdown
$("#selectCategory").change(function (e) {
  $("#selectCategory").html("");
  $("#selectCategory").removeAttr("disabled");
  $("#titleCategory").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  console.log("You need allBlogs to select a category from the dropdown!");
});

// see the content of the blog post when pressing the "Read More" button
$("#readMoreBtn").click(function (e) {
  fetch("/blog/:blogId", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({ selectCategory: titleBlog }),
  }).then(() => (window.location = "../../blog/:blogId"));
});

$("#editBlogBtn").click(function (e) {
  $("#editBlogForm").removeAttr("hidden");
});

// edit blog
$("#editBlogForm").submit(function (e) {
  e.preventDefault();
  let blogCategorySelected = $("#selectCategory option:selected").val();
  let title = $("#titleBlog").val();
  let snippet = $("#snippet").val();
  let content = $("#content").val();
  let date = new Date().toDateString().split(" ");

  let formData = new FormData();
 
  if (blogCategorySelected) {
    formData.append("categoryUpdated", blogCategorySelected);
  } else {
    blogCategorySelected = titleBlog;
  }
  

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

  if (blogCategorySelected || title || snippet || content || date) {
    fetch("/blog", {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#editFormResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#category").html(res.updateBlog.blogCategorySelected);
        categoryUpdated = res.updateBlog.category;
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

  fetch("/blog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({ selectCategory: titleBlog }),
  }).then(() => (window.location = "../../"));
});
