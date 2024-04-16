"use client";
import Link from "next/link";
const UserCard = ({ user }) => {
  return (
    <div className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <img
        style={{ height: "280px", }}
        className="w-full p-4 img-responsive"
        src={
          user?.imageUrl
            ? user.imageUrl
            : "http://localhost:3000/assets/user.png"
        }
        alt={user?.name}
      />

      <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2">{user?.name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Email:
              </label>{" "}
              <div className="fw-medium">{user?.email}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Address:
              </label>{" "}
              <div className="fw-medium">{user?.address}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Phone No:
              </label>{" "}
              <div className="fw-medium">{user?.phoneNo}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                City:
              </label>{" "}
              <div className="fw-medium">{user?.city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserUpdateCard = ({ editedUser, handleChange }) => {
  return (
    <div className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom w-1/4">
      <Link href="/Adopt/PetData">
        <img
          style={{ height: "250px" }}
          className="w-full p-4 img-responsive"
          src={
            editedUser?.imageUrl
              ? editedUser.imageUrl
              : "http://localhost:3000/assets/user.png"
          }
          alt={editedUser?.name}
        />
      </Link>
      <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2">
          {" "}
          <input
            className="border-2 border-gray-300 p-1"
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            style={{ width: `${editedUser.name.length * 13}px` }}
          />
        </div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Email:
              </label>{" "}
              <div className="fw-medium">
                <input
                  className="border-2 border-gray-200"
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  style={{ width: `${editedUser.name.length * 30}px` }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Address:
              </label>{" "}
              <div className="fw-medium">
                {" "}
                <input
                  className="border-2 border-gray-200"
                  type="text"
                  name="address"
                  value={editedUser.address}
                  onChange={handleChange}
                  style={{ width: `${editedUser.name.length * 30}px` }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Phone No:
              </label>{" "}
              <div className="fw-medium">
                {" "}
                <input
                  className="border-2 border-gray-200"
                  type="text"
                  name="phoneNo"
                  value={editedUser.phoneNo}
                  onChange={handleChange}
                  style={{ width: `${editedUser.name.length * 30}px` }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                City:
              </label>{" "}
              <div className="fw-medium">
                {" "}
                <input
                  className="border-2 border-gray-200"
                  type="text"
                  name="city"
                  value={editedUser.city}
                  onChange={handleChange}
                  style={{ width: `${editedUser.name.length * 30}px` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserUpdateCard, UserCard };
