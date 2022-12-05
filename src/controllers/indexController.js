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

  const idCategory = categories.map((item) => item._id);
  const titleCategory = categories.map((item) => item.title);
  const shortDescription = categories.map((item) => item.description);
  const imageCategory = categories.map((item) => item.img);

  //for navbar
  const idAllCategories = idCategory;
  const titleAllCategories = titleCategory;

  const blogs = await Blog.find({}, "id category title date")
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
  const dateBlog = blogs.map((item) => item.date);

  const countBlogs = titleCategory.map((item) => {
    let count = 0;
    for (let i = 0; i < categoryBlog.length; i++) {
      if (item === categoryBlog[i]) {
        count++;
      }
    }
    return count;
  });

  res.render("index", {
    idAllCategories,
    titleAllCategories,
    idCategory,
    titleCategory,
    shortDescription,
    imageCategory,
    countBlogs,
    idBlog,
    titleBlog,
    dateBlog,
  });
};
