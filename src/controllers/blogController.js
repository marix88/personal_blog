import fs from "fs";
import path from "path";
import sharp from "sharp";
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

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);

  return { idAllCategories, titleAllCategories };
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
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("create", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });
};

// add (POST) a new blog post in the database using the data collected through the create page
export const blog_post_add = (req, res, next) => {
  sharp(req.file.path)
    .resize(480, 270)
    .toFile(path.resolve(req.file.destination, "images", req.file.filename));
  fs.unlinkSync(req.file.path);

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    snippet: req.file.snippet,
    content: req.body.content,
    image: req.file.filename,
    date: req.body.date,
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
  if (req.file) {
    sharp(req.file.path)
      .resize(480, 270)
      .toFile(path.resolve(req.file.destination, "images", req.file.filename));
    fs.unlinkSync(req.file.path);
    result.img = req.file.filename;
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
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("edit-post", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    allBlogs: JSON.stringify(allBlogs),
  });

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    content: req.body.content,
    img: req.file.filename,
    date: req.body.date,
  });
};

// find a blog post by id
export const blog_post_get = (req, res, next) => {
  const blog = Blog.findById(req.params.blogId)
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
  const contentBlog = blog.content;
  const imageBlog = blog.img;
  const dateBlog = blog.date;

  //for navbar
  const allCategories = forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("blog", {
    idAllCategories,
    titleAllCategories,
    titleBlog,
    contentBlog,
    imageBlog,
    dateBlog,
  });
};

// delete a blog post
export const blog_delete = (req, res) => {
  const blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};
