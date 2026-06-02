import { Routes, Route } from "react-router-dom";

// pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import Jobs from "../Pages/Jobs";
import JobDetails from "../Pages/JobDetails";
import EditJob from "../Pages/EditJob";
import CreateJob from "../Pages/CreateJob";

import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";

import Applications from "../Pages/Applications";
import JobApplicants from "../Pages/JobApplicants";
import EmployerApplications from "../Pages/EmployerApplications";

import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import ChangePassword from "../Pages/ChangePassword";

import RecommendedJobs from "../Pages/RecommendedJob";
import ResumeUpload from "../Pages/ResumeUpload";

import CreateCompany from "../Pages/CreateCompany";
import Companies from "../Pages/Companies";
import CompanyDetails from "../Pages/CompanyDetails";

import EmployerDashboard from "../Pages/EmployerDashboard";
import ATSDashboard from "../Pages/ATSDashboard";

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