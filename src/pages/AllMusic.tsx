import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "../assets/css/pages/Management.css";

const MusicCardsPage: React.FC = function () {
  const { userId } = useParams();

  const musicPages = [
    {
      name: "Songs",
      description: "View all songs",
      route: `/user/${userId}/music/songs`,
    },
    {
      name: "Albums",
      description: "View all albums",
      route: `/user/${userId}/music/albums`,
    },
    {
      name: "Artists",
      description: "View all artists",
      route: `/user/${userId}/music/artists`,
    },
  ];

  return (
    <div className="managementPage" style={{ padding: "30px" }}>
      <div className="column">
        {musicPages.map((cardData) => (
          <Card sx={{ width: 345 }} key={cardData.name}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cardData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {cardData.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={cardData.route}>
                <Button size="small">View</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MusicCardsPage;
