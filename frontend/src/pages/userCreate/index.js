import './styles.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function UserCreate() {

    const history = useHistory();

    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    
    async function handleCreate(e) {
        e.preventDefault();
        const data = { name, birth };
        try {
            const response = await api.post('users', data);
            alert(`User created, your ID ${response.data.id}`)
            history.push('/')
        } catch(err) {
            alert(err);
        }
    }

    return (
        <div className="create-container">
            <form onSubmit={handleCreate}>
                <h3>Create user</h3>
                <input type="text" 
                        placeholder="Name" 
                        value={ name } 
                        onChange={ e => setName(e.target.value) }
                />
                <input type="text" 
                        placeholder="Birth" 
                        value={ birth } 
                        onChange={ e => setBirth(e.target.value) }
                />
                <button className="button button-create" type="submit">Create</button>
            </form>
        </div>
    );
}