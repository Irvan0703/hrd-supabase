import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import AdminJobsList from "../pages/admin/JobsList";
import AdminCreateJob from "../pages/admin/CreateJob";
import AdminCandidateManagement from "../pages/admin/CandidateManagement";
import ApplicantJobList from "../pages/applicant/JobsList";
import JobDetailPage from "../pages/applicant/JobsDetail";
import ApplyJobPage from "../pages/applicant/ApplyJob";
import CapturePhotoPage from "../pages/applicant/CapturePhoto";
import ApplySuccessPage from "../pages/applicant/Success";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
         {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ADMIN */}
        <Route path="/admin/jobs" element={<AdminJobsList />} />
        <Route path="/admin/jobs/create" element={<AdminCreateJob />} />
        <Route
          path="/admin/jobs/:jobId/candidates"
          element={<AdminCandidateManagement />}
        />

        {/* APPLICANT */}
        <Route path="/jobs" element={<ApplicantJobList />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyJobPage />} />
        <Route path="/jobs/:jobId/capture" element={<CapturePhotoPage />} />
        <Route path="/jobs/:jobId/success" element={<ApplySuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
