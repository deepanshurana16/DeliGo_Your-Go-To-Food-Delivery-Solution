const UserReposits = (props) => {
    const { repoData } = props;
  
    return (
      <div className="usereposits">
        {/* Display the repository name */}
        <h1>{repoData.name}</h1>
      </div>
    );
  };
  
  export default UserReposits;
  