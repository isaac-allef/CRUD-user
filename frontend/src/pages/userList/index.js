import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './styles.css'

import api from '../../services/api';

export default function UserList() {
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await api.get('users');
        const users = response.data.users;
        setUsers(users)
    }

    const createList = async () => {
        let userList = [
            [
                { readOnly: true, value: 'Id' },
                { readOnly: true, value: 'Name' },
                { readOnly: true, value: 'Birth' },
                { readOnly: true, value: '' },
            ]
        ];
        for(const user of users) {
            userList.push([
                { readOnly: true, value: user.id },
                { value: user.name },
                { value: user.birth },
                {   
                    value: 'Delete',
                    component: (<button onClick={() => handleDeleteUser(user.id)}>Delete</button>),
                    forceComponent: true
                }
            ])
        }
        let grid = [userList]
        setList(grid)
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        createList();
    }, [users]);

    async function handleDeleteUser(id) {
        try {
            await api.delete(`users/${id}`);
            setUsers(users.filter(user => user.id !== id))
            // getUsers()
        }catch(err) {
            alert(err);
        }
    }

    async function handleUpdate(id, data) {
        try {
            await api.put(`users/${id}`, data);
            getUsers()
        } catch(err) {
            alert(err);
        }
    }

    return (
        <div className="list-container">
            <div className="header-container">
                <h3>User list</h3>
                <Link className="button button-create" to="/create">Create user</Link>
            </div>
            {list.map(users => (
                <ReactDataSheet key={'a'}
                    data={users}
                    valueRenderer={cell => cell.value}
                    onCellsChanged={changes => {
                        const row = changes['0']['row']
                        const col = changes['0']['col']
                        const id = users[row]['0']['value']
                        let data = changes['0']['value']
                        if (col === 1) data = { name: data }
                        if (col === 2) data = { birth: data }
                        handleUpdate(id, data)
                    }}
                />
            ))}
      </div>
    );
}