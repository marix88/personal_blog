import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

export const getHomePage = async (req, res, next) => {
  const categories = await Category.find()
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
  const shortDescription = categories.map((item) => item.description);

  //for navbar
  const titleAllCategories = titleCategory;

  const blogs = await Blog.find()
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

  //const idBlog = blogs.map((item) => item._id);
  const categoryBlog = blogs.map((item) => item.category);
  const titleBlog = blogs.map((item) => item.title);
  const snippet = blogs.map((item) => item.snippet);
  const content = blogs.map((item) => item.content);
  const createdAt = blogs.map((item) => item.createdAt);
  const updatedAt = blogs.map((item) => item.updatedAt);

  console.log(
    titleAllCategories,
    titleCategory,
    shortDescription,
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
    updatedAt
  );

  res.render("index", {
    titleAllCategories,
    titleCategory,
    shortDescription,
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
    updatedAt,
  });
};
