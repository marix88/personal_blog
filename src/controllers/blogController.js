import mongoose from "mongoose";
import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

const forNavbar = async () => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  let categories = await Category.find({}, "_id title") 
    .sort({ _id: 1 })
    .exec()
    .then((docs) => { 
      return docs;
    });
    let idAllCategories = categories.map((item) => item._id);
    let titleAllCategories = categories.map((item) => item.title);
    return { idAllCategories, titleAllCategories };
};

// add to the database a new blog post from the "create" page form
export const blog_create_get = async (req, res, next) => {
  let categories = await Category.find({}, "_id title")
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

  let titleCategory = categories.map((item)=>(item.title));

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("index", {
    idAllCategories,
    titleAllCategories,
    titleAllCategories,
    titleCategory,
  });
};

// add (POST) a new blog post in the database using the data collected through the create page
export const blog_post = (req, res) => {

  let blog = new Blog({
    _id: new mongoose.Types.ObjectId(req.params.id),
    category: req.body.category,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });

  blog
    .save()
    .then((doc) => {
      console.log(doc);
      res.json({ doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// edit and existing blog post
export const blog_edit_patch = (req, res) => {
  let result = {};

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

// get edit blog post
export const blog_edit_get = async (req, res) => {
  let categories = Category.find({})
    .select("title")
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

  let titleCategory = categories.map((item) => item.title);

  let blogs = Blog.find({}, "category title")
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

  let categoryBlog = blogs.map((item) => item.category);
  let titleBlog = blogs.map((item) => item.title);

  let allBlogs = {};

  for (let i = 0; i<titleCategory.length; i++) {
    allBlogs[titleCategory[i]] = [];
    for (let j = 0; j<titleBlog.length; j++) {
      if (categoryBlog[j] == titleCategory[i]) {
        allBlogs[titleCategory[i]].push(titleBlog[j]);
      }
    }
  }

  console.log(allBlogs);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("edit-post", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    allBlogs: JSON.stringify(allBlogs),
  });

  /*const blog = new Blog({
    _id: new mongoose.Types.ObjectId(req.params.id),
    category: req.body.category,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });*/
};

// find a blog post by id
export const blog_post_get = async (req, res, next) => {
  let blog = Blog.findById(req.params._id)
    .exec()
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  let titleBlog = blog.title;
  let snippet = blog.snippet;
  let contentBlog = blog.content;
  let createdAt = blog.createdAt;


  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("blog", {
    idAllCategories,
    titleAllCategories,
    titleBlog,
    snippet,
    contentBlog,
    createdAt,
  });
};

// delete a blog post
export const blog_delete = (req, res) => {
  let blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};
