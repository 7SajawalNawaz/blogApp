import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from '../../utilis/baseUrl';
import NewCategoryValidator from '../../Validators/NewCategoryValidator'

const initialFormData ={
  title : "",
  desc : ""
}

const intialFormErr ={
  title : ""
}


const NewCategory = () => {

  const [formData, setFormdata] = useState(initialFormData);
  const [formErr, setFormErr] = useState(intialFormErr);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async(e) =>{
    e.preventDefault()

    const errors = NewCategoryValidator({title : formData.title})
  

  if(errors.title){
    setFormErr(errors)
  }
  else{

    try {
      setLoading(true);

      // api request

      const requestBody = {
        title: formData.title,
        desc: formData.desc,
      };

      const response = await axios.post("/category", requestBody);
      const data = response.data;


      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      setFormdata(initialFormData);

      setFormErr(intialFormErr);

      setLoading(false);

      navigate("/category");
    } catch (error) {
      setLoading(false);

      const response = error.response;
      const data = response?.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
      // console.log(err.message);
    }}
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        
        {/* Back Button */}
        <div className="mb-4">
          <button onClick={()=>navigate (-1)} className="text-purple-500 hover:text-purple-700 font-semibold">
            &larr; Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">New Category</h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            {formErr.title && (
                <p className="text-xs text-red-600">{formErr.title}</p>
              )}
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="desc"
              placeholder="Description"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <input
              type="submit"
              value={`${loading ? "Adding..." : "Add"}`}
              className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
