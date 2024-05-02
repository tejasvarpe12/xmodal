import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError('');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data validation
    if (!formData.username || !formData.email || !formData.dob || !formData.phone) {
      setError('Please fill out all fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Invalid email. Please check your email address.');
      return;
    }

    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      setError('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const dob = new Date(formData.dob);

    if (dob > today) {
      setError('Invalid date of birth. Please enter a past date.');
      return;
    }

    // Submit logic (not specified in the requirements)

    // Reset form data and close modal on successful submission
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
    setError('');
    setIsOpen(false);
  };

  return (
    <div className='container'>
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} />
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
              <label htmlFor="phone">Phone Number:</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
              <button type="submit" className="submit-button">Submit</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
