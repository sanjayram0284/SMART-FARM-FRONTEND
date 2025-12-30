import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import "../styles/Profile.css";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/users/upload-profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      alert("Profile updated");
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-layout">
      <Navbar />

      <div className="profile-wrapper">
        <div className="profile-box">
          <h2 className="profile-title">My Profile</h2>

          <img
            src={user.profileImage || "https://via.placeholder.com/160"}
            alt="profile"
            className="profile-image-large"
          />

          <div className="profile-details">
            <p><span>Name :</span> {user.name}</p>
            <p><span>Email :</span> {user.email}</p>
            <p><span>Phone :</span> {user.phone || "Not provided"}</p>
          </div>

          <div className="profile-actions">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload Picture"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
