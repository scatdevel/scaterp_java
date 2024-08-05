import React, { useEffect, useState } from 'react';
import { getAllUsers } from './api'; 

const UserList = () => {
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
            <h2>User List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.email}>
                        {user.username} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
