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
        const response = await axios.get('http://localhost:8080/farmers/all'); // Replace with your API endpoint
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
              <TableCell>Picture</TableCell> {/* New Column for Farmer's Picture */}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.id}>
                
                <TableCell >{farmer.id}</TableCell>
                <TableCell>
                  <img
                    src={farmer.profilePictureUrl   || 'https://via.placeholder.com/50'} // Use a placeholder image if pictureUrl is missing
                    alt={farmer.name}
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{farmer.username}</TableCell>
                <TableCell>{farmer.email || 'N/A'}</TableCell> {/* Default to 'N/A' if email is missing */}
                <TableCell>{farmer.phoneNumber || 'N/A'}</TableCell> {/* Default to 'N/A' if phone is missing */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FarmersList;

                                                                                                                                                                                   

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

