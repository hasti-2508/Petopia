"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);
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
        toast.error("please select booking to assign vet!");
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
      toast.error("Select vet First");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${
          process.env.HOST
        }/serviceBooking/assign/${servicePlanId?.toString()}`,
        { vetId: selectedVet }
      );
      setLoading(false);
      toast.success("Vet assigned Successfully!");
      router.push("/admin/profile");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        toast.error("The booking is not confirmed Yet!");
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        toast.error("Booking or Vet Not Found!");
      } else {
        toast.error("Error assigning vet");
        console.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1
        className="text-3xl font-bold mb-4 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Assign Vet
      </h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Search Vets in City:
          </label>
          <input
            placeholder="Search vet by city"
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Select Vet:
          </label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            id="vet"
            onChange={handleVetSelection}
          >
            {filteredVetList.length <= 0 ? (
              <option
                className="border border-gray-300 rounded-md px-4 py-2"
                value=""
                disabled
              >
                No vets found
              </option>
            ) : (
              <>
                <option
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value=""
                >
                  Select a Vet
                </option>
                {filteredVetList.map((vet) => (
                  <option
                    className="border border-gray-300 rounded-md px-4 py-2"
                    key={Math.random()}
                    value={vet._id.toString()}
                  >
                    {vet.name}-{vet.city}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleAssignVet}
            className="bg-dark-blue text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
            style={{ marginBottom: "50px" }}
          >
            {loading ? "Loading..." : "Assign Vet"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignVet;
