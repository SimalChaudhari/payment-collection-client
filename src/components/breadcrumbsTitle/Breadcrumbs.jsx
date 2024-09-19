// PageTitle.js
import { adminRoutes, salesmanRoutes, customerRoutes, authRoutes } from '@/routes';

export const BreadcrumbsTitle = (pathname) => {

    const allRoutes = [...adminRoutes.flatMap(route => route.pages),
    ...salesmanRoutes.flatMap(route => route.pages),
    ...customerRoutes.flatMap(route => route.pages),
    ...authRoutes.flatMap(route => route.pages)];

    const lastPart = pathname.split('/').pop().toLowerCase(); // Extract 'salesmans' or 'customers' and convert to lowercase
    // Check if any route matches the last part of the path
    const matchedRoute = allRoutes.find((route) => route?.name?.toLowerCase() === lastPart);

    // Return matched route name, or "Dashboard" if no match is found
    return matchedRoute ? matchedRoute.name : "Dashboard";
};
