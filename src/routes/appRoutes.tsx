import { Routes, Route } from "react-router-dom";

// ================= PAGES =================
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import EditJob from "../pages/EditJob";
import CreateJob from "../pages/CreateJob";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import Applications from "../pages/Applications";
import JobApplicants from "../pages/JobApplicants";
import EmployerApplications from "../pages/EmployerApplications";

import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ChangePassword from "../pages/ChangePassword";

import RecommendedJobs from "../pages/RecommendedJob";
import ResumeUpload from "../pages/ResumeUpload";

import CreateCompany from "../pages/CreateCompany";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";

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

    </Routes>
  );
}