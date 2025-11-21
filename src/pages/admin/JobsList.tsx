import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchJobs } from "../../features/jobs/thunks";

import JobTable from "../../components/admin/JobTable";
import JobFilters from "../../components/admin/JobFilters";
import CreateJobModal from "../../components/admin/CreateJobModal";

export default function AdminJobsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.jobs);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Job Vacancies</h1>

      {/* Filter */}
      <JobFilters onCreate={() => setOpenCreateModal(true)} />

      <div className="mt-4">
        {loading ? <p>Loading...</p> : <JobTable jobs={list} />}
      </div>

      {/* Modal */}
      <CreateJobModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  );
}
