import mongoose from "mongoose";
import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

const forNavbar = async () => {
  const categories = await Category.find({}, "_id title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const titleAllCategories = categories.map((item) => item.title);

  return { titleAllCategories };
};

// add new blog post from the create page using the form
export const blog_create_get = (req, res, next) => {
  const categories = Category.find({}, "title")
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

  const titleCategory = categories.map((item) => item.title);

  //for navbar
  const allCategories = forNavbar();
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("create", {
    titleAllCategories,
    titleCategory,
  });
};

// add (POST) a new blog post in the database using the data collected through the create page
export const blog_post_add = (req, res, next) => {

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    snippet: req.file.snippet,
    content: req.body.content,
    createdAt: req.body.date,
    updatedAt: req.body.date,
  });

  blog
    .save()
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// edit and existing blog post
export const blog_edit_patch = (req, res) => {
  let result = {};

  result.date = req.body.date;
  if (req.body.title) {
    const title = req.body.title;
    console.log(title);
    result.title = title;
  }
  if (req.body.content) {
    const content = req.body.content;
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

// get edit blog post
export const blog_edit_get = (req, res, next) => {
  const categories = Category.find({}, "title")
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

  const titleCategory = categories.map((item) => item.title);

  const blogs = Blog.find({}, "category title")
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

  const categoryBlog = blogs.map((item) => item.category);
  const titleBlog = blogs.map((item) => item.title);

  const allBlogs = {};

  for (let i = 0; i < titleCategory.length; i++) {
    allBlogs[titleCategory[i]] = [];
    for (let j = 0; j < titleBlog.length; j++) {
      if (categoryBlog[j] == titleCategory[i]) {
        allBlogs[titleCategory[i]].push(titleBlog[j]);
      }
    }
  }

  console.log(allBlogs);

  //for navbar
  const allCategories = forNavbar();
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("edit-post", {
    titleAllCategories,
    titleCategory,
    allBlogs: JSON.stringify(allBlogs),
  });

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  });
};

// find a blog post by id
export const blog_post_get = (req, res, next) => {
  const blog = Blog.findById(req.params._id)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  const titleBlog = blog.title;
  const snippet = blog.snippet;
  const contentBlog = blog.content;
  const createdAt = blog.createdAt;
  const updatedAt = blog.updatedAt;

  //for navbar
  const allCategories = forNavbar();
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("blog", {
    titleAllCategories,
    titleBlog,
    snippet,
    contentBlog,
    createdAt,
    updatedAt,
  });
};

// delete a blog post
export const blog_delete = (req, res) => {
  const blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};
