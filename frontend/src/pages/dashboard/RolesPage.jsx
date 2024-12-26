
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
    const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);
    const [roleInput, setRoleInput] = useState('');
    const [dialogRoleId, setDialogRoleId] = useState(null);

    useEffect(() => {
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

    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/users/admin/roles');
            if (Array.isArray(response.data)) {
                setRoles(response.data);
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!dialogRoleId) {
            setError('Role ID is not defined.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/users/admin/roles/${dialogRoleId}`);
            setSuccessMessage('Role deleted successfully!');
            setDeleteRoleDialogOpen(false);
            fetchRoles(); // Refresh the roles list
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete role');
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
                fetchRoles(); // Refresh the roles list
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to create role');
            }
        } else {
            setError('Role name cannot be empty.');
        }
    };

    const openDeleteRoleDialog = (roleId) => {
        setDialogRoleId(roleId);
        setDeleteRoleDialogOpen(true);
    };

    const closeDeleteRoleDialog = () => {
        setDeleteRoleDialogOpen(false);
        setDialogRoleId(null);
    };

    const openCreateRoleDialog = () => {
        setCreateRoleDialogOpen(true);
    };

    const closeCreateRoleDialog = () => {
        setCreateRoleDialogOpen(false);
        setRoleInput('');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>ROLES</h1>
            {loading && <p style={styles.loading}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            {/* Create Role Button */}
            <div style={styles.addRoleContainer}>
                <button style={styles.addButton} onClick={openCreateRoleDialog}>
                    + Create Role
                </button>
            </div>

            {/* Roles Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Role Name</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr
                            key={role.id}
                            style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                        >
                            <td style={styles.tableCell}>{role.id}</td>
                            <td style={styles.tableCell}>{role.name}</td>
                            <td style={styles.tableCell}>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => openDeleteRoleDialog(role.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Role Dialog */}
            {deleteRoleDialogOpen && (
                <div style={styles.dialog}>
                    <h3>Confirm Deletion</h3>
                    <p>Are you sure you want to delete this role?</p>
                    <button style={styles.dialogButton} onClick={handleDelete}>
                        Yes, Delete
                    </button>
                    <button style={styles.dialogButton} onClick={closeDeleteRoleDialog}>
                        Cancel
                    </button>
                </div>
            )}

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
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        textAlign:'center',
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight:'bold'
    },
    loading: {
        color: 'blue',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
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
    actionButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    addRoleContainer: {
        marginBottom: '20px',
        display:'flex',
        justifyContent:'flex-end'
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
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
};

export default RolesPage;
