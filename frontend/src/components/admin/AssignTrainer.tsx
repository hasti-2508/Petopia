"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        toast.error("please select booking to assign vet!");
      }
    }
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get<Trainer[]>(
          `${process.env.HOST}/trainer`
        );
        setTrainerList(response.data);
      } catch (error) {
        toast.error("Couldn't get vet!");
        // console.error("Error fetching vet list:", error);
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

  const handleAssignVet = async () => {
    if (!trainingPlanId || !selectedTrainer) {
      toast.error("Select Trainer First");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.HOST}/trainingBooking/assign/6613a910dc81b24327e5256c`,
        { trainerId: selectedTrainer }
      );
      router.push("/admin/profile");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        toast.error("The booking is not confirmed Yet!");
        // toast("The booking is not confirmed Yet!", {
        //   icon: "❌",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#fff",
        //     color: "#242d62",
        //   },
        // });
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        toast.error("Booking or Trainer Not Found!");
      } else {
        toast.error("Error assigning Trainer");
        // console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Assign Trainer</h1>
      <label htmlFor="search">Search Trainers in City:</label>
      <input
        placeholder="Search Trainer by city"
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="vet">Select Trainer:</label>
      <select id="vet" onChange={handleTrainerSelection}>
        <option value="">Select a Trainer</option>
        {filteredTrainerList.map((trainer) => (
          <option key={Math.random()} value={trainer._id.toString()}>
            {trainer.name}
          </option>
        ))}
      </select>
      <button onClick={handleAssignVet}>Assign Vet</button>
    </div>
  );
}

export default AssignTrainer;
