import React, { useState } from 'react';
import './ContactUs.css';
import contactImage from './contact.jpg'; // Adjust the path if necessary

// Import SimpleDatePicker if it's a custom component or remove its usage if it's not needed
// import SimpleDatePicker from './SimpleDatePicker';

const ContactUs = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAppointmentClick = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    alert(`You have booked an appointment for ${new Date(date).toLocaleString()}`);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <form className="contact-form">
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Message:
              <textarea name="message"></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
          <div className="advisor-section">
            <h2>Meet with Our Advisor</h2>
            <p>By Phone: <strong>(123) 456-7890</strong></p>
            <button onClick={handleAppointmentClick} className="appointment-button">Book an In-Person Appointment</button>
            {showCalendar && (
              <p>Calendar Component</p>
              // Uncomment and use the following line if you have the SimpleDatePicker component
              // <SimpleDatePicker onDateChange={handleDateChange} />
            )}
          </div>
        </div>
        <div className="contact-image-container">
          <img src={contactImage} alt="Contact Us" className="contact-image" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
