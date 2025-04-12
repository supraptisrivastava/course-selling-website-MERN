// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // import toast from 'react-hot-toast';
// // import { Link, Navigate } from 'react-router-dom';

// // function OurCourses() {
// //    const [courses, setCourses] = useState([]);
// //       const [loading,setLoading]=useState(true);
// //   const admin=JSON.parse(localStorage.getItem("admin"));
// //   if (!admin || !admin.token) {
// //     toast.error("Please login to admin");
// //     return <Navigate to="/admin/login" />;  // Use Navigate in return, not directly in the function body
// //   }
// //   const token =admin.token; 
// //   useEffect(() => {
// //       const fetchCourses = async () => {
// //         try {
// //           const response = await axios.get(
// //             "http://localhost:4001/api/v1/course/courses",
// //             {
// //               withCredentials: true,
// //             }
// //           );
// //           console.log(response.data.courses);
// //           setCourses(response.data.courses);
// //           setLoading(false);  
// //         } catch (error) {
// //           console.log("error in fetching courses", error);
// //         }
// //       };
// //       fetchCourses();
// //     }, []);
// //     const handleDelete=async(id)=>{
// //       try{
// //         const response=await axios.delete(
// //           `http://localhost:4001/api/v1/course/delete/${id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //             withCredentials: true,
// //           }
// //         );
// //         toast.success(response.data.message);
// //         const UpdateCourse=courses.filter((course)=>course._id!=id);
// //         setCourses(UpdateCourse);
// //       }
// //       catch(error){
// //         console.log("error in deleting the course",error);
// //         toast.error(error.response.data.errors || "error in deleting the course");
// //       }
// //     };
// //     if (loading) {
// //       return <p className="text-center text-gray-500">Loading...</p>;
// //     }
  
// //     return (
// //       <div className="bg-gray-100 p-8 space-y-4">
// //         <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
// //         <Link
// //           className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
// //           to={"/admin/dashboard"}
// //         >
// //           Go to dashboard
// //         </Link>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {courses.map((course) => (
// //             <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
// //               {/* Course Image */}
// //               <img
// //                 src={course?.image?.url}
// //                 alt={course.title}
// //                 className="h-40 w-full object-cover rounded-t-lg"
// //               />
// //               {/* Course Title */}
// //               <h2 className="text-xl font-semibold mt-4 text-gray-800">
// //                 {course.title}
// //               </h2>
// //               {/* Course Description */}
// //               <p className="text-gray-600 mt-2 text-sm">
// //                 {course.description.length > 200
// //                   ? `${course.description.slice(0, 200)}...`
// //                   : course.description}
// //               </p>
// //               {/* Course Price */}
// //               <div className="flex justify-between mt-4 text-gray-800 font-bold">
// //                 <div>
// //                   {" "}
// //                   ₹{course.price}{" "}
// //                   <span className="line-through text-gray-500">₹300</span>
// //                 </div>
// //                 <div className="text-green-600 text-sm mt-2">10 % off</div>
// //               </div>
  
// //               <div className="flex justify-between">
// //                 <Link
// //                   to={`/admin/update-course/${course._id}`}
// //                   className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
// //                 >
// //                   Update
// //                 </Link>
// //                 <button
// //                   onClick={() => handleDelete(course._id)}
// //                   className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// // export default OurCourses

// // import React, { useState } from 'react';
// // import logo from "../../public/logo.webp";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // function AdminLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const navigate=useNavigate()

// //   const handleSubmit=async (e)=>{
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:4001/api/v1/admin/login",
// //         {
// //           email,
// //           password,
// //         },  
// //         {
// //           withCredentials: true,
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       console.log("AdminLogin successful: ", response.data);
// //       // navigate("/");
// //       toast.success(response.data.message);
// //       navigate("/admin/dashboard");
// //       localStorage.setItem("admin", JSON.stringify({ token: response.data.token })); // ✅ Correct
// //       alert("AdminLogin successful");
// //     } catch (error) {
// //       if (error.response) {
// //         setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
// //       }
// //     }
// //   };
// //   return (
// //     <div className="bg-gradient-to-r from-black to-blue-950 ">
// //       <div className="h-screen container mx-auto flex  items-center justify-center text-white">
// //         {/* Header */}
// //         <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
// //           <div className="flex items-center space-x-2">
// //             <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
// //             <Link to={"/"} className="text-xl font-bold text-orange-500">
// //               CourseHaven
// //             </Link>
// //           </div>
// //           <div className="flex items-center space-x-4">
// //             <Link
// //               to={"/admin/signup"}
// //               className="bg-transparent border border-gray-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
// //             >
// //               Signup
// //             </Link>
// //             <Link
// //               to={"/courses"}
// //               className="bg-orange-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
// //             >
// //               Join now
// //             </Link>
// //           </div>
// //         </header>

