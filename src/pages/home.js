import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { AuthContext } from "../store/auth-context";

function HomePage() {
  const [meetups, setMeetups] = useState([]); 
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/home')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMeetups(data);
      })
      .catch(err => {
        console.log('home error:', err);
      });
  }, []);

  return (
    <div className='home-container'>
      <div className="home-header">
        <h1 className="home-title">Community Meetups</h1>
        {authCtx.user && <p className="home-welcome">Welcome {authCtx.user.username}</p>}
        <button className="home-button" onClick={() => navigate('/meetups')}>Browse Meetups</button>
      </div>
      <div className="home-content">
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={`http://localhost:4000/${meetups[0]?.main_image.url}`} alt={meetups[0]?.title} width="100%" height="100%" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>{meetups[0]?.title}</h1>
                  <p>{meetups[0]?.location}</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
              <div className="container">
                <div className="carousel-caption">
                  <h1>{meetups[1]?.title}</h1>
                  <p>{meetups[1]?.location}</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
              <div className="container">
                <div className="carousel-caption text-end">
                  <h1>{meetups[2]?.title}</h1>
                  <p>{meetups[2]?.location}</p>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;