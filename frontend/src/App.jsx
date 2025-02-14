import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import About from './components/About'
import Browse from './components/Browse'
import JobSection from './components/JobSection'
import Contact from './components/Contact'
import Profile from './components/Profile'
import AppliedJobTable from './components/AppliedJobTable'
import JobDescription from './components/JobDescription'
import Companies from './components/Admin/Companies'
import CompanyRegister from './components/Admin/CompanyRegister'
import CompanySetup from './components/Admin/CompanySetup'
import AdminPostingJobs from './components/Admin/AdminPostingJobs'
import JobRegister from './components/Admin/JobRegister'
import JobApplicants from './components/Admin/JobApplicants'
import RemoveJob from './components/Admin/RemoveJob'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/jobs',
    element: <JobSection />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/profile',
    element: <Profile />

  },
  {
    path: '/appliedjobtable',
    element: <AppliedJobTable />

  },
  {
    path: '/description/:id',
    element: <JobDescription />

  },

  // Here we are starting to add routes for recruiter side
  {
    path:'/admin/companies',
    element: <Companies/>
  },
  {
    path:'admin/company/register',
    element: <CompanyRegister/>
  },
  {
    path:'admin/company/:id',
    element: <CompanySetup/>
  }, 
  {
    path:'/admin/jobs',
    element: <AdminPostingJobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<JobRegister/>
  },
  {
    path:'/admin/job/:id/applicants',
    element:<JobApplicants/>
  },
  {
    path:'/admin/job/remove/:id',
    element:<RemoveJob/>
  }
])

const App = () => {
  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
