import Blog from "../models/blogpost.js";
import Category from "../models/category.js";


const forNavbar = async () => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  const categories = await Category.find({}, "id, title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);
 
  console.log("id and title: ",idAllCategories, titleAllCategories);

  // extract idAllCategories, titleAllCategories from the database
  return { idAllCategories, titleAllCategories };
};

export const getHomePage = async (req, res, next) => {
  const categories = await Category.find() // get a list of all categories in the "categories" collection
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

  const idCategory = categories.map((item) => item._id);
  const titleCategory = categories.map((item) => item.title);
  const description = categories.map((item) => item.description);
  console.log("getHomePage: idCategory", idCategory);
  console.log("getHomePage: titleCategory", titleCategory);
  console.log("getHomePage: description", description);

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  const blogs = await Blog.find({})
    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const idBlog = blogs.map((item) => item._id);
  const categoryBlog = blogs.map((item) => item.category);
  const titleBlog = blogs.map((item) => item.title);
  const snippet = blogs.map((item) => item.snippet);
  const content = blogs.map((item) => item.content);
  const createdAt = blogs.map((item) => item.createdAt);

  res.render("pages/index", {
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

  console.log("getHomePage: res.render: idAllCategories: ", idAllCategories);
  console.log("getHomePage: res.render: titleAllCategories: ", titleAllCategories);
  console.log("getHomePage: res.render: idCategory: ", idCategory);
  console.log("getHomePage: res.render: titleCategory", titleCategory);
  console.log("getHomePage: res.render: description: ", description);
  console.log("getHomePage: res.render: idBlog: ", idBlog);
  console.log("getHomePage: res.render: categoryBlog: ", categoryBlog);
  console.log("getHomePage: res.render: titleBlog: ", titleBlog);
  console.log("getHomePage: res.render: snippet: ", snippet);
  console.log("getHomePage: res.render: content: ", content);
  console.log("getHomePage: res.render: createdAt", createdAt);
};
