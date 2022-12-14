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

    console.log("idAllCategories, titleAllCategories: ", idAllCategories, titleAllCategories)

    // extract idAllCategories, titleAllCategories from the database
    return { idAllCategories, titleAllCategories };
};

// add to the database a new blog post from the "create" page form
export const blog_get = async (req, res, next) => {
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
  
  // extract idCategory, titleCategory and description from the database
  let idCategory = categories.map((item)=>(item._id));
  let titleCategory = categories.map((item)=>(item.title));
  let description = categories.map((item)=>(item.description));
  console.log("blog_get: idCategory: ", idCategory);
  console.log("blog_get: titleCategory: ", titleCategory);
  console.log("blog_get: description: ", description);

  let blogs = await Blog.find({})
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
  
  // extract values from the database
  const idBlog = blogs.map((item) => item._id);
  const categoryBlog = blogs.map((item) => item.category);
  const titleBlog = blogs.map((item) => item.title);
  const snippet = blogs.map((item) => item.snippet);
  const content = blogs.map((item) => item.content);
  const createdAt = blogs.map((item) => item.createdAt);
  console.log("blog_get: : idBlog", idBlog);
  console.log("blog_get: categoryBlog", categoryBlog);
  console.log("blog_get: titleBlog", titleBlog);
  console.log("blog_get: snippet", snippet);
  console.log("blog_get: content", content);
  console.log("blog_get: createdAt", createdAt);

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
    idCategory,
    titleCategory,
    description,
    idBlog,
    categoryBlog,
    titleBlog,
    snippet,
    content, 
    createdAt,
  });

  console.log("blog_get res.render: ", {
    idAllCategories,
    titleAllCategories,
    titleAllCategories,
    idCategory,
    titleCategory,
    description,
    idBlog,
    categoryBlog,
    titleBlog,
    snippet,
    content, 
    createdAt,
  });
};

// add (POST) a new blog post in the database using the data collected through the create page
export const blog_post = (req, res, next) => {

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId,
    category: req.body.category,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });

  console.log("blog post: req.body.id", req.body._id);
  console.log("blog_post: req.body.category: ", req.body.category);
  console.log("blog_post: req.body.title: ", req.body.title);
  console.log("blog_post: req.body.snippet: ", req.body.snippet);
  console.log("blog_post: req.body.content: ", req.body.content);
  console.log("blog_post: req.body.date: ", req.body.date);

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

  if(req.body.category) {
    let category = req.body.category;
    console.log(category);
    result.category = category;
  }

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
    category: req.body.category,
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    createdAt: req.body.date,
  });*/
};

// find a blog post by id
export const blog_post_get = async (req, res) => {
  let blog = await Blog.findById(req.params._id)
    .exec()
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  const titleBlog = blog.title;
  const snippet = blog.snippet;
  const contentBlog = blog.content;
  const createdAt = blog.createdAt;

  console.log("blog_post_get: titleBlog: ", titleBlog,
  "blog_post_get: snippet: ", snippet,
  "blog_post_get: contentBlog: ", contentBlog,
  "blog_post_get: createdAt: ", createdAt,
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
  });

  console.log(
    "blog_post_get: render: idAllCategories: ", {idAllCategories},
    "blog_post_get: render: titleAllCategories: ", {titleAllCategories},
    "blog_post_get: render: titleBlog: ", {titleBlog},
    "blog_post_get: render: snippet: ", {snippet},
    "blog_post_get: render: contentBlog: ", {contentBlog},
    "blog_post_get: render: createdAt: ", {createdAt},
  )
};


// delete a blog post
export const blog_delete = (req, res) => {
  let blog_delete = Blog.deleteOne({ title: req.body.blog });
  console.log(blog_delete);
  res(end);
};
