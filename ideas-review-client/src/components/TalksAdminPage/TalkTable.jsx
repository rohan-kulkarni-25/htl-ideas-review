import axios from "axios";
import { useNavigate } from "react-router-dom";

const TalkTable = ({ talks, members,handleDeleteTalk,handleStatusUpdate }) => {
  const navigate = useNavigate();



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="">
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-2/4">
              Talk Title
            </th>
            <div className="w-fit flex-1 flex flex-row items-center bg-gray-50">
              {members?.map((user) => {
                if (user.userType == "admin") {
                  return;
                }
                return (
                  <th
                    key={user._id}
                    className="px-6 py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {user.username}
                  </th>
                );
              })}
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Avg Votes
              </th>
            </div>

            <th className="px-6 py-3 bg-gray-50  text-xs leading-4 flex-1 font-medium text-gray-500 uppercase tracking-wider  w-2/4">
              STATUS
            </th>
            <th className="px-6 py-3 bg-gray-50 "></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {talks?.map((talk) => (
            <tr key={talk.id}>
              <td className="px-6 py-4 whitespace-no-wrap w-2/4">
                <div className="text-sm leading-5 font-medium text-gray-900">
                  {talk.talkTitle}
                </div>
              </td>
              
              <div className="flex flex-row justify-around">
              {members?.map((user) => {
                if (user.userType == "admin") {
                  return;
                }
                let vote = talk.votes.find(o => o.username === user.username)

                if (!vote) {
                  vote =0
                }
                return (
                  <td
                    key={user._id}
                    className="px-6 py-3  text-left text-xs leading-4 font-medium uppercase tracking-wider"
                  >
                    {vote}
                  </td>
                );
              })}
              <td className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                {0}
              </td>
            </div>
              <td className="px-6 py-4 whitespace-no-wrap text-center text-xs leading-5 font-medium flex-1 w-2/4">
                <select
                  value={talk.status}
                  onChange={(e) => handleStatusUpdate(talk._id,e.target.value)}
                  className="border border-gray-300 rounded-r-lg py-2 px-4 w-1/2 ml-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Status</option>
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                  <option value="waitlist">Waitlist</option>
                </select>
              </td>
              <td className="">
                <button
                  onClick={() => handleDeleteTalk(talk._id)}
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

export default TalkTable;
