
const handleContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {
      console.log('Received contact form:', { name, email, message });
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(500).json({ message: 'An error occurred while processing the form' });
    }
  };
  
  module.exports = { handleContactForm };
  