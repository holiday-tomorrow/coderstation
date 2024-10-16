import React from 'react'
import { useRoutes, Navigate } from "react-router-dom"
import Issues from '../pages/Issues'
import Interview from '../pages/Interview'
import Books from '../pages/Books'
export default function Router() {
    const routerConfig = useRoutes([
        {
            path: "/Issues",
            element: <Issues />
        },
        {
            path: "/books",
            element: <Books />
        },
        {
            path: "/interviews",
            element: <Interview />
        },
        {
            path: "/",
            element: <Navigate to="/Issues" replace></Navigate>
        }
    ])
    return routerConfig
}
