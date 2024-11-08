import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Address = () => {
  const { t, i18n } = useTranslation();
  const [landDetails, setLandDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (detailToDelete) {
      try {
        await axios.delete(`http://localhost:8080/users/land-details/${detailToDelete.id}`);
        fetchAllLandDetails(); // Refresh the list
        setIsConfirmingDelete(false);
        setDetailToDelete(null);
      } catch (error) {
        console.error('Error deleting land details:', error);
        setError('Failed to delete land details. Please try again.');
      }
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('Land Details')}</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {landDetails.length > 0 ? (
          landDetails.map((detail) => (
            <div 
              key={detail.id} 
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <h3 className="text-xl font-semibold text-blue-600">{detail.village}</h3>
              <p><strong>{t('district')}: </strong>{detail.district}</p>
              <p><strong>{t('state')}: </strong>{detail.state}</p>
              <p><strong>{t('pincode')}: </strong>{detail.pincode}</p>
              <p><strong>{t('address')}: </strong>{detail.address}</p>
              <p><strong>{t('street')}: </strong>{detail.street}</p>
              <p><strong>{t('cultivationType')}: </strong>{detail.cultivationType}</p>
              <p><strong>{t('landOwnership')}: </strong>{detail.landOwnership}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEditClick(detail)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  {t('Edit')}
                </button>
                <button onClick={() => { setDetailToDelete(detail); setIsConfirmingDelete(true); }} className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  {t('Delete')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">{t('noLandDetailsAvailable')}</p>
        )}
      </div>

      {isEditing && (
        <EditModal
          detail={currentDetail}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          t={t} // Pass t function
        />
      )}

      {isConfirmingDelete && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmingDelete(false)}
          message={t('Confirm delete address? This action cannot be undone.')}
          t={t} // Pass t function
        />
      )}
    </div>
  );
};

const EditModal = ({ detail, onClose, onSave, t }) => {
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-4">
        <h3 className="text-xl font-semibold mb-4 text-center">{t('Edit')} {t('LandDetails')}</h3>
        {['village', 'district', 'state', 'pincode', 'address', 'street', 'cultivationType', 'landOwnership'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={field}>
              {t(field)}
            </label>
            <input 
              type="text"
              id={field}
              name={field}
              value={updatedDetail[field]}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t(`Enter ${field}`)}
            />
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => onSave(updatedDetail)} 
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          >
            {t('Save Changes')}
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition"
          >
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel, message, t }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-4">
        <h3 className="text-lg font-semibold mb-4 text-center">{message}</h3>
        <div className="flex justify-between mt-4">
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
          >
            {t('Delete')}
          </button>
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition"
          >
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
