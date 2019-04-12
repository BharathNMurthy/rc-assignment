import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
const Home = () => (
  <div className="home">
    <div className='content'>Please use the below option to create Permissions and Role</div>
    <div className="links-wrapper">
      <Link className="link" to="/permission">
        Add Permission
      </Link>
      <Link className="link" to="/role">
        Add Role
      </Link>
    </div>
  </div>
);

export default Home;
