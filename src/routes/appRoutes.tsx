import { Routes, Route } from "react-router-dom";

// ================= PAGES =================
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";

import Jobs from "../pages/Jobs.tsx";
import JobDetails from "../pages/JobDetails.tsx";
import EditJob from "../pages/EditJob.tsx";
import CreateJob from "../pages/CreateJob.tsx";

import Dashboard from "../pages/Dashboard.tsx";
import Profile from "../pages/Profile.tsx";

import Applications from "../pages/Applications.tsx";
import JobApplicants from "../pages/JobApplicants.tsx";
import EmployerApplications from "../pages/EmployerApplications.tsx";

import ForgotPassword from "../pages/ForgotPassword.tsx";
import ResetPassword from "../pages/resetPassword.tsx";
import ChangePassword from "../pages/ChangePassword.tsx";

import RecommendedJobs from "../pages/recommendedJob.tsx";
import ResumeUpload from "../pages/resumeUpload.tsx";

import CreateCompany from "../pages/CreateCompany.tsx";
import Companies from "../pages/Companies.tsx";
import CompanyDetails from "../pages/CompanyDetails.tsx";
import EmployerDashboard from "../pages/EmployerDashboard.tsx";
import ATSDashboard from "../pages/atsDashboard.tsx";

// ================= ROUTES =================
export default function AppRoutes() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* JOBS */}
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/edit-job/:id" element={<EditJob />} />
      <Route path="/create-job" element={<CreateJob />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />

      {/* APPLICATIONS */}
      <Route path="/applications" element={<Applications />} />
      <Route path="/job-applicants/:id" element={<JobApplicants />} />
      <Route path="/employer-applications/:id" element={<EmployerApplications />} />

      {/* PASSWORD */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />

      {/* EXTRA FEATURES */}
      <Route path="/recommended-jobs" element={<RecommendedJobs />} />
      <Route path="/resume-upload" element={<ResumeUpload />} />

      {/* COMPANY */}
      <Route path="/create-company" element={<CreateCompany />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:id" element={<CompanyDetails />} />

      {/* 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />


      <Route path="/ats-dashboard" element={<ATSDashboard />} />

    </Routes>
  );
}