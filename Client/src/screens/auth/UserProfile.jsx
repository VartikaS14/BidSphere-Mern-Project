import React, { useEffect, useState } from "react";
import { Caption, Title } from "../../router";
import { commonClassNameOfInput, PrimaryButton } from "../../components/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getuserProfile } from "../../redux/features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  useRedirectLoggedOutUser("/login");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getuserProfile());
  }, [dispatch]);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    //formData.append("role", role);
    if (profilePicture) {
      formData.append("photo", profilePicture);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user?._id}`, formData)
        console.log("response",response);
      
      // Assuming you want to update the user data in the state after a successful update
      dispatch(getuserProfile()); // Refetch user data after updating
      navigate("/profile"); // Navigate to account page after successful update
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <section className="shadow-s1 p-8 rounded-lg">
      <div className="profile flex items-center gap-8">
        <img
          src={`http://localhost:5000/${user?.photo}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <Title level={5} className="capitalize">
            {user?.name}
          </Title>
          <Caption>{user?.email}</Caption>
        </div>
      </div>
      <form onSubmit={handleSave}>
        <div className="flex items-center gap-5 mt-10">
          <div className="w-full">
            <Caption className="mb-2">Full Name</Caption>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`capitalize ${commonClassNameOfInput}`}
              placeholder="Sunil"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 mt-10">
          <div className="w-full">
            <Caption className="mb-2">Email</Caption>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={commonClassNameOfInput}
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <div className="my-8">
          <Caption className="mb-2">Role</Caption>
          <input
            type="text"
            value={role}
            className={commonClassNameOfInput}
            required
          />
        </div>
        <div className="my-8">
          <Caption className="mb-2">Profile Picture</Caption>
          <input
            type="file"
            onChange={handleFileChange}
            className={commonClassNameOfInput}
          />
        </div>
        <PrimaryButton type="submit">Update Profile</PrimaryButton>
      </form>
    </section>
  );
};
