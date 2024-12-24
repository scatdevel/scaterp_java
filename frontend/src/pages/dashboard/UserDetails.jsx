// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const UserDetails = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [roles, setRoles] = useState([]); // For storing the roles
//     // const [newUserRole, setNewUserRole] = useState('');
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
//     const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
//     const [dialogType, setDialogType] = useState('');
//     const [dialogUserId, setDialogUserId] = useState(null);
//     const [dialogOldRole, setDialogOldRole] = useState('');
//     const [roleInput, setRoleInput] = useState('');
//     const [dialogRoleId, setDialogRoleId] = useState(null);
//     const [newUserEmail, setNewUserEmail] = useState('');
//     const [newUserPassword, setNewUserPassword] = useState('');
//     const [newUserUsername, setNewUserUsername] = useState('');
//     const [newUserRole, setNewUserRole] = useState('');
//     const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
//     const [emailError, setEmailError] = useState('');
// const [passwordError, setPasswordError] = useState('');

// useEffect(() => {
//     // Replace this URL with your actual API endpoint for fetching roles
//     fetch('http://localhost:8080/users/admin/roles')
//       .then((response) => response.json())
//       .then((data) => {
//         setRoles(data); // Assuming the response is an array of roles
//       })
//       .catch((error) => {
//         console.error('Error fetching roles:', error);
//       });
//   }, []);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         if (successMessage) {
//             const timer = setTimeout(() => {
//                 setSuccessMessage('');
//             }, 4000); // Show success message for 4 seconds

//             return () => clearTimeout(timer); // Clear timeout on component unmount
//         }
//     }, [successMessage]);

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get('http://localhost:8080/users/admin/fetch/all');
//             if (Array.isArray(response.data)) {
//                 const processedUsers = response.data.map(user => ({
//                     id: user.id,
//                     email: user.email,
//                     username: user.username,
//                     role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' }
//                 }));
//                 setUsers(processedUsers);
//             } else {
//                 setError('Unexpected response format');
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Email validation
//     const validateEmail = (email) => {
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         return emailRegex.test(email);
//     };

//     // Password validation
//     const validatePassword = (password) => {
//         // Password must be at least 6 characters, include at least one lowercase, one uppercase, and one number
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
//         return passwordRegex.test(password);
//     };
    
//     const handleCreateUser = async () => {
//         // Check if all required fields are filled
//         if (!newUserEmail || !newUserUsername || !newUserRole || !newUserPassword) {
//             setError('All fields are required.');
//             return;
//         }
    
//         // Validate email format
//         if (!newUserEmail || !validateEmail(newUserEmail)) {
//             setEmailError('Please enter a valid email.');
//             return;
//         } else {
//             setEmailError('');
//         }
    
//         // Validate password format
//         if (!newUserPassword || !validatePassword(newUserPassword)) {
//             setPasswordError('Password must be at least 6 characters long, include one uppercase, one lowercase, and one number.');
//             return;
//         } else {
//             setPasswordError('');
//         }
    
//         // Ensure other fields are filled
//         if (!newUserUsername || !newUserRole) {
//             setError('Username and role are required.');
//             return;
//         }
    
//         // Find the selected role
//         console.log('Selected Role ID:', newUserRole);
//         console.log('Roles Array:', roles);
    
//         // Ensure roles array is loaded
//         if (!roles || roles.length === 0) {
//             setError('Roles data is missing or not loaded.');
//             return;
//         }
    
//         const selectedRole = roles.find(role => role.id.toString() === newUserRole.toString()); // Convert both to strings
//         if (!selectedRole) {
//             console.log('Selected Role not found');
//             setError('Invalid role selected.');
//             return;
//         }
    
//         console.log('Selected Role:', selectedRole); // Log selected role for debugging
    
//         const payload = {
//             email: newUserEmail,
//             password: newUserPassword,
//             username: newUserUsername,
//             roleName : selectedRole.name
//         };
    
//         console.log('Payload:', payload); // Log the payload being sent to the backend
    
//         try {
//             await axios.post('http://localhost:8080/users/admin/createuser', payload);
//             setSuccessMessage('User created successfully!');
//             setNewUserEmail('');
//             setNewUserPassword('');
//             setNewUserUsername('');
//             setNewUserRole('');
//             setCreateUserDialogOpen(false);
//             fetchUsers(); // Refresh the user list
//         } catch (error) {
//             if (error.response) {
//                 console.error("Backend error:", error.response.data);  // Log error from backend
//                 setError(`Error: ${error.response.data.message || 'An error occurred'}`);
//             } else if (error.request) {
//                 console.error("Network error:", error.request); // Log network error
//                 setError('Network error. Please try again later.');
//             } else {
//                 console.error("Error:", error.message); // Log general error
//                 setError(`Error: ${error.message}`);
//             }
//         }
//     };
    

//     const handleEdit = async () => {
//         if (!roleInput || !dialogUserId) {
//             setError('Role name and user ID are required.');
//             return;
//         }

//         // Check if the old role is "No Role Assigned"
//         if (dialogOldRole === 'No Role Assigned') {
//             try {
//                 // Add role to user (instead of editing)
//                 await axios.post(`http://localhost:8080/users/admin/assign-role`, null, {
//                     params: {
//                         email: dialogUserId,
//                         roleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role assigned successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to assign role');
//             }
//         } else {
//             // Existing logic for editing the role
//             try {
//                 await axios.put('http://localhost:8080/users/admin/edit-role', null, {
//                     params: {
//                         email: dialogUserId,
//                         oldRoleName: dialogOldRole,
//                         newRoleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role edited successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to edit role');
//             }
//         }
//     };

//     const handleDelete = async () => {
//         if (!dialogRoleId) {
//             setError('Role ID is not defined.');
//             return;
//         }

//         try {
//             await axios.delete(`http://localhost:8080/users/admin/roles/${dialogRoleId}`);
//             setSuccessMessage('Role deleted successfully!');
//             setDeleteRoleDialogOpen(false);
//             fetchUsers();
//         } catch (err) {
//             setError(err.response?.data?.error || 'Failed to delete role');
//         }
//     };

//     const openAssignRoleDialog = (user, oldRole = '', type = 'assign') => {
//         if (user && user.email) {
//             setDialogUserId(user.email);
//         } else {
//             setError('Invalid user object or missing email.');
//         }
//         setDialogOldRole(oldRole);
//         setDialogType(type);
//         setRoleInput(type === 'edit' ? oldRole : '');
//         setAssignRoleDialogOpen(true);
//     };

//     const closeAssignRoleDialog = () => {
//         setAssignRoleDialogOpen(false);
//         setRoleInput('');
//         setDialogUserId(null);
//     };

//     const openDeleteRoleDialog = (userId, roleId) => {
//         setDialogUserId(userId);
//         setDialogRoleId(roleId);
//         setDeleteRoleDialogOpen(true);
//     };

//     const closeDeleteRoleDialog = () => {
//         setDeleteRoleDialogOpen(false);
//         setDialogRoleId(null);
//     };

//     const openCreateUserDialog = () => {
//         setCreateUserDialogOpen(true);
//     };
    
//     const closeCreateUserDialog = () => {
//         setCreateUserDialogOpen(false);
//         setNewUserEmail('');
//         setNewUserPassword('');
//         setNewUserUsername('');
//         setNewUserRole('');
//     };
    

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>User Detailss</h1>


//              {/* Create User Button */}
//         <button 
//             style={styles.createUserButton} 
//             onClick={openCreateUserDialog}
//         >
//             Create User
//         </button>

//             {loading && <p style={styles.loading}>Loading users...</p>}
//             {error && <p style={styles.error}>{error}</p>}
//             {successMessage && <p style={styles.success}>{successMessage}</p>}

