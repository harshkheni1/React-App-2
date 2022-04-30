/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import { find } from 'lodash'

function SearchLocationInput({
  setAddress,
  setlat,
  setlng,
  address,
  setCountry,
  setCity,
  setState,
  setPostalCode,
  styleProps,
  setCustomAddress,
  onBlur,
}) {
  let autoComplete

  const loadScript = (url, callback) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      componentRestrictions: { country: ['ca', 'in'] },
    })
    autoComplete.setFields(['address_components', 'formatted_address', 'geometry', 'name'])
    autoComplete.addListener('place_changed', () => {
      handlePlaceSelect(updateQuery)
    })
  }

  async function handlePlaceSelect(updateQuery, callback) {
    const addressObject = autoComplete.getPlace()
    const query = addressObject.formatted_address
    if (addressObject.formatted_address.includes(addressObject.name)) {
      setAddress(addressObject.formatted_address)
    } else {
      setAddress(`${addressObject.name}, ${addressObject.formatted_address}`)
    }
    if (setlat) {
      setlat(addressObject.geometry.location.lat())
    }
    if (setlng) {
      setlng(addressObject.geometry.location.lng())
    }
    if (addressObject && addressObject.address_components) {
      const country = find(addressObject.address_components, {
        types: ['country'],
      })
      if (setCountry && country) {
        setCountry(country.long_name)
      }
      const city = find(addressObject.address_components, {
        types: ['locality'],
      })
      if (setCity && city) {
        setCity(city.long_name)
      }
      const state = find(addressObject.address_components, {
        types: ['administrative_area_level_1'],
      })
      if (setState && state) {
        setState(state.long_name)
      }
      const postal_code = find(addressObject.address_components, {
        types: ['postal_code'],
      })
      if (setPostalCode && postal_code) {
        setPostalCode(postal_code.long_name)
      }
    }
    if (addressObject.formatted_address.includes(addressObject.name)) {
      updateQuery(addressObject.formatted_address)
    } else {
      updateQuery(addressObject.name)
    }
  }
  const [query, setQuery] = useState(address || '')
  const autoCompleteRef = useRef(null)
  useEffect(() => {
    setQuery(address)
  }, [address])
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyD6GGik6mcxsZbKw60nof5NwYubIleeSYE&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef),
    )
  }, [])

  return (
    <div className="search-location-input">
      {/* <input
        className="form-control"
        style={styleProps?styleProps:{}}
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      /> */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          style={styleProps || {}}
          ref={autoCompleteRef}
          onChange={(event) => {
            setQuery(event.target.value)
            if (setCustomAddress) {
              setCustomAddress(event.target.value)
            }
          }}
          onBlur={(e) => {
            onBlur(e.target.value)
          }}
          placeholder="Enter a City"
          value={query}
        />
      </div>
    </div>
  )
}

export default SearchLocationInput
