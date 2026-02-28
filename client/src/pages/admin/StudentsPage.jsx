import { useEffect, useMemo, useState } from "react";
import http from "../../api/http";
import { formatDate } from "../../utils/format";

const emptyForm = {
  name: "",
  age: "",
  classLevel: "",
  batch: "",
  contactNumber: "",
  email: "",
  joiningDate: ""
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const batches = useMemo(
    () => [...new Set(students.map((student) => student.batch).filter(Boolean))],
    [students]
  );

  const loadStudents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) {
        params.search = search;
      }
      if (batchFilter) {
        params.batch = batchFilter;
      }

      const { data } = await http.get("/students", { params });
      setStudents(data.students || []);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to load students." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        joiningDate: form.joiningDate || undefined
      };

      if (editingId) {
        await http.put(`/students/${editingId}`, payload);
        setFeedback({ type: "success", message: "Student updated successfully." });
      } else {
        await http.post("/students", payload);
        setFeedback({ type: "success", message: "Student added successfully." });
      }

      resetForm();
      loadStudents();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Save failed." });
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name || "",
      age: student.age || "",
      classLevel: student.classLevel || "",
      batch: student.batch || "",
      contactNumber: student.contactNumber || "",
      email: student.email || "",
      joiningDate: student.joiningDate ? student.joiningDate.slice(0, 10) : ""
    });
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await http.delete(`/students/${studentId}`);
      setFeedback({ type: "success", message: "Student deleted successfully." });
      loadStudents();
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to delete student." });
    }
  };

  const applyFilters = (event) => {
    event.preventDefault();
    loadStudents();
  };

  return (
    <div className="space-y-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-slate-900">
          {editingId ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="studentName" className="mb-1 block text-sm font-semibold text-slate-700">
              Student Name
            </label>
            <input
              id="studentName"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="studentAge" className="mb-1 block text-sm font-semibold text-slate-700">
              Age
            </label>
            <input
              id="studentAge"
              name="age"
              type="number"
              min="3"
              max="100"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="studentClassLevel"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Class / Level
            </label>
            <input
              id="studentClassLevel"
              name="classLevel"
              placeholder="Class / Level"
              value={form.classLevel}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="studentBatch" className="mb-1 block text-sm font-semibold text-slate-700">
              Batch
            </label>
            <input
              id="studentBatch"
              name="batch"
              placeholder="Batch"
              value={form.batch}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="studentContactNumber"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Contact Number
            </label>
            <input
              id="studentContactNumber"
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="studentEmail" className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="studentEmail"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="studentJoiningDate" className="mb-1 block text-sm font-semibold text-slate-700">
              Joining Date
            </label>
            <input
              id="studentJoiningDate"
              name="joiningDate"
              type="date"
              placeholder="Select joining date"
              value={form.joiningDate}
              onChange={handleChange}
              className="field"
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Student" : "Add Student"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            ) : null}
          </div>
        </form>
        {feedback.message ? (
          <p className={`mt-3 text-sm ${feedback.type === "success" ? "text-brand-700" : "text-red-600"}`}>
            {feedback.message}
          </p>
        ) : null}
      </section>

      <section className="panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Student List</h2>
          <form onSubmit={applyFilters} className="flex flex-wrap gap-2">
            <div>
              <label htmlFor="studentSearch" className="mb-1 block text-xs font-semibold text-slate-600">
                Search Students
              </label>
              <input
                id="studentSearch"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className="field w-44"
              />
            </div>
            <div>
              <label htmlFor="batchFilter" className="mb-1 block text-xs font-semibold text-slate-600">
                Filter by Batch
              </label>
              <select
                id="batchFilter"
                value={batchFilter}
                onChange={(event) => setBatchFilter(event.target.value)}
                className="field w-40"
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-outline">
              Apply
            </button>
          </form>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-2 py-2 font-semibold">Name</th>
                <th className="px-2 py-2 font-semibold">Level</th>
                <th className="px-2 py-2 font-semibold">Batch</th>
                <th className="px-2 py-2 font-semibold">Contact</th>
                <th className="px-2 py-2 font-semibold">Joining</th>
                <th className="px-2 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b border-slate-100">
                  <td className="px-2 py-3">{student.name}</td>
                  <td className="px-2 py-3">{student.classLevel}</td>
                  <td className="px-2 py-3">{student.batch}</td>
                  <td className="px-2 py-3">{student.contactNumber}</td>
                  <td className="px-2 py-3">{formatDate(student.joiningDate)}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(student)} className="btn-outline !px-3 !py-1.5">
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(student._id)}
                        className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!students.length && !loading ? (
            <p className="pt-4 text-sm text-slate-500">No students found.</p>
          ) : null}
          {loading ? <p className="pt-4 text-sm text-slate-500">Loading students...</p> : null}
        </div>
      </section>
    </div>
  );
};

export default StudentsPage;
