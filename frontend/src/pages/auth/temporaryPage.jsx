// import React from 'react';
// import { Button, Typography } from "@material-tailwind/react";
// import { useNavigate } from 'react-router-dom';

// export function TemporaryPage() {
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token'); // Retrieve the token from localStorage

//   const handleGoToReset = () => {
//     if (token) {
//       // Navigate to reset password page with the token as a query parameter
//       navigate(`/auth/reset-password?token=${encodeURIComponent(token)}`);
//     } else {
//       console.error('Token is missing.');
//     }
//   };

//   return (
//     <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
//         <div className="text-center mb-6">
//           <Typography variant="h4" className="font-bold mb-2 text-gray-800">Reset Link Sent!</Typography>
//           <Typography variant="paragraph" color="blue-gray" className="text-lg">
//             <b>Welcome, user!</b> Click the reset link to reset your password.
//           </Typography>
//         </div>
//         <Button onClick={handleGoToReset} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
//           Go to Reset Password Page
//         </Button>
//       </div>
//     </section>
//   );
// }

// export default TemporaryPage;




import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function TemporaryPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const handleGoToReset = () => {
    if (token) {
      // Navigate to reset password page with the token as a query parameter
      navigate(`/auth/reset-password?token=${encodeURIComponent(token)}`);
    } else {
      console.error('Token is missing.');
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2 text-gray-800">Reset Link Sent!</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            <b>Welcome, user!</b> Click the reset link to reset your password.
          </Typography>
        </div>
        {token ? (
          <Button onClick={handleGoToReset} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
            Go to Reset Password Page
          </Button>
        ) : (
          <Typography variant="small" color="red" className="text-center mt-4">
            Token is missing. Please request a new password reset link.
          </Typography>
        )}
      </div>
    </section>
  );
}

export default TemporaryPage;
