import { Card, CardBody } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from 'axios';

export function Tables() {
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
    area: "",
  });
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

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
      const response = await axios.get(`https://api.postalpincode.in/pincode/${formData.pincode}`);
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
        setError('Invalid Pincode.');
        setFormData((prevState) => ({
          ...prevState,
          village: "",
          district: "",
          state: "",
        }));
        setIsFieldsDisabled(false);
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      setError('Failed to fetch location details. Please try again.');
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
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBlvXBISfsHw8e6zLp-RGqI6xhKSw2KmuM`
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
              setError('Unable to retrieve address from location. Please try again.');
              setFormData((prevState) => ({
                ...prevState,
                address: "",
              }));
            }
          } catch (error) {
            console.error('Error reverse geocoding location:', error);
            setError('Failed to retrieve address from location. Please check your network connection.');
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          setError('Failed to get current location. Please allow location access.');
          setIsFetchingLocation(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pincode) {
      setError('Pincode is required.');
      return;
    }
    if (!formData.village || !formData.district || !formData.address) {
      setError('Please provide all location details.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/users/land-details/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Form submitted successfully!');
        setError(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="relative mt-12 mb-8 flex flex-col gap-12 p-6 bg-gray-20 rounded-lg shadow-lg h-screen">
      <CardBody className="px-6 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* Address field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-gray-700">Address</label>
              <div className="relative flex items-center border border-gray-300 rounded-lg shadow-sm">
                <i className="text-gray-500 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#FF7E8B" width="40" height="20" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="iRDDBk">
                    <title>location-fill</title>
                    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
                  </svg>
                </i>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="p-3 border-0 bg-white text-gray-800 placeholder-gray-500 flex-1 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                 
                />
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-2 cursor-pointer flex items-center text-xs" onClick={getCurrentLocation}>
                      <i className="text-red-500 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#EF4F5F" width="12" height="12" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="kyPUnV">
                          <title>current-location</title>
                          <path d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM10 0.425c-5.286 0-9.575 4.289-9.575 9.575s4.289 9.575 9.575 9.575c5.286 0 9.575-4.289 9.575-9.575v0c0-5.286-4.289-9.575-9.575-9.575v0zM16.633 10.833c-0.375 3.044-2.856 5.524-5.9 5.899v2.018h-1.467v-2.018c-3.044-0.375-5.524-2.856-5.899-5.9h-2.018v-1.467h2.018c0.375-3.044 2.856-5.524 5.9-5.899v-2.018h1.467v2.018c3.044 0.375 5.524 2.856 5.899 5.9h2.018v1.467h-2.018z"></path>
                        </svg>
                      </i>
                      {isFetchingLocation ? 'Fetching...' : 'Locate on Map'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Village field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="village" className="text-gray-700">Village</label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                disabled={isFieldsDisabled}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter village name"
              />
            </div>

            {/* District field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="district" className="text-gray-700">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                disabled={isFieldsDisabled}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter district"
              />
            </div>

            {/* Pincode field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="pincode" className="text-gray-700">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter pincode"
              />
            </div>

            {/* State field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="state" className="text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={isFieldsDisabled}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
              />
            </div>

            {/* Street field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="street" className="text-gray-700">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street name"
              />
            </div>

            {/* Cultivation Type field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cultivationType" className="text-gray-700">Cultivation Type</label>
              <select
                id="cultivationType"
                name="cultivationType"
                value={formData.cultivationType}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Cultivation Type</option>
                <option value="Organic">Organic</option>
                <option value="Conventional">Conventional</option>
                <option value="Hydroponic">Hydroponic</option>
              </select>
            </div>

            {/* Land Ownership field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="landOwnership" className="text-gray-700">Land Ownership</label>
              <select
                id="landOwnership"
                name="landOwnership"
                value={formData.landOwnership}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Land Ownership</option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                <option value="Rented">Rented</option>
              </select>
            </div>

            {/* Width field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="width" className="text-gray-700">Width (in meters)</label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter width"
              />
            </div>

            {/* Breadth field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="breadth" className="text-gray-700">Breadth (in meters)</label>
              <input
                type="number"
                id="breadth"
                name="breadth"
                value={formData.breadth}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter breadth"
              />
            </div>

            {/* Area field (auto-generated) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="area" className="text-gray-700">Area (in square meters)</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                readOnly
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
                placeholder="Auto-calculated area"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
          
          <button
    type="submit"
    className="bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 text-sm"
    style={{ width: '5rem', height: '2rem', padding: '0.10rem', aspectRatio: '5' }}
  >
    Submit
  </button>


        </form>
      </CardBody>
    </div>
  );
}

export default Tables;
