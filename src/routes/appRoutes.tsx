import { Routes, Route } from "react-router-dom";

// pages
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

import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/resetPassword";
import ChangePassword from "../pages/changePassword";

import RecommendedJobs from "../pages/recommendedJob";
import ResumeUpload from "../pages/resumeUpload";

import CreateCompany from "../pages/createCompany";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";

import EmployerDashboard from "../pages/EmployerDashboard";
import ATSDashboard from "../pages/ATSDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      {/* USER PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recommended-jobs"
        element={
          <ProtectedRoute>
            <RecommendedJobs />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYER PROTECTED ROUTES */}
      <Route
        path="/create-job"
        element={
          <ProtectedRoute role="employer">
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute role="employer">
            <EditJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/job-applicants/:id"
        element={
          <ProtectedRoute role="employer">
            <JobApplicants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer-applications/:id"
        element={
          <ProtectedRoute role="employer">
            <EmployerApplications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-company"
        element={
          <ProtectedRoute role="employer">
            <CreateCompany />
          </ProtectedRoute>
        }
      />

      {/* PUBLIC COMPANY ROUTES */}
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:id" element={<CompanyDetails />} />

      {/* ATS */}
      <Route
        path="/ats-dashboard"
        element={
          <ProtectedRoute role="employer">
            <ATSDashboard />
          </ProtectedRoute>
        }
      />

      {/* PASSWORD */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />

      {/* 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />

    </Routes>
  );
}