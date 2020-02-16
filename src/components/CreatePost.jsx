import React, { useContext, useReducer, useState } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { firestore } from "../firestore";
import { withRouter } from "react-router";
import { reducerConstants } from "./constants.js";

const initialState = {
  title: "",
  content: "",
  tags: [],
  tag: ""
};

function CreatePost(props) {
  const user = useContext(UserContext);
  const [postData, dispatch] = useReducer(postReducer, initialState);

  const handleContentChange = e => {
    const textarea = e.target;
    textarea.style.height = "";
    textarea.style.height = e.target.scrollHeight + 10 + "px";
    dispatch(setContent(textarea.value));
  };

  const handleSubmit = () => {
    const { title, content, tags } = postData;
    const { uid, displayName, email, photoURL } = user;

    const post = {
      title,
      content,
      tags,
      comments: 0,
      favorites: 0,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      createdAt: new Date()
    };
    firestore.collection("posts").add(post);
    return props.history.push("/");
  };
  return (
    <div className="layout mt_m">
      <div className="form post">
        <input
          className="post__title_center mb_s"
          type="text"
          name="title"
          placeholder="Title"
          value={postData.title}
          onChange={e => dispatch(setTitle(e.target.value))}
        />
        <textarea
          className="form__input post__content_main mb_s"
          name="content"
          id=""
          placeholder="Content"
          value={postData.content}
          onChange={handleContentChange}
        ></textarea>
        <div className="flex-wrapper_row">
          <ul className="tags">
            {postData.tags &&
              postData.tags.map((tag, idx) => (
                <li key={idx} className="tags__item">
                  {tag}
                  <button onClick={() => dispatch(removeTag(idx))}>
                    &times;
                  </button>
                </li>
              ))}
          </ul>
          <input
            className="form__input"
            type="text"
            placeholder="Add Tag"
            value={postData.tag}
            onKeyPress={e => dispatch(changeTag(e.target.value))}
            onChange={e => dispatch(changeTag(e.target.value))}
          />
          <button className="button" onClick={() => dispatch(addTag())}>
            Add
          </button>
        </div>
        <button className="button edit" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
}

function postReducer(state, action) {
  switch (action.type) {
    case reducerConstants.SET_TITLE:
      return { ...state, title: action.payload };
    case reducerConstants.SET_CONTENT:
      return { ...state, content: action.payload };
    case reducerConstants.CHANGE_TAG:
      return { ...state, tag: action.payload };
    case reducerConstants.ADD_TAG: {
      let { tags, tag } = state;
      return { ...state, tags: tags.concat(tag), tag: "" };
    }
    case reducerConstants.REMOVE_TAG: {
      let { tags } = state;
      return {
        ...state,
        tags: tags.filter((tag, idx) => idx !== action.payload)
      };
    }
    default:
      return state;
  }
}

function setTitle(title) {
  return {
    type: reducerConstants.SET_TITLE,
    payload: title
  };
}

function setContent(content) {
  return {
    type: reducerConstants.SET_CONTENT,
    payload: content
  };
}

function addTag() {
  return {
    type: reducerConstants.ADD_TAG
  };
}
function changeTag(tag) {
  return {
    type: reducerConstants.CHANGE_TAG,
    payload: tag
  };
}
function removeTag(idx) {
  return {
    type: reducerConstants.REMOVE_TAG,
    payload: idx
  };
}

export default withRouter(CreatePost);
