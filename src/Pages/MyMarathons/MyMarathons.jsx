import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { FadeLoader } from 'react-spinners'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMarathon, setCurrentMarathon] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    document.title = "My Marathons | প্রতিদৌড়";
  }, []);

  useEffect(() => {
    if (user) {
      getMarathons();
    }
  }, [user]);

  const getMarathons = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/marathons/${user?.email}`,
        { withCredentials: true }
      );
      setMarathons(data);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching marathons:", error);
      setLoading(false);
      toast.error("Error fetching marathons. Please try again later.");
    }
  };

  const handleDeleteMarathon = async (id) => {
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
        await axios.delete(`${import.meta.env.VITE_API_URL}/marathon/${id}`, {
          withCredentials: true,
        });
        toast.success("Marathon deleted successfully!");
        getMarathons();
      }
    } catch (err) {
      // console.error("Error deleting marathon:", err.message);
      toast.error("Error deleting marathon. Please try again later.");
    }
  };

  const handleOpenModal = (marathon) => {
    setCurrentMarathon(marathon);
    setUpdatedData(marathon); 
  };

  const handleCloseModal = () => {
    setCurrentMarathon(null);
    setUpdatedData({});  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateMarathon = async (e) => {
    e.preventDefault();
    // console.log('Submitting updated data:', updatedData); 
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/marathon/${currentMarathon._id}`,
        updatedData,
        { withCredentials: true }
      );
      toast.success("Marathon updated successfully!");
      
      await Swal.fire({
        title: 'Success!',
        text: 'The marathon has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
  
      handleCloseModal();
      getMarathons(); 
    } catch (error) {
      // console.error("Error updating marathon:", error);
      toast.error("Error updating marathon. Please try again later.");
    }
  };

  return (
    <div className="mb-10 px-4 sm:px-6 md:px-8">

      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mt-8 font-bold">My Marathon List</h2>

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
                <th>Start Date</th>
                <th>Location</th>
                <th>Distance</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {marathons.length > 0 ? (
                marathons.map((marathon, index) => (
                  <tr key={marathon._id} className="text-xs sm:text-sm md:text-base">
                    <th>{index + 1}</th>
                    <td>{marathon.marathonTitle}</td>
                    <td>{new Date(marathon.marathonStartDate).toLocaleDateString()}</td>
                    <td>{marathon.location}</td>
                    <td>{marathon.runningDistance}</td>
                    <td>{marathon.totalRegistrationCount}</td>
                    <td className="flex items-center justify-center space-x-2">
                      <label htmlFor="my_modal_7" className="btn text-xs  sm:text-sm md:text-base bg-green-500 text-white cursor-pointer" onClick={() => handleOpenModal(marathon)}>
                      <MdEdit size={20} />Update
                      </label>

                      <button onClick={() => handleDeleteMarathon(marathon._id)}
                        className="btn btn-error text-xs sm:text-sm md:text-base text-white"><MdDelete size={20} />Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                  You haven't added marathons yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* modal content */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" checked={!!currentMarathon} readOnly />

      <div className="modal" role="dialog">
        <div className="modal-box text-white  bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] opacity-90 backdrop-blur-lg">
          <h3 className="text-lg md:text-xl text-center font-bold">Update Marathon</h3>
          {currentMarathon && (
            <form onSubmit={handleUpdateMarathon}>

              {/* marathon title */}
              <div className="form-control mb-4">               
                <label className="label">Marathon Title</label>
                <input type="text" name="marathonTitle" value={updatedData.marathonTitle || ""} onChange={handleInputChange}className="input input-bordered  block w-full  text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" required/>
              </div>

              {/* location */}
              <div className="form-control mb-4">
                <label className="label">Location</label>
                <input type="text" name="location" value={updatedData.location || ""} onChange={handleInputChange}
                className="input input-bordered block w-full  text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" required/>
              </div>

              {/* distance */}
              <div className="form-control mb-4">
                <label className="label">Distance</label>
                <select name="runningDistance" value={updatedData.runningDistance || ""} onChange={handleInputChange}
                className="select select-bordered block w-full  text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" required>
                  
                  <option value="" disabled>Select Distance</option>
                  <option value="25k">25k</option>
                  <option value="10k">10k</option>
                  <option value="5k">5k</option>
                  <option value="3k">3k</option>
                </select>
              </div>

              {/* description */}
              <div className="form-control mb-4">
                <label className="label">Description</label>
                <textarea name="description" value={updatedData.description || ""} onChange={handleInputChange} className="textarea textarea-bordered block w-full  text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" required/>
              </div>

              {/* registration start date */}
              <div className="form-control mb-4">
                <label className="label">Registration Start Date</label>
                <DatePicker 
                  selected={updatedData.registrationStartDate ? new Date(updatedData.registrationStartDate) : null}
                  onChange={(date) => setUpdatedData({ ...updatedData, registrationStartDate: date })}
                  className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                  showTimeSelect 
                  dateFormat="Pp"
                  required
                />
              </div>

              {/* registration end date */}
              <div className="form-control mb-4">
                <label className="label">Registration End Date</label>
                <DatePicker 
                  selected={updatedData.registrationEndDate ? new Date(updatedData.registrationEndDate) : null}
                  onChange={(date) => setUpdatedData({ ...updatedData, registrationEndDate: date })}
                  className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                  showTimeSelect 
                  dateFormat="Pp"
                  required
                />
              </div>

              {/* marathon start date */}
              <div className="form-control mb-4">
                <label className="label">Marathon Start Date</label>
                <DatePicker 
                  selected={updatedData.marathonStartDate ? new Date(updatedData.marathonStartDate) : null}
                  onChange={(date) => setUpdatedData({ ...updatedData, marathonStartDate: date })}
                  className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                  showTimeSelect 
                  dateFormat="Pp"
                  required
                />
              </div>

              {/* marathon image */}
              <div className="form-control mb-4">
                <label className="label">Marathon Image URL</label>
                <input type="url" name="marathonImage" value={updatedData.marathonImage || ""} onChange={handleInputChange}className="input input-bordered block w-full text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-green-600 focus:border-blue-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" required/>
              </div>

              {/* buttons */}
              <div className="flex justify-end space-x-4 mt-4">
                <button className="btn btn-success text-white px-5 md:px-10" type="submit">
                  Update
                </button>
                <label className="btn btn-error text-white px-5 md:px-10" htmlFor="my_modal_7" onClick={handleCloseModal} >
                  Cancel
                </label>
              </div>
            </form>
          )}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7" onClick={handleCloseModal}>Close</label>
      </div>
    </div>
  );
};

export default MyMarathons;
