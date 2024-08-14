import React from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const CropOverview = () => {
  const { state } = useLocation();
  const { savedCrops } = state || { savedCrops: [] };

  return (
    <div className="bg-gray-100 min-h-screen py-2 px-2 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-green-600 font-semibold">
          Crop Overview
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedCrops.length === 0 ? (
          <Typography variant="h6" className="text-gray-500 text-center">
            No crop details found.
          </Typography>
        ) : (
          savedCrops.map((crop) => (
            <Card key={crop.id} className="shadow-sm rounded-md border border-gray-200">
              <CardBody className="p-3">
                {/* Crop Name */}
                <Typography variant="h6" className="font-medium mb-1">
                  {crop.cropName}
                </Typography>

                {/* Crop Image */}
                {crop.image && (
                  <img
                    src={crop.image}
                    alt="Crop"
                    className="mb-3 max-w-full h-auto rounded-md border border-gray-200"
                  />
                )}

                {/* Details */}
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Actual Production: {crop.actualProduction}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Projected Production: {crop.projectedProduction}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Cultivation Land Value: {crop.cultivationLandValue} {crop.landValueUnit}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Cost: ${crop.cost}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Project Cost: ${crop.projectCost}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mb-1">
                  Projection Timeline: {crop.projectionTimelineValue} {crop.projectionTimelineType}
                </Typography>

                {/* More Details Button
                <Button variant="text" className="mt-3 text-blue-500 text-sm">
                  More Details
                </Button> */}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CropOverview;
