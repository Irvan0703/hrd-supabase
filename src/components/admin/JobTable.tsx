import { Link } from "react-router-dom";

export default function JobTable({ jobs }: { jobs: any[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="p-3">{job.title}</td>
              <td className="p-3">{job.department}</td>
              <td className="p-3">
                {job.salary_min} - {job.salary_max}
              </td>
              <td className="p-3">
                <span
                  className={
                    "px-2 py-1 text-xs rounded-full " +
                    (job.status === "active"
                      ? "bg-green-100 text-green-700"
                      : job.status === "inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700")
                  }
                >
                  {job.status}
                </span>
              </td>

              <td className="p-3 text-right">
                <Link
                  to={`/admin/jobs/${job.id}/candidates`}
                  className="text-blue-600 hover:underline"
                >
                  Manage Job →
                </Link>
              </td>
            </tr>
          ))}

          {jobs.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
