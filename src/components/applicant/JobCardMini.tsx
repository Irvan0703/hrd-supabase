interface Props {
  job: any;
  active?: boolean;
  onClick: () => void;
}

export default function JobCardMini({ job, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b cursor-pointer hover:bg-blue-50 transition ${
        active ? "bg-blue-100" : "bg-white"
      }`}
    >
      <h2 className="font-semibold text-sm">{job.title}</h2>
      <p className="text-xs text-gray-600">{job.location || "Lokasi tidak tersedia"}</p>

      <p className="mt-2 text-blue-700 text-xs font-medium">
        {job.type || "Full-time"}
      </p>
    </div>
  );
}
