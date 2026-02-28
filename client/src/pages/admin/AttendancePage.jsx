import { useEffect, useMemo, useState } from "react";
import http from "../../api/http";
import { formatDate } from "../../utils/format";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({});
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [historyFilters, setHistoryFilters] = useState({
    batch: "",
    dateFrom: "",
    dateTo: ""
  });
  const [summaryInput, setSummaryInput] = useState({
    studentId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [summary, setSummary] = useState(null);

  const batchList = useMemo(
    () => [...new Set(students.map((student) => student.batch).filter(Boolean))],
    [students]
  );

  const filteredStudents = useMemo(
    () => students.filter((student) => (batch ? student.batch === batch : true)),
    [students, batch]
  );

  const loadStudents = async () => {
    try {
      const { data } = await http.get("/students");
      setStudents(data.students || []);
      if (!batch && data.students?.length) {
        setBatch(data.students[0].batch || "");
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to load students for attendance." });
    }
  };

  const loadHistory = async () => {
    try {
      const params = {};
      if (historyFilters.batch) {
        params.batch = historyFilters.batch;
      }
      if (historyFilters.dateFrom) {
        params.dateFrom = historyFilters.dateFrom;
      }
      if (historyFilters.dateTo) {
        params.dateTo = historyFilters.dateTo;
      }

      const { data } = await http.get("/attendance", { params });
      setHistory(data.attendance || []);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to load attendance history." });
    }
  };

  useEffect(() => {
    loadStudents();
    loadHistory();
  }, []);

  useEffect(() => {
    const nextMap = {};
    filteredStudents.forEach((student) => {
      nextMap[student._id] = "Present";
    });
    setStatusMap(nextMap);
  }, [filteredStudents]);

  const markAttendance = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!filteredStudents.length) {
      setFeedback({ type: "error", message: "No students available for selected batch." });
      return;
    }

    try {
      const records = filteredStudents.map((student) => ({
        studentId: student._id,
        status: statusMap[student._id] || "Present",
        batch: student.batch
      }));

      await http.post("/attendance/mark", { date, batch, records });
      setFeedback({ type: "success", message: "Attendance marked successfully." });
      loadHistory();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Failed to save attendance."
      });
    }
  };

  const fetchSummary = async (event) => {
    event.preventDefault();
    if (!summaryInput.studentId) {
      return;
    }

    try {
      const { data } = await http.get(
        `/attendance/student/${summaryInput.studentId}/summary`,
        {
          params: {
            month: summaryInput.month,
            year: summaryInput.year
          }
        }
      );
      setSummary(data.summary);
    } catch (error) {
      setSummary(null);
      setFeedback({ type: "error", message: "Failed to fetch attendance summary." });
    }
  };

  return (
    <div className="space-y-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-slate-900">Mark Daily Attendance</h2>
        <form onSubmit={markAttendance} className="mt-4 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="attendanceBatch" className="mb-1 block text-sm font-semibold text-slate-700">
                Batch
              </label>
              <select
                id="attendanceBatch"
                value={batch}
                onChange={(event) => setBatch(event.target.value)}
                className="field"
              >
                <option value="">Select Batch</option>
                {batchList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="attendanceDate" className="mb-1 block text-sm font-semibold text-slate-700">
                Attendance Date
              </label>
              <input
                id="attendanceDate"
                type="date"
                placeholder="Select attendance date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="field"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2 font-semibold">Student</th>
                  <th className="px-3 py-2 font-semibold">Batch</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-t border-slate-100">
                    <td className="px-3 py-3">{student.name}</td>
                    <td className="px-3 py-3">{student.batch}</td>
                    <td className="px-3 py-3">
                      <label htmlFor={`attendanceStatus-${student._id}`} className="sr-only">
                        Attendance status for {student.name}
                      </label>
                      <select
                        id={`attendanceStatus-${student._id}`}
                        value={statusMap[student._id] || "Present"}
                        onChange={(event) =>
                          setStatusMap((prev) => ({
                            ...prev,
                            [student._id]: event.target.value
                          }))
                        }
                        className="field w-40"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn-primary">
            Save Attendance
          </button>
          {feedback.message ? (
            <p className={`text-sm ${feedback.type === "success" ? "text-brand-700" : "text-red-600"}`}>
              {feedback.message}
            </p>
          ) : null}
        </form>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="panel xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Attendance History</h2>
            <button type="button" onClick={loadHistory} className="btn-outline">
              Refresh
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadHistory();
            }}
            className="mt-4 grid gap-3 md:grid-cols-4"
          >
            <div>
              <label htmlFor="historyBatch" className="mb-1 block text-xs font-semibold text-slate-600">
                Batch
              </label>
              <select
                id="historyBatch"
                value={historyFilters.batch}
                onChange={(event) =>
                  setHistoryFilters((prev) => ({ ...prev, batch: event.target.value }))
                }
                className="field"
              >
                <option value="">All Batches</option>
                {batchList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="historyFromDate" className="mb-1 block text-xs font-semibold text-slate-600">
                From Date
              </label>
              <input
                id="historyFromDate"
                type="date"
                placeholder="From date"
                value={historyFilters.dateFrom}
                onChange={(event) =>
                  setHistoryFilters((prev) => ({ ...prev, dateFrom: event.target.value }))
                }
                className="field"
              />
            </div>
            <div>
              <label htmlFor="historyToDate" className="mb-1 block text-xs font-semibold text-slate-600">
                To Date
              </label>
              <input
                id="historyToDate"
                type="date"
                placeholder="To date"
                value={historyFilters.dateTo}
                onChange={(event) =>
                  setHistoryFilters((prev) => ({ ...prev, dateTo: event.target.value }))
                }
                className="field"
              />
            </div>
            <button type="submit" className="btn-outline">
              Filter
            </button>
          </form>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="px-2 py-2 font-semibold">Date</th>
                  <th className="px-2 py-2 font-semibold">Student</th>
                  <th className="px-2 py-2 font-semibold">Batch</th>
                  <th className="px-2 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry._id} className="border-b border-slate-100">
                    <td className="px-2 py-3">{formatDate(entry.date)}</td>
                    <td className="px-2 py-3">{entry.student?.name || "-"}</td>
                    <td className="px-2 py-3">{entry.batch}</td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          entry.status === "Present"
                            ? "bg-brand-100 text-brand-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!history.length ? <p className="pt-3 text-sm text-slate-500">No attendance records found.</p> : null}
          </div>
        </article>

        <article className="panel">
          <h2 className="text-xl font-semibold text-slate-900">Monthly Student Summary</h2>
          <form onSubmit={fetchSummary} className="mt-4 space-y-3">
            <div>
              <label htmlFor="summaryStudent" className="mb-1 block text-sm font-semibold text-slate-700">
                Student
              </label>
              <select
                id="summaryStudent"
                value={summaryInput.studentId}
                onChange={(event) =>
                  setSummaryInput((prev) => ({ ...prev, studentId: event.target.value }))
                }
                className="field"
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="summaryMonth" className="mb-1 block text-xs font-semibold text-slate-600">
                  Month
                </label>
                <input
                  id="summaryMonth"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="Month (1-12)"
                  value={summaryInput.month}
                  onChange={(event) =>
                    setSummaryInput((prev) => ({ ...prev, month: Number(event.target.value) }))
                  }
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="summaryYear" className="mb-1 block text-xs font-semibold text-slate-600">
                  Year
                </label>
                <input
                  id="summaryYear"
                  type="number"
                  min="2020"
                  max="2100"
                  placeholder="Year"
                  value={summaryInput.year}
                  onChange={(event) =>
                    setSummaryInput((prev) => ({ ...prev, year: Number(event.target.value) }))
                  }
                  className="field"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Get Summary
            </button>
          </form>

          {summary ? (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-slate-900">Present:</span> {summary.present}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Absent:</span> {summary.absent}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Total:</span> {summary.total}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Attendance %:</span>{" "}
                {summary.percentage}%
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Select a student and month to view summary.</p>
          )}
        </article>
      </section>
    </div>
  );
};

export default AttendancePage;
