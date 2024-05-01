import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const ProfilePage = () => {
  // State variables to store CFP stats
  const [totalCFPs, setTotalCFPs] = useState(0);
  const [completedCFPs, setCompletedCFPs] = useState(0);
  const [pendingCFPs, setPendingCFPs] = useState(0);

  useEffect(() => {
    // Function to fetch CFP data from backend
    const fetchCFPData = async () => {
      try {
        // Make GET request to fetch CFP data
        const response = await axios.get("/api/cfps");
        const cfps = response.data;

        // Calculate total number of CFPs
        const total = cfps.length;

        // Calculate number of completed and pending CFPs
        const completed = cfps.filter(
          (cfp) => cfp.reviewStatus === "Reviewed"
        ).length;
        const pending = total - completed;

        // Set state variables with calculated values
        setTotalCFPs(total);
        setCompletedCFPs(completed);
        setPendingCFPs(pending);
      } catch (error) {
        console.error("Error fetching CFP data:", error);
      }
    };

    // Call fetchCFPData function
    fetchCFPData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">CFP Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-lg font-semibold text-blue-700 mb-1">
              Total CFPs
            </p>
            <p className="text-xl">{totalCFPs}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-lg font-semibold text-green-700 mb-1">
              Completed CFPs
            </p>
            <p className="text-xl">{completedCFPs}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-lg font-semibold text-yellow-700 mb-1">
              Pending CFPs
            </p>
            <p className="text-xl">{pendingCFPs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
