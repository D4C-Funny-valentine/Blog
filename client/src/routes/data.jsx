import BlogDetailPage from "../pages/BlogDetailPage";
import BlogPage from "../pages/BlogPage";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import FavoriteBlogPage from "../pages/FavoriteBlogPage";
import HomePage from "../pages/HomePage/HomePage";
import LatestBlogPage from "../pages/LatestBlogPage";
import MostReadBlogPage from "../pages/MostReadBlogPage";
import ProfilePage from "../pages/ProfilePage";
import UserBlogsPage from "../pages/UserBlogsPage";
import ProductRoute from "./product/ProductRoute";

const routes = [
  {
    name: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    name: "blog",
    path: "/blog",
    element: <BlogPage />,
  },
  {
    name: "detail",
    path: "/blog/detail/:id",
    element: <BlogDetailPage />,
  },
  {
    name: "profile",
    path: "/profile/:id",
    element: <ProfilePage />,
  },
  {
    name: "createBlog",
    path: "/blog/create",
    element: (
      <ProductRoute>
        <CreateBlog />
      </ProductRoute>
    ),
  },
  {
    name: "editBlog",
    path: "/blog/edit/:id",
    element: (
      <ProductRoute>
        <EditBlog />
      </ProductRoute>
    ),
  },
  {
    name: "latestBlog",
    path: "/blog/latest",
    element: (
      <ProductRoute>
        <LatestBlogPage />
      </ProductRoute>
    ),
  },
  {
    name: "mostReadBlog",
    path: "/blog/most-read",
    element: (
      <ProductRoute>
        <MostReadBlogPage />
      </ProductRoute>
    ),
  },
  {
    name: "userBlogs",
    path: "/user/:id/blogs",
    element: (
      <ProductRoute>
        <UserBlogsPage />
      </ProductRoute>
    ),
  },
  {
    name: "favoriteBlog",
    path: "/blog/user/favorite",
    element: (
      <ProductRoute>
        <FavoriteBlogPage />
      </ProductRoute>
    ),
  },
];

export default routes;
