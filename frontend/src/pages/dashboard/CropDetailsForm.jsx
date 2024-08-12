import React, { useState } from "react";
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCrops = crops.map(crop => ({
      ...crop,
      image: crop.image ? URL.createObjectURL(crop.image) : null
    }));
    navigate('/saved-crops', { state: { savedCrops: updatedCrops } });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
      <Card className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-6 rounded-t-xl shadow-md">
          <Typography variant="h4" className="font-bold">
            Crop Details Form
          </Typography>
        </CardHeader>
        <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-white shadow-md rounded-xl p-6 border border-gray-300 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Crop Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Crop Name</label>
                    <input
                      type="text"
                      name="cropName"
                      value={crop.cropName}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder="Enter crop name"
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
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
                      <div className="relative">
                        <img
                          src={crop.imagePreview}
                          alt="Image preview"
                          className="mt-2 max-w-full h-auto rounded-md border border-gray-200 shadow-sm"
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
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
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
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Land Value Unit and Cultivation Land Value */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Land Value Unit & Cultivation Land Value</label>
                    <div className="grid grid-cols-2 gap-4">

                    <input
                        type="number"
                        name="cultivationLandValue"
                        value={crop.cultivationLandValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder="Enter value"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                      />
      
<select
  name="landValueUnit"
  value={crop.landValueUnit}
  onChange={(e) => handleChange(e, crop.id)}
  className="p-1 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out w-24 h-8"
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
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
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
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  {/* Projection Timeline Type and Value */}

                  
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Projection Timeline</label>
                    <div className="grid grid-cols-2 gap-4">


                    <input
                        type="number"
                        name="projectionTimelineValue"
                        value={crop.projectionTimelineValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder="Enter value"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                      />
                      <select
                        name="projectionTimelineType"
                        value={crop.projectionTimelineType}
                        onChange={(e) => handleChange(e, crop.id)}
                        className="p-1 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out w-24 h-8"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Days">Day</option>
                        <option value="Months">Month</option>
                      </select>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <Button type="button" color="gray" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" color="green">
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CropDetailsForm;