// //         {/* AdminLogin Form */}
// //         <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
// //           <h2 className="text-2xl font-bold mb-4 text-center">
// //             Welcome to <span className="text-orange-500">CourseHaven</span>
// //           </h2>
// //           <p className="text-center text-gray-400 mb-6">
// //              Login to access admin Dashboard! 
// //           </p>

// //           <form onSubmit={handleSubmit}>

// //             <div className="mb-4">
// //               <label htmlFor="email" className=" text-gray-400 mb-2">
// //                 Email
// //               </label>
// //               <input
// //                 type="text"
// //                 id="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="name@email.com"
// //                 required
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="password" className=" text-gray-400 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="password"
// //                   id="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="********"
// //                   required
// //                 />
// //                 <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                    
// //                 </span>
// //               </div>
// //             </div>
// //             {errorMessage && (
// //               <div className="mb-4 text-red-500 text-center">
// //                 {errorMessage}
// //               </div>
// //             )}
// //             <button
// //               type="submit"
// //               className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
// //             >
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLogin

// import React, { useState } from "react";
// import logo from "../../public/logo.webp";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log({ password });
//     try {
//       const response = await axios.post(
//         "http://localhost:4001/api/v1/admin/login",
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       console.log("AdminLogin successful: ", response.data);
//       toast.success(response.data.message);
//       // localStorage.setItem("admin", JSON.stringify(response.data));
//       // localStorage.setItem("token", response.data.token);
//       // 
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         console.log("Token saved:", localStorage.getItem("token"));
//         navigate("/admin/dashboard");
//       } else {
//         console.error("Token missing in response:", response.data);
//       }
      
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-black to-blue-950 ">
//       <div className="h-screen container mx-auto flex  items-center justify-center text-white">
//         {/* Header */}
//         <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
//           <div className="flex items-center space-x-2">
//             <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
//             <Link to={"/"} className="text-xl font-bold text-orange-500">
//               CourseHaven
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link
//               to={"/admin/signup"}
//               className="bg-transparent border border-gray-500 py-2 px-4 rounded-md"
//             >
//               Signup
//             </Link>
//             <Link
//               to={"/courses"}
//               className="bg-orange-500 py-2 px-4 rounded-md"
//             >
//               Join now
//             </Link>
//           </div>
//         </header>

//         {/* AdminLogin Form */}
//         <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Welcome to <span className="text-orange-500">CourseHaven</span>
//           </h2>
//           <p className="text-center text-gray-400 mb-6">
//             Log in to access admin dashboard!
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className=" text-gray-400 mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="name@email.com"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className=" text-gray-400 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="********"
//                   required
//                 />
//                 <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
//                 </span>
//               </div>
//             </div>
//             {errorMessage && (
//               <div className="mb-4 text-red-500 text-center">
//                 {errorMessage}
//               </div>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin.token;

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/course/courses", {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // delete courses code
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/v1/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        } 
      );
      toast.success(response.data.message);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.log("Error in deleting course ", error);
      toast.error(error.response.data.errors || "Error in deleting course");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
        to={"/admin/dashboard"}
      >
        Go to dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
            {/* Course Image */}
            <img
              src={course?.image?.url}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {course.title}
            </h2>
            {/* Course Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {course.description.length > 200
                ? `${course.description.slice(0, 200)}...`
                : course.description}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-800 font-bold">
              <div>
                {" "}
                ₹{course.price}{" "}
                <span className="line-through text-gray-500">₹300</span>
              </div>
              <div className="text-green-600 text-sm mt-2">10 % off</div>
            </div>

            <div className="flex justify-between">
              <Link
                to={`/admin/update-course/${course._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurCourses;