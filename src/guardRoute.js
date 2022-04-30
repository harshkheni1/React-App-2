import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'

const GuardedRoute = ({
  component: Component,
  currentUser,
  restrictLoggedInUser,
  className,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!currentUser) {
        return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
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
export default GuardedRoute
