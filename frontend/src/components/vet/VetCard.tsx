"use client";
const VetCard = ({ user }) => {
  return (
    <div
      className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
      style={{ width: "400px" }}
    >
      <img
        style={{ height: "190px" }}
        className="w-full img-responsive"
        src={
          user?.imageUrl
            ? user.imageUrl
            : "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/user_yqmdpt.png"
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
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                year Of Experience:
              </label>{" "}
              <div className="fw-medium">{user?.YearsOfExperience}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Services:
              </label>{" "}
              <div className="fw-medium">
                {user?.services.map((service, index) => (
                  <p key={index}>{service}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableVetCard = ({ user }) => {
  return (
    <div
      className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
      style={{ width: "380px" }}
    >
      <img
        style={{ height: "210px" }}
        className="w-full img-responsive"
        src={
          user?.imageUrl
            ? user.imageUrl
            : "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/user_yqmdpt.png"
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
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                year Of Experience:
              </label>{" "}
              <div className="fw-medium">{user?.YearsOfExperience}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Services:
              </label>{" "}
              <div className="fw-medium">
                {user?.services.map((service, index) => (
                  <p key={index}>{service}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VetAdminCard = ({ user }) => {
  return (
    <div
      style={{ height: "560px", width:"400px" }}
      className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
    >
      <img
        style={{ height: "210px" }}
        className="w-full img-responsive"
        src={
          user?.imageUrl
            ? user.imageUrl
            : "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/user_yqmdpt.png"
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
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                year Of Experience:
              </label>{" "}
              <div className="fw-medium">{user?.YearsOfExperience}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Services:
              </label>{" "}
              <div className="fw-medium">
                {user?.services.map((service, index) => (
                  <p key={index}>{service}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VetCard, AvailableVetCard, VetAdminCard };
