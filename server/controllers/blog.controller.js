import blogModel from "../models/blog.model.js";
import userModel from "../models/user.model.js";

const createBlog = async (req, res) => {
  try {
    const { title, description, content, image, video, commentSection } =
      req.body;

    if (!(title && content)) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const creator = await userModel.findById(req.user.id);

    if (!creator) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const { password, createdAt, updatedAt, ...rest } = creator._doc;

    const blog = await blogModel.create({
      user: creator.id,
      userInfo: { ...rest },
      title,
      description,
      content,
      image,
      video,
      commentSection,
    });

    return res.status(201).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const { title, description, content, image, video, commentSection } =
      req.body;

    if (!(title && content)) {
      return res
        .status(400)
        .json({ message: "Title and content must be provided" });
    }

    if (!blogId) {
      return res
        .status(400)
        .json({ message: "Parameter blogId must be provided" });
    }

    const blog = await blogModel.findOne({
      user: req.user.id,
      _id: blogId,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ message: "No blog data found. Check your id again" });
    }

    blog.title = title;
    blog.description = description;
    blog.content = content;
    // blog.image = image;
    // blog.video = video;
    blog.commentSection = commentSection;

    await blog.save();

    return res.status(201).json({ success: true, blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res
        .status(400)
        .json({ message: "Parameter blogId must be provided" });
    }

    const blog = await blogModel.findOne({
      user: req.user.id,
      _id: blogId,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ message: "No blog data found. Check your id again" });
    }

    await blogModel.findByIdAndDelete(blogId);

    return res
      .status(200)
      .json({ success: true, message: "Delete blog successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const blogsPerPage = 5;

    const skip = (page - 1) * blogsPerPage;

    const blogs = await blogModel.find().skip(skip).limit(blogsPerPage);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No Blogs Available" });
    }

    const totalBlogs = await blogModel.countDocuments();
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    return res.status(200).json({
      success: true,
      blogs,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    {
      formatDate(item.createdAt);
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLatestBlog = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const blogsPerPage = 5;

    const skip = (page - 1) * blogsPerPage;

    const blogs = await blogModel
      .find()
      .sort("-createdAt")
      .skip(skip)
      .limit(blogsPerPage);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No Blogs Available" });
    }
    const totalBlogs = await blogModel.countDocuments();
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    return res.status(200).json({
      success: true,
      blogs,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select("username id email about displayName image");

    console.log(req.params, "user params");
    const page = req.query.page || 1;
    const blogsPerPage = 5;

    const skip = (page - 1) * blogsPerPage;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    const blogs = await blogModel
      .find({ user: user.id })
      .sort("-createdAt")
      .skip(skip)
      .limit(blogsPerPage);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blog data found" });
    }

    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    return res.status(200).json({
      success: true,
      blogs,
      author: user,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMostReadBlogs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const blogsPerPage = 4;

    const skip = (page - 1) * blogsPerPage;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const blogs = await blogModel.find().skip(skip).limit(blogsPerPage);

    if (blogs && blogs.length > 0) {
      const shuffledBlogs = shuffleArray(blogs);

      const totalBlogs = await blogModel.countDocuments();
      const totalPages = Math.ceil(totalBlogs / blogsPerPage);

      return res.status(200).json({
        success: true,
        blogs: shuffledBlogs,
        currentPage: page,
        totalPages,
      });
    } else {
      return res.status(404).json({ message: "No Blogs Available" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getLatestBlog,
  getUserBlogs,
  getMostReadBlogs,
};
