import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 px-6">

      <h1 className="text-5xl font-bold text-blue-600 mb-4 text-center">

        Find Your Dream Job

      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">

        Apply for jobs easily and connect with top companies.

      </p>

      <div className="flex gap-4">

        <Link
          to="/jobs"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >

          Browse Jobs

        </Link>

        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >

          Get Started

        </Link>

      </div>

    </div>
  );
}