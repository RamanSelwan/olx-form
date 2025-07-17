import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// --- Generic UI Components ---

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const FormSection = ({ title, children }) => (
  <div className="py-6 border-b border-gray-200 ">
    <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const ButtonGroup = ({ label, options, selected, onSelect, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-4 py-2 text-sm border rounded-md transition-colors duration-200 ${
            selected === option
              ? "bg-cyan-100 border-cyan-500 text-cyan-700 font-semibold"
              : "bg-white border-gray-300 hover:border-gray-400"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// --- MODIFIED: InputField to accept a prefix ---
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
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 font-semibold">{prefix}</span>
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
        className={`w-full py-2 border rounded-md focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-cyan-500"
        } ${prefix ? "pl-7 pr-3" : "px-3"}`}
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

// --- NEW: TextareaField component ---
const TextareaField = ({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  showCharCount = false,
}) => (
  <div className="mb-4">
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
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-cyan-500"
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
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 bg-white ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-cyan-500"
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
      options={["Apartment", "Builder Floor", "Farm House", "House & Villa"]}
      selected={formData.type}
      onSelect={(val) => handleSelect("type", val)}
      error={errors.type}
    />
    <ButtonGroup
      label="BHK *"
      options={["1", "2", "3", "4", "4+"]}
      selected={formData.bhk}
      onSelect={(val) => handleSelect("bhk", val)}
      error={errors.bhk}
    />
    <ButtonGroup
      label="Bathrooms *"
      options={["1", "2", "3", "4", "4+"]}
      selected={formData.bathrooms}
      onSelect={(val) => handleSelect("bathrooms", val)}
      error={errors.bathrooms}
    />
    <ButtonGroup
      label="Furnishing *"
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
      label="Listed By *"
      options={["Builder", "Dealer", "Owner"]}
      selected={formData.listedBy}
      onSelect={(val) => handleSelect("listedBy", val)}
      error={errors.listedBy}
    />

    <div className="grid grid-cols-1 gap-x-6">
      <InputField
        label="Super Builtup area sqft *"
        name="superBuiltupArea"
        value={formData.superBuiltupArea}
        onChange={handleChange}
        error={errors.superBuiltupArea}
      />
      <InputField
        label="Carpet Area sqft *"
        name="carpetArea"
        value={formData.carpetArea}
        onChange={handleChange}
        error={errors.carpetArea}
      />
      <InputField
        label="Maintenance (Monthly)"
        name="maintenance"
        value={formData.maintenance}
        onChange={handleChange}
        error={errors.maintenance}
      />
      <InputField
        label="Total Floors"
        name="totalFloors"
        value={formData.totalFloors}
        onChange={handleChange}
        error={errors.totalFloors}
      />
      <InputField
        label="Floor No."
        name="floorNo"
        value={formData.floorNo}
        onChange={handleChange}
        error={errors.floorNo}
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
    {/* --- USE NEW TextareaField --- */}
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

// --- MODIFIED: PriceSection to use prefix correctly ---
const PriceSection = ({ formData, errors, handleChange }) => (
  <FormSection title="SET A PRICE">
    <InputField
      label="Price *"
      name="price"
      value={formData.price}
      onChange={handleChange}
      error={errors.price}
      prefix="₹"
    />
  </FormSection>
);

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
    e.stopPropagation();
    onRemove(index);
  };

  return (
    <FormSection title="UPLOAD UP TO 20 PHOTOS">
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
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index, !!photo)}
            className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 relative"
          >
            {photo ? (
              <>
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
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
                <CameraIcon />
                {index === 0 && (
                  <span className="text-xs text-gray-600 mt-1">
                    Add Cover Photo
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </FormSection>
  );
};

const LocationSection = ({ formData, errors, handleChange }) => (
  <FormSection title="CONFIRM YOUR LOCATION">
    <SelectField
      label="State *"
      name="state"
      value={formData.state}
      onChange={handleChange}
      options={["Haryana", "Punjab", "Delhi", "Uttar Pradesh", "Rajasthan"]}
      error={errors.state}
    />
  </FormSection>
);

const ReviewDetailsSection = () => (
  <FormSection title="REVIEW YOUR DETAILS">
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
      <img
        src="https://placehold.co/60x60/4A5568/FFFFFF?text=RS"
        alt="User"
        className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
      />
      <div>
        <p className="font-bold">Raman Selwan</p>
        <p className="text-sm text-gray-600">Your details are safe with us.</p>
      </div>
    </div>
  </FormSection>
);

const VerificationSection = ({ formData, errors, handleChange }) => (
  <FormSection title="LET'S VERIFY YOUR ACCOUNT">
    <p className="text-sm text-gray-600 mb-4">
      We will send you a confirmation code by sms on the next step.
    </p>
    <InputField
      label="Mobile Phone Number *"
      name="mobileNumber"
      value={formData.mobileNumber}
      onChange={handleChange}
      error={errors.mobileNumber}
    />
  </FormSection>
);

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
  });

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
    if (type === "cover") {
      newPhotos[0] = files[0];
    } else {
      let fileIndex = 0;
      for (let i = 1; i < newPhotos.length && fileIndex < files.length; i++) {
        if (newPhotos[i] === null) {
          newPhotos[i] = files[fileIndex];
          fileIndex++;
        }
      }
    }
    setPhotos(newPhotos);
    e.target.value = null;
  };

  const handleRemovePhoto = (indexToRemove) => {
    const newPhotos = [...photos];
    newPhotos[indexToRemove] = null;
    setPhotos(newPhotos);
  };

  // --- FULLY REVISED validateForm function ---
  const validateForm = () => {
    const newErrors = {};
    const isNumeric = (val) => /^\d+$/.test(val);

    // Required fields
    if (!formData.type) newErrors.type = "Type is required.";
    if (!formData.bhk) newErrors.bhk = "BHK is required.";
    if (!formData.bathrooms) newErrors.bathrooms = "Bathrooms are required.";
    if (!formData.furnishing) newErrors.furnishing = "Furnishing is required.";
    if (!formData.listedBy) newErrors.listedBy = "Listed by is required.";
    if (!formData.adTitle) newErrors.adTitle = "Ad title is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.state) newErrors.state = "State is required.";
    
    // Photo validation
    if (!photos[0]) newErrors.photos = "A cover photo is mandatory.";

    // Numeric and required fields
    if (!formData.superBuiltupArea) {
      newErrors.superBuiltupArea = "Super Builtup area is required.";
    } else if (!isNumeric(formData.superBuiltupArea)) {
      newErrors.superBuiltupArea = "Must be a valid number.";
    }

    if (!formData.carpetArea) {
      newErrors.carpetArea = "Carpet area is required.";
    } else if (!isNumeric(formData.carpetArea)) {
      newErrors.carpetArea = "Must be a valid number.";
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (!isNumeric(formData.price)) {
      newErrors.price = "Price must be a valid number.";
    }
    
    // Optional numeric fields
    if (formData.maintenance && !isNumeric(formData.maintenance)) {
        newErrors.maintenance = "Must be a valid number.";
    }
    if (formData.totalFloors && !isNumeric(formData.totalFloors)) {
        newErrors.totalFloors = "Must be a valid number.";
    }
    if (formData.floorNo && !isNumeric(formData.floorNo)) {
        newErrors.floorNo = "Must be a valid number.";
    }

    // Mobile number validation
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
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
      alert("Please fill all the mandatory fields correctly.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-md">
        <header className="p-4 border-b text-center">
          <h1 className="text-xl font-bold text-gray-800">POST YOUR AD</h1>
        </header>
        <main className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handlePostAd} noValidate>
            <div className="py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">SELECTED CATEGORY</p>
                <p className="font-semibold">
                  Properties / For Sale: Houses & Apartments
                </p>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-cyan-600 hover:underline"
              >
                Change
              </button>
            </div>
            <IncludeDetailsSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSelect={handleSelect}
            />
            <PriceSection
              formData={formData}
              errors={errors}
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
            />
            <ReviewDetailsSection />
            <VerificationSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
            <div className="mt-8">
              {/* --- CORRECT: Removed Link wrapper from button --- */}
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white font-bold py-3 rounded-md hover:bg-cyan-700 transition-colors duration-300"
              >
                POST NOW
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}