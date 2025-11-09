import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import useUser from "../hooks/useUser.js";

export const ProtectedRoute = ({ children }) => {
  const { customer, loading, error } = useUser()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!customer || Object.keys(customer).length === 0) {
    const redirectPath = location.pathname + location.search
    return <Navigate to={`/auth?redirect=${encodeURIComponent(redirectPath)}`} replace />
  }

  return <>{children}</>
}
