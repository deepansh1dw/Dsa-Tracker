import React, { useEffect, useState } from "react";
import { getTopics } from "../api";

const TopicSidebar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(res => setTopics(res.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold text-xl mb-4">Topics</h2>
      {topics.map(t => (
        <div key={t.id} className="flex justify-between py-1 border-b">
          <span>{t.name}</span>
          <span>{t.problem_count}</span>
        </div>
      ))}
    </div>
  );
};

export default TopicSidebar;
