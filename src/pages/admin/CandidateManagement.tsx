import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTemplate from "../../components/templates/AdminTemplate";
import CandidateTable from "../../components/admin/CandidateTable";
import { fetchCandidates } from "../../features/candidates/thunks";
import type { RootState, AppDispatch } from "../../app/store";

export default function AdminCandidateManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <AdminTemplate title="Candidate Management">
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CandidateTable data={list} />
        )}
      </div>
    </AdminTemplate>
  );
}
