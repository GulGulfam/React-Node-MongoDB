import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/users/profile")
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSave = () => {
        axios.put("http://localhost:4000/users/profile", profile)
            .then(response => {
                setProfile(response.data);
                setIsEditing(false);
                alert("Profile saved successfully");
            })
            .catch(error => {
             
            });
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        if (window.confirm("Do you want to logout?")) {
            navigate("/");
        }
    };

    return (
        <div className="profile-container">
            <header>
                <nav>
                    <ul className="nav-lists">
                        <li>
                            <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation("/report")}>Reports</button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation("/profile")}>Profile</button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation("/medicine-search")}>Medicine Search</button>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                    <div className="search-container">
                        <input type="text" placeholder="Search..." />
                    </div>
                </nav>
            </header>
            <div className="profile-content">
                <img
                    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    alt="Profile"
                    className="profile-picture"
                />
                {isEditing ? (
                    <div className="edit-profile">
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <button onClick={handleSave} className="save-button">Cancel</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Save</button>
                    </div>
                ) : (
                    <div className="view-profile">
                        <h2>{profile.name}</h2>
                        <p>{profile.email}</p>
                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Profile;
