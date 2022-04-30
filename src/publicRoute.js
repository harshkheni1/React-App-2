import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({
  component: Component,
  currentUser,
  restrictLoggedInUser,
  className,
  ...rest
}) => (
  <Route
    {...rest}
    render={() => {
      if (restrictLoggedInUser && currentUser) {
        return <Redirect to={{ pathname: '/' }} />
      }

      return (
        <div className={className}>
          <Suspense fallback={null}>
            <Component />
          </Suspense>
        </div>
      )
    }}
  />
)
export default PublicRoute
