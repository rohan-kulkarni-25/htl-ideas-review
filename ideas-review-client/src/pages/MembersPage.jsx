import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MembersPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [members, setMembers] = useState();

  const handleGetAllUsers = async () => {
    try {
      let response = await axios({
        method: "get",
        url: "http://192.168.1.2:8080/api/v1/users/getUsers",
        withCredentials: true,
      });
      setMembers(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllUsers()
  }, [])
  

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!githubUsername || !role) return;

    const newMember = {
      username:githubUsername,
      userType:role,
    };

    await axios({
      method: "post",
      url: "http://192.168.1.2:8080/api/v1/users/addUser",
      data: newMember,
      withCredentials: true,
    });
    handleGetAllUsers()
  };

  const handleDeleteMember = async(id) => {
    await axios({
      method: "delete",
      url: "http://192.168.1.2:8080/api/v1/users/deleteUser",
      withCredentials: true,
      data:{
        userId:id
      }
    });
    handleGetAllUsers()
  };

  return (
    <div className="container mt-8 mx-4">
      <h1 className="text-3xl font-bold mb-4">Members</h1>

      <form
        onSubmit={handleAddMember}
        className="flex items-center w-3/4 my-12"
      >
        <input
          type="text"
          placeholder="GitHub Username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          className="border border-gray-300 rounded-l-lg py-2 px-4 w-1/3 mr-2 focus:outline-none focus:border-blue-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-r-lg py-2 px-4 w-1/2 ml-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 w-1/3 px-4 rounded-lg ml-4"
        >
          Add Member
        </button>
      </form>

      <table className="table-fixed border-collapse border border-gray-300 w-1/2">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/3 border border-gray-300 px-4 py-2">
              GitHub Username
            </th>
            <th className="w-1/3 border border-gray-300 px-4 py-2">Role</th>
            <th className="w-1/3 border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {member.username}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {member.userType}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex items-center flex-row justify-center">
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersPage;
