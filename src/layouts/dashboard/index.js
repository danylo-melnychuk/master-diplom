import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

const API_KEY = "0fa2a576729f0be48346f481e3ac29d9"; // Вставте ваш API-ключ
const LAT = 49.8397; // Широта Львова
const LON = 24.0297; // Довгота Львова

const Dashboard = () => {
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
        );
        const data = await response.json();
        if (data?.list?.length) {
          const { components, main } = data.list[0];
          setAirQuality({ ...components, aqi: main.aqi });
        }
      } catch (error) {
        console.error("Failed to fetch air quality data", error);
      }
    };
    fetchAirQuality();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="air"
                title="PM2.5"
                count={airQuality?.pm2_5 || "N/A"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Particulate matter (PM2.5)",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="air"
                title="PM10"
                count={airQuality?.pm10 || "N/A"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Particulate matter (PM10)",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="co2"
                title="CO (Carbon Monoxide)"
                count={airQuality?.co || "N/A"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Carbon Monoxide",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="cloud"
                title="AQI"
                count={airQuality?.aqi || "N/A"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Air Quality Index",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
