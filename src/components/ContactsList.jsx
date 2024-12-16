import React, { useState, useMemo } from "react";
import useDebounce from "../useDebounce";
import { memo } from "react";

const ContactsList = ({ contacts, onDelete, onEdit, onAdd }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [contacts, debouncedSearch]);

  return (
    <div className="min-w-full">
      <header className=" shadow-md py-5 w-full flex justify-around items-center mb-5 max-sm:flex-col max-sm:gap-10 max-sm:justify-center">
        <h2 className="text-3xl font-bold">Contacts</h2>
        <input
          type="text"
          placeholder="Search Contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-72 text-lg"
        />
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Contact
        </button>
      </header>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Actions</th>
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
    const newName = prompt("Enter new name:", contact.name);
    const newPhone = prompt("Enter new phone:", contact.phone);
    if (newName && newPhone)
      onEdit(contact.id, { name: newName, phone: newPhone });
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="border p-2">{contact.name}</td>
      <td className="border p-2">{contact.phone}</td>
      <td className="border p-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500 mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
});

export default ContactsList;
