import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { FadeLoader } from 'react-spinners'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MyApply = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");  // Added search term state

    useEffect(() => {
      document.title = "My Apply | প্রতিদৌড়";
    }, []);

    useEffect(() => {
      if (user) {
        getApplications();
      }
    }, [user, searchTerm]);  // Added searchTerm dependency

    const getApplications = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-registration/${user?.email}?title=${searchTerm}`,  // Pass search term as query parameter
          { withCredentials: true }
        );
        setApplications(data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching applications:", error);
        setLoading(false);
        toast.error("Error fetching applications. Please try again later.");
      }
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleDeleteApplication = async (id) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await axios.delete(`${import.meta.env.VITE_API_URL}/registration/${id}`, {
            withCredentials: true,
          });
          toast.success("Application deleted successfully!");
          getApplications();
        }
      } catch (err) {
        // console.error("Error deleting application:", err.message);
        toast.error("Error deleting application. Please try again later.");
      }
    };

    const handleOpenModal = (application) => {
      setCurrentApplication(application);
      setUpdatedData(application);  
    };

    const handleCloseModal = () => {
      setCurrentApplication(null);
      setUpdatedData({});  
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,  
      }));
    };

    const handleUpdateApplication = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/registration/${currentApplication._id}`,
          updatedData,
          { withCredentials: true }
        );
        toast.success("Application updated successfully!");
        
        await Swal.fire({
          title: 'Success!',
          text: 'The application has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
    
        handleCloseModal();
        getApplications(); 
      } catch (error) {
        // console.error("Error updating application:", error);
        toast.error("Error updating application. Please try again later.");
      }
    };

    return (
      <div className="mb-10 px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mt-8 font-bold">My Application List</h2>

        {/* Search Bar */}
        <div className="mt-4 text-center">
          <input type="text" value={searchTerm} onChange={handleSearchChange}
            placeholder="Search by Marathon Title" className="input input-bordered text-black  border rounded-lg bg-gray-300  dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>

        <div className="overflow-x-auto mt-5">
          {loading ? (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center my-4 md:my-6 z-50">
              <FadeLoader color="#228B22" loading={loading} size={50} />
            </div>
          ) : (
            <table className="table bg-green-50 mt-5 w-full">
              <thead>
                <tr className="font-bold text-black text-xs sm:text-sm md:text-lg">
                  <th>Index No.</th>
                  <th>Marathon Title</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.length > 0 ? (
                  applications.map((application, index) => (
                    <tr key={application._id} className="text-xs sm:text-sm md:text-base">
                      <th>{index + 1}</th>
                      <td>{application.marathonTitle}</td>
                      <td>{application.firstName}</td>
                      <td>{application.lastName}</td>
                      <td>{application.addressInfo}</td>
                      <td className="flex items-center justify-center space-x-2">
                        <label htmlFor="my_modal_7" className="btn text-xs sm:text-sm md:text-base bg-green-500 text-white cursor-pointer" onClick={() => handleOpenModal(application)}>
                          <MdEdit size={20} />Update
                        </label>

                        <button onClick={() => handleDeleteApplication(application._id)} className="btn btn-error text-xs sm:text-sm md:text-base text-white">
                          <MdDelete size={20} />Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      You haven't applied for any events yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Content */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" checked={!!currentApplication} readOnly />
        <div className="modal" role="dialog">
          <div className="modal-box text-white bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] opacity-90 backdrop-blur-lg">
            <h3 className="text-lg md:text-xl text-center font-bold">Update Application</h3>
            {currentApplication && (
              <form onSubmit={handleUpdateApplication}>

                {/* title */}
                <div className="form-control mb-4">
                  <label className="label">Marathon Title</label>
                  <input type="text" name="title" value={currentApplication.marathonTitle || ""} className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" readOnly />
                </div>

                {/* Location */}
                <div className="form-control mb-4">
                  <label className="label">Location</label>
                  <input 
                    type="text" 
                    name="addressInfo"  
                    value={updatedData.addressInfo || ""} 
                    onChange={handleInputChange} 
                    className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    required 
                  />
                </div>

                {/* First Name */}
                <div className="form-control mb-4">
                  <label className="label">First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={updatedData.firstName || ""} 
                    onChange={handleInputChange} 
                    className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    required 
                  />
                </div>

                {/* Last Name */}
                <div className="form-control mb-4">
                  <label className="label">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={updatedData.lastName || ""} 
                    onChange={handleInputChange} 
                    className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    required 
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-4">
                  <button className="btn btn-success text-white px-5 md:px-10" type="submit">Update</button>
                  <label className="btn btn-error text-white px-5 md:px-10" htmlFor="my_modal_7" onClick={handleCloseModal}>Cancel</label>
                </div>
              </form>
            )}
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7" onClick={handleCloseModal}>Close</label>
        </div>
      </div>
    );
};

export default MyApply;
