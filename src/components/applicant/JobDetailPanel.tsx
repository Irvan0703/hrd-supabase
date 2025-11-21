import { useNavigate } from "react-router-dom";
interface Props {
  job: any;
}

export default function JobDetailPanel({ job }: Props) {
    const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mt-1">{job.company_name || "Perusahaan tidak tersedia"}</p>

      <div className="mt-4 flex gap-4 text-sm text-gray-700">
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.type}</span>
      </div>

      {/* Salary */}
      {job.salary_min && job.salary_max && (
        <p className="mt-2 font-semibold text-green-700">
          IDR {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
        </p>
      )}

      <hr className="my-6" />

      {/* Description */}
      <div className="prose max-w-none">
        <h2 className="text-lg font-semibold">Deskripsi Pekerjaan</h2>
        <p className="mt-2 whitespace-pre-line">{job.description}</p>

        <h2 className="mt-6 text-lg font-semibold">Kualifikasi</h2>
        <p className="mt-2 whitespace-pre-line">{job.requirements}</p>
      </div>

      <button onClick={() => navigate(`/jobs/${job.id}/apply`)}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Lamar Sekarang
      </button>
    </div>
  );
}
