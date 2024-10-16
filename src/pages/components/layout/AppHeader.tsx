import "../../../assets/css/components/layout/AppHeader.css"
import {useNavigate} from 'react-router-dom';
function AppHeader(){

const navigate = useNavigate()
    return(

        <header style={{ minWidth:'1200px'}}>
           <p>MusicDiary</p>

                <p onClick={
                    () => {
                        sessionStorage.setItem("username","")
                        navigate("/")

                    }
                }>Logout</p>
        </header>
    )
}
export default AppHeader;