//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th style={styles.tableHeader}>ID</th>
//                         <th style={styles.tableHeader}>Email</th>
//                         <th style={styles.tableHeader}>Roles</th>
//                         <th style={styles.tableHeader}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr
//                             key={user.id}
//                             style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
//                         >
//                             <td style={styles.tableCell}>{user.id}</td>
//                             <td style={styles.tableCell}>{user.email}</td>
//                             <td style={styles.tableCell}>
//                                 <span style={styles.roleBadge}>
//                                     {user.role?.name || 'No Role Assigned'}
//                                 </span>
//                             </td>
//                             <td style={styles.tableCell}>
//                                 <button
//                                     style={styles.actionButton}
//                                     onClick={() => openAssignRoleDialog(user, user.role?.name || '', 'edit')}
//                                     disabled={!user.role}  // Disable edit if no role
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     style={styles.actionButton}
//                                     onClick={() => openDeleteRoleDialog(user.email, user.role?.id)}
//                                     disabled={!user.role?.id}  // Disable delete if no role
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>


//             {createUserDialogOpen && (
//     <div style={styles.dialogOverlay}>
//         <div style={styles.dialog}>
//             <h2>Create User</h2>
//             <input
//                 type="email"
//                 value={newUserEmail}
//                 onChange={(e) => setNewUserEmail(e.target.value)}
//                 placeholder="Enter email"
//                 style={styles.input}
//             />
// {emailError && <p style={styles.error}>{emailError}</p>}
            
//             <input
//                 type="text"
//                 value={newUserUsername}
//                 onChange={(e) => setNewUserUsername(e.target.value)}
//                 placeholder="Enter username"
//                 style={styles.input}
//             />
//             {/* <input
//                 type="text"
//                 value={newUserRole}
//                 onChange={(e) => setNewUserRole(e.target.value)}
//                 placeholder="Enter role"
//                 style={styles.input}
//             /> */}
// <select
//   value={newUserRole}
//   onChange={(e) => setNewUserRole(e.target.value)}
//   style={styles.input} // You can use the same styles for the dropdown
// >
//   <option value="">Select a role</option>
//   {/* Example of dynamically rendering options */}
//   {roles.map((role) => (
//     <option key={role.id} value={role.id}>
//       {role.name}
//     </option>
//   ))}
// </select>

// <input
//                             type="password"
//                             value={newUserPassword}
//                             onChange={(e) => setNewUserPassword(e.target.value)}
//                             placeholder="Enter password"
//                             style={styles.input}
//                         />
//                         {passwordError && <p style={styles.error}>{passwordError}</p>}
//             <button onClick={handleCreateUser} style={styles.dialogButton}>Create</button>
//             <button onClick={closeCreateUserDialog} style={styles.dialogButton}>Cancel</button>
//         </div>
//     </div>
// )}


//             {/* Assign Role Dialog */}
//             {assignRoleDialogOpen && (
//                 <div style={styles.dialogOverlay}>
//                     <div style={styles.dialog}>
//                         <h2>{dialogType === 'assign' ? 'Assign Role' : 'Edit Role'}</h2>
//                         <input
//                             type="text"
//                             value={roleInput}
//                             onChange={(e) => setRoleInput(e.target.value)}
//                             placeholder="Enter role name"
//                             style={styles.input}
//                         />
//                         <button onClick={handleEdit} style={styles.dialogButton}>
//                             {dialogType === 'assign' ? 'Assign' : 'Edit'}
//                         </button>
//                         <button onClick={closeAssignRoleDialog} style={styles.dialogButton}>Cancel</button>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Role Dialog */}
//             {deleteRoleDialogOpen && (
//                 <div style={styles.dialogOverlay}>
//                     <div style={styles.dialog}>
//                         <h2>Delete Role</h2>
//                         <p>Are you sure you want to delete this role?</p>
//                         <button onClick={handleDelete} style={styles.dialogButton}>Delete</button>
//                         <button onClick={closeDeleteRoleDialog} style={styles.dialogButton}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//         backgroundColor: '#f4f6f9',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         maxWidth: '1200px',
//         margin: 'auto',
//     },
//     heading: {
//         marginBottom: '20px',
//         color: '#333',
//     },
//     loading: {
//         color: '#007bff',
//         fontWeight: 'bold',
//     },
//     error: {
//         color: '#dc3545',
//         fontWeight: 'bold',
//     },
//     success: {
//         color: '#28a745',
//         fontWeight: 'bold',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse',
//     },


