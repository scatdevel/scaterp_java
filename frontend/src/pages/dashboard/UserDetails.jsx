import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserDetails = () => {
    const [users, setUsers] = useState([]);
const [selectedRole, setSelectedRole] = useState('');

    const [loading, setLoading] = useState(true);

    const [roles, setRoles] = useState([]); // For storing the roles
    // const [newUserRole, setNewUserRole] = useState('');
    const [error, setError] = useState(null);
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
        fetchRoles();
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
                    role: user.role ? { id: user.role.id, name: user.role.name } : { id: null, name: 'No Role Assigned' }
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



    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    // Password validation
    const validatePassword = (password) => {
        // Password must be at least 6 characters, include at least one lowercase, one uppercase, and one number
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
            roleName : selectedRole.name
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
    


    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>User Details</h1>


             {/* Create User Button */}
        <button 
            style={styles.createUserButton} 
            onClick={openCreateUserDialog}
        >
            Create User
        </button>


            {loading && <p style={styles.loading}>Loading users...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Roles</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
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
                            <td style={styles.tableCell}>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => openAssignRoleDialog(user, user.role?.name || '', 'edit')}
                                    disabled={!user.role}  // Disable edit if no role
                                >
                                    Edit
                                </button>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => openDeleteRoleDialog(user.email, user.role?.id)}
                                    disabled={!user.role?.id}  // Disable delete if no role
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


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
            {/* <input

                type="text"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                placeholder="Enter role"
                style={styles.input}
            /> */}
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

        width: '100vw', // Full width of the viewport
        height: '100vh', // Full height of the viewport
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: 'auto',

        minHeight: '100vh', // Full viewport height
        overflow: 'auto',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
    },
    loading: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    error: {
        color: '#dc3545',
        fontWeight: 'bold',
    },
    success: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },


     // ... other styles
     createUserButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '6px',
        marginBottom: '20px',
        transition: 'background-color 0.3s',
    },
    tableHeader: {
        borderBottom: '2px solid #dee2e6',
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        color: '#495057',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #dee2e6',
        color: '#212529',
    },
    tableRowEven: {
        backgroundColor: '#ffffff',
    },
    tableRowOdd: {
        backgroundColor: '#f1f3f5',
    },
    roleBadge: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '12px',
        fontWeight: 'bold',
    },
    actionButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '6px',
        marginRight: '10px',
        transition: 'background-color 0.3s',
    },
    dialogOverlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
       // width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        width: '90%', // Adjusted width for better responsiveness
        maxWidth: '600px',
        overflow: 'auto', // Keeps the dialog at a reasonable size on larger screens
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '12px',
        border: '1px solid #ced4da',
        borderRadius: '6px',
    },
    dialogButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '6px',
        margin: '5px',
        transition: 'background-color 0.3s',
    },
};

export default UserDetails;
