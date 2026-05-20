export interface Job {

  _id: string;

  title: string;

  description: string;

  requirements: string;

  location: string;

  salary: number | string;

  createdBy?: {

    _id: string;

    name: string;

    email: string;

  };

}


export interface User {

  _id: string;

  name: string;

  email: string;

  role: string;

  skills?: string[];

  phone?: string;

  experience?: string;

  resumeUrl?: string;

}