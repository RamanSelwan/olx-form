
import { Routes } from 'react-router-dom';
import PostAdForm from './components/PostAdForm'
import PostAdWizard from './components/PostAdWizard';
import React from 'react';
import { Route } from 'react-router-dom';
import AdConfirmation from './components/AdConfirmation';
function App() {
 
  return(
    <>
 
<Routes>
  <Route path="/olx-form" element={<PostAdForm />} />
  <Route path="/" element={<PostAdWizard />} />
  <Route path="/confirmation" element={<AdConfirmation />} />
</Routes> 
  
    </>
  )
}

export default App
