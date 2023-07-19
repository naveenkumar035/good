import React from 'react';
import Theme from "./Theme.js"
import Nav from "./Nav";
import Sidebar from './Sidebar.js';


const Layout = ({ children }) => (
  <>
    <Theme/>
    <Nav/>
    <Sidebar/>
    
    <div >
      <main>  
        {children}
       
      </main>
    </div>
    
  </>
); 

export default Layout;