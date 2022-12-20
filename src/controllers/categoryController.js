import mongoose from "mongoose";
import Category from "../models/category.js";
import Blog from "../models/blogpost.js";

const forNavbar = async () => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  const categories = await Category.find({}, "_id, title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);
 
  console.log("id and title forNavbar categoryController: ", idAllCategories, titleAllCategories);

  // extract idAllCategories, titleAllCategories from the database
  return { idAllCategories, titleAllCategories };
};


// add new category, method: GET. Render add-category.ejs page.
export const getAddCategory = async (req, res, next) => {
  
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
  console.log("getAddCategory: titleCategory: ", titleCategory);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/add-category", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });

  console.log("getAddCategory res.render: ", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });
}
// add new category, method: POST. Send category page data to database.
export const postAddCategory = (req, res) => {

  const category = new Category({
    _id: new mongoose.Types.ObjectId,
    title: req.body.titleCategory,
    description: req.body.description,
  });

  category
    .save()
    .then((doc) => {
      res.json({ doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// show all the blogs in a category, method: get 
export const getCategory = async (req, res) => {
  const {categoryId} = req.params;
  console.log(categoryId);
  const category = await Category.findById(categoryId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  // take the values from the "categories" collection in the datatabase
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
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const idBlog = blogs.map((item) => item._id);
  const titleBlog = blogs.map((item) => item.title);
  const createdAt = blogs.map((item) => item.createdAt);

  // take the result from fornavbar function (ID and title for all categories)
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  console.log(
    "getCategory: idAllCategories: ", idAllCategories, 
    "getCategory: titleAllCategories: ", titleAllCategories,
    "getCategory: idCategory: ", idCategory,
    "getCategory: idCategory: ", idCategory,
    "getCategory: titleCategory: ", titleCategory,
    "getCategory: description: ", description,
    "getCategory: idBlog: ", idBlog,
    "getCategory: titleBlog: ", titleBlog,
    "getCategory: createdAt: ", createdAt,
  ); 

  res.render("pages/category", {
    idAllCategories, 
    titleAllCategories,
    idCategory,
    titleCategory,
    description,
    idBlog,
    titleBlog,
    createdAt,
  });
};

// edit category
export const patchEditCategory = async (req, res) => {
  let result = {};

  if (req.body.titleCategory) {
    const title = req.body.titleCategory;
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
