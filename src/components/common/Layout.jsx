import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  console.log('Layout - Current path:', location.pathname); // Debug line
  
  // Make path comparison case-insensitive and handle redirects
  const currentPath = location.pathname.toLowerCase();
  const isLoginPage = currentPath === '/login' || currentPath.startsWith('/login');
  const isAdminPage = currentPath === '/admin' || currentPath.startsWith('/admin');

  console.log('Layout - Is login page:', isLoginPage); // Debug line
  console.log('Layout - Is admin page:', isAdminPage); // Debug line

  // If it's login page, show children with footer (no header)
  if (isLoginPage) {
    console.log('Layout - Rendering login page with footer, no header'); // Debug line
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  // If it's admin page, show children with footer (no header)  
  if (isAdminPage) {
    console.log('Layout - Rendering admin page with footer, no header'); // Debug line
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  // For all other pages, show header and footer
  console.log('Layout - Rendering regular page with header and footer'); // Debug line
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;