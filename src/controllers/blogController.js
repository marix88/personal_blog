import mongoose from "mongoose";
import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

const forNavbar = async () => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  const categories = await Category.find({}, "id, titleCategory")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.titleCategory);
 
  console.log("id and title: ",idAllCategories, titleAllCategories);

  // extract idAllCategories, titleAllCategories from the database
  return { idAllCategories, titleAllCategories };
};

// show the "create" page and select the category for the new blog post
export const blog_add_get = async (req, res) => {
  let categories = await Category.find({})
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
  
  // extract titleCategory from the database
  const titleCategory = categories.map((item)=>(item.titleCategory));
  console.log("blog_add_get: titleCategory: ", titleCategory);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/create", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });

  console.log("blog_add_get res.render: ", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });
};

// method: POST. Insert the formData into the database
export const blog_post = (req, res) => {

  const blog = new Blog({
    categoryBlogPost: req.body.selectedCategory,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });

  /* console.log("blog_post: req.body.categoryBlogPost: ", categoryBlogPost);
  console.log("blog_post: req.body.title: ", title);
  console.log("blog_post: req.body.snippet: ", snippet);
  console.log("blog_post: req.body.content: ", content);
  console.log("blog_post: req.body.date: ", createdAt); */

  blog
    .save()
    .then((item) => {
      console.log(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// find a blog post by id and display it on the "blogpost" page
export const blog_get = async (req, res) => {
  const { blogId } = req.params;
  console.log("blogId: ", blogId);
  const blog = await Blog.findById(blogId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  
  /*const idBlog = blog.map((item) => item._id);
  const categoryBlog = blog.map((item) => item.categoryBlogPost);
  const titleBlog = blog.map((item) => item.title);
  const snippet = blog.map((item) => item.snippet);
  const contentBlog = blog.map((item) => item.content);
  const createdAt = blog.map((item) => item.createdAt);*/

  // extract the values from the database
  const idBlog = blog._id;
  const titleBlog = blog.title;
  const snippet = blog.snippet;
  const contentBlog = blog.content;
  const createdAt = blog.createdAt;
  const categoryBlog = blog.categoryBlogPost;

  console.log("blog_get: blogId: ", blogId,
  "blog_get: categoryBlog: ", categoryBlog,
  "blog_get: titleBlog: ", titleBlog,
  "blog_get: snippet: ", snippet,
  "blog_get: contentBlog: ", contentBlog,
  "blog_get: createdAt: ", createdAt,
  "blog_get: categoryBlog ", categoryBlog,
    )


  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/blogpost", {
    allCategories,
    idAllCategories,
    titleAllCategories,
    blogId,
    idBlog,
    categoryBlog,
    titleBlog,
    snippet,
    contentBlog,
    createdAt,
  });

  console.log(
    "blog_get: render: idAllCategories: ", {idAllCategories},
    "blog_get: render: titleAllCategories: ", {titleAllCategories},
    "blog_get: render: blogId: ", {blogId},
    "blog_get: render: titleBlog: ", {titleBlog},
    "blog_get: render: snippet: ", {snippet},
    "blog_get: render: contentBlog: ", {contentBlog},
    "blog_get: render: createdAt: ", {createdAt},
    "blog_get: render: categoryBlog: ", {categoryBlog},
  )
};

// get edit blog post
export const blog_edit_get = async (req, res) => {
  const categories = await Category.find({}, "titleCategory")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titleCategory = categories.map((item) => item.titleCategory);
  console.log("blog_edit_get: title category: ", titleCategory)

  let blogs = await Blog.find({}, "categoryBlogPost title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
  
  // const categoryBlog = blogs.categoryBlogPost;
  const titleBlog = blogs.title;
  let categoryBlog = blogs.map((item) => item.categoryBlogPost);
  // titleBlog = blogs.map((item) => item.title);
  let createdAt = blogs.map((item) => item.createdAt);
  let snippet = blogs.map((item) => item.snippet);
  let contentBlog = blogs.map((item) => item.content);
  console.log("blog_edit_get: categoryBlog: ", categoryBlog);
  console.log("blog_edit_get: title blog: ", titleBlog);

  let allBlogs = {};
  console.log("blog_edit_get: allBlogs: ", allBlogs);

  /* for (let i = 0; i<categoryBlog.length; i++) {
    allBlogs[categoryBlog[i]] = [];
    for (let j = 0; j<titleBlog.length; j++) {
      if (categoryBlog[j] == categoryBlog[i]) {
        allBlogs[categoryBlog[i]].push(titleBlog[j]);
      }
    }
  }*/

  console.log("blog_edit_get: allBlogs after for: ", allBlogs);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/blogpost", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    titleBlog,
    categoryBlog,
    createdAt,
    snippet,
    contentBlog,
    allBlogs: JSON.stringify(allBlogs),
  });

  console.log("blog_edit_get: res.render: ",
    {
      idAllCategories,
      titleAllCategories,
      titleCategory,
      titleBlog,
      createdAt,
      allBlogs: JSON.stringify(allBlogs),
    }
  )

  /*const blog = new Blog({
    _id: new mongoose.Types.ObjectId(req.params.id),
    categoryBlogPost: req.body.categoryBlogPost,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });*/
};

// edit and existing blog post
export const blog_edit_patch = (req, res) => {

  let result = {};
  result.createdAt = req.body.createdAt;

  /*if(req.body.categoryBlogPost) {
    let category = req.body.categoryBlogPost;
    console.log(category);
    result.categoryBlogPost = category;
  }*/

  if (req.body.title) {
    let title = req.body.title;
    console.log(title);
    result.title = title;
  }
  if (req.body.content) {
    let content = req.body.content;
    console.log(content);
    result.content = content;
  }

  console.log(req.body.blog);
  let updateBlog = Blog.findOneAndUpdate({ title: req.body.blog }, result, {
    new: true,
  });
  console.log(updateBlog);

  res.json({ updateBlog });
};

// find all blog posts and display them on /blogs page
export const blogs_get = async (req, res) => {
  const blogs = await Blog.find({})
  .sort({ _id: 1 })
  .exec()
  .then((docs) => {
      console.log(docs);
      return docs;
    })
  .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

const idBlog = blogs.map((item) => item._id);
const categoryBlog = blogs.map((item) => item.categoryBlogPost);
const titleBlog = blogs.map((item) => item.title);
const snippet = blogs.map((item) => item.snippet);
const contentBlog = blogs.map((item) => item.content);
const createdAt = blogs.map((item) => item.createdAt);

  // extract the values from the database
  /*const idBlog = blog._id;
  const titleBlog = blog.title;
  const snippet = blog.snippet;
  const contentBlog = blog.content;
  const createdAt = blog.createdAt;
  const categoryBlog = blog.categoryBlogPost;*/

  console.log( "blog_get: idBlog: ", idBlog,
  "blog_get: categoryBlog: ", categoryBlog,
  "blog_get: titleBlog: ", titleBlog,
  "blog_get: snippet: ", snippet,
  "blog_get: contentBlog: ", contentBlog,
  "blog_get: createdAt: ", createdAt,
  "blog_get: categoryBlog ", categoryBlog,
    )

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/blog", {
    blogs,
    idAllCategories,
    titleAllCategories,
    idBlog,
    categoryBlog,
    titleBlog,
    snippet,
    contentBlog,
    createdAt,
  });

  console.log(
    "blog_get: render: idAllCategories: ", {idAllCategories},
    "blog_get: render: titleAllCategories: ", {titleAllCategories},
    "blog_get: render: titleAllCategories: ", {idBlog},
    "blog_get: render: titleBlog: ", {titleBlog},
    "blog_get: render: snippet: ", {snippet},
    "blog_get: render: contentBlog: ", {contentBlog},
    "blog_get: render: createdAt: ", {createdAt},
    "blog_get: render: categoryBlog: ", {categoryBlog},
  );
}

// delete a blog post
export const blog_delete = (req, res) => {
  let blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};


