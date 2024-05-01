import  { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Dashboard = () => {
  const user = useSelector(state=>state.user)
    // State variables to store CFP stats

    const [totalCFPs, setTotalCFPs] = useState(0);
    const [completedCFPs, setCompletedCFPs] = useState(0);
    const [pendingCFPs, setPendingCFPs] = useState(0);

    const handleGetTalks = async () => {
      try {
        let response = await axios.get(
          "http://192.168.1.2:8080/api/v1/users/getTalks",
          { withCredentials: true }
        );
        setTotalCFPs(response.data.data.talks.length)
        let completed = 0;
        response.data.data.talks.forEach((talk)=>{
          if (talk.userVotes > 0) {
            completed = completed+1;
          }
        })
        setCompletedCFPs(completed)
        setPendingCFPs(response.data.data.talks.length - completed)
      } catch (error) {
        console.log(error);
      }
    };



    const handleGetAllUsers = async () => {
      try {
        let response = await axios({
          method: "get",
          url: "http://192.168.1.2:8080/api/v1/users/getUsers",
          withCredentials: true,
        });
        // setMembers(response.data.data.users)
        
      } catch (error) {
        console.log(error);
      }
    }
  
  
    useEffect(() => {
      toast.success(`Welcome ${user.user.username}`)
      // handleGetAllUsers()
      handleGetTalks()
    }, []);
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ideas Review Stats</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-2">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-700 mb-1">
                Total Ideas
              </p>
              <p className="text-xl">{totalCFPs}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-700 mb-1">
                Completed Ideas
              </p>
              <p className="text-xl">{completedCFPs}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-yellow-700 mb-1">
                Pending Ideas
              </p>
              <p className="text-xl">{pendingCFPs}</p>
            </div>
            {/* {user.user.userType == "admin" && <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-yellow-700 mb-1">
                Total Members
              </p>
              <p className="text-xl">{pendingCFPs}</p>
            </div>} */}
          </div>
        </div>
      </div>
    );
}

export default Dashboard