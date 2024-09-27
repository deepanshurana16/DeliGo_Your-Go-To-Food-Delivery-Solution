import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const About = () => {
  const [userInfo, setuserInfo] = useState(null);

  const fetchUser = async () => {
    let userData = await fetch(" https://api.github.com/users/");
    const jsonUserData = await userData.json();
    setuserInfo(jsonUserData);
  };


  useEffect(() => {
    // fetchUser();
    fetchUser();
  },[]);

  if (userInfo === null) {
    <Shimmer />;
  }

  const { name, public_repos, avatar_url, login, location } = userInfo || [];

  return (
    <div className="about-container">
      <img src={avatar_url} alt="userimg" className="userimg" />
      <h1>{name}</h1>
      <h2>{location}</h2>
      <h2>{public_repos}</h2>
      <h2>{login}</h2>

    </div>
  );
};

export default About;
