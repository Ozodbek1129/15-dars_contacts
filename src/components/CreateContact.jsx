import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../useDebounce';
import { memo } from 'react';

const ContactsList = ({ contacts, onDelete, onEdit }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const navigate = useNavigate();

    const filteredContacts = useMemo(() => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [contacts, debouncedSearch]);

    return (
        <div>
            <header>
                <h2>Salom</h2>
                <input
                    type="text"
                    placeholder="Search Contacts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => navigate('/create-contact')}>Add Contact</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ContactRow = memo(({ contact, onDelete, onEdit }) => {
    const handleDelete = () => onDelete(contact.id);
    const handleEdit = () => {
        const newName = prompt('Enter new name:', contact.name);
        const newPhone = prompt('Enter new phone:', contact.phone);
        if (newName && newPhone) onEdit(contact.id, { name: newName, phone: newPhone });
    };

    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
});

export default ContactsList;