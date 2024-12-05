
import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

const CropDetailsForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [crops, setCrops] = useState([{
    id: Date.now(),
    cropName: '',
    actualProduction: '',
    projectedProduction: '',
    cultivationLandValue: '',
    landValueUnit: '',
    cost: '',
    projectCost: '',
    // image: null,
    imagePreview: '',
    imageUrl: '',
    projectionTimelineType: '',
    projectionTimelineValue: '',
    // categoryId: ''
    actualProductionUnit: '',
    projectedProductionUnit: '',
    weatherData: '', // New field for weather data
    soilType: '', // New field for soil type
    harvestDate: '' // New field for harvest date
  }]);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddCropButton, setShowAddCropButton] = useState(true);

 const token = useSelector((state) => state.auth.token);
 
  useEffect(() => {
    if (token) {
      console.log("Token:", token);
    }
  }, [token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/crops/categories/get/all', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [token]);

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
      actualProductionUnit: '',
      projectedProductionUnit: '',
      categoryId: '',
      weatherData: '', // New field for weather data
      soilType: '', // New field for soil type
      harvestDate: '' // New field for harvest date
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
        formData.append('actualProductionUnit', crop.actualProductionUnit); 
        formData.append('projectedProduction', crop.projectedProduction);
        formData.append('projectedProductionUnit', crop.projectedProductionUnit); 
        formData.append('cultivationLandValue', crop.cultivationLandValue);
        formData.append('landValueUnit', crop.landValueUnit);
        formData.append('cost', crop.cost);
        formData.append('projectCost', crop.projectCost);
        formData.append('projectionTimelineType', crop.projectionTimelineType);
        formData.append('projectionTimelineValue', crop.projectionTimelineValue);
        formData.append('categoryId', crop.categoryId); // Include category ID
   


          formData.append('image', crop.image);
         // Adding the new fields
      formData.append('weatherData', crop.weatherData);
      formData.append('soilType', crop.soilType);
      formData.append('farmingMethod', crop.farmingMethod);
      formData.append('harvestDate', crop.harvestDate);

        await axios.post('http://localhost:8080/users/crops/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        });
      }

      setSuccessMessage('Crop details successfully saved!');
      setErrorMessage('');
      navigate('/crop-overview');
    }  catch (error) {
      if (error.response) {
        // Server responded with a status other than 200-299
        console.error("Backend error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network error:", error.request);
      } else {
        // Something else happened
        console.error("Error:", error.message);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (!isNaN(number)) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR', // Change to Indian Rupees (INR)
      }).format(number);
    }
    return value;
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
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

      <Card className="w-full h-screen bg-white shadow-lg rounded-lg border border-gray-300">

        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-5 rounded-t-lg">
          <Typography variant="h4" className="font-bold">{t('cropDetailsForm')}</Typography>
        </CardHeader>

        <CardBody className="p-6 h-full overflow-auto">

          <form onSubmit={handleSubmitDetails} className="space-y-8">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-300 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('cropName')}</label>
                    <input
                      type="text"
                      name="cropName"
                      value={crop.cropName}
                      onChange={(e) => handleChange(e, crop.id)}
                      placeholder={t('enterCropName')}
                      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('category')}</label>
                    <select
                      name="categoryId"
                      value={crop.categoryId}
                      onChange={(e) => handleChange(e, crop.id)}
                      className="p-2 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                      required
                    >
                      <option value="">{t('selectCategory')}</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('cropImage')}</label>
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
                          alt={t('imagePreview')}
                          className="w-full h-auto rounded-md border border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
  <label className="text-sm font-medium text-gray-700">{t('actualProduction')}</label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="number"
      name="actualProduction"
      value={crop.actualProduction}
      onChange={(e) => handleChange(e, crop.id)}
      placeholder={t('enterActualProduction')}
      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
      required
    />
    <select
      name="actualProductionUnit"
      value={crop.actualProductionUnit}
      onChange={(e) => handleChange(e, crop.id)}
      className="p-1 text-xs border border-gray-300 rounded-md w-30 h-8 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
    >
      <option value="kg">{t('kgs')}</option>
      <option value="ton">{t('tons')}</option>
      {/* Add more units as needed */}
    </select>
  </div>
</div>


<div className="flex flex-col space-y-2">
  <label className="text-sm font-medium text-gray-700">{t('projectedProduction')}</label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="number"
      name="projectedProduction"
      value={crop.projectedProduction}
      onChange={(e) => handleChange(e, crop.id)}
      placeholder={t('enterProjectedProduction')}
      className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
      required
    />
    <select
      name="projectedProductionUnit"
      value={crop.projectedProductionUnit}
      onChange={(e) => handleChange(e, crop.id)}
      className="p-1 text-xs border border-gray-300 rounded-md w-30 h-8 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
    >
      <option value="kg">{t('kgs')}</option>
      <option value="ton">{t('tons')}</option>
      {/* Add more units as needed */}
    </select>
  </div>
