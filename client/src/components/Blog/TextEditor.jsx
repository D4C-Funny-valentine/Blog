import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ blogInput, content, setContent }) => {
  const onEditorStateChangeHandler = (editorState) => {
    setContent(editorState);
  };

  return (
    <div className="editor flex flex-col gap-4">
      <label className="text-xs font-domine mb-3 text-gray-700 uppercase">
        Content
      </label>
      <Editor
        editorState={content}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        spellCheck={true}
        placeholder="Type here..."
        onEditorStateChange={onEditorStateChangeHandler}
      />
      <textarea
        style={{ display: "none" }}
        disabled
        ref={(value) => (blogInput.content = value)}
        value={draftToHtml(convertToRaw(content.getCurrentContent()))}
      />
    </div>
  );
};

export default TextEditor;
