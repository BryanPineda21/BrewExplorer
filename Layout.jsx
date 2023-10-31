import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="nav-bar">
        <ul>

        <li className="logo" key="logo">
            <img src="https://www.lehighvalleylive.com/resizer/AgOtQuFhUdOVRMcnbM_JyKlOB2k=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.lehighvalleylive.com/home/lvlive-media/width2048/img/entertainment_impact/photo/24522002-standard.jpg" 
            alt="Logo" width="100" height="50" />
          </li>


          <li className="home-link" key="home-button">
            <Link to="/">
              Home
            </Link>
          </li>

          <li className="brew-link" key="brewery-link">
            <Link to="/details">Brewery Details</Link>
          </li>
          <li className="brew-size" key="brewerySize-link">
            <Link to="/brew-size">Brewery size</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;