import React from 'react';
import useGetInputValues from '../useGetInputValues';

const ContactModal = ({ onClose, onSubmit }) => {
    const [values, handleChange, resetValues] = useGetInputValues({ name: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
        resetValues();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Name:</label>
                    <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Phone:</label>
                    <input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Submit</button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel</button>
                </div>
            </form>
        </div>
    </div>
);
};

export default ContactModal;
