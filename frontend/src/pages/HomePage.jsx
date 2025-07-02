import React, { useEffect, useState } from "react";
import { getProblems } from "../api";
import ProblemCard from "../components/ProblemCard";
import ProblemForm from "../components/ProblemForm";
import TopicSidebar from "../components/TopicSidebar";

const HomePage = () => {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getProblems().then(res => setProblems(res.data));
  }, []);

  const filtered = filter === "All"
    ? problems
    : problems.filter(p => p.status === filter.toLowerCase());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2">
        <div className="flex gap-4 mb-4">
          {["All", "Solved", "Revision"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full ${
                filter === tab ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.map(problem => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      <div className="space-y-6">
        <ProblemForm onAdd={() => window.location.reload()} />
        <TopicSidebar />
      </div>
    </div>
  );
};

export default HomePage;
