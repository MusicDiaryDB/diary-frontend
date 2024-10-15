import "../../../assets/css/components/layout/AppHeader.css"
import {Link, useLocation} from 'react-router-dom';
function AppHeader(){


    return(

        <header style={{ minWidth:'1200px'}}>
           <p>MusicDiary</p>
            <Link to="/">
                <p>Login</p>
            </Link>
        </header>
    )
}
export default AppHeader;

