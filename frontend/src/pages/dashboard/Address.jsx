import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Address = () => {
  const { t } = useTranslation();
  const [landDetails, setLandDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  const fetchAllLandDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/land-details/all');
      setLandDetails(response.data);
    } catch (error) {
      console.error('Error fetching land details:', error);
      setError('Failed to fetch land details. Please try again.');
    }
  };

  useEffect(() => {
    fetchAllLandDetails();
  }, []);

  const handleEditClick = (detail) => {
    setCurrentDetail(detail);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setCurrentDetail(null);
  };

  const handleSaveChanges = async (updatedDetail) => {
    try {
      await axios.put(`http://localhost:8080/users/land-details/${updatedDetail.id}`, updatedDetail);
      fetchAllLandDetails(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error('Error updating land details:', error);
      setError('Failed to update land details. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/land-details/${id}`);
      fetchAllLandDetails(); // Refresh the list
    } catch (error) {
      console.error('Error deleting land details:', error);
      setError('Failed to delete land details. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">{t('LandDetails')}</h2>
      {error && <p className="text-red-500">{error}</p>}

      {landDetails.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border-b">{t('village')}</th>
              <th className="py-2 border-b">{t('district')}</th>
              <th className="py-2 border-b">{t('state')}</th>
              <th className="py-2 border-b">{t('pincode')}</th>
              <th className="py-2 border-b">{t('address')}</th>
              <th className="py-2 border-b">{t('street')}</th>
              <th className="py-2 border-b">{t('cultivationType')}</th>
              <th className="py-2 border-b">{t('landOwnership')}</th>
              <th className="py-2 border-b">{t('width')}</th>
              <th className="py-2 border-b">{t('breadth')}</th>
              <th className="py-2 border-b">{t('area')}</th>
              <th className="py-2 border-b">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {landDetails.map((detail) => (
              <tr key={detail.id} className="hover:bg-gray-100">
                <td className="py-2 border-b">{detail.village}</td>
                <td className="py-2 border-b">{detail.district}</td>
                <td className="py-2 border-b">{detail.state}</td>
                <td className="py-2 border-b">{detail.pincode}</td>
                <td className="py-2 border-b">{detail.address}</td>
                <td className="py-2 border-b">{detail.street}</td>
                <td className="py-2 border-b">{detail.cultivationType}</td>
                <td className="py-2 border-b">{detail.landOwnership}</td>
                <td className="py-2 border-b">{detail.width}</td>
                <td className="py-2 border-b">{detail.breadth}</td>
                <td className="py-2 border-b">{detail.area}</td>
                <td className="py-2 border-b">
                  <button onClick={() => handleEditClick(detail)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {t('Edit')}
                  </button>
                  <button onClick={() => handleDelete(detail.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    {t('Delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">{t('noLandDetailsAvailable')}</p>
      )}

      {isEditing && (
        <EditModal
          detail={currentDetail}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

const EditModal = ({ detail, onClose, onSave }) => {
  const [updatedDetail, setUpdatedDetail] = useState(detail);

  useEffect(() => {
    setUpdatedDetail(detail);
  }, [detail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetail((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80 mx-4"> {/* Adjusted width here */}
        <h3 className="text-lg font-bold mb-4">Edit Land Details</h3>
        <input 
          type="text"
          name="village"
          value={updatedDetail.village}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Village"
        />
        <input 
          type="text"
          name="district"
          value={updatedDetail.district}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="District"
        />
        <input 
          type="text"
          name="state"
          value={updatedDetail.state}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="State"
        />
        <input 
          type="text"
          name="pincode"
          value={updatedDetail.pincode}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Pincode"
        />
        <input 
          type="text"
          name="address"
          value={updatedDetail.address}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Address"
        />
        <input 
          type="text"
          name="street"
          value={updatedDetail.street}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Street"
        />
        <input 
          type="text"
          name="cultivationType"
          value={updatedDetail.cultivationType}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Cultivation Type"
        />
        <input 
          type="text"
          name="landOwnership"
          value={updatedDetail.landOwnership}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Land Ownership"
        />
        <input 
          type="number"
          name="width"
          value={updatedDetail.width}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Width"
        />
        <input 
          type="number"
          name="breadth"
          value={updatedDetail.breadth}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Breadth"
        />
        <input 
          type="number"
          name="area"
          value={updatedDetail.area}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Area"
        />
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => onSave(updatedDetail)} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Changes
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
