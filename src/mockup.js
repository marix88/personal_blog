import mongoose from "mongoose";
import Blog from "./models/blogpost.js";
import Category from "./models/category.js";
const defaultCategories = ["fish", "boats", "Galati"];
const defaultBlogTitles = [
  "Fish 1",
  "Fish 2",
  "Fish 3",
  "Galati 1",
  "Galati 2",
  "Galati 3",
  "Boat 1",
  "Boat 2",
  "Boat 3",
];

const defaultImages = [
  "fish1.jpg",
  "fish2.jpg",
  "fish3.jpg",
  "galati1.jpg",
  "galati2.jpg",
  "galati3.jpg",
  "boat1.jpg",
  "boat2.jpg",
  "boat3.jpg",
];

const defaultDates = [
  "03 Nov 2022",
  "02 Nov 2022",
  "13 Nov 2022",
  "08 Nov 2022",
  "10 Nov 2022",
  "07 Nov 2022",
  "04 Nov 2022",
  "05 Nov 2022",
  "02 Nov 2022",
];

const defaultDescriptionCategories =
  "The main categories contain strange fish, interesting boats and art in the city of Galati, Romania.";
const defaultSnippetBlogs = "This is a snippet for the blog post...";
const defaultContentBlogs = "Beautiful animals, boats and places in Galati";

export let categoryCounter = () => {
  for (let i = 0; i < 3; i++) {
    Category.countDocuments(
      { title: defaultCategories[i] },
      function (err, count) {
        if (count < 1) {
          const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title: defaultCategories[i],
            description: defaultDescriptionCategories,
            img: defaultImages[i * 3],
          });

          category
            .save()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        let blogCounter = () => {
          for (let j = 0; j < 3; j++) {
            Blog.countDocuments(
              { title: defaultBlogPosts[i * 3 + j] },
              function (err, count) {
                if (count < 1) {
                  const blog = new Blog({
                    _id: new mongoose.Types.ObjectId(),
                    category: defaultCategories[i],
                    title: defaultBlogTitles[i * 3 + j],
                    snippet: defaultSnippetBlogs[i * 3 + j],
                    content: defaultContentBlogs[i * 3 + j],
                    img: defaultImages[i * 3 + j],
                    date: defaultDates[i * 3 + j],
                  });

                  blog
                    .save()
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            );
          }
        };
      }
    );
  }
};
