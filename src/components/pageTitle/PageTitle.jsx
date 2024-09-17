// PageTitle.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { adminRoutes, salesmanRoutes, customerRoutes, authRoutes } from '@/routes';

const getTitle = (pathname) => {
    console.log("🚀 ~ getTitle ~ pathname:", pathname)
    const allRoutes = [...adminRoutes.flatMap(route => route.pages),
    ...salesmanRoutes.flatMap(route => route.pages),
    ...customerRoutes.flatMap(route => route.pages),
    ...authRoutes.flatMap(route => route.pages)];

    const route = allRoutes.find(route => {
        console.log("🚀 ~ getTitle ~ route:", route)
        return route.path
    })
    return route ? `Payment Collection | ${route.name}` : "Payment Collection";
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
