import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { TbCameraPlus } from "react-icons/tb";
import { Camera } from "lucide-react";
// --- Generic UI Components ---

const FormSection = ({ title, children }) => (
  // Adjusted padding-x to match the image's internal spacing within the main white box.
  // The bottom border is consistent with the image.
  <div className="py-6 border-b border-gray-200 last:border-b-0 px-8">
    <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
    {children}
  </div>
);

const ButtonGroup = ({ label, options, selected, onSelect, error }) => (
  // Increased mb to match spacing
  <div className="mb-6">
    <label className="block text-sm font-normal text-black mb-2">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-8 py-2 text-sm border rounded-md transition-colors duration-200 
            ${
              selected === option
                ? "bg-blue-100 border-1 border-black text-black " // OLX blue shade for selected state
                : "bg-white border-gray-400 text-black " // Standard text color, border matches image
            }`}
        >
          {option}
        </button>
      ))}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  maxLength,
  showCharCount = false,
  prefix = null,
}) => (
  // Increased mb
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm  text-black mb-2">
      {label}
    </label>
    <div className="relative border border-gray-300 rounded-md ">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 font-semibold text-lg">{prefix}</span>
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        // Adjusted border-color to gray-300 for default and focus-ring to blue-500 as per OLX style
        className={`w-full h-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 text-base text-gray-800 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${prefix ? "pl-8 pr-3" : "px-3"}`} // Adjust pl and pr for general padding
      />
      {showCharCount && (
        <span className="absolute right-3 bottom-2 text-xs text-gray-400">
          {" "}
          {/* Gray 400 for char count */}
          {value.length} / {maxLength}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  showCharCount = false,
  placeholder, // Added placeholder prop
}) => (
  // Increased mb
  <div className="mb-6">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={5}
        placeholder={placeholder} // Applied placeholder
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base text-gray-800 resize-none ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
      />
      {showCharCount && (
        <span className="absolute right-3 bottom-2 text-xs text-gray-400">
          {value.length} / {maxLength}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  // Increased mb
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm  text-black mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-base text-gray-800 ${
        error ? "border-red-500 focus:ring-red-500" : ""
      }`}
    >
      <option value="" disabled>
        Select...
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// --- Form Section Components ---

const IncludeDetailsSection = ({
  formData,
  errors,
  handleChange,
  handleSelect,
}) => (
  <FormSection title="INCLUDE SOME DETAILS">
    <ButtonGroup
      label="Type *"
      options={[
        "Flats/Apartment",
        "Independent/Builder Floor",
        "House & Villa",
      ]}
      selected={formData.type}
      onSelect={(val) => handleSelect("type", val)}
      error={errors.type}
    />
    <ButtonGroup
      label="BHK "
      options={["1", "2", "3", "4", "4+"]}
      selected={formData.bhk}
      onSelect={(val) => handleSelect("bhk", val)}
      error={errors.bhk}
    />
    <ButtonGroup
      label="Bathrooms "
      options={["1", "2", "3", "4", "4+"]}
      selected={formData.bathrooms}
      onSelect={(val) => handleSelect("bathrooms", val)}
      error={errors.bathrooms}
    />
    <ButtonGroup
      label="Furnishing "
      options={["Furnished", "Semi-Furnished", "Unfurnished"]}
      selected={formData.furnishing}
      onSelect={(val) => handleSelect("furnishing", val)}
      error={errors.furnishing}
    />
    <ButtonGroup
      label="Project Status"
      options={["Pre-launch", "Ready to Move", "Under Construction"]}
      selected={formData.projectStatus}
      onSelect={(val) => handleSelect("projectStatus", val)}
    />
    <ButtonGroup
      label="Listed By"
      options={["Builder", "Dealer", "Owner"]}
      selected={formData.listedBy}
      onSelect={(val) => handleSelect("listedBy", val)}
      error={errors.listedBy}
    />

    {/* Using a single column grid with default gaps for vertical stacking */}
    <div>
      <InputField
        label="Super Builtup area sqft *"
        name="superBuiltupArea"
        value={formData.superBuiltupArea}
        onChange={handleChange}
        error={errors.superBuiltupArea}
        type="number" // Ensure numeric input
      />
      <InputField
        label="Carpet Area sqft *"
        name="carpetArea"
        value={formData.carpetArea}
        onChange={handleChange}
        error={errors.carpetArea}
        type="number" // Ensure numeric input
      />
      <ButtonGroup
        label="Bachelors Allowed"
        options={["NO", "YES"]}
        selected={formData.listedBy}
        onSelect={(val) => handleSelect("listedBy", val)}
        error={errors.listedBy}
      />

      <InputField
        label="Maintenance (Monthly)"
        name="maintenance"
        value={formData.maintenance}
        onChange={handleChange}
        error={errors.maintenance}
        type="number" // Ensure numeric input
      />
      <InputField
        label="Total Floors"
        name="totalFloors"
        value={formData.totalFloors}
        onChange={handleChange}
        error={errors.totalFloors}
        type="number" // Ensure numeric input
      />
      <InputField
        label="Floor No."
        name="floorNo"
        value={formData.floorNo}
        onChange={handleChange}
        error={errors.floorNo}
        type="number" // Ensure numeric input
      />
    </div>
    <ButtonGroup
      label="Car Parking"
      options={["0", "1", "2", "3", "3+"]}
      selected={formData.carParking}
      onSelect={(val) => handleSelect("carParking", val)}
    />
    <SelectField
      label="Facing"
      name="facing"
      value={formData.facing}
      onChange={handleChange}
      options={[
        "North",
        "South",
        "East",
        "West",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ]}
    />
    <InputField
      label="Project Name"
      name="projectName"
      value={formData.projectName}
      onChange={handleChange}
    />
    <InputField
      label="Ad title *"
      name="adTitle"
      value={formData.adTitle}
      onChange={handleChange}
      error={errors.adTitle}
      maxLength={70}
      showCharCount={true}
    />
    <TextareaField
      label="Description *"
      name="description"
      value={formData.description}
      onChange={handleChange}
      error={errors.description}
      maxLength={4096}
      showCharCount={true}
    />
  </FormSection>
);

