import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";


type Company = {

  _id: string;

  companyName: string;

  description: string;

  location: string;

  logo: string;
};


export default function Companies() {

  const [companies, setCompanies] =
    useState<Company[]>([]);


  // ================= FETCH COMPANIES =================

  useEffect(() => {

    const fetchCompanies =
      async () => {

        try {

          const { data } =
            await API.get(
              "/company"
            );

          setCompanies(
            data.companies
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchCompanies();

  }, []);


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Company Profiles

      </h1>


      <div className="grid md:grid-cols-2 gap-6">

        {companies.map((company) => (

          <div
            key={company._id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            {/* LOGO */}

                <img
                   src={
                      company.logo ||
                     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                       }
              alt={company.companyName}
                   className="w-20 h-20 object-cover rounded-full mb-4"
                />


            {/* COMPANY NAME */}

            <h2 className="text-2xl font-bold mb-2">

              {company.companyName}

            </h2>


            {/* LOCATION */}

            <p className="text-gray-600 mb-2">

              📍 {company.location}

            </p>


            {/* DESCRIPTION */}

            <p className="text-gray-700">

              {company.description}

            </p>
            {/*Hiring Now*/}
            <p className="mt-3 text-blue-600 font-semibold">

                       Hiring Now 🚀

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}