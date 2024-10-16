import {Link, useLocation, useNavigate} from 'react-router-dom';
import "../../../assets/css/components/layout/AppFooter.css"
function AppFooter(){
const navigate = useNavigate()
    return(

        <footer style={{ minWidth:'1200px'}}>
           <h3>Copyright 2024</h3>
        </footer>

    )
}
export default AppFooter;