const PriceSection = ({ formData, errors, setFormData }) => {
  const formatIndianCurrency = (value) => {
    if (!value) return "";
    const num = value.toString().replace(/,/g, "");
    const x = parseFloat(num);
    if (isNaN(x)) return "";
    return x.toLocaleString("en-IN");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(rawValue)) return; // prevent non-numeric input
    setFormData((prev) => ({
      ...prev,
      price: rawValue,
    }));
  };

  return (
    <FormSection title="SET A PRICE">
      <InputField
        label="Price *"
        name="price"
        value={formatIndianCurrency(formData.price)}
        onChange={handlePriceChange}
        error={errors.price}
        prefix="₹  |"
        type="text" // use text instead of number
      />
    </FormSection>
  );
};

const PhotoUploadSection = ({ photos, error, onFileSelect, onRemove }) => {
  const coverInputRef = useRef(null);
  const otherInputRef = useRef(null);

  const handleBoxClick = (index, hasPhoto) => {
    if (hasPhoto) return;
    if (index === 0) {
      coverInputRef.current?.click();
    } else {
      otherInputRef.current?.click();
    }
  };

  const handleRemoveClick = (e, index) => {
    e.stopPropagation(); // Prevent image box click
    onRemove(index);
  };

  return (
    <FormSection title="UPLOAD UP TO 20 PHOTOS">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={coverInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => onFileSelect(e, "cover")}
      />
      <input
        type="file"
        ref={otherInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={(e) => onFileSelect(e, "other")}
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {Array.from({ length: 20 }).map((_, index) => {
          const photo = photos[index];
          return (
            <div
              key={index}
              onClick={() => handleBoxClick(index, !!photo)}
              className={`relative aspect-square border rounded-md flex flex-col items-center justify-center text-center cursor-pointer 
                ${
                  photo
                    ? "border-gray-300"
                    : "border-gray-400 border-2 hover:border-blue-500"
                } overflow-hidden text-sm text-gray-600`}
            >
              {photo ? (
                <>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Cover Label for First Image */}
                  {index === 0 && (
                    <span className="absolute bottom-1 bg-blue-600 text-white text-[10px] px-4 py-[2px] rounded-xl">
                      Cover
                    </span>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveClick(e, index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    &#x2715;
                  </button>
                </>
              ) : (
                <>
                  <TbCameraPlus className="w-6 h-6 text-gray-500" />
                  <span className="text-xs text-gray-600 mt-1">
                    {index === 0 ? "Add Cover Photo" : "Add Photo"}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
    </FormSection>
  );
};

const LocationSection = ({
  formData,
  errors,
  handleChange,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <FormSection title="CONFIRM YOUR LOCATION">
      {/* Tab Switcher */}
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 text-sm font-semibold ${
            selectedTab === "list"
              ? "border-b-2 border-blue-700 text-black"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("list")}
        >
          LIST
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold ${
            selectedTab === "current"
              ? "border-b-2 border-blue-700 text-black"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("current")}
        >
          CURRENT LOCATION
        </button>
      </div>

      {/* Same UI for both tabs */}
      <div className="space-y-4">
        {/* State */}
        <SelectField
          label="State *"
          name="state"
          value={formData.state}
          onChange={handleChange}
          options={["Haryana", "Punjab", "Delhi", "Uttar Pradesh", "Rajasthan"]}
          error={errors.state}
        />

        {/* City appears only after State is selected */}
        {formData.state && (
          <InputField
            label="City *"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />
        )}

        {/* Neighbourhood appears only after City is selected */}
        {formData.state && formData.city && (
          <InputField
            label="Neighbourhood *"
            name="neighbourhood"
            value={formData.neighbourhood}
            onChange={handleChange}
            error={errors.neighbourhood}
          />
        )}
      </div>
    </FormSection>
  );
};

// import { useRef } from "react";

const ReviewDetailsSection = ({ formData, setFormData }) => {
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <FormSection title="REVIEW YOUR DETAILS">
      <div className="flex items-start gap-6 mb-6">
        {/* Profile Image + Upload Button */}
        <div className="relative w-24 h-24">
          <img
            src={
              formData.profileImage ||
              "https://placehold.co/100x100/4A5568/FFFFFF?text=RS"
            }
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />

          <TbCameraPlus
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-1 right-1 bg-gray-200 w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {/* Name Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            maxLength={30}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.name.length} / 30
          </p>
        </div>
      </div>

      {/* Phone Number Display */}
      <div className="mt-2 flex flex-row gap-16 ">
        <p className="text-sm text-gray-700 font-medium mb-1">
          Your phone number
        </p>
        <p className="text-sm text-black">+91{formData.phoneNumber}</p>
      </div>
    </FormSection>
  );
};

// --- Main App Component (Container) ---

export default function App() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    type: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    projectStatus: "",
    listedBy: "",
    superBuiltupArea: "",
    carpetArea: "",
    maintenance: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    projectName: "",
    adTitle: "",
    description: "",
    price: "",
    state: "",
    mobileNumber: "",
    // state: "",
    city: "",
    neighbourhood: "",
    name: "Raman Selwan",
    phoneNumber: "7533801905",
    profileImage: "", // base64 or URL
  });
  const [selectedTab, setSelectedTab] = useState("list");
  // Initialize photos with nulls for 20 slots
  const [photos, setPhotos] = useState(Array(20).fill(null));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPhotos = [...photos];
    let fileIndex = 0;

    if (type === "cover") {
      newPhotos[0] = files[0];
      fileIndex = 1; // Start filling other files from the second slot
    }

    // Fill remaining files into available slots, skipping the first if cover was set
    for (
      let i = type === "cover" ? 1 : 0;
      i < newPhotos.length && fileIndex < files.length;
      i++
    ) {
      if (newPhotos[i] === null) {
        newPhotos[i] = files[fileIndex];
        fileIndex++;
      }
    }
    setPhotos(newPhotos);
    e.target.value = null; // Clear the input so same file can be selected again
  };

  const handleRemovePhoto = (indexToRemove) => {
    const newPhotos = [...photos];
    newPhotos[indexToRemove] = null;
    // Shift remaining photos to the left to fill the gap (optional, but cleaner for display)
    if (indexToRemove < newPhotos.length - 1) {
      for (let i = indexToRemove; i < newPhotos.length - 1; i++) {
        newPhotos[i] = newPhotos[i + 1];
      }
      newPhotos[newPhotos.length - 1] = null; // Clear the last element after shifting
    }
    setPhotos(newPhotos);
  };

  // --- FULLY REVISED validateForm function ---
  const validateForm = () => {
    const newErrors = {};
    // Updated isNumeric to allow empty string for optional fields (as per previous instructions)
    const isNumeric = (val) => val === "" || /^\d+$/.test(val);

    // Required fields (exact error message as in image)
    if (!formData.type) newErrors.type = "This field is mandatory.";
    if (!formData.bhk) newErrors.bhk = "This field is mandatory.";
    if (!formData.bathrooms) newErrors.bathrooms = "This field is mandatory.";
    if (!formData.furnishing) newErrors.furnishing = "This field is mandatory.";
    if (!formData.listedBy) newErrors.listedBy = "This field is mandatory.";
    if (!formData.adTitle) newErrors.adTitle = "This field is mandatory.";
    if (!formData.description)
      newErrors.description = "This field is mandatory.";
    if (!formData.state) newErrors.state = "This field is mandatory.";

    // Photo validation - exactly as in image
    if (!photos[0]) newErrors.photos = "This field is mandatory.";

    // Numeric and required fields (exact error message as in image)
    if (!formData.superBuiltupArea) {
      newErrors.superBuiltupArea = "This field is mandatory.";
    } else if (!isNumeric(formData.superBuiltupArea)) {
      newErrors.superBuiltupArea = "Invalid number."; // Changed from "Must be a valid number."
    }

    if (!formData.carpetArea) {
      newErrors.carpetArea = "This field is mandatory.";
    } else if (!isNumeric(formData.carpetArea)) {
      newErrors.carpetArea = "Invalid number."; // Changed from "Must be a valid number."
    }

    if (!formData.price) {
      newErrors.price = "This field is mandatory.";
    } else if (!isNumeric(formData.price)) {
      newErrors.price = "Invalid price."; // Changed from "Price must be a valid number."
    }

    // Optional numeric fields (only validate if filled)
    if (formData.maintenance && !isNumeric(formData.maintenance)) {
      newErrors.maintenance = "Invalid number.";
    }
    if (formData.totalFloors && !isNumeric(formData.totalFloors)) {
      newErrors.totalFloors = "Invalid number.";
    }
    if (formData.floorNo && !isNumeric(formData.floorNo)) {
      newErrors.floorNo = "Invalid number.";
    }

    // Mobile number validation (exact error message as in image)
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "This field is mandatory.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number."; // Kept this as it's a standard validation msg
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostAd = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Submitting data:", { ...formData, photos });
      alert("Ad posted successfully! (Check console for data)");
      // --- CORRECT: Navigate AFTER successful validation ---
      navigate("/confirmation");
    } else {
      console.log("Form validation failed.");
      // No alert needed here as errors are displayed next to fields
      // alert("Please fill all the mandatory fields correctly."); // Removed this
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full font-sans flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase">
        POST YOUR AD
      </h1>{" "}
      {/* Capitalized as in image */}
      <div className="w-full max-w-3xl mx-auto bg-white shadow-sm border border-gray-300 rounded-sm overflow-hidden">
        {" "}
        {/* Adjusted shadow and rounded corners */}
        {/* Header section (re-styled to match image) */}
        <div className="py-4 px-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          {" "}
          {/* Adjusted padding-y and padding-x */}
          <div>
            <p className="text-xl text-black font-bold tracking-wide">
              SELECTED CATEGORY
            </p>{" "}
            {/* tracking-wide */}
            <div className="flex items-center justify-between mt-2 gap-2.5">
              <p className="font-semibold text-sm text-gray-400">
                Properties / For Sale: Houses & Apartments
              </p>
              <Link
                to="/" // Assuming a route to go back to category selection
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Change
              </Link>
            </div>
          </div>
        </div>
        <main className="pb-8">
          {" "}
          {/* Added pb for overall bottom padding */}
          <form onSubmit={handlePostAd} noValidate>
            <IncludeDetailsSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSelect={handleSelect}
            />
            <PriceSection
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              handleChange={handleChange}
            />
            <PhotoUploadSection
              photos={photos}
              error={errors.photos}
              onFileSelect={handleFileSelect}
              onRemove={handleRemovePhoto}
            />

            <LocationSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            <ReviewDetailsSection
              formData={formData}
              setFormData={setFormData}
            />

            <div className="mt-8 px-8">
              {" "}
              {/* Adjusted mt and px */}
             <Link to="/confirmation">
              <button
                type="submit"
                className="w-28 h-12 bg-gray-200 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
              >
                POST NOW
              </button>
             </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
