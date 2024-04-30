"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axios";

interface Trainer {
  _id: Types.ObjectId;
  name: string;
  city: string;
}

function AssignTrainer() {
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
  const [filteredTrainerList, setFilteredTrainerList] = useState<Trainer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const [trainingPlanId, setTrainingPlanId] = useState<Types.ObjectId>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("bookingId");
      if (id) {
        try {
          const objectId = new Types.ObjectId(id);
          setTrainingPlanId(objectId);
        } catch (error) {
          console.error("Invalid ObjectId:", error);
        }
      } else {
        toast.error("please select booking to assign trainer!");
      }
    }
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosInstance.get<Trainer[]>(
          `${process.env.HOST}/trainer`
        );
        setTrainerList(response.data);
      } catch (error) {
        toast.error("Couldn't get Trainer!");
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    const filteredVets = trainerList.filter((vet) =>
      vet.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrainerList(filteredVets);
  }, [trainerList, searchTerm]);

  const handleTrainerSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrainer(e.target.value);
  };

  const handleAssignTrainer = async () => {
    if (!trainingPlanId || !selectedTrainer) {
      toast.error("Select Trainer First");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${
          process.env.HOST
        }/trainingBooking/assign/${trainingPlanId?.toString()}`,
        { trainerId: selectedTrainer }
      );
      setLoading(false);
      toast.success("Trainer assigned Successfully!");
      router.push("/admin/profile");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        toast.error("The booking is not confirmed Yet!");
        router.push('/admin/profile');
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        toast.error("Booking or Trainer Not Found!");
        router.push('/admin/profile');
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 402
      ) {
        toast.error("city is conflicting between Trainer and User!");
        router.push('/admin/profile');
      } else {
        toast.error("Error assigning Trainer");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1
        className="text-3xl font-bold mb-4 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Assign Trainer
      </h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Search Trainer in City:
          </label>
          <input
            placeholder="Search Trainer by city"
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Select Trainer:
          </label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            id="vet"
            onChange={handleTrainerSelection}
          >
            {filteredTrainerList.length <= 0 ? (
              <option
                className="border border-gray-300 rounded-md px-4 py-2"
                value=""
                disabled
              >
                No Trainer found
              </option>
            ) : (
              <>
                <option
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value=""
                >
                  Select a Trainer
                </option>
                {filteredTrainerList.map((trainer) => (
                  <option
                    className="border border-gray-300 rounded-md px-4 py-2"
                    key={Math.random()}
                    value={trainer._id.toString()}
                  >
                    {trainer.name}-{trainer.city}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleAssignTrainer}
            className="bg-dark-blue text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
            style={{ marginBottom: "50px" }}
          >
            {loading ? "Loading..." : "Assign Trainer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignTrainer;
