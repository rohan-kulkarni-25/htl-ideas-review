import { useEffect, useState } from "react";
import TalkTable from "../components/TalksAdminPage/TalkTable";
import axios from "axios";

const TalksAdminPage = () => {
  const [talks, setTalks] = useState([]);
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

  const handleGetAllTalks = async () => {
    try {
      let response = await axios({
        method: "get",
        url: "http://192.168.1.2:8080/api/v1/users/getAllTalks",
        withCredentials: true,
      });
      setTalks(response.data.data.talks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTalk = async(id) => {
    await axios({
      method: "delete",
      url: "http://192.168.1.2:8080/api/v1/users/deleteTalk",
      withCredentials: true,
      data:{
        talkId:id
      }
    });
    handleGetAllUsers()
    handleGetAllTalks()
  };

  const handleStatusUpdate = async(id,status) => {
    await axios({
      method: "post",
      url: "http://192.168.1.2:8080/api/v1/users/updateTalkStatus",
      withCredentials: true,
      data:{
        talkId:id,
        status
      }
    });

    handleGetAllUsers()
    handleGetAllTalks()
  }

  useEffect(() => {
    handleGetAllTalks();
    handleGetAllUsers()
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">TALKS</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TalkTable talks={talks} members={members} handleDeleteTalk={handleDeleteTalk} handleStatusUpdate={handleStatusUpdate}/>
      </div>
    </div>
  );
};

export default TalksAdminPage;
