import { Avatar } from "@heroui/react";
import React from "react";

const Avater = ({ data, onAvatarClick, users }) => {
  const user = Array.isArray(data) ? data[0] : data;

  return (
    <div>
      <Avatar
        onClick={onAvatarClick}
        className="cursor-pointer"
        aria-label={`User profile for ${user?.name || "User"}`}
      >
        {users?.photoURL && (
          <Avatar.Image alt={user?.name || "User"} src={user?.photoURL} />
        )}
        <Avatar.Fallback>
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
};

export default Avater;
