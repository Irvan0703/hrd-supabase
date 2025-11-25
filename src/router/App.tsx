// src/router/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Private";

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

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* =============== ADMIN PAGES =============== */}
        <Route
          path="/admin/jobs"
          element={
            <PrivateRoute role="admin">
              <AdminJobsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/jobs/create"
          element={
            <PrivateRoute role="admin">
              <AdminCreateJob />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/jobs/:jobId/candidates"
          element={
            <PrivateRoute role="admin">
              <AdminCandidateManagement />
            </PrivateRoute>
          }
        />

        {/* =============== APPLICANT PAGES =============== */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute role="applicant">
              <ApplicantJobList />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs/:jobId"
          element={
            <PrivateRoute role="applicant">
              <JobDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs/:jobId/apply"
          element={
            <PrivateRoute role="applicant">
              <ApplyJobPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs/:jobId/capture"
          element={
            <PrivateRoute role="applicant">
              <CapturePhotoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs/:jobId/success"
          element={
            <PrivateRoute role="applicant">
              <ApplySuccessPage />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
