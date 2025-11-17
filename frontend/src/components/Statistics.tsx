import { Card, CardContent, Box, Typography, Grid } from "@mui/material";

interface StatisticsItems {
  label: string;
  value: number;
  icon: React.ReactNode;
}
interface StatisticsProps {
  statistics: StatisticsItems[];
}

export const Statistics = ({ statistics }: StatisticsProps) => {
  return (
    <Grid container spacing={2}>
      {statistics.map((statistics) => (
        <Grid item xs={12} sm={4} key={statistics.label}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  color: "text.secondary",
                }}
              >
                {statistics.icon}
                <Typography variant="body2">{statistics.label}</Typography>
              </Box>
              <Typography variant="h3">{statistics.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
