import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_r730l44', 
        'template_b7m47t9', 
        formData,
        'duBS1zA1H0nt2f98C' 
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' }); 
        },
        (error) => {
          console.log('FAILED...', error);
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Fill out the form below.</p>
      {status && <p className="status-message">{status}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
