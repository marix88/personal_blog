import mongoose from "mongoose";
import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

const forNavbar = async() => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  let categories = await Category.find({}, "_id title") 
    .sort({ _id: 1 })
    .exec()
    .then((docs) => { 
      return docs;
    });
    let idAllCategories = categories.map((item) => item._id);
    let titleAllCategories = categories.map((item) => item.title);

    console.log("idAllCategories, titleAllCategories: ", idAllCategories, titleAllCategories)

    // extract idAllCategories, titleAllCategories from the database
    return { idAllCategories, titleAllCategories };
};

// show the "create" page and select the category for the new blog post
export const blog_add_get = async (req, res, next) => {
  let categories = await Category.find({}, "title")
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
  const titleCategory = categories.map((item)=>(item.title));
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

// get edit blog post
export const blog_edit_get = async (req, res) => {
  let categories = Category.find({}, "title")
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
  console.log("blog_edit_get: title category: ", titleCategory)

  let blogs = Blog.find({}, "categoryBlogPost title")
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

  let categoryBlog = blogs.map((item) => item.categoryBlogPost);
  let titleBlog = blogs.map((item) => item.title);
  console.log("blog_edit_get: categoryBlog: ", categoryBlog);
  console.log("blog_edit_get: title blog: ", titleBlog);

  let allBlogs = {};
  console.log("blog_edit_get: allBlogs: ", allBlogs);

  for (let i = 0; i<titleCategory.length; i++) {
    allBlogs[titleCategory[i]] = [];
    for (let j = 0; j<titleBlog.length; j++) {
      if (categoryBlog[j] == titleCategory[i]) {
        allBlogs[titleCategory[i]].push(titleBlog[j]);
      }
    }
  }

  console.log("blog_edit_get: allBlogs after for: ", allBlogs);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/blog", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    titleBlog,
    allBlogs: JSON.stringify(allBlogs),
  });

  console.log("blog_edit_get: res.render: ",
    {
      idAllCategories,
      titleAllCategories,
      titleCategory,
      titleBlog,
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

// find a blog post by id and display it on the "blog" page
export const blog_get = async (req, res) => {
  const {blogId} = req.params;
  console.log(blogId);
  let blog = Blog.findById(req.params.blogId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  // extract the values from the database
  const titleBlog = blog.title;
  const snippet = blog.snippet;
  const contentBlog = blog.content;
  const createdAt = blog.createdAt;
  const categoryBlog = blog.categoryBlogPost;

  console.log("blog_post_get: titleBlog: ", titleBlog,
  "blog_post_get: snippet: ", snippet,
  "blog_post_get: contentBlog: ", contentBlog,
  "blog_post_get: createdAt: ", createdAt,
  "blog_post_get: categoryBlog ", categoryBlog,
    )


  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/blog", {
    idAllCategories,
    titleAllCategories,
    titleBlog,
    snippet,
    contentBlog,
    createdAt,
    categoryBlog,
  });

  console.log(
    "blog_post_get: render: idAllCategories: ", {idAllCategories},
    "blog_post_get: render: titleAllCategories: ", {titleAllCategories},
    "blog_post_get: render: titleBlog: ", {titleBlog},
    "blog_post_get: render: snippet: ", {snippet},
    "blog_post_get: render: contentBlog: ", {contentBlog},
    "blog_post_get: render: createdAt: ", {createdAt},
    "blog_post_get: render: categoryBlog: ", {categoryBlog},
  )
};


// delete a blog post
export const blog_delete = (req, res) => {
  let blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};

// method: POST. Insert the formData into the database
export const blog_post = (req, res, next) => {

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    categoryBlogPost: req.body.selectCategory,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });

  console.log("blog post: req.body.id", _id);
  console.log("blog_post: req.body.categoryBlogPost: ", categoryBlogPost);
  console.log("blog_post: req.body.title: ", title);
  console.log("blog_post: req.body.snippet: ", snippet);
  console.log("blog_post: req.body.content: ", content);
  console.log("blog_post: req.body.date: ", createdAt);

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
    next();
};

