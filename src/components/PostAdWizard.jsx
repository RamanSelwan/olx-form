import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar, FaHome, FaMobileAlt, FaBriefcase, FaMotorcycle, FaTv, FaTruck,
  FaCouch, FaTshirt, FaBook, FaDog, FaServicestack, FaChevronRight
} from "react-icons/fa";

// --- Data and Configuration ---

const iconMap = {
  "Cars": <FaCar />,
  "Properties": <FaHome />,
  "Mobiles": <FaMobileAlt />,
  "Jobs": <FaBriefcase />,
  "Bikes": <FaMotorcycle />,
  "Electronics & Appliances": <FaTv />,
  "Commercial Vehicles & Spares": <FaTruck />,
  "Furniture": <FaCouch />,
  "Fashion": <FaTshirt />,
  "Books, Sports & Hobbies": <FaBook />,
  "Pets": <FaDog />,
  "Services": <FaServicestack />,
};

const categories = [
  { name: "Cars", sub: ["For Sale: Cars"] }, // Example subcategory
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
  { name: "Jobs", sub: ["Data entry & Back office", "Sales & Marketing", "BPO & Telecaller"] },
  { name: "Bikes", sub: ["Motorcycles", "Scooters", "Bicycles"] },
  { name: "Electronics & Appliances", sub: ["TVs, Video - Audio", "Kitchen & Other Appliances"] },
  { name: "Commercial Vehicles & Spares", sub: ["Commercial & Other Vehicles", "Spare Parts"] },
  { name: "Furniture", sub: ["Sofa & Dining", "Beds & Wardrobes", "Home Decor & Garden"] },
  { name: "Fashion", sub: ["Men", "Women", "Kids"] },
  { name: "Books, Sports & Hobbies", sub: ["Books", "Gym & Fitness", "Musical Instruments"] },
  { name: "Pets", sub: ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs"] },
  { name: "Services", sub: ["Education & Classes", "Tours & Travel", "Electronics Repair"] },
];


// --- Main Component ---

const PostAdWizard = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null); // State for hovered category

  // Determine which category's sub-panel to show: hovered first, then default selected
  const categoryToShow = hoveredCategory || categories.find(cat => cat.name === "Properties");
  const selected = categoryToShow ? categories.find((cat) => cat.name === categoryToShow.name) : null;


  const renderSubcategory = (sub, idx) => {
    // Determine if this subcategory should be highlighted (e.g., if it's the target link)
    const isTargetSubcategory = sub === "For Rent: Houses & Apartments";

    const commonClasses = `flex items-center h-12 px-5 cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors duration-200`;

    if (isTargetSubcategory) {
      return (
        <Link
          key={idx}
          to="/olx-form" // This route should be configured in your React Router setup
          className={commonClasses} // Apply common classes
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaHome className="w-6 mr-3 text-gray-500" />
          <span className="text-sm font-normal">{sub}</span> {/* Changed to text-sm */}
        </Link>
      );
    }

    return (
      <div key={idx} className={commonClasses}>
        {/* You might want a different icon here based on the subcategory type, 
            but for now, keeping FaHome as per previous code */}
        <FaHome className="w-6 mr-3 text-gray-500" /> 
        <span className="text-sm font-normal">{sub}</span> {/* Changed to text-sm */}
      </div>
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
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`flex items-center h-12 px-5 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors duration-200
                  ${(hoveredCategory && hoveredCategory.name === cat.name) ? "bg-gray-200" : "bg-white hover:bg-gray-100"}` 
                }
                onMouseEnter={() => setHoveredCategory(cat)} 
                onMouseLeave={() => setHoveredCategory(null)} 
              >
                <span className="w-7 flex items-center justify-center text-xl mr-3 text-gray-500">
                  {iconMap[cat.name]}
                </span>
                <span className="flex-1 font-normal text-sm">{cat.name}</span> {/* Changed to text-sm */}
                <FaChevronRight className="text-gray-500 text-base" />
              </div>
            ))}
          </div>

          {/* Right Panel: Subcategories */}
          <div className="flex-1 min-w-[260px] bg-white">
            {selected?.sub?.map(renderSubcategory)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdWizard;