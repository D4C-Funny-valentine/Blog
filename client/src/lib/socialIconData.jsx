import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";

export const socialIcons = [
  {
    name: "Facebook",
    icon: <FaFacebookF size={20} color="white" />,
    bg: "bg-blue-900 hover:bg-blue-900/70",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={20} color="white" />,
    bg: "bg-black hover:bg-black/70",
  },
  {
    name: "Twitter",
    icon: <FaTwitter size={20} color="white" />,
    bg: "bg-sky-500  hover:bg-sky-500/70",
  },
  {
    name: "Dribble",
    icon: <FaDribbble size={20} color="white" />,
    bg: "bg-pink-600  hover:bg-pink-600/70",
  },
];
