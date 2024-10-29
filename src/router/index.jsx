import React from 'react'
import { useRoutes, Navigate } from "react-router-dom"
import Issues from '../pages/Issues'
import Interview from '../pages/Interview'
import Books from '../pages/Books'
import AddIssue from '../pages/AddIssue'
import IssueDetail from '../pages/IssueDetail'
import SearchPage from '../pages/SearchPage'
export default function Router() {
    const routerConfig = useRoutes([
        {
            path: "/issues",
            element: <Issues />
        },
        {
            path: "/issues/:id",
            element: <IssueDetail />
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
            path: "/addIssue",
            element: <AddIssue />
        },
        {
            path: "/searchPage",
            element: <SearchPage />
        },
        {
            path: "/",
            element: <Navigate to="/Issues" replace></Navigate>
        }
    ])
    return routerConfig
}
