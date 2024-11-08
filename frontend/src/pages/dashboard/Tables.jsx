
import { Card, CardBody } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"; // Import useSelector from Redux

export function Tables() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    village: "",
    district: "",
    pincode: "",
    address: "",
    state: "",
    street: "",
    locateonmap: "",
    cultivationType: "",
    landOwnership: "",
    width: "",
    breadth: "",
    area: ""
  });
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  // Access JWT token from Redux store using useSelector
  const token = useSelector((state) => state.auth.token); // Access the token from Redux store
   console.log("token :", token);
   


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "width" || name === "breadth") {
      const width = formData.width || 0;
      const breadth = formData.breadth || 0;
      setFormData((prevState) => ({
        ...prevState,
        area: (width * breadth).toFixed(2),
      }));
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const fetchLocationDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${formData.pincode}`
      );
      const data = response.data;
      if (data && data[0] && data[0].PostOffice) {
        const postOffice = data[0].PostOffice[0];
        setFormData((prevState) => ({
          ...prevState,
          village: postOffice.Name || "",
          district: postOffice.District || "",
          state: postOffice.State || "",
        }));
        setIsFieldsDisabled(true);
        setError(null);
      } else {
        setError("Invalid Pincode.");
        setFormData((prevState) => ({
          ...prevState,
          village: "",
          district: "",
          state: "",
        }));
        setIsFieldsDisabled(false);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setError("Failed to fetch location details. Please try again.");
      setFormData((prevState) => ({
        ...prevState,
        village: "",
        district: "",
        state: "",
      }));
      setIsFieldsDisabled(false);
    }
  };

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchLocationDetails();
    }
  }, [formData.pincode]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      setError(null); // Reset any previous errors
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setFormData((prevState) => ({
            ...prevState,
            locateonmap: `${lat},${lng}`,
          }));

          try {
            const geocodeResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            if (geocodeResponse.data && geocodeResponse.data.results[0]) {
              const result = geocodeResponse.data.results[0];
              const address = result.formatted_address;
              setFormData((prevState) => ({
                ...prevState,
                address: address,
              }));
              setError(null);
            } else {
              setError(
                "Unable to retrieve address from location. Please try again."
              );
              setFormData((prevState) => ({
                ...prevState,
                address: "",
              }));
            }
          } catch (error) {
            console.error("Error reverse geocoding location:", error);
            setError(
              "Failed to retrieve address from location. Please check your network connection."
            );
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setError("Failed to get current location. Please allow location access.");
          setIsFetchingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pincode) {
      setError("Pincode is required.");
      return;
    }
    if (!formData.village || !formData.district || !formData.address) {
      setError("Please provide all location details.");
      return;
    }

    // Ensure JWT token exists
    if (!token) {
      setError("No authentication token found. Please log in again.");
      return;
    }

    const landDetailsReq = [{
      village: formData.village,
      district: formData.district,
      state: formData.state,
      address: formData.address,
      pincode: formData.pincode,
      street: formData.street,
      locateonmap: formData.locateonmap,
      cultivationType: formData.cultivationType,
      landOwnership: formData.landOwnership,
      width: formData.width,
      breadth: formData.breadth,
      area: formData.area,
    }];

    try {
      const response = await axios.post(
        "http://localhost:8080/users/land-details/submit",
        landDetailsReq,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // Sending JWT token
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Form submitted successfully!");
        setError(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
      setSuccessMessage(null);

      if (error.response && error.response.status === 401) {
        setError("Unauthorized! Please log in again.");
      }
    }
  };

  return (
    <div className="relative mt-12 mb-8 flex flex-col gap-12 p-6 bg-gray-20 rounded-lg shadow-lg h-screen">
      <div className="absolute top-1 right-14 flex space-x-2 z-20">
        <img
          src="/img/en-flag.png"
          alt="English"
          className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
          onClick={() => changeLanguage('en')}
        />
        <img
          src="/img/ta-flag.png"
          alt="Tamil"
          className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
          onClick={() => changeLanguage('ta')}
        />
      </div>
      <CardBody className="px-6 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Form Fields */}
          <div className="flex flex-col">
            <label htmlFor="village" className="text-sm font-semibold">{t('village')}</label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              disabled={isFieldsDisabled}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="district" className="text-sm font-semibold">{t('district')}</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              disabled={isFieldsDisabled}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pincode" className="text-sm font-semibold">{t('pincode')}</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-semibold">{t('address')}</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street" className="text-sm font-semibold">{t('street')}</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="locateonmap" className="text-sm font-semibold">{t('locateonmap')}</label>
            <input
              type="text"
              id="locateonmap"
              name="locateonmap"
              value={formData.locateonmap}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={isFetchingLocation}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              {isFetchingLocation ? 'Fetching Location...' : 'Get Current Location'}
            </button>
          </div>
          {/* Success/Error Messages */}
          {error && <div className="text-red-500">{error}</div>}
          {successMessage && <div className="text-green-500">{successMessage}</div>}
          {/* Submit Button */}
          <button type="submit" className="p-2 bg-green-500 text-white rounded">Submit</button>
        </form>
      </CardBody>
    </div>
  );
}
