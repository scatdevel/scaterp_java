import React from 'react';
import { Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';

const CropDetailsView = () => {
  const location = useLocation();
  const { savedCrops } = location.state || { savedCrops: [] };

  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
      <Card className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-4 rounded-t-lg">
          <Typography variant="h4" className="font-semibold">
            Saved Crop Details
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          {savedCrops.length > 0 ? (
            savedCrops.map(crop => (
              <div key={crop.id} className="border p-4 rounded-lg mb-4">
                <Typography variant="h6" className="mb-4">Crop Details</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Crop Name</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.cropName}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Actual Production (ton)</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.actualProduction}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Projected Production (ton)</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.projectedProduction}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Cultivation Land Value</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.cultivationLandValue}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Land Value Unit</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.landValueUnit}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Cost (per ton/kg)</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.cost}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Project Cost (per ton/kg)</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.projectCost}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Projection Timeline</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-white">
                      <span>{crop.projectionTimelineValue} {crop.projectionTimelineType}</span>
                    </div>
                  </div>

                  {crop.image && (
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-600">Crop Image</label>
                      <img src={crop.image} alt="Crop" className="w-full h-auto rounded-lg border border-gray-300 p-2" />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h6" className="text-center">
              No crops saved.
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CropDetailsView;
