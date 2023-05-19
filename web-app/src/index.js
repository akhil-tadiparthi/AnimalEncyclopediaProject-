import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import {AnimalViewPage} from './AnimalViewPage'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/*<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
    */}    
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage/>}></Route>
        <Route path="/species/*" element={<AnimalViewPage/>}></Route>
        <Route path="/about" element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);