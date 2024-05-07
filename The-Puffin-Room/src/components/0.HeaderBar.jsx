import { Link } from "react-router-dom";

function HeaderBar(){
    return(
        <div className="headerBar">
        <Link to="/" className="headerTitle">
        <span className="titleThe">T h e</span><br />
        <span className="titlePuffinRoom">Puffin Room</span>
        </Link>
        </div>
    )
}

export default HeaderBar