import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { AuthContext } from "../../Provider/AuthProvider";

AOS.init();

const AddMarathons = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
          document.title = "Add Marathon | প্রতিদৌড়";
        }, []);

  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);
  const [runningDistance, setRunningDistance] = useState("");

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const marathonTitle = form.title.value;
    const location = form.location.value;
    const description = form.description.value;
    const marathonImage = form.image.value;
    const userEmail = form.email.value; 

    const createdAt = new Date();
    const totalRegistrationCount = 0;

    const marathonData = {
      marathonTitle,
      registrationStartDate,
      registrationEndDate,
      marathonStartDate,
      location,
      runningDistance,
      description,
      marathonImage,
      createdAt,
      totalRegistrationCount,
      userEmail
    };

    console.table(marathonData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/marathons`,
        marathonData
      );
      console.log(data);

      Swal.fire({
        icon: "success",
        title: "Marathon Added!",
        text: "Your marathon has been added successfully.",
        confirmButtonText: "OK",
      });

      navigate("/my-marathons");
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Marathon",
        text: "There was an error adding your marathon. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="py-7 bg-cover bg-center relative" style={{ backgroundImage: "url('https://i.ibb.co.com/hdf8ypj/pexels-joao-godoy-706154396-24308068.jpg')" }}>

      {/* Black Overlay with Opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 relative z-10 px-4" data-aos="fade-up">

        {/* Left Side Text Content */}
        <div className="flex-1 text-white p-5" data-aos="fade-up">
          <h1 className="text-2xl text-[#37d337] md:text-4xl font-bold mb-6">Add Your Marathon</h1>
          <p className="text-sm text-justify md:text-lg">
            Create a new marathon event for participants to join, choose the
            location, set dates, and more. The marathon details will help
            attract participants and make your event stand out.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 bg-gray-400 border-y-8 bg-opacity-30 backdrop-blur-sm rounded-xl border-[#228B22] shadow-lg p-6 md:max-w-lg w-full" data-aos="fade-up">
          <form onSubmit={handleAddMarathon} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Marathon Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Marathon Title"
                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                required/>
            </div>
            <div className="md:flex md:gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    Start Registration Date
                  </span>
                </label>
                <DatePicker
                  selected={registrationStartDate}
                  onChange={(date) => setRegistrationStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input input-bordered dark:bg-gray-900 text-gray-400 w-full"
                  placeholderText="Select Date"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    End Registration Date
                  </span>
                </label>
                <DatePicker
                  selected={registrationEndDate}
                  onChange={(date) => setRegistrationEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input text-gray-400 dark:bg-gray-900 input-bordered w-full"
                  placeholderText="Select Date"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    Marathon Start Date
                  </span>
                </label>
                <DatePicker
                  selected={marathonStartDate}
                  onChange={(date) => setMarathonStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input text-gray-400 dark:bg-gray-900 input-bordered w-full"
                  placeholderText="Select Date"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="user email"
                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                required readOnly value={user?.email || ''} 
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Running Distance
                </span>
              </label>
              <select
                name="distance"
                className="select dark:bg-gray-900 text-gray-400 select-bordered w-full"
                required
                value={runningDistance} // Controlled value for select
                onChange={(e) => setRunningDistance(e.target.value)} // Handle value change
              >
                <option value="" disabled>Select Distance</option>
                <option value="25k">25k</option>
                <option value="10k">10k</option>
                <option value="3k">5k</option>
                <option value="3k">3k</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="textarea dark:bg-gray-900 text-gray-400 textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Image URL
                </span>
              </label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#1a001e] via-[#6a1b6d] to-[#342b6e] hover:from-[#1b6d1b] hover:via-[#1a1148] hover:to-[#30228b] transition duration-300 ease-in-out border-none rounded-md">
                Add Marathon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMarathons;
