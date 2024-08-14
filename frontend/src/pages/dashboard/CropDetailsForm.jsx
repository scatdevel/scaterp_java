import React, { useState } from "react";
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Ensure axios is installed

const CropDetailsForm = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([{
    id: Date.now(),
    cropName: '',
    actualProduction: '',
    projectedProduction: '',
    cultivationLandValue: '',
    landValueUnit: '',
    cost: '',
    projectCost: '',
    image: null,
    imagePreview: '',
    projectionTimelineType: '',
    projectionTimelineValue: ''
  }]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e, id) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const imagePreview = URL.createObjectURL(file);
      setCrops(crops.map(crop =>
        crop.id === id ? {
          ...crop,
          [name]: file,
          imagePreview: imagePreview
        } : crop
      ));
    } else {
      setCrops(crops.map(crop =>
        crop.id === id ? { ...crop, [name]: value } : crop
      ));
    }
  };

  const handleAddCrop = () => {
    setCrops([...crops, {
      id: Date.now(),
      cropName: '',
      actualProduction: '',
      projectedProduction: '',
      cultivationLandValue: '',
      landValueUnit: '',
      cost: '',
      projectCost: '',
      image: null,
      imagePreview: '',
      projectionTimelineType: '',
      projectionTimelineValue: ''
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      crops.forEach(crop => {
        formData.append('crops', JSON.stringify(crop)); // Ensure crop object is valid
        if (crop.image) {
          formData.append('images', crop.image, crop.image.name);
        }
      });
  
      const response = await axios.post('http://localhost:8080/users/saveCrop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data); // Check response
      setSuccessMessage('Crops successfully saved!');
      setErrorMessage(''); // Clear any previous error message
      navigate('/crop-overview', { state: { savedCrops: crops } });
    } catch (error) {
      console.error("Error saving crops:", error);
      setErrorMessage('Failed to save crops. Please try again.');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-gray-200 min-h-screen py-12 flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-300">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-5 rounded-t-lg">
          <Typography variant="h4" className="font-bold">Crop Details Form</Typography>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-300 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Crop Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Crop Name</label>
                    <input
                      type="text"
                      name="cropName"
                      value={crop.cropName}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter crop name"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Crop Image */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Crop Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => handleChange(e, crop.id)}
                      className="border border-gray-300 rounded-md p-2 text-base"
                    />
                    {crop.imagePreview && (
                      <div className="relative mt-2">
                        <img
                          src={crop.imagePreview}
                          alt="Image preview"
                          className="w-full h-auto rounded-md border border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  {/* Actual Production */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Actual Production</label>
                    <input
                      type="number"
                      name="actualProduction"
                      value={crop.actualProduction}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter actual production"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Projected Production */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Projected Production</label>
                    <input
                      type="number"
                      name="projectedProduction"
                      value={crop.projectedProduction}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter projected production"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Land Value Unit and Cultivation Land Value */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Land Value Unit & Cultivation Land Value</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="cultivationLandValue"
                        value={crop.cultivationLandValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder="Enter value"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      />
                      <select
                        name="landValueUnit"
                        value={crop.landValueUnit}
                        onChange={(e) => handleChange(e, crop.id)}
                        className="p-1 text-xs h-8 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      >
                        <option value="">Select Unit</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                      </select>
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cost</label>
                    <input
                      type="number"
                      name="cost"
                      value={crop.cost}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter cost"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Project Cost */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Cost</label>
                    <input
                      type="number"
                      name="projectCost"
                      value={crop.projectCost}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter project cost"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Projection Timeline */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Projection Timeline</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="projectionTimelineValue"
                        value={crop.projectionTimelineValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder="Enter value"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      />
                      
<select
  name="projectionTimelineType"
  value={crop.projectionTimelineType}
  onChange={(e) => handleChange(e, crop.id)}
  className="p-1 text-xs h-8 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
  required
>
  <option value="">Select Type</option>
  <option value="month">Months</option>
  <option value="year">Days</option>
</select>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddCrop()}
                  className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Crop
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">Save</Button>
              <Button type="button" onClick={handleCancel} className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
            </div>
            {successMessage && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-md">
                {errorMessage}
              </div>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CropDetailsForm;
