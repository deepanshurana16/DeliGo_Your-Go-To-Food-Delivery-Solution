import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import UserReposits from "./UserReposits.js";

const About = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRepo, setUserRepo] = useState([]);

  // Fetch user data
  const fetchUser = async () => {
    let userData = await fetch("https://api.github.com/users/deepanshurana16");
    const jsonUserData = await userData.json();
    setUserInfo(jsonUserData);
  };

  // Fetch user repositories
  const fetchRepos = async () => {
    let userRepoData = await fetch("https://api.github.com/users/deepanshurana16/repos");
    const jsonUserRepoData = await userRepoData.json();
    setUserRepo(jsonUserRepoData);
    console.log(jsonUserRepoData);
  };

  useEffect(() => {
    fetchUser();
    fetchRepos();
  }, []);

  if (!userInfo) {
    return <Shimmer />;
  }

  const { name, public_repos, avatar_url, login, location } = userInfo;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-auto w-80 border border-indigo-600 p-4 text-center">
        {/* User Info */}
        <img src={avatar_url} alt="userimg" className="w-32 h-32 rounded-lg mx-auto mb-4" />
        <h1 className="font-bold text-xl">{name}</h1>
        <h2>{location}</h2>
        <h2>Repositories: {public_repos}</h2>
        <h2>Username: {login}</h2>

        {/* List of Repositories */}
        <ul className="mt-4">
          {userRepo.length > 0 ? (
            userRepo.map((repo) => (
              <UserReposits key={repo.id} repoData={repo} />
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default About;
