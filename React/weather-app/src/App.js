import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [user, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    id: -1,
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    hashed_password: "",
    is_active: true,
  });

  const fetchUsers = async () => {
    const response = await api.get("/users/");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setUserData({ ...userData, [event.target.email]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/users", userData);
    fetchUsers();
    setUserData({
      id: -1,
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      hashed_password: "",
      is_active: true,
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.is_active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
