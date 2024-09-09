import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
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

    const openDeleteRoleDialog = (roleId) => {
        setDialogRoleId(roleId);
        setDeleteRoleDialogOpen(true);
    };

    const closeDeleteRoleDialog = () => {
        setDeleteRoleDialogOpen(false);
        setDialogRoleId(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Roles</h1>
            {loading && <p style={styles.loading}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            {/* Roles Table */}
            <h2 style={styles.heading}></h2>
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
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
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
    dialog: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
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
