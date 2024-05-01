import { useEffect, useState } from "react";
import TalkTable from "../components/ReviewPage/TalkTable";
import axios from "axios";

const ReviewPage = () => {
  const [talks, setTalks] = useState([]);
  const [filteredTalks, setFilteredTalks] = useState([]);
  const [statusFilter, setStatusFilter] = useState({
    reviewed: false,
    pending: false,
  });
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetTalks();
  }, []);

  useEffect(() => {
    filterTalks();
  }, [talks, statusFilter, sortOrder, searchTerm]);

  const handleResetFilters = () => {
    setStatusFilter({ reviews: false, pending: false });
    setSortOrder("");
    setSearchTerm("");
    handleGetTalks();
  };
  const handleGetTalks = async () => {
    try {
      let response = await axios.get(
        "http://192.168.1.2:8080/api/v1/users/getTalks",
        { withCredentials: true }
      );
      setTalks(response.data.data.talks);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTalks = () => {
    let filtered = talks.filter((talk) => {
      if (statusFilter.reviewed && talk.status.toLowerCase() !== "reviewed")
        return false;
      if (statusFilter.pending && talk.status.toLowerCase() !== "pending")
        return false;
      if (
        searchTerm &&
        !talk.talkTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return true;
    });

    if (sortOrder === "ascending") {
      filtered.sort((a, b) => a.userVotes - b.userVotes);
    } else {
      filtered.sort((a, b) => b.userVotes - a.userVotes);
    }

    setFilteredTalks(filtered);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStatusFilter({ ...statusFilter, [name]: checked });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6">Ideas</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-1">
        <div className="flex justify-between items-center mb-4 sm:text-xs gap-4 sm:flex-wrap">
          <div className="flex items-center space-x-4 flex-row">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="reviewed"
                checked={statusFilter.reviewed}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Reviewed</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pending"
                checked={statusFilter.pending}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Pending</span>
            </label>
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">Sort by score:</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-2 py-1 border rounded-md text-gray-700"
            >
              <option value={""}>-</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <div className="flex-grow ml-4">
            <input
              type="text"
              placeholder="Search by Idea"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleResetFilters}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Reset Filters
          </button>
        </div>

          <TalkTable talks={filteredTalks} />

      </div>
    </div>
  );
};

export default ReviewPage;
