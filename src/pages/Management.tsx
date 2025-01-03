import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import "../assets/css/pages/Management.css";

function Management() {
  // @ts-ignore

  const manageables = [
    {
      tableName: "Users",
      desc: "You may create new users or alter details for existing users here",
      route: "/admin/manage/users",
    },
    {
      tableName: "Music",
      desc: "Manage music here",
      route: "/admin/manage/songs_albums",
    },
    {
      tableName: "Reviews",
      desc: "Manage reviews here",
      route: "/admin/manage/reviews",
    },
    {
      tableName: "Diary Entries",
      desc: "Manage diary entries here",
      route: "/admin/manage/entries",
    },
    {
      tableName: "Diary Reports",
      desc: "Manage diary reports here",
      route: "/admin/manage/reports",
    },
  ];

  // card table for admin metrics view
  const infoCard = {
    tableName: "Database Info, Health, & Performance",
    desc: "View database info and performance metrics here",
    route: "/admin/info-metrics",
  };
  const aggregateMetricsCard = {
    tableName: "Database Aggregation Metrics",
    desc: "View aggregated metrics about database",
    route: "/admin/aggregate-metrics",
  };
  const aggregateMetricsGraphCard = {
    tableName: "Database Aggregate Metrics (Graphs)",
    desc: "View graphs of some aggregated metrics about database",
    route: "/admin/aggregate-graphs",
  };

  return (
    <div className="managementPage">
      <div className="column">
        {manageables.map((cardData) => (
          <Card sx={{ width: 345 }} key={cardData.tableName}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cardData.tableName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {cardData.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={cardData.route}>
                <Button size="small">Manage</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>

      <div className="column">
        <Card sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {infoCard.tableName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {infoCard.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={infoCard.route}>
              <Button size="small">View</Button>
            </Link>
          </CardActions>
        </Card>

        <Card sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {aggregateMetricsCard.tableName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {aggregateMetricsCard.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={aggregateMetricsCard.route}>
              <Button size="small">View</Button>
            </Link>
          </CardActions>
        </Card>

        <Card sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {aggregateMetricsGraphCard.tableName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {aggregateMetricsGraphCard.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={aggregateMetricsGraphCard.route}>
              <Button size="small">View</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
export default Management;
