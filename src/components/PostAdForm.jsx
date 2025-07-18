import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// --- Generic UI Components ---

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-400" // Slightly lighter gray for icon
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
  // Adjusted padding-x to match the image's internal spacing within the main white box.
  // The bottom border is consistent with the image.
  <div className="py-6 border-b border-gray-200 last:border-b-0 px-8">
    <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const ButtonGroup = ({ label, options, selected, onSelect, error }) => (
  // Increased mb to match spacing
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-4 py-2 text-sm border rounded-md transition-colors duration-200 
            ${selected === option
              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold" // OLX blue shade for selected state
              : "bg-white border-gray-300 text-gray-800 hover:border-blue-500" // Standard text color, border matches image
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
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 font-semibold text-lg">
            {prefix}
          </span>
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
        className={`w-full h-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base text-gray-800 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : ""
        } ${prefix ? "pl-8 pr-3" : "px-3"}`} // Adjust pl and pr for general padding
      />
      {showCharCount && (
        <span className="absolute right-3 bottom-2 text-xs text-gray-400"> {/* Gray 400 for char count */}
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
          error
            ? "border-red-500 focus:ring-red-500"
            : ""
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
      className={`w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-base text-gray-800 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : ""
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

    {/* Using a single column grid with default gaps for vertical stacking */}
    <div>
      <InputField
        label="Super Builtup area sqft *"
        name="superBuiltupArea"
        value={formData.superBuiltupArea}
        onChange={handleChange}
        error={errors.superBuiltupArea}
        placeholder="Super Builtup area"
        type="number" // Ensure numeric input
      />
      <InputField
        label="Carpet Area sqft *"
        name="carpetArea"
        value={formData.carpetArea}
        onChange={handleChange}
        error={errors.carpetArea}
        placeholder="Carpet Area"
        type="number" // Ensure numeric input
      />
      <InputField
        label="Maintenance (Monthly)"
        name="maintenance"
        value={formData.maintenance}
        onChange={handleChange}
        error={errors.maintenance}
        placeholder="Monthly Maintenance"
        type="number" // Ensure numeric input
      />
      <InputField
        label="Total Floors"
        name="totalFloors"
        value={formData.totalFloors}
        onChange={handleChange}
        error={errors.totalFloors}
        placeholder="Total Floors"
        type="number" // Ensure numeric input
      />
      <InputField
        label="Floor No."
        name="floorNo"
        value={formData.floorNo}
        onChange={handleChange}
        error={errors.floorNo}
        placeholder="Floor Number"
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
      placeholder="Project name"
    />
    <InputField
      label="Ad title *"
      name="adTitle"
      value={formData.adTitle}
      onChange={handleChange}
      error={errors.adTitle}
      maxLength={70}
      showCharCount={true}
      placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
    />
    <TextareaField
      label="Description *"
      name="description"
      value={formData.description}
      onChange={handleChange}
      error={errors.description}
      maxLength={4096}
      showCharCount={true}
      placeholder="Include condition, features and reason for selling"
    />
  </FormSection>
);

const PriceSection = ({ formData, errors, handleChange }) => (
  <FormSection title="SET A PRICE">
    <InputField
      label="Price *"
      name="price"
      value={formData.price}
      onChange={handleChange}
      error={errors.price}
      prefix="₹"
      placeholder="0"
      type="number"
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
    e.stopPropagation(); // Prevent triggering handleBoxClick
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
      {/* Adjusted grid columns and gap to match the image, and refined border styles */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {Array.from({ length: 20 }).map((_, index) => { // Render 20 boxes explicitly
          const photo = photos[index];
          return (
            <div
              key={index}
              onClick={() => handleBoxClick(index, !!photo)}
              className={`relative aspect-square border rounded-md flex flex-col items-center justify-center text-center cursor-pointer 
                          ${photo 
                              ? "border-gray-300" // Solid border for filled boxes
                              : "border-gray-400 border-dashed hover:border-blue-500" // Dashed border for empty, blue on hover
                          } 
                          overflow-hidden text-sm text-gray-600`} // Default text styling for 'Add Photo'
            >
              {photo ? (
                <>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Upload ${index}`}
                    className="w-full h-full object-cover"
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
                  {index !== 0 && (
                     <span className="text-xs text-gray-600 mt-1">
                       Add Photo
                     </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>} {/* Added ml-1 */}
    </FormSection>
  );
};

const LocationSection = ({ formData, errors, handleChange }) => (
  <FormSection title="CONFIRM YOUR LOCATION">
    <p className="text-xs text-gray-500 mb-2 font-medium tracking-wider">CURRENT LOCATION</p> {/* Matched text style */}
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
    <div className="flex items-center gap-4 py-4 px-3 bg-gray-50 rounded-sm border border-gray-300"> {/* Adjusted padding and border/rounded */}
      <img
        src="https://placehold.co/60x60/4A5568/FFFFFF?text=RS" // Placeholder for user image
        alt="User"
        className="w-16 h-16 rounded-full border border-gray-300" // Adjusted border color
      />
      <div>
        <p className="font-bold text-gray-800">Raman Selwan</p>
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
      type="tel" // Use 'tel' for mobile numbers, better for mobile devices
      maxLength={10} // Enforce 10 digits
      placeholder="Mobile Phone Number" // Added placeholder
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
    for (let i = (type === "cover" ? 1 : 0); i < newPhotos.length && fileIndex < files.length; i++) {
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
    if (!formData.description) newErrors.description = "This field is mandatory.";
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
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center py-8">
      <h1 className="text-xl font-bold text-gray-800 mb-6 uppercase">POST YOUR AD</h1> {/* Capitalized as in image */}
      <div className="w-full max-w-2xl mx-auto bg-white shadow-sm border border-gray-300 rounded-sm overflow-hidden"> {/* Adjusted shadow and rounded corners */}
        
        {/* Header section (re-styled to match image) */}
        <div className="py-4 px-8 border-b border-gray-200 flex justify-between items-center bg-gray-50"> {/* Adjusted padding-y and padding-x */}
          <div>
            <p className="text-xs text-gray-500 font-normal tracking-wide">SELECTED CATEGORY</p> {/* tracking-wide */}
            <p className="font-semibold text-sm text-gray-800">
              Properties / For Sale: Houses & Apartments
            </p>
          </div>
          <Link
            to="/choose-category" // Assuming a route to go back to category selection
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Change
          </Link>
        </div>

        <main className="pb-8"> {/* Added pb for overall bottom padding */}
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
            <div className="mt-8 px-8"> {/* Adjusted mt and px */}
              <button
                type="submit"
                className="w-1/4 bg-gray-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
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