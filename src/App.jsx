import React, { useState, useMemo, useCallback } from 'react';
import ContactsList from './components/ContactsList';
import ContactModal from './components/ContactModal';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addContact = useCallback((newContact) => {
        setContacts((prev) => [...prev, { id: Date.now(), ...newContact }]);
    }, []);

    const editContact = useCallback((id, updatedContact) => {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedContact } : c)));
    }, []);

    const deleteContact = useCallback((id) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    }, []);

    return (
        <div className='mt-10'>
            <ContactsList
                contacts={contacts}
                onDelete={deleteContact}
                onEdit={editContact}
                onAdd={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
                <ContactModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(contact) => {
                        addContact(contact);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default App;
