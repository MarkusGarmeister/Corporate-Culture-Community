import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import {
  Building2,
  Mail,
  Briefcase,
  MapPin,
  Star,
  MessageSquare,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { colors } from "../../theme";
import { User } from "../../types/index";
import { useGetOne, useGetList } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { BackToMarket } from "../../components/BackToMarket";
import { DepartmentDropDown } from "../../components/Departments";
import { validationRules } from "../../utils/validation";
import { useFormValidation } from "../../hooks/useFormValidation";
import { Statistics } from "../../components/Statistics";

// renders location and experience tab
function LocExpTab(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tab"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  );
}

export function UserProfilePage() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetOne("users", { id });
  const { data: locations } = useGetList("locations");
  const { data: ratings } = useGetList("ratings");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const handleSave = () => {
    //TODO call backend
    setIsEditing(false);
  };
  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<User>(user, validationRules, handleSave);

  // user statistics caculated from locations and ratings
  const userLocations =
    locations?.filter((l) => l.created_by === user?.id) || [];
  const userRatings = ratings?.filter((r) => r.user_id === user?.id) || [];
  const totalContributions = userLocations.length + userRatings.length;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  if (isLoading) {
    return <Box>Is Loading ...</Box>;
  }
  if (isError || !user) {
    return <Box>Error loading user profile</Box>;
  }
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Main Content */}
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Header backButton={<BackToMarket />} />
          {/* Profile Header Card */}
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 96,
                      height: 96,
                      fontSize: "2rem",
                      bgcolor: colors.iconBg,
                      color: colors.icon,
                    }}
                  >
                    {user.first_name.charAt(0).toUpperCase() +
                      user.last_name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      {user.first_name + " " + user.last_name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Briefcase size={16} />
                        <Typography variant="body2">{user.role}</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Building2 size={16} />
                        <Typography variant="body2">{user.company}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit2 size={16} />}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<X size={16} />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Save size={16} />}
                      onClick={handleSave}
                      sx={{
                        bgcolor: colors.primary,
                        color: colors.ctaText,
                        "&:hover": {
                          bgcolor: colors.primary,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Profile Information */}
              <Divider sx={{ my: 3 }} />

              {isEditing ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={user?.first_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={user?.last_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={user?.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={user.city}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={user.company}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Work Position"
                      value={user?.work_position}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DepartmentDropDown
                      value={user?.department || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="LinkedIn URL"
                      type="url"
                      value={user.linkedInUrl}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                        color: "text.secondary",
                      }}
                    >
                      <Mail size={16} />
                      <Typography variant="body2">Email</Typography>
                    </Box>
                    <Typography variant="body1">{user.email}</Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <Statistics
            statistics={[
              {
                label: "Venues Added",
                value: userLocations.length,
                icon: <MapPin size={20} />,
              },
              {
                label: "Experiences Shared",
                value: userRatings.length,
                icon: <MessageSquare size={20} />,
              },
              {
                label: "Total Contributions",
                value: totalContributions,
                icon: <Star size={20} />,
              },
            ]}
          />
          {/* Activity Tabs */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label={`My Venues (${userLocations.length})`} />
                  <Tab label={`My Experiences (${userRatings.length})`} />
                </Tabs>
              </Box>

              <LocExpTab value={tabValue} index={0}>
                {userLocations.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {userLocations.map((venue) => (
                      <Card
                        key={venue.id}
                        variant="outlined"
                        sx={{
                          transition: "box-shadow 0.3s",
                          "&:hover": {
                            boxShadow: 3,
                          },
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Box
                              sx={{
                                width: 128,
                                height: 96,
                                borderRadius: 1,
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  mb: 1,
                                }}
                              >
                                <Box>
                                  <Typography variant="h6" gutterBottom>
                                    {venue.name}
                                  </Typography>
                                  <Chip label={venue.category} size="small" />
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <Star
                                    size={16}
                                    fill="#facc15"
                                    color="#facc15"
                                  />
                                  <Typography variant="body2">
                                    {venue.final_rating.toFixed(1)}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {venue.description}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                  color: "text.secondary",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <MapPin size={16} />
                                  <Typography variant="caption">
                                    {venue.address}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <Calendar size={16} />
                                  <Typography variant="caption">
                                    {new Date(
                                      venue.createdAt,
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <MessageSquare size={16} />
                                  <Typography variant="caption">
                                    {venue.experienceCount} experiences
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      bgcolor: "grey.50",
                      borderRadius: 1,
                    }}
                  >
                    <MapPin
                      size={48}
                      style={{ color: "#9ca3af", margin: "0 auto 12px" }}
                    />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      You haven't added any venues yet.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/locations")}
                      sx={{ mt: 2 }}
                    >
                      Explore Event Hub
                    </Button>
                  </Box>
                )}
              </LocExpTab>

              <LocExpTab value={tabValue} index={1}>
                {userRatings.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {userRatings.map((exp) => {
                      const venue = locations?.find(
                        (l) => l.id === exp.location_id,
                      );
                      return (
                        <Card
                          key={exp.id}
                          variant="outlined"
                          sx={{
                            transition: "box-shadow 0.3s",
                            "&:hover": {
                              boxShadow: 3,
                            },
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {venue?.name || "Unknown Venue"}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "text.secondary",
                                  }}
                                >
                                  <Calendar size={16} />
                                  <Typography variant="caption">
                                    {new Date(
                                      exp.createdAt,
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <Star
                                  size={20}
                                  fill="#facc15"
                                  color="#facc15"
                                />
                                <Typography variant="h6">
                                  {exp.rating}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{ lineHeight: 1.7 }}
                            >
                              {exp.comment}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      bgcolor: "grey.50",
                      borderRadius: 1,
                    }}
                  >
                    <MessageSquare
                      size={48}
                      style={{ color: "#9ca3af", margin: "0 auto 12px" }}
                    />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      You haven't shared any experiences yet.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/locations")}
                      sx={{ mt: 2 }}
                    >
                      Explore Event Hub
                    </Button>
                  </Box>
                )}
              </LocExpTab>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
