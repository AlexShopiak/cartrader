import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage     from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage  from './pages/ProfilePage'
import NoPage       from './pages/NoPage'

const router = createBrowserRouter([
    {path: '/',         element: <HomePage />},
    {path: '/products', element: <ProductsPage />},
    {path: '/profile',  element: <ProfilePage />},
    {path: '*',         element: <NoPage />},
]);

function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;