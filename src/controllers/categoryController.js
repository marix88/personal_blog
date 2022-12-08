import mongoose from "mongoose";
import Category from "../models/category.js";
import Blog from "../models/blogpost.js";

export const forNavbar = async () => {
  const categories = await Category.find({})
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const titleAllCategories = categories.map((item) => item.title);

  return { titleAllCategories };
};

// get category
export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  const titleCategory = category.title;
  const shortDescription = category.description;

  const blogs = await Blog.find(
    { category: titleCategory },
    "_id"
  )

    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  const idBlog = blogs.map((item) => item._id);
  const titleBlog = blogs.map((item) => item.title);
  const createdAt = blogs.map((item) => item.createdAt);

  //for navbar
  const allCategories = forNavbar();
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("category", {
    titleAllCategories,
    titleCategory,
    shortDescription,
    idBlog,
    titleBlog,
    createdAt,
  });
};

// add new category
export const postAddCategory = (req, res) => {

  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });

  category
    .save()
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err });
    });
};

// edit category
export const patchEditCategory = async (req, res) => {
  let result = {};

  if (req.body.title) {
    const title = req.body.title;
    console.log(title);
    result.title = title;
  }
  if (req.body.description) {
    const description = req.body.description;
    console.log(description);
    result.description = description;
  }

  let updateCategory = await Category.findOneAndUpdate(
    { title: req.body.category },
    result,
    { new: true }
  );
  console.log(updateCategory);

  res.json({ updateCategory });
};

// delete category
export const deleteCategory = async (req, res) => {
  const deleteCategory = await Category.deleteOne({ title: req.body.category });
  console.log(deleteCategory);

  res.end();
};
