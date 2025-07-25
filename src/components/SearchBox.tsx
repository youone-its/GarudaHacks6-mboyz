"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Homestay", count: 257 },
  { name: "Culture Experience", count: 51 },
  { name: "Bundling", count: 72 },
];

const destinations = [
  "Destination",
  "Banten",
  "Solo",
  "Jogja",
  "Padang",
  "Aceh",
  "Papua",
  "Nusa Tenggara",
];

export default function SearchBox() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Homestay");
  const [selected, setSelected] = useState(destinations[0]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-[5vw] md:mx-auto -mt-20 z-20 relative">
      {/* Baris 1 */}
      <h2 className="text-xl text-black font-semibold mb-4">
        Where are you going?
      </h2>

      {/* Baris 2 */}
      <div className="flex mb-6 border border-gray-300 rounded-lg">
        {categories.map((cat, index) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(cat.name)}
            className={`flex-1 px-4 py-2 text-center text-sm font-medium 
              ${
                activeTab === cat.name
                  ? "text-green-700 border-b-2 border-green-500"
                  : "text-gray-500"
              } 
              ${
                index === 0 ? "rounded-l-lg" : index === 2 ? "rounded-r-lg" : ""
              }
              bg-white hover:bg-gray-50 transition`}
          >
            <div>{cat.name}</div>
            <div className="text-xs">
              {cat.count} {cat.name === "Bundling" ? "bundles" : "places"}
            </div>
          </button>
        ))}
      </div>

      {/* Baris 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Dropdown Destinasi */}
        <div>
          <label className="text-sm text-gray-600">Enter Destination</label>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="w-full border rounded-lg px-3 py-2 text-sm text-left bg-white text-gray-600">
                {selected}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                {destinations.map((d) => (
                  <Listbox.Option
                    key={d}
                    value={d}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 text-sm ${
                        active ? "bg-green-100 text-green-700" : "text-gray-700"
                      }`
                    }
                  >
                    {d}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Check In */}
        <div>
          <label className="text-sm text-gray-600 flex flex-col gap-4">
            Check In
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="EEE, MMM d"
            placeholderText="Select date"
            className="w-full text-gray-600 mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Check Out */}
        <div>
          <label className="text-sm text-gray-600 flex flex-col gap-4">
            Check Out
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="EEE, MMM d"
            placeholderText="Select date"
            className="w-full text-gray-600 mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Baris 4 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-green-700 transition">
          + Add Promo Code
        </button>
        <button
          onClick={() => {
            if (selected !== "Destination") {
              router.push(
                `/connect/nusaexperience/search?dest=${encodeURIComponent(
                  selected
                )}`
              );
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6h13m0 0l-4-4m4 4l-4 4"
            />
          </svg>
          Show Places
        </button>
      </div>
    </div>
  );
}
