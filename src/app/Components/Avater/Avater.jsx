import { Avatar } from "@heroui/react";
import React from "react";

const Avater = ({ data, onAvatarClick }) => {
  const user = Array.isArray(data) ? data[0] : data;
  return (
    <div>
      <Avatar onClick={onAvatarClick} className="cursor-pointer">
        <Avatar.Image alt={user.name} src={user.photoURL} />
        <Avatar.Fallback> {user.name} </Avatar.Fallback>
      </Avatar>
    </div>
  );
};

export default Avater;
