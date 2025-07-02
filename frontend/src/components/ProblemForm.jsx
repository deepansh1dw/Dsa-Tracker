import React, { useState } from "react";
import { addProblem } from "../api";

const ProblemForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    topic: "",
    link: "",
    status: "solved",
    notes: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProblem(form);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="font-bold text-xl mb-2">Add New Problem</h2>
      <input name="title" placeholder="Title" className="input w-full" onChange={handleChange} required />
      <input name="topic" placeholder="Topic" className="input w-full" onChange={handleChange} required />
      <input name="link" placeholder="Link" className="input w-full" onChange={handleChange} required />
      
      <select name="difficulty" className="input w-full" onChange={handleChange}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select name="status" className="input w-full" onChange={handleChange}>
        <option value="solved">Solved</option>
        <option value="revision">Marked for Revision</option>
      </select>

      <textarea name="notes" placeholder="Notes" className="input w-full" onChange={handleChange}></textarea>

      <button type="submit" className="btn bg-purple-600 text-white w-full">Add Problem</button>
    </form>
  );
};

export default ProblemForm;
