import React, { useState } from "react";
import NotesModal from "./NotesModal";

const ProblemCard = ({ problem }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = (shouldRefresh) => {
    setShowModal(false);
    if (shouldRefresh) window.location.reload(); // or trigger re-fetch if using SWR/react-query
  };

  return (
    <>
      <div className="p-4 rounded-xl bg-white shadow flex items-center gap-4">
        <div className={`px-2 py-1 text-sm rounded-full font-medium ${
          problem.difficulty === "Easy"
            ? "bg-green-100 text-green-700"
            : problem.difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}>
          {problem.difficulty}
        </div>

        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 font-semibold hover:underline"
        >
          {problem.title}
        </a>

        <span className="text-sm text-purple-600 font-medium">{problem.topic}</span>
        <span>{problem.status === "revision" ? "🔁" : "✅"}</span>

        <span
          className="cursor-pointer hover:scale-110"
          onClick={() => setShowModal(true)}
        >
          📝
        </span>
      </div>

      <NotesModal open={showModal} onClose={handleClose} problem={problem} />
    </>
  );
};

export default ProblemCard;
