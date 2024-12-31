import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utilis/baseUrl";
import moment from "moment"

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);

        // api request
        const response = await axios.get("/category");
        const data = response.data.data;
        setCategories(data.categorysearch);
        console.log(data);
        

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getCategory();
  }, []);

  return (
    <div className="bg-purple-100 rounded-2xl max-h-full sm:w-[400px] lg:w-[1200px] flex flex-col py-10 px-10 mx-10 my-10 items-center justify-center">
      <div className="border border-purple-600 bg-purple-900 text-white rounded-lg p-2 flex justify-end ml-auto mb-6 text-xs sm:text-base hover:bg-purple-700">
        <button
          className="ml-auto"
          onClick={() => {
            navigate("/category/new-category");
          }}
        >
          Add New Category
        </button>
      </div>

      <div className="text-2xl mb-8 font-bold text-purple-950">
        <h1>Category Lists</h1>
      </div>

      <div className="flex justify-start w-full p-2">
        <div className="border border-purple-500 p-0 rounded-lg bg-purple-100">
          <input
            type="text"
            name="search"
            placeholder="Search here"
            className="w-full sm:w-[200px] md:w-[300px] lg:w-[250px] px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="min-w-full sm:max-w-full border border-gray-200 text-left bg-white rounded-lg shadow-lg">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Created At</th>
              <th className="px-6 py-3 font-medium">Updated At</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (


              <tr key={category._id} className="border-b hover:bg-purple-100">
                <td className="px-6 py-4">{category.title}</td>
                <td className="px-6 py-4">{category.desc}</td>
                <td className="px-6 py-4">{moment(category.createdAt).format("  YYYY-MM-DD HH:mm:ss ")}</td>
                <td className="px-6 py-4">{moment(category.updatedAt).format("  YYYY-MM-DD HH:mm:ss ")}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => navigate("/category/update-category")}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
