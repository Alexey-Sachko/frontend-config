import React from 'react'
import { renderRoutes } from "react-router-config";


const MainContainer = ({ route: { routes } }) => {
  return (
    <div>
      <main className="main">
        { renderRoutes(routes) }
      </main>
    </div>
  )
}

export default MainContainer;