</div>


  {/* Weather Data */}
  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('weatherData')}</label>
                    <select
                      name="weatherData"
                      value={crop.weatherData}
                      onChange={(e) => handleChange(e, crop.id)}
                      className="p-3 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                    >
                      <option value="">{t('selectWeatherData')}</option>
                      <option value="Rainy">{t('rainy')}</option>
                      <option value="Sunny">{t('sunny')}</option>
                      <option value="Cloudy">{t('cloudy')}</option>
                    </select>
                  </div>

                  {/* Soil Type */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('soilType')}</label>
                    <select
                      name="soilType"
                      value={crop.soilType}
                      onChange={(e) => handleChange(e, crop.id)}
                      className="p-3 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                    >
                      <option value="">{t('selectSoilType')}</option>
                      <option value="Loamy">{t('loamy')}</option>
                      <option value="Sandy">{t('sandy')}</option>
                      <option value="Clayey">{t('clayey')}</option>
                    </select>
                  </div>

                  

                  {/* Harvest Date */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('harvestDate')}</label>
                    <input
                      type="date"
                      name="harvestDate"
                      value={crop.harvestDate}
                      onChange={(e) => handleChange(e, crop.id)}
                      className="p-3 text-base border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                    />
                  </div>
                
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('landValueUnit')} & {t('cultivationLandValue')}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="cultivationLandValue"
                        value={crop.cultivationLandValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder={t('enterValue')}
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      />
                      <select
                        name="landValueUnit"
                        value={crop.landValueUnit}
                        onChange={(e) => handleChange(e, crop.id)}
                        className="p-1 text-xs border border-gray-300 rounded-md w-30 h-8 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      >
                        <option value="">{t('selectUnit')}</option>
                        <option value="per-acre">{t('acres')}</option>
                        <option value="per-hectare">{t('hectares')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
  <div className="flex items-center space-x-4">
    <div className="flex-1">
      <label className="text-sm font-medium text-gray-700">{t('cost')}</label>
      <input
        type="number"
        name="cost"
        value={crop.cost}
        onChange={(e) => handleChange(e, crop.id)}
        placeholder={t('cost')}
        className="p-3 border border-gray-300 rounded-md text-base w-full focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
        required
      />
      {/* Display the formatted currency value */}
      {crop.cost && (
        <span className="text-gray-500 mt-1 block">
          {formatCurrency(crop.cost)}
        </span>
      )}
    </div>
    <div className="flex-1">
      <label className="text-sm font-medium text-gray-700">{t('projectCost')}</label>
      <input
        type="number"
        name="projectCost"
        value={crop.projectCost}
        onChange={(e) => handleChange(e, crop.id)}
        placeholder={t('Enter Project Cost')}
        className="p-3 border border-gray-300 rounded-md text-base w-full focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
        required
      />
      {/* Display the formatted currency value */}
      {crop.projectCost && (
        <span className="text-gray-500 mt-1 block">
          {formatCurrency(crop.projectCost)}
        </span>
      )}
    </div>


    
  </div>
</div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('projectionTimeline')}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="projectionTimelineValue"
                        value={crop.projectionTimelineValue}
                        onChange={(e) => handleChange(e, crop.id)}
                        placeholder={t('enterTimelineValue')}
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      />
                      <select
                        name="projectionTimelineType"
                        value={crop.projectionTimelineType}
                        onChange={(e) => handleChange(e, crop.id)}
                        className="p-1 text-xs border border-gray-300 rounded-md w-30 h-8 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-300 ease-in-out"
                        required
                      >
                        <option value="">{t('selectTimelineType')}</option>
                        <option value="month">{t('months')}</option>
                        <option value="day">{t('days')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {crops.length > 1 && (
                  <Button
                    type="button"
                    color="red"
                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    onClick={() => setCrops(crops.filter(c => c.id !== crop.id))}
                  >
                    {t('remove')}
                  </Button>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between mt-4 space-x-4">
              <Button
                type="button"
                color="green"
                onClick={handleAddCrop}
                className={`px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm focus:ring-green-500 transition duration-300 ease-in-out ${showAddCropButton ? "block" : "hidden"}`}
              >
                {t('addCrop')}
              </Button>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  color="red"
                  onClick={handleCancel}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:ring-red-500 transition duration-300 ease-in-out"
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  color="blue"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  {t('save')}
                </Button>
              </div>
            </div>

            {successMessage && <div className="text-green-600">{successMessage}</div>}
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CropDetailsForm;
