import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);
    const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
    const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [dialogUserId, setDialogUserId] = useState(null);
    const [dialogOldRole, setDialogOldRole] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [createRoleButtonVisible, setCreateRoleButtonVisible] = useState(true);
    const [dialogRoleId, setDialogRoleId] = useState(null);

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

    const handleCreateRole = async () => {
        if (roleInput) {
            try {
                await axios.post('http://localhost:8080/users/admin/roles/create', {
                    roleName: roleInput
                });
                setSuccessMessage('Role created successfully!');
                setRoleInput('');
                setCreateRoleDialogOpen(false);
                fetchUsers();
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to create role');
            }
        } else {
            setError('Role name cannot be empty.');
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

    const openCreateRoleDialog = () => {
        setCreateRoleDialogOpen(true);
        setCreateRoleButtonVisible(false);
    };

    const closeCreateRoleDialog = () => {
        setCreateRoleDialogOpen(false);
        setRoleInput('');
        setCreateRoleButtonVisible(true);
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
        setCreateRoleButtonVisible(false);
    };

    const closeAssignRoleDialog = () => {
        setAssignRoleDialogOpen(false);
        setRoleInput('');
        setCreateRoleButtonVisible(true);
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

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>User Details</h1>
            {loading && <p style={styles.loading}>Loading users...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {!createRoleDialogOpen && !assignRoleDialogOpen && !deleteRoleDialogOpen && (
                <div style={styles.addRoleContainer}>
                    <button style={styles.addButton} onClick={openCreateRoleDialog}>
                        Create Role
                    </button>
                </div>
            )}
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
                    {users.map((user, index) => (
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

            {/* Create Role Dialog */}
            {createRoleDialogOpen && (
                <div style={styles.dialogOverlay}>
                    <div style={styles.dialog}>
                        <h2>Create Role</h2>
                        <input
                            type="text"
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            placeholder="Enter role name"
                            style={styles.input}
                        />
                        <button onClick={handleCreateRole} style={styles.dialogButton}>Create</button>
                        <button onClick={closeCreateRoleDialog} style={styles.dialogButton}>Cancel</button>
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
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: 'auto',
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
    addRoleContainer: {
        marginBottom: '20px',
    },
    addButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '6px',
        transition: 'background-color 0.3s',
    },
    addButtonHover: {
        backgroundColor: '#0056b3',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
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
    actionButtonHover: {
        backgroundColor: '#0056b3',
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
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
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
    dialogButtonHover: {
        backgroundColor: '#0056b3',
    },

};

export default UserDetails;
