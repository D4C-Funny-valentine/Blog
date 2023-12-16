import blogModel from "../models/blog.model.js";
import favoriteModel from "../models/favorite.model.js";
import userModal from "../models/user.model.js";

const addFavorite = async (req, res) => {
  try {
    const existedIsFavorite = await favoriteModel.findOne({
      user: req.user.id,
      blog: req.params.id,
    });

    if (existedIsFavorite) {
      return res
        .status(400)
        .json({ message: "This blog is already your favorite" });
    }

    const blog = await blogModel.findById(req.params.id);

    if (blog) {
      const favorite = await favoriteModel.create({
        user: req.user.id,
        blogId: blog.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
      });

      return res.status(201).json({ success: true, data: favorite });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(400).json({ message: "Id parameter is required" });
    }

    const favoriteBlog = await favoriteModel.findOne({
      user: req.user.id,
      blog: blogId,
    });

    if (!favoriteBlog) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favoriteModel.findByIdAndDelete(favoriteBlog._id);

    return res.status(200).json({
      success: true,
      data: favoriteBlog,
      message: "Remove successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllFavorites = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const blogsPerPage = 5;

    const skip = (page - 1) * blogsPerPage;

    const user = await userModal
      .findById(req.user.id)
      .select("username id email about displayName image");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Check your token and try again" });
    }

    const favorites = await favoriteModel
      .find({ user: user.id })
      .sort("-createdAt")
      .skip(skip)
      .limit(blogsPerPage);

    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No favorites data found" });
    }

    const totalBlogs = favorites.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    return res
      .status(200)
      .json({ success: true, data: favorites, currentPage: page, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { addFavorite, removeFavorite, getAllFavorites };
