import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  MessageSquare,
  BookOpen,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { useGetIdentity, useGetOne, useGetList } from "react-admin";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";
import { Statistics } from "../components/Statistics";

// Mock data for departments distribution
const departmentData = [
  { name: "People Operations", value: 25, color: "#4A1D8C" },
  { name: "Talent & Growth", value: 20, color: "#6B2FB8" },
  { name: "Culture & Engagement", value: 22, color: "#8B00FF" },
  { name: "Workplace & Experience", value: 18, color: "#A64DFF" },
  { name: "Leadership & Strategy", value: 15, color: "#C291FF" },
];

// Mock news data (replace with real API data later)
const newsItems = [
  {
    id: 1,
    title: "Welcome to Corporate Culture Community!",
    date: "2025-11-10",
    excerpt:
      "We're excited to have you join our growing community of People & Culture professionals...",
  },
  {
    id: 2,
    title: "New Event: HR Tech Summit 2025",
    date: "2025-11-08",
    excerpt:
      "Join us for an exclusive discussion on the latest HR technology trends...",
  },
  {
    id: 3,
    title: "Community Spotlight: Best Practices in Remote Work",
    date: "2025-11-05",
    excerpt:
      "Learn from industry leaders about creating effective remote work policies...",
  },
];

export const Welcome = () => {
  const { data: userId } = useGetIdentity();
  const { data: user } = useGetOne("users", { id: userId?.id });
  const { data: allUsers } = useGetList("users");
  const navigate = useNavigate();

  const totalMembers = allUsers?.length || 195;

  const resourceCards = [
    {
      title: "Communication Hub",
      description: "Join our Slack community and connect with members",
      icon: MessageSquare,
      color: "#4A1D8C",
      link: "https://slack.com",
    },
    {
      title: "Knowledge Hub",
      description: "Access our shared resources and documentation",
      icon: BookOpen,
      color: "#6B2FB8",
      link: "https://drive.google.com",
    },
    {
      title: "Events Hub",
      description: "Explore venues and locations from our community",
      icon: MapPin,
      color: "#8B00FF",
      onClick: () => navigate("/locations"),
    },
    {
      title: "Service Hub",
      description: "Discover services offered by community members",
      icon: Briefcase,
      color: "#A64DFF",
      onClick: () => navigate("/welcome"),
    },
  ];

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 8 }}>
        {/* Welcome Header */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome back, {user?.first_name}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here&apos;s what&apos;s happening in your community today
            </Typography>
          </Box>
          {user?.role === "admin" && (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4A1D8C",
                "&:hover": { bgcolor: "#6B2FB8" },
              }}
              onClick={() => navigate("/users")}
            >
              Manage Users
            </Button>
          )}
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
          >
            Community Overview
          </Typography>
          <Box
            sx={{
              position: "relative",
              maxWidth: 900,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
            }}
          >
            {/* SVG with Chart and Lines */}
            <svg
              width="100%"
              height="400"
              viewBox="0 0 900 400"
              style={{ position: "absolute" }}
            >
              {/* Pie Chart */}
              <g transform="translate(450, 200)">
                {departmentData.map((dept, index) => {
                  const total = departmentData.reduce(
                    (sum, d) => sum + d.value,
                    0,
                  );
                  const previousValues = departmentData
                    .slice(0, index)
                    .reduce((sum, d) => sum + d.value, 0);
                  const startAngle = (previousValues / total) * 360 - 90;
                  const endAngle =
                    ((previousValues + dept.value) / total) * 360 - 90;
                  const midAngle = (startAngle + endAngle) / 2;

                  const radius = 120;
                  const centerX = 0;
                  const centerY = 0;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const midRad = (midAngle * Math.PI) / 180;

                  const x1 = centerX + radius * Math.cos(startRad);
                  const y1 = centerY + radius * Math.sin(startRad);
                  const x2 = centerX + radius * Math.cos(endRad);
                  const y2 = centerY + radius * Math.sin(endRad);

                  const largeArcFlag = dept.value / total > 0.5 ? 1 : 0;

                  // Position label outside the circle
                  const labelDistance = 150;
                  const labelX = centerX + labelDistance * Math.cos(midRad);
                  const labelY = centerY + labelDistance * Math.sin(midRad);

                  // Text anchor based on position
                  const textAnchor = labelX > 0 ? "start" : "end";

                  return (
                    <g key={dept.name}>
                      {/* Pie slice */}
                      <path
                        d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={dept.color}
                        opacity={0.8}
                      />
                      {/* Label */}
                      <g>
                        <text
                          x={labelX}
                          y={labelY - 5}
                          fontSize="14"
                          fill={dept.color}
                          textAnchor={textAnchor}
                          fontWeight="600"
                        >
                          {dept.name}
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 12}
                          fontSize="12"
                          fill={dept.color}
                          textAnchor={textAnchor}
                          fontWeight="600"
                        >
                          {dept.value}%
                        </text>
                      </g>
                    </g>
                  );
                })}
                {/* White center circle */}
                <circle cx="0" cy="0" r="80" fill="white" />
              </g>
            </svg>

            {/* Center Content */}
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, color: "#4A1D8C" }}
              >
                {totalMembers}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Members
              </Typography>
            </Box>
          </Box>
          <Statistics
            statistics={[
              {
                label: "Venues Added",
                value: 32,
                icon: <MapPin size={20} />,
              },
              {
                label: "Experiences Shared",
                value: 48,
                icon: <MessageSquare size={20} />,
              },
              {
                label: "Events This Month",
                value: 6,
                icon: <Calendar size={20} />,
              },
            ]}
          />
        </Box>

        {/* Latest News Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Latest News
          </Typography>
          <Grid container spacing={3}>
            {newsItems.map((news) => (
              <Grid item xs={12} md={4} key={news.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", mb: 1, display: "block" }}
                    >
                      {new Date(news.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {news.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Resource Navigation Cards */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Your Resources
          </Typography>
          <Grid container spacing={3}>
            {resourceCards.map((resource) => {
              const Icon = resource.icon;
              return (
                <Grid item xs={12} sm={6} md={6} key={resource.title}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 4,
                      },
                    }}
                    onClick={
                      resource.onClick ||
                      (() => window.open(resource.link, "_blank"))
                    }
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "16px",
                          background: `linear-gradient(135deg, ${resource.color}15, ${resource.color}05)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Icon size={32} style={{ color: resource.color }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
