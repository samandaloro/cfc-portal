import React from "react";
import { Box, Grid, Typography, Paper, Card, CardContent, CardActionArea, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface DashboardItem {
  title: string;
  icon: string;
  description: string;
  path: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardItemsAdmin: DashboardItem[] = [
    {
      title: "Create A Request",
      icon: "📝",
      description: "As an admin user, requests you submit will be marked as test requests.",
      path: "/dashboard/create-request"
    },
    {
      title: "View Requests",
      icon: "📋",
      description: "View All Requests",
      path: "/dashboard/view-requests"
    },
    {
      title: "Manage Site",
      icon: "⚙️",
      description: "Site settings, user management, and more.",
      path: "/dashboard/manage-site"
    }
  ];

  const dashboardItemsRequestor: DashboardItem[] = [
    {
      title: "Create A Request",
      icon: "📝",
      description: "Submit a new request for assistance",
      path: "/dashboard/create-request"
    },
    {
      title: "Request History",
      icon: "📋",
      description: "Check status of your requests",
      path: "/dashboard/request-history"
    }
  ];

  const dashboardItems = user?.admin_user ? dashboardItemsAdmin : dashboardItemsRequestor;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: "transparent",
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Welcome back, {user?.first_name}!
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Here's what you can do today
        </Typography>
      </Paper>

      {/* Dashboard Grid */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
      >
        {dashboardItems.map((item: DashboardItem, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
                borderRadius: 2,
                borderTop: '4px solid #b851e8',
                cursor: 'pointer'
              }}
              onClick={() => navigate(item.path)}
            >
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "3.5rem",
                      mb: 2,
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
