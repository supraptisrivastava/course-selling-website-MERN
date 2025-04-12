import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {Toaster} from "react-hot-toast";
import Courses from "./components/course";
import Buy from "./components/buy";
import Purchases from "./components/purchase";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import CourseCreate from "./Admin/CourseCreate";
import UpdateCourse from "./Admin/UpdateCourse";
import OurCourses from "./Admin/OurCourses";
import AdminSignup from "./Admin/AdminSignup";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
   <div><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      {/* {otherroutes} */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/buy/:courseId" element={<Buy />} />
      <Route path="/purchases" element={user? <Purchases /> : <Navigate to={"/login"} />} />
      {/* {adminroutes} */}
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={admin? <Dashboard /> : <Navigate to={"/admin/login"} />} />
      <Route path="/admin/create-course" element={<CourseCreate />} />
      <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
      <Route path="/admin/our-courses" element={<OurCourses />} />
      {/* <Route path="/admin/dashboard" element={adminToken ? <Dashboard /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/create-course" element={adminToken ? <CourseCreate /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/update-course/:id" element={adminToken ? <UpdateCourse /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/our-courses" element={adminToken ? <OurCourses /> : <Navigate to="/admin/login" />} /> */}
   </Routes>
   <Toaster />
   </div>
  )
}

export default App
