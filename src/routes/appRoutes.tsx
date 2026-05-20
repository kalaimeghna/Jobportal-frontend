import {
  Routes,
  Route,
} from "react-router-dom";


// ================= PAGES =================

import Home from "../pages/Home";

import Login from "../pages/Login";

import Register from "../pages/Register";

import Jobs from "../pages/Jobs";

import JobDetails from "../pages/JobDetails";

import Dashboard from "../pages/Dashboard";

import CreateJob from "../pages/CreateJob";

import Profile from "../pages/Profile";

import Applications from "../pages/Applications";

import EditJob from "../pages/EditJob";

import JobApplicants from "../pages/JobApplicants";

import EmployerApplications
from "../pages/EmployerApplications";

import ResetPassword from "../pages/resetPassword";
import ForgotPassword from "../pages/forgotPassword";
import ChangePassword from "../pages/changePassword";
import RecommendedJobs from "../pages/recommendedJob";
import ResumeUpload from "../pages/resumeUpload";
import CreateCompany from "../pages/createCompany";
import Companies from "../pages/companyList";


// ================= ROUTES =================

export default function AppRoutes() {

  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* JOBS */}
      <Route
        path="/jobs"
        element={<Jobs />}
      />

      {/* JOB DETAILS */}
      <Route
        path="/jobs/:id"
        element={<JobDetails />}
      />

      {/* EDIT JOB */}
      <Route
        path="/edit-job/:id"
        element={<EditJob />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* CREATE JOB */}
      <Route
        path="/create-job"
        element={<CreateJob />}
      />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* MY APPLICATIONS */}
      <Route
        path="/applications"
        element={<Applications />}
      />

      {/* JOB APPLICANTS */}
      <Route
        path="/job-applicants/:id"
        element={<JobApplicants />}
      />

      {/* EMPLOYER APPLICATIONS */}
      <Route
        path="/employer-applications/:id"
        element={<EmployerApplications />}
      />
      {/* RESET PASSWORD */}
      <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
  />
  
{/* FORGOT PASSWORD */}
  <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
{/* CHANGE PASSWORD */}
<Route
  path="/change-password"
  element={<ChangePassword />}
/>
{/*RecommendedJobs */}
<Route
  path="/recommended-jobs"
  element={<RecommendedJobs />}
/>
{/*ResumeUpload*/}
<Route
  path="/resume-upload"
  element={<ResumeUpload />}
/>
{/*CreateCompany*/}
<Route
  path="/create-company"
  element={<CreateCompany />}
/>
{/*Companies*/}

<Route
  path="/companies"
  element={<Companies />}
/>

    </Routes>
  );
}