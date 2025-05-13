import { Container, Grid, Typography, Paper, Divider } from "@mui/material";
import { FaPrescriptionBottleAlt, FaUsers, FaHeartbeat, FaPhoneAlt, FaEnvelope, FaGavel } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="aboutUsPage py-5">
      <Container>
        <Typography variant="h3" align="center" gutterBottom className="text-green-700 font-bold">
          About PharmaNest
        </Typography>

        <Typography variant="subtitle1" align="center" paragraph className="text-gray-700 max-w-2xl mx-auto">
          Welcome to PharmaNest – your trusted online pharmacy. We bring healthcare closer to you by
          offering a convenient platform where you can easily upload prescriptions, shop for
          medications, and receive trusted pharmaceutical care from the comfort of your home.
        </Typography>

        <Grid container spacing={4} className="my-5 items-center">
          <Grid item xs={12} md={6}>
            {/* <img
              src={aboutImage}
              alt="About PharmaNest"
              className="rounded-2xl shadow w-full object-cover"
              style={{ maxHeight: 400 }}
            /> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="p-5 rounded-xl">
              <Typography variant="h5" className="font-semibold text-green-800 mb-2">
                Our Mission
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-4">
                Our goal is to revolutionize pharmacy access by leveraging digital tools to make
                prescription fulfillment and medication delivery as seamless as possible. We prioritize
                your health, safety, and convenience.
              </Typography>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaPrescriptionBottleAlt className="text-green-600 mr-2" />
                  Easy and secure prescription uploads
                </li>
                <li className="flex items-center">
                  <FaUsers className="text-green-600 mr-2" />
                  Dedicated support from licensed pharmacists
                </li>
                <li className="flex items-center">
                  <FaHeartbeat className="text-green-600 mr-2" />
                  Reliable and timely medication delivery
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Divider className="my-8" />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} className="p-5 rounded-xl h-full">
              <Typography variant="h6" className="font-semibold text-green-800 mb-2">
                Contact Information
              </Typography>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-green-600" /> +1 (800) 123-4567
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 text-green-600" /> support@pharmanest.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2 font-medium">Address:</span> 123 Wellness Blvd, Health City, NY 10001
                </li>
              </ul>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} className="p-5 rounded-xl h-full">
              <Typography variant="h6" className="font-semibold text-green-800 mb-2">
                Legal Information
              </Typography>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <FaGavel className="mr-2 text-green-600" /> PharmaNest is a licensed online pharmacy operating under U.S. pharmaceutical regulations.
                </li>
                <li>
                  All prescription medications require a valid prescription uploaded by the customer.
                </li>
                <li>
                  Your data is securely encrypted and handled with utmost privacy in compliance with HIPAA regulations.
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="body1" align="center" className="text-gray-600 mt-10">
          Thank you for choosing PharmaNest. We're honored to be a part of your healthcare journey.
        </Typography>
      </Container>
    </section>
  );
};

export default AboutUs;
