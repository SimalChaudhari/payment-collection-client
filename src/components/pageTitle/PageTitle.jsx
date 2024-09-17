// PageTitle.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { adminRoutes, salesmanRoutes, customerRoutes, authRoutes } from '@/routes';

const getTitle = (pathname) => {

    const allRoutes = [...adminRoutes.flatMap(route => route.pages),
    ...salesmanRoutes.flatMap(route => route.pages),
    ...customerRoutes.flatMap(route => route.pages),
    ...authRoutes.flatMap(route => route.pages)];

    const lastPart = pathname.split('/').pop().toLowerCase(); // Extract 'salesmans' or 'customers' and convert to lowercase
    // Check if any route matches the last part of the path
    const matchedRoute = allRoutes.find((route) => route.name.toLowerCase() === lastPart);
    if (matchedRoute) {
        return matchedRoute ? `Payment Collection | ${matchedRoute.name}` : "Payment Collection";
    } else {
        console.log("No matching route found.");
    }
};

const PageTitle = () => {
    const location = useLocation();
    const title = getTitle(location.pathname);

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default PageTitle;
