"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";

interface Vet {
  _id: Types.ObjectId;
  name: string;
  city: string;
}

function AssignVet() {
  const [vetList, setVetList] = useState<Vet[]>([]);
  const [filteredVetList, setFilteredVetList] = useState<Vet[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedVet, setSelectedVet] = useState<string>("");
  const [servicePlanId, setServicePlanId] = useState<Types.ObjectId>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("bookingId");
      if (id) {
        try {
          const objectId = new Types.ObjectId(id);
          setServicePlanId(objectId);
        } catch (error) {
          console.error("Invalid ObjectId:", error);
        }
      } else {
        alert("please select booking to assign vet!");
      }
    }
  }, []);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await axios.get<Vet[]>(`${process.env.HOST}/vet`);
        setVetList(response.data);
      } catch (error) {
        console.error("Error fetching vet list:", error);
      }
    };

    fetchVets();
  }, []);

  useEffect(() => {
    const filteredVets = vetList.filter((vet) =>
      vet.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVetList(filteredVets);
  }, [vetList, searchTerm]);

  const handleVetSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVet(e.target.value);
  };

  const handleAssignVet = async () => {
    if (!servicePlanId || !selectedVet) {
      alert("Select vet First");
      return;
    }

    try {
      const response = await axios.post(
        `${
          process.env.HOST
        }/serviceBooking/assign/${servicePlanId?.toString()}`,
        { vetId: selectedVet }
      );
      router.push("/Admin/Profile");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        alert("The booking is not confirmed Yet!")
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        alert("Booking or Vet Not Found!");
      } else {
        alert("Error assigning vet")
        console.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Assign Vet</h1>
      <label htmlFor="search">Search Vets in City:</label>
      <input
        placeholder="Search vet by city"
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="vet">Select Vet:</label>
      <select id="vet" onChange={handleVetSelection}>
        <option value="">Select a Vet</option>
        {filteredVetList.map((vet) => (
          <option key={Math.random()} value={vet._id.toString()}>
            {vet.name}
          </option>
        ))}
      </select>
      <button onClick={handleAssignVet}>Assign Vet</button>
    </div>
  );
}

export default AssignVet;
