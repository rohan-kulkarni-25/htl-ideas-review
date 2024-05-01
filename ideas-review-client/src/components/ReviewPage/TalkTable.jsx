import React from "react";
import { useNavigate } from "react-router-dom";

const TalkTable = ({ talks }) => {
  const navigate = useNavigate();

  const handleTalkDetailsClick = (talk) => {
    // Navigate to the talk details page with the talk ID passed as a prop
    navigate("/talk-details", { state: { talk } });
  };

  return (
    <div className="overflow-hidden overflow-y-scroll h-128 sm:mt-12">
      <table className="min-w-full">
        <thead >
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
              IDEA
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Vote
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Review Status
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="max-h-12 divide-y divide-gray-200 overflow-x-scroll overflow-y-scroll overflow-hidden   sm:text-xs">
          {talks?.map((talk) => (
            <tr key={talk._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 font-medium text-gray-900 sm:text-xs">
                  {talk.talkTitle}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 font-medium text-gray-900 sm:text-xs">
                  {talk.userVotes}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 font-medium text-gray-900 sm:text-xs">
                  {talk.status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium sm:text-xs">
                <button
                  onClick={() => handleTalkDetailsClick(talk)}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none cursor-pointer"
                >
                  Review IDEA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TalkTable;
