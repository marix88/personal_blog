import mongoose from "mongoose";
import Category from "../models/category.js";
import Blog from "../models/blogpost.js";

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

// show category page to add a new category, method: get 
export const getCategory = async (req, res) => {
  const category = await Category.find({}, "id title description")
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  const idCategory = category._id;
  const titleCategory = category.title;
  const description = category.description;

  const blogs = await Blog.find(
    { category: titleCategory },
    "_id title"
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

  // take the result from fornavbar function (ID and title for all categories)
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  console.log(
    "idAllCategories: ", idAllCategories, 
    "titleAllCategories: ", titleAllCategories,
    "idCategory: ", idCategory,
    "titleCategory: ", titleCategory,
    "description: ", description,
    "idBlog: ", idBlog,
    "titleBlog", titleBlog,
  );
  res.render("pages/category", {
    idAllCategories, 
    titleAllCategories,
    idCategory,
    titleCategory,
    description,
    idBlog,
    titleBlog,
  });
};

// add new category, method: POST. Send category page data to database.
export const postAddCategory = (req, res) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(req.params.id),
    title: req.body.title,
    description: req.body.description,
  });

  category
    .save()
    .then((doc) => {
      console.log(doc);
      res.json({ doc });
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
