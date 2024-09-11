// import React, { useState } from "react";
// import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const CropDetailsForm = () => {
//   const navigate = useNavigate();
//   const [crops, setCrops] = useState([{
//     id: Date.now(),
//     cropName: '',
//     actualProduction: '',
//     projectedProduction: '',
//     cultivationLandValue: '',
//     landValueUnit: '',
//     cost: '',
//     projectCost: '',
//     image: null,
//     imagePreview: '',
//     imageUrl: '',
//     projectionTimelineType: '',
//   }]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showAddCropButton, setShowAddCropButton] = useState(true);

//   const handleChange = (e, id) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') {
//       const file = files[0];
//       const imagePreview = URL.createObjectURL(file);
//       setCrops(crops.map(crop =>
//         crop.id === id ? {
//           ...crop,
//           [name]: file,
//           imagePreview: imagePreview
//         } : crop
//       ));
//     } else {
//       setCrops(crops.map(crop =>
//         crop.id === id ? { ...crop, [name]: value } : crop
//       ));
//     }
//   };

//   const handleAddCrop = () => {
//     setCrops([...crops, {
//       id: Date.now(),
//       cropName: '',
//       actualProduction: '',
//       projectedProduction: '',
//       cultivationLandValue: '',
//       landValueUnit: '',
//       cost: '',
//       projectCost: '',
//       image: null,
//       imagePreview: '',
//       imageUrl: '',
//       projectionTimelineType: '',
//       projectionTimelineValue: ''
//     }]);
//     setShowAddCropButton(true);
//   };

//   const handleSubmitDetails = async (e) => {
//     e.preventDefault();

//     try {
//       // Loop through each crop and submit it separately
//       for (const crop of crops) {
//         const formData = new FormData();
//         formData.append('cropName', crop.cropName);
//         formData.append('actualProduction', crop.actualProduction);
//         formData.append('projectedProduction', crop.projectedProduction);
//         formData.append('cultivationLandValue', crop.cultivationLandValue);
//         formData.append('landValueUnit', crop.landValueUnit);
//         formData.append('cost', crop.cost);
//         formData.append('projectCost', crop.projectCost);
//         formData.append('projectionTimelineType', crop.projectionTimelineType);
//         formData.append('projectionTimelineValue', crop.projectionTimelineValue);
//         if (crop.image) {
//           formData.append('image', crop.image);
//         }

//         // Submit crop details with image included
//         const cropResponse = await axios.post('http://localhost:8080/users/crops/save', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         console.log(cropResponse.data);
//       }

//       setSuccessMessage('Crop details successfully saved!');
//       setErrorMessage('');
//       navigate('/crop-overview');

//     } catch (error) {
//       console.error("Error saving crop details:", error);
//       setErrorMessage('Failed to save crop details. Please try again.');
//       setSuccessMessage('');
//     }
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
//       <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-300">
//         <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-5 rounded-t-lg">
//           <Typography variant="h4" className="font-bold">Crop Details Form</Typography>
//         </CardHeader>
//         <CardBody className="p-6">
//           <form onSubmit={handleSubmitDetails} className="space-y-8">
//             {crops.map((crop) => (
//               <div key={crop.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-300 relative">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Crop Name</label>
//                     <input
//                       type="text"
//                       name="cropName"
//                       value={crop.cropName}
//                       onChange={(e) => handleChange(e, crop.id)}
//                       placeholder="Enter crop name"
//                       className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                       required
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Crop Category </label>
//                     <input
//                       name="image"
//                       onChange={(e) => handleChange(e, crop.id)}
//                       className="border border-gray-300 rounded-md p-2 text-base"
//                     />
//                     {crop.imagePreview && (
//                       <div className="relative mt-2">
//                         <img
//                           src={crop.imagePreview}
//                           alt="Image preview"
//                           className="w-full h-auto rounded-md border border-gray-200 shadow-sm"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Crop Image</label>
//                     <input
//                       type="file"
//                       name="image"
//                       onChange={(e) => handleChange(e, crop.id)}
//                       className="border border-gray-300 rounded-md p-2 text-base"
//                     />
//                     {crop.imagePreview && (
//                       <div className="relative mt-2">
//                         <img
//                           src={crop.imagePreview}
//                           alt="Image preview"
//                           className="w-full h-auto rounded-md border border-gray-200 shadow-sm"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Actual Production</label>
//                     <input
//                       type="number"
//                       name="actualProduction"
//                       value={crop.actualProduction}
//                       onChange={(e) => handleChange(e, crop.id)}
//                       placeholder="Enter actual production"
//                       className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Projected Production</label>
//                     <input
//                       type="number"
//                       name="projectedProduction"
//                       value={crop.projectedProduction}
//                       onChange={(e) => handleChange(e, crop.id)}
//                       placeholder="Enter projected production"
//                       className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Land Value Unit & Cultivation Land Value</label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="number"
//                         name="cultivationLandValue"
//                         value={crop.cultivationLandValue}
//                         onChange={(e) => handleChange(e, crop.id)}
//                         placeholder="Enter value"
//                         className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                         required
//                       />
//                       <select
//                         name="landValueUnit"
//                         value={crop.landValueUnit}
//                         onChange={(e) => handleChange(e, crop.id)}
//                         className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                         required
//                       >
//                         <option value="">Select Unit</option>
//                         <option value="acres">Acres</option>
//                         <option value="hectares">Hectares</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Cost</label>
//                     <input
//                       type="number"
//                       name="cost"
//                       value={crop.cost}
//                       onChange={(e) => handleChange(e, crop.id)}
//                       placeholder="Enter cost"
//                       className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Project Cost</label>
//                     <input
//                       type="number"
//                       name="projectCost"
//                       value={crop.projectCost}
//                       onChange={(e) => handleChange(e, crop.id)}
//                       placeholder="Enter project cost"
//                       className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Projection Timeline</label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="number"
//                         name="projectionTimelineValue"
//                         value={crop.projectionTimelineValue}
//                         onChange={(e) => handleChange(e, crop.id)}
//                         placeholder="Enter value"
//                         className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                         required
//                       />
//                       <select
//                         name="projectionTimelineType"
//                         value={crop.projectionTimelineType}
//                         onChange={(e) => handleChange(e, crop.id)}
//                         className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
//                         required
//                       >
//                         <option value="">Select Type</option>
//                         <option value="days">Days</option>
//                         <option value="months">Months</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {errorMessage && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                 {errorMessage}
//               </div>
//             )}
//             {successMessage && (
//               <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
//                 {successMessage}
//               </div>
//             )}

