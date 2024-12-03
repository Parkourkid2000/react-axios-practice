import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [user, setUser] =  useState([]);
  const navigate = useNavigate();

  async function fetchUsers() {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`)
  setUser(data)
}

useEffect(() => {
  fetchUsers()
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
            {user.map((user) => (
          <div key={user.name} className="user" onClick={() => navigate(`/${user.id}`)}>
            <div className="user-card">
              <div className="user-card__container">
                <h3>{user.name}</h3>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Phone:</b> {user.phone}
                </p>
                <p>
                  <b>Website:</b>
                  {user.website}
                </p>
              </div>
            </div>
          </div>

            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
