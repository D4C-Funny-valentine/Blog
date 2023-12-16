import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateBlogMutation } from "../../redux/services/api/blogApi";
import makeAnimated from "react-select/animated";
import { selectOptions } from "../../helper/selectOptions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Select from "react-select";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import "./blog.css";
import Button from "../ui/Button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./blog.css";
import TextEditor from "./TextEditor";
import { useSelector } from "react-redux";

const EditForm = () => {
  const location = useLocation();
  const blog = location.state.blog;
  const { token } = useSelector((state) => state.userStore);

  const animatedComponents = makeAnimated();

  const [blogInput, setBlogInput] = useState({
    title: blog?.title,
    description: blog?.description,
  });
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(blog.content))
  );
  const [content, setContent] = useState(editorState);

  const onSelectChangeHandler = (selectedOptions) => {
    setBlogInput({
      ...blogInput,
      description: selectedOptions.map((option) => option.value),
    });
  };

  const defaultDescriptionValues = blogInput.description.map((value) => {
    return selectOptions.find((option) => option.value === value);
  });

  const navigate = useNavigate();
  const [updateBlog] = useUpdateBlogMutation();

  const editBlogHandler = async (event) => {
    event.preventDefault();
    if (content.getCurrentContent().getPlainText().length < 50) {
      toast.error("Required, Add Content Minimum length 50 characters");
      return;
    }
    try {
      const res = await updateBlog({
        token,
        id: blog.id,
        data: {
          title: blogInput.title,
          content: blogInput.content.value,
          description: blogInput.description,
        },
      });
      const { data, error } = res;
      if (data?.success) {
        navigate("/");
        toast.success("Edit successfully");
      } else {
        toast.error(error?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={editBlogHandler}>
      <div className="flex flex-col mb-4 gap-6 font-domine">
        <Input
          label={"title"}
          name={"title"}
          placeholder={"Title"}
          value={blogInput.title}
          inputValue={blogInput}
          setInputValue={setBlogInput}
          required={true}
        />
        <div className="mb-4 flex flex-col gap-3">
          <label className="text-xs font-domine text-gray-700 uppercase">
            Select
          </label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            defaultValue={defaultDescriptionValues}
            options={selectOptions}
            onChange={onSelectChangeHandler}
            className="outline-none text-gray-700"
          />
        </div>
        <TextEditor
          blogInput={blogInput}
          content={content}
          setContent={setContent}
        />
        <Button
          bgColor={"bg-primary"}
          textColor={"text-white"}
          type={"submit"}
          text={"Edit"}
        />
      </div>
    </Form>
  );
};

export default EditForm;
