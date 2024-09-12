import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Box
} from '@mui/material';
import axios from 'axios';

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/all'); // Replace with your API endpoint
        console.log('API Response:', response.data); // Log the response to inspect it
        setFarmers(response.data);
      } catch (error) {
        setError('Error fetching farmers. Please try again later.');
        console.error('Error fetching farmers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Typography color="error" variant="h6" align="center">
      {error}
    </Typography>
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Farmers List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Picture</TableCell> 
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {farmers.map((farmer) => {
  console.log('Farmer data:', farmer); // Add this to debug each farmer's data
  return (
    <TableRow key={farmer.id}>
      <TableCell>{farmer.id}</TableCell>
      <TableCell>
        <img
          src={`http://localhost:8080/users/image/${farmer.username}` || 'https://via.placeholder.com/50'}
          alt={farmer.username}
          style={{ width: 50, height: 50, borderRadius: '50%' }}
          onError={(e) => e.target.src = 'https://via.placeholder.com/50'} // Fallback image on error
        />
      </TableCell>
      <TableCell>{farmer.username}</TableCell>
      <TableCell>{farmer.email || 'N/A'}</TableCell>
      <TableCell>{farmer.phoneNumber || 'N/A'}</TableCell>
    </TableRow>
  );
})}
      </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FarmersList;    //--------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Typography, CircularProgress, Box
// } from '@mui/material';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';

// const FarmersList = () => {
//   const { t } = useTranslation();
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/farmers/all'); // Replace with your API endpoint
//         console.log('API Response:', response.data); // Log the response to inspect it
//         setFarmers(response.data);
//       } catch (error) {
//         setError(t('error')); // Use the translation for the error message
//         console.error('Error fetching farmers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFarmers();
//   }, [t]);

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <CircularProgress />
//     </Box>
//   );

//   if (error) return (
//     <Typography color="error" variant="h6" align="center">
//       {error}
//     </Typography>
//   );

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         {t('FarmersList')}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>{t('id')}</TableCell>
//               <TableCell>{t('picture')}</TableCell> {/* Translated Column for Farmer's Picture */}
//               <TableCell>{t('name')}</TableCell>
//               <TableCell>{t('email')}</TableCell>
//               <TableCell>{t('phone')}</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {farmers.map((farmer) => (
//               <TableRow key={farmer.id}>
//                 <TableCell>{farmer.id}</TableCell>
//                 <TableCell>
//                   <img
//                     src={`http://localhost:8080/farmers/images/${farmer.profilePictureUrl}`}
//                     alt={farmer.username}
//                     style={{ width: 100, height: 100, borderRadius: '50%' }}
//                   />
//                 </TableCell>
//                 <TableCell>{farmer.username}</TableCell>
//                 <TableCell>{farmer.email || 'N/A'}</TableCell>
//                 <TableCell>{farmer.phoneNumber || 'N/A'}</TableCell>
//               </TableRow>
//             ))} 
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default FarmersList;


// import React, { useEffect, useState } from 'react';   //------------
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Typography, CircularProgress, Box
// } from '@mui/material';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';

// const FarmersList = () => {
//   const { t } = useTranslation();
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/farmers/all'); // Replace with your API endpoint
//         // console.log('API Response:', response.data); // Log the response to inspect it
//         //console.log(response.data);
        
//         setFarmers(response.data);
//       } catch (error) {
//         setError(t('error')); // Use the translation for the error message
//         console.error('Error fetching farmers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFarmers();
//   }, [t]);

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <CircularProgress />
//     </Box>
//   );

//   if (error) return (
//     <Typography color="error" variant="h6" align="center">
//       {error}
//     </Typography>
//   );

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         {t('FarmersList.title')}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>{t('farmersList.id')}</TableCell>
//               <TableCell>{t('farmersList.picture')}</TableCell> {/* Translated Column for Farmer's Picture */}
//               <TableCell>{t('farmersList.name')}</TableCell>
//               <TableCell>{t('farmersList.email')}</TableCell>
//               <TableCell>{t('farmersList.phone')}</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {farmers.map((farmer) => (
//               <TableRow key={farmer.id}>
//                 <TableCell>{farmer.id}</TableCell>
//                 <TableCell>
//                   <img
//                     src={`http://localhost:8080/farmers/images/${farmer.profilePictureUrl}`}
//                     alt={farmer.username}
//                     style={{ width: 100, height: 100, borderRadius: '50%' }}
//                   />
//                 </TableCell>
//                 <TableCell>{farmer.username}</TableCell>
//                 <TableCell>{farmer.email || 'N/A'}</TableCell>
//                 <TableCell>{farmer.phoneNumber || 'N/A'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default FarmersList;

                                                                                                                                                                                   

// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Typography, CircularProgress, Box
// } from '@mui/material';
// import axios from 'axios';

// const FarmersList = () => {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/farmers/all'); // Replace with your API endpoint
//         console.log('API Response:', response.data); // Log the response to inspect it
//         setFarmers(response.data);
//       } catch (error) {
//         setError('Error fetching farmers. Please try again later.');
//         console.error('Error fetching farmers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFarmers();
//   }, []);

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <CircularProgress />
//     </Box>
//   );

//   if (error) return (
//     <Typography color="error" variant="h6" align="center">
//       {error}
//     </Typography>
//   );

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         Farmers List
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Picture</TableCell> {/* Column for Farmer's Picture */}
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {farmers.map((farmer) => (
//               <TableRow key={farmer.id}>
//                 <TableCell>{farmer.id}</TableCell>
//                 <TableCell>
//                   <img
//                     src={farmer.profilePictureUrl|| 'https://via.placeholder.com/50'} // Show the image or placeholder
//                     alt={farmer.username || 'Farmer'} // Alt text for the image
//                     style={{ width: 50, height: 50, borderRadius: '50%' }}
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }} // Fallback if the image fails to load
//                   />
//                 </TableCell>
//                 <TableCell>{farmer.username || 'N/A'}</TableCell>
//                 <TableCell>{farmer.email || 'N/A'}</TableCell> {/* Default to 'N/A' if email is missing */}
//                 <TableCell>{farmer.phoneNumber || 'N/A'}</TableCell> {/* Default to 'N/A' if phone is missing */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default FarmersList;

