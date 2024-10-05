import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import Class from "./Class";

const AllClasses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ["Allclass"],
    queryFn: async () => {
      const res = await axiosSecure("/NewClass");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const filteredData = data.filter((item) =>
    item.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentClasses = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="">
      <div className="font-Prata font-bold text-2xl p-10 text-center">
        <h1>All Classes</h1>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search by class name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="lg:grid grid-cols-2 mb-20 container gap-10 mx-auto">
        {currentClasses.map((item) => (
          <Class key={item._id} Class={item} dataLength={filteredData.length} />
        ))}
      </div>

      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? "bg-[#2F7955] text-white mb-5"
                : "bg-gray-200 text-gray-700 mb-5"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;