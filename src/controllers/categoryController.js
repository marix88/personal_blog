import Category from "../models/category.js";
import Blog from "../models/blogpost.js";

const forNavbar = async () => {
  // find all records in the categories collection, selecting the "_id" and "title" fields
  const categories = await Category.find({}, "id, titleCategory")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.titleCategory);
 
  console.log("id and title: ", idAllCategories, titleAllCategories);

  // extract idAllCategories, titleAllCategories from the database
  return { idAllCategories, titleAllCategories };
};


// add new category, method: GET. Render add-category.ejs page containing the form to add a new category.
export const getAddCategory = async (req, res) => {
  
  /* let categories = await Category.find({})
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
  */
  // extract titleCategory from the database
  // const titleCategory = categories.map((item)=>(item.titleCategory));
  // const titleCategory = categories.forEach((item) => item.titleCategory);
  // console.log("getAddCategory: titleCategory: ", titleCategory);

  //for navbar
  let allCategories = await forNavbar();
  let idAllCategories = allCategories.idAllCategories;
  let titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/add-category", {
    idAllCategories,
    titleAllCategories,
    // titleCategory,
  });

  console.log("getAddCategory res.render: ", {
    idAllCategories,
    titleAllCategories,
    // titleCategory,
  });
}

// add new category, method: POST. Send category page data to database.
export const postAddCategory = (req, res) => {
  // create an instance of the Category model
  let category = new Category({
    titleCategory: req.body.titleCategory,
    description: req.body.description,
  });
  console.log("titleCategory is: ", req.body.titleCategory);

  category
    .save()
    .then((item) => {
      console.log(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// show all the blogs in a category, method: get, page: 
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
  const idCategory = category.id;
  const titleCategory = category.titleCategory;
  const description = category.description;

  const blogs = await Blog.find(
    { categoryBlogPost: titleCategory },
    "_id categoryBlogPost title createdAt"
  )

    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      console.log("these are the docs: ", docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
  
  /*const idBlog = blogs._id;
  const titleBlog = blogs.title;
  const createdAt = blogs.createdAt;*/

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

/* display the edit-category.ejs page, method: get 
export const getEditCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log("categoryId: ", categoryId);
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

  // extract the values from the "category" collection in the datatabase
  const idCategory = category.id;
  const titleCategory = category.titleCategory;
  const description = category.description;
  // const titleCategory = category.map((item)=>(item.titleCategory));
  // const description = category.map((item) =>(item.description));

  // take the result from fornavbar function (ID and title for all categories)
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("pages/edit-category", {
    idAllCategories, 
    titleAllCategories,
    titleCategory,
    description,
    categoryId,
    idCategory,
  });
};*/


// edit category
export const patchEditCategory = async (req, res) => {
  let result = {};
  if (req.body.titleCategory) {
    const titleCategory = req.body.titleCategory;
    console.log(titleCategory);
    result.titleCategory = titleCategory;
  }
  if (req.body.description) {
    const description = req.body.description;
    console.log(description);
    result.description = description;
  } 
  console.log("the result is: ", result);
  let updatedCategory = await Category.findByIdAndUpdate(
    { _id },
    result,
    { new: true } // show the updated doc
  ) 
  .then ((updatedCategory) => res.json({ updatedCategory }))
  .catch ((error) => {
  console.log(error);
  res.status(500).json({ error });
  })
  console.log("The id is: ", console.log(req.params.id));
}


// delete category
export const deleteCategory = async (req, res) => {
  const deleteCategory = await Category.deleteOne({ title: req.body.category });
  console.log(deleteCategory);
  res.end();
};
