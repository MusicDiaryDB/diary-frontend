import {Link, useNavigate} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import "../assets/css/pages/Management.css"

function Management(){

// const navigate = useNavigate()
    // @ts-ignore

    const manageables = [
        {
            tableName:"Users",
            desc:"You may create new users or alter details for existing users here",
            addNewRoute:"/users",
            manageRoute:"/users"
        },
        {
            tableName:"Songs & Albums",
            desc:"Manage songs here",
            addNewRoute:"",
            manageRoute:""
        },
        {
            tableName:"Reviews",
            desc:"Manage reviews here",
            addNewRoute:"",
            manageRoute:""
        }

    ]
    return(
      <div className="managementPage">
          {
              manageables.map((cardData) =>
                  (
                      <Card sx={{width:345}}>
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                  {cardData.tableName}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {cardData.desc}
                              </Typography>
                          </CardContent>
                          <CardActions>
                              <Link to={cardData.addNewRoute}>
                                  <Button size="small">Add New</Button>
                              </Link>

                              <Link to={cardData.manageRoute}>
                                  <Button size="small">Manage</Button>
                              </Link>
                          </CardActions>
                      </Card>
                  ))
          }


      </div>
    )
}
export default Management;

