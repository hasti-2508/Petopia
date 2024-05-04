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
  const [trainingPlanId, setTrainingPlanId] = useState<Types.ObjectId | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosInstance.get<Trainer[]>(`${process.env.HOST}/trainer`);
        setTrainerList(response.data);
      } catch (error) {
        toast.error("Couldn't get Trainer!");
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("bookingId");
    if (id) {
      setTrainingPlanId(new Types.ObjectId(id));
    } else {
      toast.error("Please select a booking to assign a trainer!");
    }
  }, []);

  useEffect(() => {
    const filteredTrainers = trainerList.filter(trainer =>
      trainer.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrainerList(filteredTrainers);
  }, [trainerList, searchTerm]);

  const handleTrainerSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrainer(e.target.value);
  };

  const handleAssignTrainer = async () => {
    if (!trainingPlanId || !selectedTrainer) {
      toast.error("Select a Trainer First");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.HOST}/trainingBooking/assign/${trainingPlanId?.toString()}`,
        { trainerId: selectedTrainer }
      );
      setLoading(false);
      toast.success("Trainer assigned successfully!");
      router.push("/admin/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 409:
            toast.error("The booking is not confirmed yet!");
            break;
          case 404:
            toast.error("Booking or trainer not found!");
            break;
          case 402:
            toast.error("City is conflicting between trainer and user!");
            break;
          default:
            toast.error("Error assigning trainer");
        }
      }
      router.push('/admin/profile');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 mt-6" style={{ fontFamily: "open-sans", fontSize: "40px" }}>
        Assign Trainer
      </h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Search Trainer in City:</label>
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
          <label htmlFor="name" className="mb-1">Select Trainer:</label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            id="trainer"
            onChange={handleTrainerSelection}
          >
            {filteredTrainerList.length === 0 ? (
              <option className="border border-gray-300 rounded-md px-4 py-2" value="" disabled>
                No trainers found
              </option>
            ) : (
              <>
                <option className="border border-gray-300 rounded-md px-4 py-2" value="">Select a Trainer</option>
                {filteredTrainerList.map((trainer) => (
                  <option
                    className="border border-gray-300 rounded-md px-4 py-2"
                    key={trainer._id.toString()}
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
