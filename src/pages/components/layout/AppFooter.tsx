import {Link, useLocation} from 'react-router-dom';
import "../../../assets/css/components/layout/AppFooter.css"
function AppFooter(){

    return(

        <footer style={{ minWidth:'1200px'}}>
           <h3>Copyright 2024</h3>
            <div className="viewSwitch">
                <p>Admin</p>
                <p>/</p>
                <p>User</p>
            </div>
        </footer>

    )
}
export default AppFooter;

