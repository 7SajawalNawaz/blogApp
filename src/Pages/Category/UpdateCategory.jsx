import React from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateCategory = () => {
  const navigate = useNavigate()
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
        <form>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Category</h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Technology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="desc"
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <input
              type="submit"
              value="Update"
              className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategory