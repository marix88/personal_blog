import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

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
  const shortDescription = categories.map((item) => item.description);

  //for navbar
  // const allCategories = forNavbar();
  const idAllCategories = idCategory;
  const titleAllCategories = titleCategory;

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

  console.log(
    idAllCategories,
    titleAllCategories,
    idCategory,
    titleCategory,
    shortDescription,
    idBlog, "This was the blog _id",
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
  );

  res.render("index", {
    idAllCategories,
    titleAllCategories,
    idCategory,
    titleCategory,
    shortDescription,
    idBlog,
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
  });
};
