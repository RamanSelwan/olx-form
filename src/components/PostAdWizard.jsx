import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaHome,
  FaMobileAlt,
  FaBriefcase,
  FaMotorcycle,
  FaTv,
  FaTruck,
  FaCouch,
  FaTshirt,
  FaBook,
  FaDog,
  FaServicestack,
  FaChevronRight,
} from "react-icons/fa";

// Icon mapping
const iconMap = {
  Cars: <FaCar />,
  Properties: <FaHome />,
  Mobiles: <FaMobileAlt />,
  Jobs: <FaBriefcase />,
  Bikes: <FaMotorcycle />,
  "Electronics & Appliances": <FaTv />,
  "Commercial Vehicles & Spares": <FaTruck />,
  Furniture: <FaCouch />,
  Fashion: <FaTshirt />,
  "Books, Sports & Hobbies": <FaBook />,
  Pets: <FaDog />,
  Services: <FaServicestack />,
};

// Category data
const categories = [
  { name: "Cars", sub: ["For Sale: Cars"] },
  {
    name: "Properties",
    sub: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "Lands & Plots",
      "For Rent: Shops & Offices",
      "For Sale: Shops & Offices",
      "PG & Guest Houses",
    ],
  },
  { name: "Mobiles", sub: ["Mobile Phones", "Tablets", "Accessories"] },
  {
    name: "Jobs",
    sub: ["Data entry & Back office", "Sales & Marketing", "BPO & Telecaller"],
  },
  { name: "Bikes", sub: ["Motorcycles", "Scooters", "Bicycles"] },
  {
    name: "Electronics & Appliances",
    sub: ["TVs, Video - Audio", "Kitchen & Other Appliances"],
  },
  {
    name: "Commercial Vehicles & Spares",
    sub: ["Commercial & Other Vehicles", "Spare Parts"],
  },
  {
    name: "Furniture",
    sub: ["Sofa & Dining", "Beds & Wardrobes", "Home Decor & Garden"],
  },
  { name: "Fashion", sub: ["Men", "Women", "Kids"] },
  {
    name: "Books, Sports & Hobbies",
    sub: ["Books", "Gym & Fitness", "Musical Instruments"],
  },
  {
    name: "Pets",
    sub: ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs"],
  },
  {
    name: "Services",
    sub: ["Education & Classes", "Tours & Travel", "Electronics Repair"],
  },
];

const PostAdWizard = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const renderSubcategory = (sub, idx) => {
    const isSelected = selectedSubcategory === sub;

    return (
      <Link
        key={idx}
        to="/olx-form"
        onClick={() => setSelectedSubcategory(sub)}
        className={`flex items-center h-12 px-5 cursor-pointer border-b border-gray-200 hover:text-black last:border-b-0 hover:bg-gray-100 transition-colors duration-200 ${
          isSelected ? "text-black font-semibold" : "text-gray-500"
        }`}
        style={{ textDecoration: "none" }}
      >
        <span className="text-sm">{sub}</span>
      </Link>
    );
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 pt-8 box-border">
      <h2 className="text-center font-bold mb-6 text-2xl">POST YOUR AD</h2>

      <div className="max-w-xl my-6 mx-auto border-2 border-gray-300 rounded-md bg-white overflow-hidden">
        <div className="text-base font-semibold px-6 pt-[18px] pb-3 border-b border-gray-200 bg-gray-50 tracking-wide">
          CHOOSE A CATEGORY
        </div>

        <div className="flex flex-row items-stretch">
          {/* Left Panel: Categories */}
          <div className="w-[350px] border-r border-gray-200 bg-white">
            {categories.map((cat) => {
              const isActive = selectedCategory.name === cat.name;
              return (
                <div
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory(null); // reset subcategory when category changes
                  }}
                  className={`flex items-center h-12 px-5 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`w-7 flex items-center justify-center text-xl mr-3 ${
                      isActive ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {iconMap[cat.name]}
                  </span>
                  <span
                    className={`flex-1 font-normal text-sm ${
                      isActive ? "text-black font-semibold" : "text-gray-500"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <FaChevronRight
                    className={`${isActive ? "text-black" : "text-gray-500"} text-base`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Panel: Subcategories */}
          <div className="flex-1 min-w-[260px] bg-white">
            {selectedCategory?.sub?.map(renderSubcategory)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdWizard;
