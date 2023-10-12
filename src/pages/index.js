import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react'
import Home from './Home'
import Upload from './Upload';
import UploadButton from '../components/UploadButton';
import { PrivateElement, PrivateRoute } from '../hooks/PrivateRoute';
function Main() {
  return (
    <Router>
        <div className='lg:mt-20 mt-2 lg:px-40 flex w-full h-screen justify-center'>
        <PrivateElement>
          <UploadButton />
        </PrivateElement>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home />} />
            <Route path="/:dir" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
        </div>
    </Router>
  )
}

export default Main