//             <div className="flex justify-between items-center">
//               <Button type="button" onClick={handleCancel} variant="outlined" color="red">
//                 Cancel
//               </Button>
//               <Button type="submit" color="green">
//                 Save
//               </Button>
//               {showAddCropButton && (
//                 <Button type="button" onClick={handleAddCrop} color="blue">
//                   Add Crop
//                 </Button>
//               )}
//             </div>
//           </form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default CropDetailsForm;  //--------------------------





import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    imageUrl: '',
    projectionTimelineType: '',
    projectionTimelineValue: '',
    cropCategory: ''  // Added cropCategory to state
  }]);
  const [categories, setCategories] = useState([]); // New state for crop categories
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddCropButton, setShowAddCropButton] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/crops/categories/get/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching crop categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
      imageUrl: '',
      projectionTimelineType: '',
      projectionTimelineValue: '',
      cropCategory: ''  // Added cropCategory to new crop state
    }]);
    setShowAddCropButton(true);
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    try {
      for (const crop of crops) {
        const formData = new FormData();
        formData.append('cropName', crop.cropName);
        formData.append('actualProduction', crop.actualProduction);
        formData.append('projectedProduction', crop.projectedProduction);
        formData.append('cultivationLandValue', crop.cultivationLandValue);
        formData.append('landValueUnit', crop.landValueUnit);
        formData.append('cost', crop.cost);
        formData.append('projectCost', crop.projectCost);
        formData.append('projectionTimelineType', crop.projectionTimelineType);
        formData.append('projectionTimelineValue', crop.projectionTimelineValue);
        formData.append('cropCategory', crop.cropCategory); // Added cropCategory
        if (crop.image) {
          formData.append('image', crop.image);
        }

        const cropResponse = await axios.post('http://localhost:8080/users/crops/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(cropResponse.data);
      }

      setSuccessMessage('Crop details successfully saved!');
      setErrorMessage('');
      navigate('/crop-overview');

    } catch (error) {
      console.error("Error saving crop details:", error);
      setErrorMessage('Failed to save crop details. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-300">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-5 rounded-t-lg">
          <Typography variant="h4" className="font-bold">Crop Details Form</Typography>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmitDetails} className="space-y-8">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-300 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Crop Category</label>
                    <select
                      name="cropCategory"
                      value={crop.cropCategory}
                      onChange={(e) => handleChange(e, crop.id)}
                      className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                        className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      >
                        <option value="">Select Unit</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                        <option value="sq_meters">Square Meters</option>
                      </select>
                    </div>
                  </div>

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
                        className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="months">Days</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                  
                    </div>
                  </div>
                </div>
                {showAddCropButton && (
                  <Button
                    type="button"
                    onClick={handleAddCrop}
                    className="mt-4 bg-green-600 text-white hover:bg-green-700"
                  >
                    Add Another Crop
                  </Button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>
          </form>
          {successMessage && (
            <div className="mt-4 text-green-600">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-red-600">
              {errorMessage}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CropDetailsForm;