//      // ... other styles
//      createUserButton: {
//         backgroundColor: '#28a745',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         borderRadius: '6px',
//         marginBottom: '20px',
//         transition: 'background-color 0.3s',
//     },
//     tableHeader: {
//         borderBottom: '2px solid #dee2e6',
//         padding: '12px',
//         textAlign: 'left',
//         backgroundColor: '#f8f9fa',
//         color: '#495057',
//     },
//     tableCell: {
//         padding: '12px',
//         borderBottom: '1px solid #dee2e6',
//         color: '#212529',
//     },
//     tableRowEven: {
//         backgroundColor: '#ffffff',
//     },
//     tableRowOdd: {
//         backgroundColor: '#f1f3f5',
//     },
//     roleBadge: {
//         backgroundColor: '#28a745',
//         color: 'white',
//         padding: '5px 10px',
//         borderRadius: '12px',
//         fontWeight: 'bold',
//     },
//     actionButton: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         padding: '8px 16px',
//         fontSize: '14px',
//         cursor: 'pointer',
//         borderRadius: '6px',
//         marginRight: '10px',
//         transition: 'background-color 0.3s',
//     },
//     dialogOverlay: {
//         position: 'fixed',
//         top: '0',
//         left: '0',
//         right: '0',
//         bottom: '0',
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dialog: {
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '8px',
//         width: '400px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         textAlign: 'center',
//     },
//     input: {
//         width: '100%',
//         padding: '12px',
//         marginBottom: '12px',
//         border: '1px solid #ced4da',
//         borderRadius: '6px',
//     },
//     dialogButton: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         borderRadius: '6px',
//         margin: '5px',
//         transition: 'background-color 0.3s',
//     },
// };

// export default UserDetails;



// import React, { useEffect, useState } from 'react'; //-----------------------------------------------------------------------------a
// import axios from 'axios';


// const UserDetails =  ({ currentUserRole }) => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [roles, setRoles] = useState([]); // For storing the roles
//     // const [newUserRole, setNewUserRole] = useState('');
//     const [error, setError] = useState(null);
//     const [selectedRole, setSelectedRole] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
//     const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
//     const [dialogType, setDialogType] = useState('');
//     const [dialogUserId, setDialogUserId] = useState(null);
//     const [dialogOldRole, setDialogOldRole] = useState('');
//     const [roleInput, setRoleInput] = useState('');
//     const [dialogRoleId, setDialogRoleId] = useState(null);
//     const [newUserEmail, setNewUserEmail] = useState('');
//     const [newUserPassword, setNewUserPassword] = useState('');
//     const [newUserUsername, setNewUserUsername] = useState('');
//     const [newUserRole, setNewUserRole] = useState('');
//     const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
//     const [emailError, setEmailError] = useState('');
// const [passwordError, setPasswordError] = useState('');
// const [walletBalanceInput, setWalletBalanceInput] = useState('');
//     const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
//     const [walletAmount, setWalletAmount] = useState('');
//     const [dialogUserEmail, setDialogUserEmail] = useState('');

// useEffect(() => {
//     // Replace this URL with your actual API endpoint for fetching roles
//     fetch('http://localhost:8080/users/admin/roles')
//       .then((response) => response.json())
//       .then((data) => {
//         setRoles(data); // Assuming the response is an array of roles
//       })
//       .catch((error) => {
//         console.error('Error fetching roles:', error);
//       });
//   }, []);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         if (successMessage) {
//             const timer = setTimeout(() => {
//                 setSuccessMessage('');
//             }, 4000); // Show success message for 4 seconds

//             return () => clearTimeout(timer); // Clear timeout on component unmount
//         }
//     }, [successMessage]);

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get('http://localhost:8080/users/admin/fetch/all');
//             if (Array.isArray(response.data)) {
//                 const processedUsers = response.data.map(user => ({
//                     id: user.id,
//                     email: user.email,
//                     username: user.username,
//                     role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' },
//                     walletBalance: user.walletBalance || 0, // Assume users have a walletBalance field
//                 }));
//                 setUsers(processedUsers);
//             } else {
//                 setError('Unexpected response format');
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleAddWalletBalance = async () => {
//         if (!walletAmount || isNaN(walletAmount) || walletAmount <= 0) {
//             setError('Please enter a valid amount.');
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8080/users/wallet/add-balance', {
//                 userId: dialogUserId,
//                 amount: walletAmount,
//             });
//             setSuccessMessage('Wallet balance added successfully!');
//             setAddWalletDialogOpen(false);
//             fetchUsers(); // Refresh the user list
//         } catch (err) {
//             setError(err.response?.data?.error || 'Failed to add wallet balance');
//         }
//     };

//     const filteredUsers = selectedRole
//         ? users.filter(user => user.role?.name === selectedRole)
//         : users;

//     // Email validation
//     const validateEmail = (email) => {
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         return emailRegex.test(email);
//     };

//     // Password validation
//     const validatePassword = (password) => {
//         // Password must be at least 6 characters, include at least one lowercase, one uppercase, and one number
//         const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{6,}$/;
//         return passwordRegex.test(password);
//     };
    
//     const handleCreateUser = async () => {
//         // Check if all required fields are filled
//         if (!newUserEmail || !newUserUsername || !newUserRole || !newUserPassword) {
//             setError('All fields are required.');
//             return;
//         }
    
//         // Validate email format
//         if (!newUserEmail || !validateEmail(newUserEmail)) {
//             setEmailError('Please enter a valid email.');
//             return;
//         } else {
//             setEmailError('');
//         }
    
//         // Validate password format
//         if (!newUserPassword || !validatePassword(newUserPassword)) {
//             setPasswordError('Password must be at least 6 characters long, include one uppercase, one lowercase, and one number.');
//             return;
//         } else {
//             setPasswordError('');
//         }
    
//         // Ensure other fields are filled
//         if (!newUserUsername || !newUserRole) {
//             setError('Username and role are required.');
//             return;
//         }
    
//         // Find the selected role
//         console.log('Selected Role ID:', newUserRole);
//         console.log('Roles Array:', roles);
    
//         // Ensure roles array is loaded
//         if (!roles || roles.length === 0) {
//             setError('Roles data is missing or not loaded.');
//             return;
//         }
    
//         const selectedRole = roles.find(role => role.id.toString() === newUserRole.toString()); // Convert both to strings
//         if (!selectedRole) {
//             console.log('Selected Role not found');
//             setError('Invalid role selected.');
//             return;
//         }
    
//         console.log('Selected Role:', selectedRole); // Log selected role for debugging
    
//         const payload = {
//             email: newUserEmail,
//             password: newUserPassword,
//             username: newUserUsername,
//             roleName : selectedRole.name
//         };
    
//         console.log('Payload:', payload); // Log the payload being sent to the backend
    
//         try {
//             await axios.post('http://localhost:8080/users/admin/createuser', payload);
//             setSuccessMessage('User created successfully!');
//             setNewUserEmail('');
//             setNewUserPassword('');
//             setNewUserUsername('');
//             setNewUserRole('');
//             setCreateUserDialogOpen(false);
//             fetchUsers(); // Refresh the user list
//         } catch (error) {
//             if (error.response) {
//                 console.error("Backend error:", error.response.data);  // Log error from backend
//                 setError(`Error: ${error.response.data.message} || 'An error occurred'}`);
//             } else if (error.request) {
//                 console.error("Network error:", error.request); // Log network error
//                 setError('Network error. Please try again later.');
//             } else {
//                 console.error("Error:", error.message); // Log general error
//                 setError(`Error: ${error.message}`);
//             }
//         }
//     };
    

//     const handleEdit = async () => {
//         if (!roleInput || !dialogUserId) {
//             setError('Role name and user ID are required.');
//             return;
//         }

//         // Check if the old role is "No Role Assigned"
//         if (dialogOldRole === 'No Role Assigned') {
//             try {
//                 // Add role to user (instead of editing)
//                 await axios.post(`http://localhost:8080/users/admin/assign-role`, null, {
//                     params: {
//                         email: dialogUserId,
//                         roleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role assigned successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to assign role');
//             }
//         } else {
//             // Existing logic for editing the role
//             try {
//                 await axios.put('http://localhost:8080/users/admin/edit-role', null, {
//                     params: {
//                         email: dialogUserId,
//                         oldRoleName: dialogOldRole,
//                         newRoleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role edited successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to edit role');
//             }
//         }
//     };

//     const handleDelete = async () => {
//         if (!dialogRoleId) {
//             setError('Role ID is not defined.');
//             return;
//         }

//         try {
//             await axios.delete(`http://localhost:8080/users/admin/roles/${dialogRoleId}`);
//             setSuccessMessage('Role deleted successfully!');
//             setDeleteRoleDialogOpen(false);
//             fetchUsers();
//         } catch (err) {
//             setError(err.response?.data?.error || 'Failed to delete role');
//         }
//     };

//     const openAssignRoleDialog = (user, oldRole = '', type = 'assign') => {
//         if (user && user.email) {
//             setDialogUserId(user.email);
//         } else {
//             setError('Invalid user object or missing email.');
//         }
//         setDialogOldRole(oldRole);
//         setDialogType(type);
//         setRoleInput(type === 'edit' ? oldRole : '');
//         setAssignRoleDialogOpen(true);
//     };

//     const closeAssignRoleDialog = () => {
//         setAssignRoleDialogOpen(false);
//         setRoleInput('');
//         setDialogUserId(null);
//     };

//     const openDeleteRoleDialog = (userId, roleId) => {
//         setDialogUserId(userId);
//         setDialogRoleId(roleId);
//         setDeleteRoleDialogOpen(true);
//     };

//     const closeDeleteRoleDialog = () => {
//         setDeleteRoleDialogOpen(false);
//         setDialogRoleId(null);
//     };

//     const openCreateUserDialog = () => {
//         setCreateUserDialogOpen(true);
//     };
    
//     const closeCreateUserDialog = () => {
//         setCreateUserDialogOpen(false);
//         setNewUserEmail('');
//         setNewUserPassword('');
//         setNewUserUsername('');
//         setNewUserRole('');
//     };
    
//     const openAddWalletDialog = (user) => {
//         setDialogUserEmail(user.email); // Set the email when opening the dialog
//         setDialogUserId(user.id);       // Set the user ID
//         setAddWalletDialogOpen(true);   // Open the dialog
//     };
    
//     const closeAddWalletDialog = () => {
//         setAddWalletDialogOpen(false);  // Close the dialog
//         setWalletAmount('');            // Reset wallet amount input
//     };
//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>User Details</h1>


//                {/* Admin only section */}
//                {currentUserRole === 'Admin' && (
//                 <button
//                     onClick={() => setAddWalletDialogOpen(true)}
//                     style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}
//                 >
//                     Add Wallet Balance
//                 </button>
//             )}
//             <div style={styles.filterContainer}>
//     <label>Filter by Role: </label>
//     <select
//         value={selectedRole}
//         onChange={(e) => setSelectedRole(e.target.value)}
//         style={styles.filterSelect}
//     >
//         <option value="">All Roles</option>
//         {roles.map((role) => (
//             <option key={role.id} value={role.name}>
//                 {role.name}
//             </option>
//         ))}
//     </select>
// </div>


//              {/* Create User Button */}
//         <button 
//             style={styles.createUserButton} 
//             onClick={openCreateUserDialog}
//         >
//             Create User
//         </button>

//             {loading && <p style={styles.loading}>Loading users...</p>}
//             {error && <p style={styles.error}>{error}</p>}
//             {successMessage && <p style={styles.success}>{successMessage}</p>}


// <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.tableHeader}>ID</th>
//             <th style={styles.tableHeader}>Email</th>
//             <th style={styles.tableHeader}>Roles</th>
//             <th style={styles.tableHeader}>Actions</th>
//             <th style={styles.tableHeader}>Wallet Balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user, index) => (
//             <tr
//               key={user.id}
//               style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
//             >
//               <td style={styles.tableCell}>{user.id}</td>
//               <td style={styles.tableCell}>{user.email}</td>
//               <td style={styles.tableCell}>
//                 <span style={styles.roleBadge}>
//                   {user.role?.name || 'No Role Assigned'}
//                 </span>
//               </td>
//               <td style={styles.tableCell}>
//                 <div style={styles.buttonGroup}>
//                   {/* Add Balance Button */}
//                   <button
//                     style={styles.actionButton}
//                     onClick={() => openAddWalletDialog(user)}
//                   >
//                     Add Balance
//                   </button>

//                   {/* Edit Role Button */}
//                   <button
//                     style={styles.actionButton}
//                     onClick={() =>
//                       openAssignRoleDialog(user, user.role?.name || '', 'edit')
//                     }
//                     disabled={!user.role} // Disable edit if no role
//                   >
//                     Edit
//                   </button>

//                   {/* Delete Role Button */}
//                   <button
//                     style={styles.actionButton}
//                     onClick={() =>
//                       openDeleteRoleDialog(user.email, user.role?.id)
//                     }
//                     disabled={!user.role?.id} // Disable delete if no role
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//               <td style={styles.tableCell}>{user.walletBalance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//             {addWalletDialogOpen && (
//     <div style={styles.dialogOverlay}>
//         <div style={styles.dialog}>
//             <h2>Add Wallet Balance for {dialogUserEmail}</h2>
//             <input
//                 type="number"
//                 value={walletAmount}
//                 onChange={(e) => setWalletAmount(e.target.value)}
//                 placeholder="Enter amount"
//                 style={styles.input}
//             />
//             <button onClick={handleAddWalletBalance} style={styles.dialogButton}>
//                 Add Balance
//             </button>
//             <button onClick={closeAddWalletDialog} style={styles.dialogButton}>
//                 Cancel
//             </button>
//         </div>
//     </div>
// )}

//             {createUserDialogOpen && (
//     <div style={styles.dialogOverlay}>
//         <div style={styles.dialog}>
//             <h2>Create User</h2>
//             <input
//                 type="email"
//                 value={newUserEmail}
//                 onChange={(e) => setNewUserEmail(e.target.value)}
//                 placeholder="Enter email"
//                 style={styles.input}
//             />
// {emailError && <p style={styles.error}>{emailError}</p>}
            
//             <input
//                 type="text"
//                 value={newUserUsername}
//                 onChange={(e) => setNewUserUsername(e.target.value)}
//                 placeholder="Enter username"
//                 style={styles.input}
//             />
//             {/* <input
//                 type="text"
//                 value={newUserRole}
//                 onChange={(e) => setNewUserRole(e.target.value)}
//                 placeholder="Enter role"
//                 style={styles.input}
//             /> */}
// <select
//   value={newUserRole}
//   onChange={(e) => setNewUserRole(e.target.value)}
//   style={styles.input} // You can use the same styles for the dropdown
// >
//   <option value="">Select a role</option>
//   {/* Example of dynamically rendering options */}
//   {roles.map((role) => (
//     <option key={role.id} value={role.id}>
//       {role.name}
//     </option>
//   ))}
// </select>

// <input
//                             type="password"
//                             value={newUserPassword}
//                             onChange={(e) => setNewUserPassword(e.target.value)}
//                             placeholder="Enter password"
//                             style={styles.input}
//                         />
//                         {passwordError && <p style={styles.error}>{passwordError}</p>}
//             <button onClick={handleCreateUser} style={styles.dialogButton}>Create</button>
//             <button onClick={closeCreateUserDialog} style={styles.dialogButton}>Cancel</button>
//         </div>
//     </div>
// )}


//             {/* Assign Role Dialog */}
//             {assignRoleDialogOpen && (
//                 <div style={styles.dialogOverlay}>
//                     <div style={styles.dialog}>
//                         <h2>{dialogType === 'assign' ? 'Assign Role' : 'Edit Role'}</h2>
//                         <input
//                             type="text"
//                             value={roleInput}
//                             onChange={(e) => setRoleInput(e.target.value)}
//                             placeholder="Enter role name"
//                             style={styles.input}
//                         />
//                         <button onClick={handleEdit} style={styles.dialogButton}>
//                             {dialogType === 'assign' ? 'Assign' : 'Edit'}
//                         </button>
//                         <button onClick={closeAssignRoleDialog} style={styles.dialogButton}>Cancel</button>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Role Dialog */}
//             {deleteRoleDialogOpen && (
//                 <div style={styles.dialogOverlay}>
//                     <div style={styles.dialog}>
//                         <h2>Delete Role</h2>
//                         <p>Are you sure you want to delete this role?</p>
//                         <button onClick={handleDelete} style={styles.dialogButton}>Delete</button>
//                         <button onClick={closeDeleteRoleDialog} style={styles.dialogButton}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//       width: '100%',
//       minHeight: '100vh',
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#f4f4f9',
//     },
//     heading: {
//       textAlign: 'center',
//       fontSize: '2rem',
//       color: '#333',
//     },
//     createUserButton: {
//       marginBottom: '20px',
//       padding: '10px 15px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       backgroundColor: '#4CAF50',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//     },
//     filterContainer: {
//       marginBottom: '20px',
//     },
//     filterSelect: {
//       padding: '10px',
//       fontSize: '16px',
//       width: '200px',
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       marginBottom: '20px',
//     },
//     tableHeader: {
//       backgroundColor: '#f2f2f2',
//       padding: '10px',
//       border: '1px solid #ddd',
//     },
//     tableRowEven: {
//       backgroundColor: '#f9f9f9',
//     },
//     tableRowOdd: {
//       backgroundColor: '#ffffff',
//     },
//     tableCell: {
//       padding: '10px',
//       border: '1px solid #ddd',
//     },
//     roleBadge: {
//       padding: '5px 10px',
//       backgroundColor: '#e7e7e7',
//       borderRadius: '5px',
//     },
//     actionButton: {
//       padding: '5px 10px',
//       backgroundColor: '#4CAF50',
//       color: '#fff',
//       cursor: 'pointer',
//       border: 'none',
//       borderRadius: '5px',
//       margin: '0 5px', // Add margin for spacing between buttons
//     },
//     buttonGroup: {
//       display: 'flex', 
//       justifyContent: 'space-between', // Distribute buttons evenly
//     },
//     dialogOverlay: {
//       position: 'fixed',
//       top: '0',
//       left: '0',
//       right: '0',
//       bottom: '0',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     dialog: {
//       backgroundColor: '#fff',
//       padding: '20px',
//       borderRadius: '8px',
//       width: '400px',
//     },
//     input: {
//       width: '100%',
//       padding: '10px',
//       marginBottom: '10px',
//       borderRadius: '4px',
//       border: '1px solid #ddd',
//     },
//     dialogButton: {
//       padding: '10px 15px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       backgroundColor: '#4CAF50',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//       marginRight: '10px',
//     },
//     error: {
//       color: 'red',
//       fontSize: '14px',
//     },
//     success: {
//       color: 'green',
//       fontSize: '16px',
//     },
//     loading: {
//       fontSize: '16px',
//       color: '#333',
//     },
//   };
  
//   export default UserDetails;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const UserDetails = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [roles, setRoles] = useState([]); // For storing the roles
//     // const [newUserRole, setNewUserRole] = useState('');
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
//     const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
//     const [dialogType, setDialogType] = useState('');
//     const [dialogUserId, setDialogUserId] = useState(null);
//     const [dialogOldRole, setDialogOldRole] = useState('');
//     const [roleInput, setRoleInput] = useState('');
//     const [dialogRoleId, setDialogRoleId] = useState(null);
//     const [newUserEmail, setNewUserEmail] = useState('');
//     const [newUserPassword, setNewUserPassword] = useState('');
//     const [newUserUsername, setNewUserUsername] = useState('');
//     const [newUserRole, setNewUserRole] = useState('');
//     const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
//     const [emailError, setEmailError] = useState('');
// const [passwordError, setPasswordError] = useState('');

// useEffect(() => {
//     // Replace this URL with your actual API endpoint for fetching roles
//     fetch('http://localhost:8080/users/admin/roles')
//       .then((response) => response.json())
//       .then((data) => {
//         setRoles(data); // Assuming the response is an array of roles
//       })
//       .catch((error) => {
//         console.error('Error fetching roles:', error);
//       });
//   }, []);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         if (successMessage) {
//             const timer = setTimeout(() => {
//                 setSuccessMessage('');
//             }, 4000); // Show success message for 4 seconds

//             return () => clearTimeout(timer); // Clear timeout on component unmount
//         }
//     }, [successMessage]);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         fetchRoles();
//         fetchUsers();
//     }, []);

//     const fetchRoles = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/users/admin/roles');
//             const data = await response.json();
//             setRoles(data);
//         } catch (error) {
//             console.error('Error fetching roles:', error);
//         }
//     };

//     // const fetchUsers = async (page = 1) => {
//     //     setLoading(true);
//     //     setError(null);

//     //     try {
//     //         const response = await axios.get('http://localhost:8080/users/admin/fetch/all', {
//     //             params: { page }
//     //         });

//     //         if (Array.isArray(response.data)) {
//     //             const processedUsers = response.data.users.map(user => ({
//     //                 id: user.id,
//     //                 email: user.email,
//     //                 username: user.username,
//     //                 role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' }
//     //             }));
//     //             setUsers(processedUsers);
//     //             setTotalPages(response.data.totalPages); // Assuming the response has totalPages
//     //         } else {
//     //             setError('Unexpected response format');
//     //         }
//     //     } catch (err) {
//     //         setError(err.message);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const fetchUsers = async (page = 1) => {
//         setLoading(true);
//         setError(null);
    
//         try {
//             const response = await axios.get('http://localhost:8080/users/admin/fetch/all', {
//                 params: { page }
//             });
    
//             console.log('API Response:', response.data);  // Log the full API response
    
//             if (response.data && Array.isArray(response.data.users)) {
//                 const processedUsers = response.data.users.map(user => ({
//                     id: user.id,
//                     email: user.email,
//                     username: user.username,
//                     role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' }
//                 }));
//                 setUsers(processedUsers);
//                 setTotalPages(response.data.totalPages); // Assuming the response has totalPages
//             }
        
//         // try {
//         //                 const response = await axios.get('http://localhost:8080/users/admin/fetch/all');
//         //                 if (Array.isArray(response.data)) {
//         //                     const processedUsers = response.data.map(user => ({
//         //                         id: user.id,
//         //                         email: user.email,
//         //                         username: user.username,
//         //                         role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' },
//         //                         walletBalance: user.walletBalance || 0, // Assume users have a walletBalance field
//         //                     }));
//         //                     setUsers(processedUsers);
//         //                     setTotalPages(response.data.totalPages);
//         //                 } 
        
        
//         else {
//                 setError('Unexpected response format');
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             fetchUsers(nextPage);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             const prevPage = currentPage - 1;
//             setCurrentPage(prevPage);
//             fetchUsers(prevPage);
//         }
//     };

//     // Email validation
//     const validateEmail = (email) => {
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         return emailRegex.test(email);
//     };

//     // Password validation
//     const validatePassword = (password) => {
//         // Password must be at least 6 characters, include at least one lowercase, one uppercase, and one number
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
//         return passwordRegex.test(password);
//     };
    
//     const handleCreateUser = async () => {
//         // Check if all required fields are filled
//         if (!newUserEmail || !newUserUsername || !newUserRole || !newUserPassword) {
//             setError('All fields are required.');
//             return;
//         }
    
//         // Validate email format
//         if (!newUserEmail || !validateEmail(newUserEmail)) {
//             setEmailError('Please enter a valid email.');
//             return;
//         } else {
//             setEmailError('');
//         }
    
//         // Validate password format
//         if (!newUserPassword || !validatePassword(newUserPassword)) {
//             setPasswordError('Password must be at least 6 characters long, include one uppercase, one lowercase, and one number.');
//             return;
//         } else {
//             setPasswordError('');
//         }
    
//         // Ensure other fields are filled
//         if (!newUserUsername || !newUserRole) {
//             setError('Username and role are required.');
//             return;
//         }
    
//         // Find the selected role
//         console.log('Selected Role ID:', newUserRole);
//         console.log('Roles Array:', roles);
    
//         // Ensure roles array is loaded
//         if (!roles || roles.length === 0) {
//             setError('Roles data is missing or not loaded.');
//             return;
//         }
    
//         const selectedRole = roles.find(role => role.id.toString() === newUserRole.toString()); // Convert both to strings
//         if (!selectedRole) {
//             console.log('Selected Role not found');
//             setError('Invalid role selected.');
//             return;
//         }
    
//         console.log('Selected Role:', selectedRole); // Log selected role for debugging
    
//         const payload = {
//             email: newUserEmail,
//             password: newUserPassword,
//             username: newUserUsername,
//             roleName : selectedRole.name
//         };
    
//         console.log('Payload:', payload); // Log the payload being sent to the backend
    
//         try {
//             await axios.post('http://localhost:8080/users/admin/createuser', payload);
//             setSuccessMessage('User created successfully!');
//             setNewUserEmail('');
//             setNewUserPassword('');
//             setNewUserUsername('');
//             setNewUserRole('');
//             setCreateUserDialogOpen(false);
//             fetchUsers(); // Refresh the user list
//         } catch (error) {
//             if (error.response) {
//                 console.error("Backend error:", error.response.data);  // Log error from backend
//                 setError(`Error: ${error.response.data.message || 'An error occurred'}`);
//             } else if (error.request) {
//                 console.error("Network error:", error.request); // Log network error
//                 setError('Network error. Please try again later.');
//             } else {
//                 console.error("Error:", error.message); // Log general error
//                 setError(`Error: ${error.message}`);
//             }
//         }
//     };
    

//     const handleEdit = async () => {
//         if (!roleInput || !dialogUserId) {
//             setError('Role name and user ID are required.');
//             return;
//         }

//         // Check if the old role is "No Role Assigned"
//         if (dialogOldRole === 'No Role Assigned') {
//             try {
//                 // Add role to user (instead of editing)
//                 await axios.post(`http://localhost:8080/users/admin/assign-role`, null, {
//                     params: {
//                         email: dialogUserId,
//                         roleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role assigned successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to assign role');
//             }
//         } else {
//             // Existing logic for editing the role
//             try {
//                 await axios.put('http://localhost:8080/users/admin/edit-role', null, {
//                     params: {
//                         email: dialogUserId,
//                         oldRoleName: dialogOldRole,
//                         newRoleName: roleInput,
//                     }
//                 });
//                 setSuccessMessage('Role edited successfully!');
//                 setAssignRoleDialogOpen(false);
//                 fetchUsers();
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to edit role');
//             }
//         }
//     };

//     const handleDelete = async () => {
//         if (!dialogRoleId) {
//             setError('Role ID is not defined.');
//             return;
//         }

//         try {
//             await axios.delete(`http://localhost:8080/users/admin/roles/${dialogRoleId}`);
//             setSuccessMessage('Role deleted successfully!');
//             setDeleteRoleDialogOpen(false);
//             fetchUsers();
//         } catch (err) {
//             setError(err.response?.data?.error || 'Failed to delete role');
//         }
//     };

//     const openAssignRoleDialog = (user, oldRole = '', type = 'assign') => {
//         if (user && user.email) {
//             setDialogUserId(user.email);
//         } else {
//             setError('Invalid user object or missing email.');
//         }
//         setDialogOldRole(oldRole);
//         setDialogType(type);
//         setRoleInput(type === 'edit' ? oldRole : '');
//         setAssignRoleDialogOpen(true);
//     };

//     const closeAssignRoleDialog = () => {
//         setAssignRoleDialogOpen(false);
//         setRoleInput('');
//         setDialogUserId(null);
//     };

//     const openDeleteRoleDialog = (userId, roleId) => {
//         setDialogUserId(userId);
//         setDialogRoleId(roleId);
//         setDeleteRoleDialogOpen(true);
//     };

//     const closeDeleteRoleDialog = () => {
//         setDeleteRoleDialogOpen(false);
//         setDialogRoleId(null);
//     };

//     const openCreateUserDialog = () => {
//         setCreateUserDialogOpen(true);
//     };
    
//     const closeCreateUserDialog = () => {
//         setCreateUserDialogOpen(false);
//         setNewUserEmail('');
//         setNewUserPassword('');
//         setNewUserUsername('');
//         setNewUserRole('');
//     };
    

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>User Details</h1>
//             {loading && <p style={styles.loading}>Loading users...</p>}
//             {error && <p style={styles.error}>{error}</p>}
//             {successMessage && <p style={styles.success}>{successMessage}</p>}

//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th style={styles.tableHeader}>ID</th>
//                         <th style={styles.tableHeader}>Email</th>
//                         <th style={styles.tableHeader}>Roles</th>
//                         <th style={styles.tableHeader}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr
//                             key={user.id}
//                             style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
//                         >
//                             <td style={styles.tableCell}>{user.id}</td>
//                             <td style={styles.tableCell}>{user.email}</td>
//                             <td style={styles.tableCell}>
//                                 <span style={styles.roleBadge}>
//                                     {user.role?.name || 'No Role Assigned'}
//                                 </span>
//                             </td>
//                             <td style={styles.tableCell}>
//                                 <button style={styles.actionButton}>Edit</button>
//                                 <button style={styles.actionButton}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div style={styles.pagination}>
//                 <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     style={styles.paginationButton}
//                 >
//                     Previous
//                 </button>
//                 <span style={styles.paginationText}>
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     style={styles.paginationButton}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//         backgroundColor: '#f4f6f9',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         maxWidth: '1200px',
//         margin: 'auto',
//     },
//     heading: {
//         marginBottom: '20px',
//         color: '#333',
//     },
//     loading: {
//         color: '#007bff',
//         fontWeight: 'bold',
//     },
//     error: {
//         color: '#dc3545',
//         fontWeight: 'bold',
//     },
//     success: {
//         color: '#28a745',
//         fontWeight: 'bold',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse',
//     },
//     tableHeader: {
//         borderBottom: '2px solid #dee2e6',
//         padding: '12px',
//         textAlign: 'left',
//         backgroundColor: '#f8f9fa',
//         color: '#495057',
//     },
//     tableCell: {
//         padding: '12px',
//         borderBottom: '1px solid #dee2e6',
//         color: '#212529',
//     },
//     tableRowEven: {
//         backgroundColor: '#ffffff',
//     },
//     tableRowOdd: {
//         backgroundColor: '#f1f3f5',
//     },
//     roleBadge: {
//         backgroundColor: '#28a745',
//         color: 'white',
//         padding: '5px 10px',
//         borderRadius: '12px',
//         fontWeight: 'bold',
//     },
//     actionButton: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         padding: '8px 16px',
//         fontSize: '14px',
//         cursor: 'pointer',
//         borderRadius: '6px',
//         marginRight: '10px',
//     },
//     pagination: {
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '20px',
//     },
//     paginationButton: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         borderRadius: '6px',
//         margin: '0 10px',
//         transition: 'background-color 0.3s',
//     },
//     paginationText: {
//         alignSelf: 'center',
//         fontSize: '16px',
//     },
// };

// export default UserDetails;




import React, { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import { textAlign } from '@mui/system';


const UserDetails =  ({ currentUserRole }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
    const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [dialogUserId, setDialogUserId] = useState(null);
    const [dialogOldRole, setDialogOldRole] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [dialogRoleId, setDialogRoleId] = useState(null);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserUsername, setNewUserUsername] = useState('');
    const [newUserRole, setNewUserRole] = useState('');
    const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
    const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
    const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
    const [walletAmount, setWalletAmount] = useState('');
    const [dialogUserEmail, setDialogUserEmail] = useState('');
    const [userId, setUserId] = useState(null); // To store the user ID after finding the user by email

    const [page, setPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    // Filtered users based on role
    const filteredUsers = useMemo(() => {
        if (selectedRole) {
            return users.filter(user => user.role?.name === selectedRole);
        }
        return users; // Show all users if no role is selected
    }, [users, selectedRole]);

    // Pagination logic
    const totalPages = useMemo(() => Math.ceil(filteredUsers.length / usersPerPage), [filteredUsers, usersPerPage]);
    const currentPageUsers = useMemo(() => filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage), [filteredUsers, page, usersPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleRoleFilterChange = (e) => {
        setSelectedRole(e.target.value);
        setPage(1); // Reset to first page when filtering
    };


useEffect(() => {
    // Replace this URL with your actual API endpoint for fetching roles
    fetch('http://localhost:8080/users/admin/roles')
      .then((response) => response.json())
      .then((data) => {
        setRoles(data); // Assuming the response is an array of roles
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 4000); // Show success message for 4 seconds

            return () => clearTimeout(timer); // Clear timeout on component unmount
        }
    }, [successMessage]);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/users/admin/fetch/all');
            if (Array.isArray(response.data)) {
                const processedUsers = response.data.map(user => ({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' },
                    walletBalance: user.walletBalance || 0, // Assume users have a walletBalance field
                }));
                setUsers(processedUsers);
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserByEmail = async (email) => {

        try {
          // Log the email that is being passed into the function
          console.log('Fetching user details for email:', email);
      
          // Make a GET request with the email as a query parameter
          const response = await axios.get(
            `http://localhost:8080/users/admin/get-user-by-email/${email}`,
            {
              params: {
                email: email, // Pass email as a query parameter
              },
            }
          );
      
          // Log the response from the server
          console.log('User details fetched successfully:', response.data);
      
          return response.data; // Return the user data
        } catch (error) {
          // Log the error if there was an issue with the request
          console.error('Error fetching user by email:', error);
      
          throw error; // You can handle this further depending on your application
        }
      };
      
      // Function that handles the click event and calls both functions
const handleAddBalanceClick = async () => {
    if (!dialogUserEmail) {
      setError('Email is not defined.');
      console.log('dialogUserEmail is empty or undefined');
      return;
    }
  
    // Log the dialogUserEmail to verify if it's being passed correctly
    console.log('Dialog user email:', dialogUserEmail);
  
    try {
      // 1. Get user by email
      const fetchedUser = await getUserByEmail(dialogUserEmail);
      
      // Log the fetched user details to check if the API call was successful
      console.log('Fetched user:', fetchedUser);
  
      // 2. Open the wallet dialog and pass the fetched user
      openAddWalletDialog(fetchedUser);
      
      // Optionally, you can set the userId or any other user details
      setUserId(fetchedUser.userId);
  
    } catch (error) {
      console.error('Error in fetching user or opening dialog:', error);
    }
  };


    const handleAddWalletBalance = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage or any other place it's stored
    
        if (!token) {
            setError('Authentication token is missing.');
            return;
        }
    
        // Check if the wallet amount is valid
        if (!walletAmount || isNaN(walletAmount) || walletAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
    
        try {
            // Create the request body as an object matching WalletDTO structure
            const data = {
                userId: userId,
                balance: walletAmount, // Make sure this matches the WalletDTO's property name
            };
    
            // Send the request with the appropriate headers and body
            await axios.put('http://localhost:8080/users/admin/add-balance', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token for authentication
                    'Content-Type': 'application/json', // The server expects JSON content type
                },
            });
    
            setSuccessMessage('Wallet balance added successfully!');
            setAddWalletDialogOpen(false);
            fetchUsers(); // Refresh the user list
    
        } catch (error) {
            if (error.response) {
                console.error("Backend error:", error.response.data);
                setError(`Error: ${error.response.data.message || 'An error occurred'}`);
            } else if (error.request) {
                console.error("Network error:", error.request);
                setError('Network error. Please try again later.');
            } else {
                console.error("Error:", error.message);
                setError(`Error: ${error.message}`);
            }
        }
    };
    
    
    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };
    

// A function to validate the password based on the rules.-----
const validatePassword = (password) => {
    // Check if password is at least 6 characters long and contains an uppercase, lowercase, and a number.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

const handleCreateUser = async () => {
    // Check if all required fields are filled
    if (!newUserEmail || !newUserUsername || !newUserRole || !newUserPassword) {
        setError('All fields are required.');
        return;
    }

    // Validate email format
    if (!newUserEmail || !validateEmail(newUserEmail)) {
        setEmailError('Please enter a valid email.');
        return;
    } else {
        setEmailError('');
    }

    // Validate password format
    console.log('Password entered:', newUserPassword);  // Log the password to see what was entered
    if (!newUserPassword || !validatePassword(newUserPassword)) {
        setPasswordError('Password must be at least 6 characters long, include one uppercase, one lowercase, and one number.');
        return;
    } else {
        setPasswordError('');
    }

    // Ensure other fields are filled
    if (!newUserUsername || !newUserRole) {
        setError('Username and role are required.');
        return;
    }

    // Find the selected role
    console.log('Selected Role ID:', newUserRole);
    console.log('Roles Array:', roles);

    // Ensure roles array is loaded
    if (!roles || roles.length === 0) {
        setError('Roles data is missing or not loaded.');
        return;
    }

    const selectedRole = roles.find(role => role.id.toString() === newUserRole.toString()); // Convert both to strings
    if (!selectedRole) {
        console.log('Selected Role not found');
        setError('Invalid role selected.');
        return;
    }

    console.log('Selected Role:', selectedRole); // Log selected role for debugging

    const payload = {
        email: newUserEmail,
        password: newUserPassword,
        username: newUserUsername,
        roleName: selectedRole.name
    };

    console.log('Payload:', payload); // Log the payload being sent to the backend

    try {
        await axios.post('http://localhost:8080/users/admin/createuser', payload);
        setSuccessMessage('User created successfully!');
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserUsername('');
        setNewUserRole('');
        setCreateUserDialogOpen(false);
        fetchUsers(); // Refresh the user list
    } catch (error) {
        if (error.response) {
            console.error("Backend error:", error.response.data);  // Log error from backend
            setError(`Error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            console.error("Network error:", error.request); // Log network error
            setError('Network error. Please try again later.');
        } else {
            console.error("Error:", error.message); // Log general error
            setError(`Error: ${error.message}`);
        }
    }
};


    const handleEdit = async () => {
        if (!roleInput || !dialogUserId) {
            setError('Role name and user ID are required.');
            return;
        }

        // Check if the old role is "No Role Assigned"
        if (dialogOldRole === 'No Role Assigned') {
            try {
                // Add role to user (instead of editing)
                await axios.post(`http://localhost:8080/users/admin/assign-role`, null, {
                    params: {
                        email: dialogUserId,
                        roleName: roleInput,
                    }
                });
                setSuccessMessage('Role assigned successfully!');
                setAssignRoleDialogOpen(false);
                fetchUsers();
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to assign role');
            }
        } else {
            // Existing logic for editing the role
            try {
                await axios.put('http://localhost:8080/users/admin/edit-role', null, {
                    params: {
                        email: dialogUserId,
                        oldRoleName: dialogOldRole,
                        newRoleName: roleInput,
                    }
                });
                setSuccessMessage('Role edited successfully!');
                setAssignRoleDialogOpen(false);
                fetchUsers();
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to edit role');
            }
        }
    };

  


    const handleDelete = async () => {
        if (!dialogRoleId) {
            setError('Role ID is not defined.');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/users/admin/roles/${dialogRoleId}`);
            setSuccessMessage('Role deleted successfully!');
            setDeleteRoleDialogOpen(false);
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete role');
        }
    };

    const openAssignRoleDialog = (user, oldRole = '', type = 'assign') => {
        if (user && user.email) {
            setDialogUserId(user.email);
        } else {
            setError('Invalid user object or missing email.');
        }
        setDialogOldRole(oldRole);
        setDialogType(type);
        setRoleInput(type === 'edit' ? oldRole : '');
        setAssignRoleDialogOpen(true);
    };

    const closeAssignRoleDialog = () => {
        setAssignRoleDialogOpen(false);
        setRoleInput('');
        setDialogUserId(null);
    };

    const openDeleteRoleDialog = (userId, roleId) => {
        setDialogUserId(userId);
        setDialogRoleId(roleId);
        setDeleteRoleDialogOpen(true);
    };

    const closeDeleteRoleDialog = () => {
        setDeleteRoleDialogOpen(false);
        setDialogRoleId(null);
    };

    const openCreateUserDialog = () => {
        setCreateUserDialogOpen(true);
    };
    
    const closeCreateUserDialog = () => {
        setCreateUserDialogOpen(false);
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserUsername('');
        setNewUserRole('');
    };
    
    const openAddWalletDialog = (user) => {
        setDialogUserEmail(user.email); // Set the email when opening the dialog
        setDialogUserId(user.id);       // Set the user ID
        setAddWalletDialogOpen(true);   // Open the dialog
    };
    
    const closeAddWalletDialog = () => {
        setAddWalletDialogOpen(false);  // Close the dialog
        setWalletAmount('');            // Reset wallet amount input
    };
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>USER DETAILS</h1>


               {/* Admin only section */}
               {currentUserRole === 'Admin' && (
                <button
                    onClick={() => setAddWalletDialogOpen(true)}
                    style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}
                >
                    Add +
                </button>
            )}


<div style={styles.containerCU}>
      {/* Filter Container */}
      <div style={styles.filterContainer}>
        <label>Filter by Role : </label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create User Button */}
      <button
        style={styles.createUserButton}
        onClick={openCreateUserDialog}
      >
        Create User
      </button>
    </div>

            {loading && <p style={styles.loading}>Loading users...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
<table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Roles</th>
            <th style={styles.tableHeader}>Wallet Balance</th>
            <th style={styles.tableHeader}>Actions</th>
           
          </tr>
        </thead>

        <tbody>   
  {currentPageUsers.map((user, index) => (
    <tr
      key={user.id}
      style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      <td style={styles.tableCell}>{user.id}</td>
      <td style={styles.tableCell}>{user.email}</td>
      <td style={styles.tableCell}>
        <span style={styles.roleBadge}>
          {user.role?.name || 'No Role Assigned'}
        </span>
      </td>
      <td style={styles.tableCell}>{user.walletBalance}</td>

      <td style={styles.tableCell}>
        <div style={styles.buttonGroup}>
          {/* Add Balance Button */}
          <button
            style={styles.actionButton}
            onClick={openAddWalletDialog(user)}
          >
            Add Balance ₹
          </button>

          {/* Edit Role Button */}
          <button
            style={styles.actionButton}
            onClick={() =>
              openAssignRoleDialog(user, user.role?.name || '', 'edit')
            }
            disabled={!user.role} // Disable edit if no role
          >
            Edit
          </button>

          {/* Delete Role Button */}
          <button
            style={styles.actionButton}
            onClick={() =>
              openDeleteRoleDialog(user.email, user.role?.id)
            }
            disabled={!user.role?.id} // Disable delete if no role
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>

    {/* pagination */}

      <div style={styles.paginationContainer}>
  <button
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
    style={
      page === 1
        ? { ...styles.paginationButton, ...styles.paginationButtonDisabled }
        : { ...styles.paginationButton }
    }
  >
    Previous
  </button>
  <span style={styles.pageNumber}>
    Page {page} of {totalPages}
  </span>
  <button
    onClick={() => handlePageChange(page + 1)}
    disabled={page === totalPages}
    style={
      page === totalPages
        ? { ...styles.paginationButton, ...styles.paginationButtonDisabled }
        : { ...styles.paginationButton }
    }
  >
    Next
  </button>
</div>


{addWalletDialogOpen && (
    <div style={styles.dialogOverlay}>
        <div style={styles.dialog}>
            <h2>Add Wallet Balance for {dialogUserEmail}</h2>
            <input
                type="number"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                placeholder="Enter amount"
                style={styles.input}
            />
           
            <button onClick={handleAddWalletBalance} style={styles.dialogButton}>
                Add ₹     <span> {walletAmount}</span> 
            
            </button>
            <button onClick={closeAddWalletDialog} style={styles.dialogButton}>
                Cancel
            </button>
        </div>
    </div>
)}


            {createUserDialogOpen && (
    <div style={styles.dialogOverlay}>
        <div style={styles.dialog}>
            <h2>Create User</h2>
            <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="Enter email"
                style={styles.input}
            />
{emailError && <p style={styles.error}>{emailError}</p>}
            
            <input
                type="text"
                value={newUserUsername}
                onChange={(e) => setNewUserUsername(e.target.value)}
                placeholder="Enter username"
                style={styles.input}
            />
<select
  value={newUserRole}
  onChange={(e) => setNewUserRole(e.target.value)}
  style={styles.input} // You can use the same styles for the dropdown
>
  <option value="">Select a role</option>
  {/* Example of dynamically rendering options */}
  {roles.map((role) => (
    <option key={role.id} value={role.id}>
      {role.name}
    </option>
  ))}
</select>

<input
                            type="password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            placeholder="Enter password"
                            style={styles.input}
                        />
                        {passwordError && <p style={styles.error}>{passwordError}</p>}
            <button onClick={handleCreateUser} style={styles.dialogButton}>Create</button>
            <button onClick={closeCreateUserDialog} style={styles.dialogButton}>Cancel</button>
        </div>
    </div>
)}


            {/* Assign Role Dialog */}
            {assignRoleDialogOpen && (
                <div style={styles.dialogOverlay}>
                    <div style={styles.dialog}>
                        <h2>{dialogType === 'assign' ? 'Assign Role' : 'Edit Role'}</h2>
                        <input
                            type="text"
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            placeholder="Enter role name"
                            style={styles.input}
                        />
                        <button onClick={handleEdit} style={styles.dialogButton}>
                            {dialogType === 'assign' ? 'Assign' : 'Edit'}
                        </button>
                        <button onClick={closeAssignRoleDialog} style={styles.dialogButton}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Role Dialog */}
            {deleteRoleDialogOpen && (
                <div style={styles.dialogOverlay}>
                    <div style={styles.dialog}>
                        <h2>Delete Role</h2>
                        <p>Are you sure you want to delete this role?</p>
                        <button onClick={handleDelete} style={styles.dialogButton}>Delete</button>
                        <button onClick={closeDeleteRoleDialog} style={styles.dialogButton}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
    //   display: 'flex',
    //   justifyContent: 'space-between',
      textAlign:'center'
    },
    heading: {
        fontWeight:'bold',
      textAlign: 'center',
      fontSize: '2rem',
    //   color: '#333',
    },
    containerCU: {
        display: 'flex',
        justifyContent: 'flex-end',  // Aligns child items to the right
      },
    createUserButton: {
      marginBottom: '20px',
      padding: '10px 15px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
    // textAlign:'right'
    },
    filterContainer: {
        display: 'flex',            // Flexbox for horizontal alignment within the filter container
        alignItems: 'center',       // Ensure the label and select box are aligned vertically
        marginRight: 'auto',   
      },
    filterSelect: {
      padding: '10px',
      fontSize: '16px',
      width: '200px',
      marginLeft: '10px',         // Adds space between the label and the select dropdown

    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      padding: '10px',
      border: '1px solid #ddd',
    },
    tableRowEven: {
      backgroundColor: '#f9f9f9',
    },
    tableRowOdd: {
      backgroundColor: '#ffffff',
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    roleBadge: {
      padding: '5px 10px',
      backgroundColor: '#e7e7e7',
      borderRadius: '5px',
    },
    actionButton: {
      padding: '5px 10px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      margin: '0 5px', // Add margin for spacing between buttons
    },
    actionButtonEdit: {
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'success',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        margin: '0 5px', // Add margin for spacing between buttons
      },
      actionButtonDelete: {
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'error',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        margin: '0 5px', // Add margin for spacing between buttons
      },
    buttonGroup: {
      display: 'flex', 
      justifyContent: 'space-between', // Distribute buttons evenly
    },
    dialogOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    dialogButton: {
        padding: '10px 20px', // Adjust padding to make sure there's enough space around the text
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        marginRight: '10px',
        whiteSpace: 'nowrap', // Prevent the text from breaking into multiple lines
        minWidth: '150px', // Optional: you can set a minimum width for consistency
        textAlign: 'center', // Center the text inside the button
    },
    
    error: {
      color: 'red',
      fontSize: '14px',
    },
    success: {
      color: 'green',
      fontSize: '16px',
    },
    loading: {
      fontSize: '16px',
      color: '#333',
    },

    pagination: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '20px',  // Moves pagination to the footer area
    },
    
    paginationButton: {
        textAlign: 'center',
        padding: '5px 10px',  // Smaller padding for smaller button size
        fontSize: '14px',     // Smaller font size
        margin: '0 5px',      // Reduced margin between buttons
        backgroundColor: '#ff6347', // Vibrant Tomato red for normal button
        color: 'white',
        border: 'none',
        borderRadius: '20px', // Rounded corners for a more modern look
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth color and scale transition
      },
      paginationButtonHover: {
        backgroundColor: '#ff4500', // Darker shade of red on hover
        transform: 'scale(1.1)', // Slightly larger on hover for better interactivity
      },
      paginationButtonDisabled: {
        backgroundColor: '#cccccc', // Gray color for disabled button
        cursor: 'not-allowed',
      },
      pageNumber: {
        fontSize: '14px',  // Smaller font size for page number
        fontWeight: 'bold',
        margin: '0 5px',
        color: '#333',  // Dark gray color for page number
      },

  };
  
  export default UserDetails;