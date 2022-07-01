const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  Author: {
      type: String,
    },
  CreatedDate: {
      type: Date,
    },  
  category: {
    type: String,
  },
  Description: {
      type: String,
    }
});

const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
