import React, { useEffect, useState } from 'react';
import { getAllUsers } from './api';
import UserList from './UserList'; // Import UserList component

const DashboardComponent = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <UserList users={users} /> {/* Use UserList component */}
        </div>
    );
};

export default DashboardComponent;
