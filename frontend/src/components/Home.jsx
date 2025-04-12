import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";  
import { BACKEND_URL } from "../utils/utils";   

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null"); // Parse stored string
    setIsLoggedIn(!!user); // Converts to true/false
  }, []);  
const handleLogout = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.token;

  console.log("Token Sent:", token); // Debugging step

  if (!token) {
    toast.error("No token found. Please log in again.");
    return;
  }

  try {
    await axios.post(`${BACKEND_URL}/user/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }, 
      withCredentials: true, 
    });

    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  } catch (error) {
    console.error("Logout Error:", error.response);
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetching courses", error);
      }
    };
    fetchCourses();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-gradient-to-r from-black to-blue-950 h-screen text-white">
      <div className="container mx-auto">
        {/* {header} */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
          </div>
          <div className="space-x-4">
           {isLoggedIn?( <button onClick={handleLogout}
           
              className="bg-transparent text-white py-2 px-4 border border-white rounded"
            >
              {" "}
              Logout
            </button>
            ):
            ( <> <Link
              to={"/Login"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded"
            >
              {" "}
              Login
            </Link>
            <Link
              to={"/Signup"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded"
            >
              Signup
            </Link> </>)}
          </div>
        </header>
        {/* {main section} */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-orange-500">
            CourseHaven
          </h1>
          <br />
          <p className="text-gray-500">
            Sharpen your skills with courses by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link to={"/courses"} className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black">
              Explore Courses
            </Link>
            <Link to={"https://www.youtube.com/channel/UCeVMnSShP_Iviwkknt83cww"} className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white">
              Courses Videos
            </Link>
          </div>
        </section>
        <section>
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img className="h-32 w-full object-contain" src={course.image.url} alt="" />
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-white">
                    {course.title}</h2>
                    <Link to={`/buy/${course._id}`} className="mt-8 bg-orange-500 text-white py-2 px-4 rounded-full">
  Enroll Now
</Link>

                  </div>
                </div>
              </div>
              </div>
            ))}
          </Slider>
        </section>
        <hr />
        {/* {footer} */}
        <footer className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">
                  CourseHaven
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-400 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <div className="items=center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Youtube-Learn Coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Telegram-Learn Coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github-Learn Coding
                </li>
              </ul>
            </div>
            <div className="items=center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyright &#169; 2025
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms and Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policies
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund and Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
