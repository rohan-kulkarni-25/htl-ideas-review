import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import talksData from "../data/talks.json"; // Import dummy talks data
import ReviewModal from "../components/TalkDetailsPage/ReviewModal";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";

const TalkDetails = () => {
  const location = useLocation();
  const [talk, setTalk] = useState(location.state.talk);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmitReview = async (rating) => {
    await axios({
      method: "post",
      url: "http://192.168.1.2:8080/api/v1/users/addVote",
      withCredentials: true,
      data: {
        talkId: talk._id,
        vote: rating,
      },
    });
    toast.success("Vote Submitted !");
    navigate("/review-cfp");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 overflow-hidden overflow-y-scroll sm:h-screen sm:pb-48">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={() => navigate("/review-cfp")}
        >
          <BiArrowBack className="mr-2" />
          Back to IDEAS List
        </button>
      </div>
      <div className="overflow-y-scroll h-128">
        <h1 className="text-3xl font-semibold mb-4 sm:text-2xl">
          Idea Details
        </h1>
        <div className="flex justify-end items-center mb-6 sm:text-xs">
          <p className="text-gray-600 mr-4">Your Vote: {talk.userVotes}</p>
          <p className="text-gray-600 mr-4">Review Status: {talk.status}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            Submit Review
          </button>
        </div>

        {isModalOpen && (
          <ReviewModal
            onSubmit={handleSubmitReview}
            onClose={handleCloseModal}
          />
        )}

        {talk ? (
          <div className="bg-white p-6 shadow rounded-md gap-8 flex flex-col sm:text-sm  overflow-hidden  ">
            <h1 className="font-bold">What's your Project Idea About? (Share about your solution approach)</h1>
            <h2 className=" mb-2 sm:text-lg">
              {talk.talkTitle}
            </h2>
            <h1 className="font-bold">What Problem are you trying to solve? (Share about your Problem you are solving)</h1>
            <p className="mb-2">{talk.talkSummary}</p>
            <h1 className="font-bold">Please share The Tech Stack that needs to be Used in your Project.</h1>
            <p className=" mb-2">
              {talk.talkDescription}
            </p>
            <h1 className="font-bold">Have you participated in Hack The League or Eth India/Hack This Fall/ Any other Web3 Hackathon before? If Yes, Name the hackathon(s).</h1>
            <p className=" mb-2">{talk.hackathons}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TalkDetails;
