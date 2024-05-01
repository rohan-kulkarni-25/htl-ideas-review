import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const AddTalksPage = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      setJsonData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAddTalks = async () => {
    try {
      console.log(jsonData[0]);
      let response = await axios({
        method: "post",
        url: "https://htl-ideas-review-production.up.railway.app/api/v1/users/addTalks",

        data: {talks:jsonData},
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container  mt-8  overflow-hidden h-screen overflow-y-scroll mx-4 pb-48">
      <h1 className="text-2xl font-bold mb-4">Add Ideas</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="border border-gray-400 py-2 px-4 rounded-lg mb-4 mx-4"
      />
      {jsonData && (
        <button
            onClick={handleAddTalks}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      )}
      <div className="">
        {jsonData && (
          <p className="mx-4 text-xl font-bold my-4">
            Total Talks : {jsonData.length}
          </p>
        )}
        {jsonData && (
          <table className="table-auto border-collapse border border-blue-500 mx-4">
            <thead>
              <tr>
                {Object.keys(jsonData[0]).map((key) => (
                  <th key={key} className="border border-blue-500 px-4 py-2 text-xs">
                    {key.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td
                      key={index}
                      className="border border-blue-500 px-4 py-2 text-xs"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddTalksPage;
