import { Avatar } from "@heroui/react";
import React from "react";

const Avater = ({ data, onAvatarClick, users }) => {
  const user = Array.isArray(data) ? data[0] : data;

  return (
    <div>
      <Avatar onClick={onAvatarClick} className="cursor-pointer">
        <Avatar.Image
          alt={user?.name || "User"}
          src={users?.photoURL || user?.name}
        />
        <Avatar.Fallback>{user?.name || "user"}</Avatar.Fallback>
      </Avatar>
    </div>
  );
};

export default Avater;
