import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/thunks";
import type { RootState, AppDispatch } from "../../app/store";
import JobCardMini from "../../components/applicant/JobCardMini";
import JobDetailPanel from "../../components/applicant/JobDetailPanel";

export default function ApplicantJobs() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.jobs);

  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="flex h-[92vh] border rounded-xl overflow-hidden shadow-sm">
      {/* LEFT: LIST */}
      <div className="w-[35%] border-r overflow-y-auto bg-white">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Lowongan Tersedia</h1>
        </div>

        {loading && <p className="p-4">Loading...</p>}

        {list.map((job) => (
          <JobCardMini
            key={job.id}
            job={job}
            active={selected?.id === job.id}
            onClick={() => setSelected(job)}
          />
        ))}
      </div>

      {/* RIGHT: DETAIL */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
        {selected ? (
          <JobDetailPanel job={selected} />
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Pilih lowongan untuk melihat detail
          </div>
        )}
      </div>
    </div>
  );
}
