// S

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const displayedCrops = crops.slice(startIndex, endIndex);

//   return (
//     <div className="bg-gray-100 min-h-screen py-6 px-4 flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h6" className="text-green-600 font-semibold text-lg">
//         {t('cropOverview')}
//         </Typography>


//         <div className="absolute top-1 right-14 flex space-x-2 z-20">
//           <img
//             src="/img/en-flag.png"
//             alt="English"
//             className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//             onClick={() => i18n.changeLanguage('en')}
//           />
//           <img
//             src="/img/ta-flag.png"
//             alt="Tamil"
//             className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//             onClick={() => i18n.changeLanguage('ta')}
//           />
//         </div>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <Typography variant="body2" className="text-gray-500">{t('loading')}</Typography>
//         </div>
//       ) : errorMessage ? (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative">
//           {errorMessage}
//         </div>
//       ) : displayedCrops.length === 0 ? (
//         <Typography variant="body2" className="text-gray-500 text-center col-span-full">
//           {t('noCrops')}
//         </Typography>
//       ) : (
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//             {displayedCrops.map((crop) => (
//               <Card
//                 key={crop.id}
//                 className="shadow-md rounded-lg border border-gray-200 overflow-hidden transition-transform transform hover:scale-105"
//               >
//                 <CardBody className="p-4 flex flex-col h-full">
//                   {crop.imageUrl ? (
//                     <img 
//                       src={crop.imageUrl}
//                       alt={crop.cropName}
//                       className="w-full h-48 object-cover rounded-lg border border-gray-200 mb-3"
//                       onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'}
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-200 rounded-lg border border-gray-200 mb-3 flex items-center justify-center">
//                       <Typography variant="body2" className="text-gray-500">{t('noImageAvailable')}</Typography>
//                     </div>
//                   )}
//                   <Typography variant="subtitle2" className="font-semibold mb-2 text-center text-sm">
//                     {crop.cropName}
//                   </Typography>
//                   <div className="flex flex-col space-y-2 text-xs">
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('actualProduction')}:</span> {crop.actualProduction}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('projectedProduction')}:</span> {crop.projectedProduction}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('cultivationLandValue')}:</span> {crop.cultivationLandValue} {crop.landValueUnit}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('cost')}:</span> ${crop.cost}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('projectCost')}:</span> ${crop.projectCost}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-700">
//                       <span className="font-semibold">{t('projectionTimeline')}:</span> {crop.projectionTimelineValue} {crop.projectionTimelineType}
//                     </Typography>
//                   </div>
//                 </CardBody>
//               </Card>
//             ))}
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <Button
//               variant="outlined"
//               color="gray"
//               size="sm"
//               onClick={() => handlePageChange('prev')}
//               disabled={currentPage === 1}
//             >
//               {t('previous')}
//             </Button>
//             <Typography variant="body2" className="text-gray-700">
//               Page {currentPage}
//             </Typography>
//             <Button
//               variant="outlined"
//               color="gray"
//               size="sm"
//               onClick={() => handlePageChange('next')}
//               disabled={endIndex >= crops.length}
//             >
//             {t('next')}
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

//  export default CropOverview;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 10;

const CropOverview = () => {
  const { t, i18n } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/crops/all', {
          // Include token or authentication headers if required
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Replace with actual token handling
          }
        });
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crop details:", error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          navigate('/login');
        } else {
          setErrorMessage('Failed to fetch crop details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [navigate]);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, Math.ceil(crops.length / ITEMS_PER_PAGE));
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 1);
      }
      return prevPage;
    });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedCrops = crops.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="text-green-600 font-semibold text-lg">
        {t('cropOverview')}
        </Typography>


        <div className="absolute top-1 right-14 flex space-x-2 z-20">
          <img
            src="/img/en-flag.png"
            alt="English"
            className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
            onClick={() => i18n.changeLanguage('en')}
          />
          <img
            src="/img/ta-flag.png"
            alt="Tamil"
            className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
            onClick={() => i18n.changeLanguage('ta')}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Typography variant="body2" className="text-gray-500">{t('loading')}</Typography>
        </div>
      ) : errorMessage ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative">
          {errorMessage}
        </div>
      ) : displayedCrops.length === 0 ? (
        <Typography variant="body2" className="text-gray-500 text-center col-span-full">
          {t('noCrops')}
        </Typography>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {displayedCrops.map((crop) => (
              <Card
                key={crop.id}
                className="shadow-md rounded-lg border border-gray-200 overflow-hidden transition-transform transform hover:scale-105"
              >
                <CardBody className="p-4 flex flex-col h-full">
                  {crop.imageUrl ? (
                    <img 
                      src={crop.imageUrl}
                      alt={crop.cropName}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 mb-3"
                      onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg border border-gray-200 mb-3 flex items-center justify-center">
                      <Typography variant="body2" className="text-gray-500">{t('noImageAvailable')}</Typography>
                    </div>
                  )}
                  <Typography variant="subtitle2" className="font-semibold mb-2 text-center text-sm">
                    {crop.cropName}
                  </Typography>
                  <div className="flex flex-col space-y-2 text-xs">
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('actualProduction')}:</span> {crop.actualProduction}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('projectedProduction')}:</span> {crop.projectedProduction}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('cultivationLandValue')}:</span> {crop.cultivationLandValue} {crop.landValueUnit}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('cost')}:</span> ${crop.cost}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('projectCost')}:</span> ${crop.projectCost}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <span className="font-semibold">{t('projectionTimeline')}:</span> {crop.projectionTimelineValue} {crop.projectionTimelineType}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outlined"
              color="gray"
              size="sm"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              {t('previous')}
            </Button>
            <Typography variant="body2" className="text-gray-700">
              Page {currentPage}
            </Typography>
            <Button
              variant="outlined"
              color="gray"
              size="sm"
              onClick={() => handlePageChange('next')}
              disabled={endIndex >= crops.length}
            >
            {t('next')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

 export default CropOverview;