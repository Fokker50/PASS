// React Imports
import React from 'react';
// React Router Imports
import { NavLink, useLocation } from 'react-router-dom';
// Material UI Imports
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

/**
 * NavbarLinks Component - The sub-component used in NavBar to render the
 * navigation for PASS
 *
 * @memberof NavBar
 * @name NavbarLinks
 */

const NavbarLinks = () => {
  // Tabs workaround to match route on login
  let location = useLocation().pathname.split('/')[1];
  if (location === '') {
    location = 'clients';
  }

  // array of current nav links for menus
  const routesArray = [{ label: 'Clients', path: '/clients' }];

  return (
    <Tabs
      value={
        routesArray.map((route) => route.label.toLowerCase()).includes(location) ? location : false
      }
      textColor="inherit"
      indicatorColor="secondary"
      aria-label="navigation tabs"
    >
      {routesArray.map((item) => (
        <Tab
          key={`${item.label}Tab`}
          value={item.label.toLowerCase()}
          label={item.label}
          component={NavLink}
          to={item.path}
        />
      ))}
    </Tabs>
  );
};

export default NavbarLinks;
