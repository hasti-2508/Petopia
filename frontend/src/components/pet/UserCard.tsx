
import React from "react";

function UserCard({user}: any) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg"
        src={
          user?.imageUrl
            ? user.imageUrl
            : "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/user_yqmdpt.png"
        }
        alt={user?.name}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-red">
          {user?.name}
        </h5>
        <p className="mb-2 font-normal text-gray-700">
          Phone No: {user?.phoneNo}
        </p>
        <p className="mb-3 font-normal text-gray-700">email: {user?.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
