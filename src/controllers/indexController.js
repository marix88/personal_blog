import Blog from "../models/blogpost.js";
import Category from "../models/category.js";

export const getHomePage = async (req, res) => {
  const categories = await Category.find({})
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

  const titleCategory = categories.title;
  const shortDescription = categories.description;
  const limitNumber = 3;
  const latest = await Blog.find({}).sort({_id: -1}).limit(limitNumber);
  const fish = await Blog.find({ "category": "fish" }).limit(limitNumber);
  const boats = await Blog.find({ "category": "boats" }).limit(limitNumber);
  const city = await Blog.find({ "category": "city" }).limit(limitNumber);

  const galati = { latest, fish, boats, city }

  //for navbar
  // const titleAllCategories = titleCategory;

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

  console.log(
    titleCategory,
    shortDescription,
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
  );

  res.render("index", {
    // titleAllCategories,
    titleCategory,
    shortDescription,
    categoryBlog,
    titleBlog,
    snippet,
    content,
    createdAt,
  });
};
