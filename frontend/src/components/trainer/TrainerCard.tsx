"use client";
const TrainerCard = ({ user }) => {
  return (
    <div className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <img
        style={{ height: "320px" }}
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
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                year Of Experience:
              </label>{" "}
              <div className="fw-medium">{user?.YearsOfExperience}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Number of pets Trained:
              </label>{" "}
              <div className="fw-medium">{user?.NumberOfPetsTrained}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Training:
              </label>
              <div className="fw-medium">
                {user?.trainings.map((training, index) => (
                  <p key={index}>{training}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrainerAdminCard = ({ user }) => {
  return (
    <div
      style={{ height: "850px" }}
      className="rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
    >
      <img
        style={{ height: "320px" }}
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
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                year Of Experience:
              </label>{" "}
              <div className="fw-medium">{user?.YearsOfExperience}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Number of pets Trained:
              </label>{" "}
              <div className="fw-medium">{user?.NumberOfPetsTrained}</div>
            </div>
            <div className="mt-1">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Training:
              </label>
              <div className="fw-medium">
                {user?.trainings.map((training, index) => (
                  <p key={index}>{training}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TrainerCard, TrainerAdminCard };
