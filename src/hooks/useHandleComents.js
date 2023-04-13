import { useState } from "react";
import { updateById } from "../api/firebaseMethods";

import { v4 } from "uuid";
const colorCollection = {
  0: "#FA9884",
  1: "#C0DBEA",
  2: "#FFA559",
  3: "#F3E8FF",
};
export const useHandleComments = (initialValues) => {
  const [comments, setComments] = useState(initialValues);
  const [edit, setEdit] = useState({ flag: false, id: null });

  const handleShowCommentBubble = () => {
    setComments({
      ...comments,
      showCommentBubble: !comments.showCommentBubble,
    });
  };

  const handleComment = (value) => {
    setComments({ ...comments, comment: value });
  };

  const handleSubmitComment = (user) => {
    const values = {
      ...comments,
      collection: [
        {
          id: v4(),
          bg: colorCollection[Math.floor(Math.random() * 4)],
          value: comments.comment,
        },
        ...comments.collection,
      ],
      comment: "",
    };
    setComments(values);
    try {
      updateById({ url: "users", id: user.login, values: { ...user, values } });
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleEdit = (id) => {
    setEdit({ flag: true, id });
    const selected = comments.collection.find((com) => com.id === id);
    setComments({ ...comments, comment: selected.value });
  };

  const handleSubmitEdittedComment = (id, user) => {
    const updatedCollection = comments.collection.map((com) =>
      com.id === id ? { ...com, value: comments.comment } : com,
    );
    const values = {
      ...comments,
      collection: updatedCollection,
      comment: "",
    };
    setComments(values);
    try {
      updateById({ url: "users", id: user.login, values: { ...user, values } });
      setEdit({ flag: false, id: null });
    } catch (error) {
      console.log("err", error);
    }
  };

  return {
    comments,
    edit,
    handleShowCommentBubble,
    handleComment,
    handleSubmitComment,
    handleEdit,
    handleSubmitEdittedComment,
  };
};
