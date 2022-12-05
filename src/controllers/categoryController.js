import fs from "fs";
import mongoose from "mongoose";
import sharp from "sharp";
import path from "path";
import Category from "../models/category.js";
import Blog from "../models/blogpost.js";

export const forNavbar = async () => {
  const categories = await Category.find({}, "_id title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);

  return { idAllCategories, titleAllCategories };
};

// get category
export const getCategory = async (req, res, next) => {
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
  const imageCategory = category.img;

  const blogs = await Blog.find(
    { category: titleCategory },
    "_id title img date"
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
  const imageBlog = blogs.map((item) => item.img);
  const dateBlog = blogs.map((item) => item.date);

  //for navbar
  const allCategories = forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("category", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    shortDescription,
    imageCategory,
    idBlog,
    titleBlog,
    imageBlog,
    dateBlog,
  });
};

// add new category
export const postAddCategory = async (req, res, next) => {
  await sharp(req.file.path)
    .resize(480, 270)
    .toFile(path.resolve(req.file.destination, "images", req.file.filename));
  fs.unlinkSync(req.file.path);

  const category = await new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    img: req.file.filename,
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
  if (req.file) {
    await sharp(req.file.path)
      .resize(480, 270)
      .toFile(path.resolve(req.file.destination, "images", req.file.filename));
    fs.unlinkSync(req.file.path);
    result.img = req.file.filename;
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
