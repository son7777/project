import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

const AboutPage = () => {
  
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
        <h1 style={{ padding:"10px" }}>RACT-CARDS</h1>
          <Paper
            variant="outlined"
            sx={{ padding: 3 }}
          >
The site serves as a digital display for business cards, offering various features to different types of users. Regular visitors have the ability to explore the website, viewing details about numerous businesses and expressing interest by liking the cards they find appealing. Those with business accounts can go a step further, crafting new business cards and populating them with pertinent information. Administrative personnel have the power to oversee user accounts, including modifying or erasing them, and alternating their status between regular and business users. Developed through the utilization of React.js and Node.js for the front and back ends respectively, the site also employs JavaScript as its core coding language. Moreover, it incorporates the MUI (Material-UI) library, furnishing pre-fabricated styles and elements. The site's design exudes a soothing and friendly ambiance, enabling users to concentrate on the content and interact with ease. Above all, the platform's main objective is the exhibition of business-related information, without any extraneous content diverging from the central theme.          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
