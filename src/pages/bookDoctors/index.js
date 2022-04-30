import React, { useState, useRef, useEffect } from 'react'
// import { Dropdown } from 'antd'
import { SearchOutlined, DownOutlined } from '@ant-design/icons'
import { Popover, Button, Rate, Checkbox } from 'antd'
// import style from './style.module.scss'
// import style from './style.css'

const BookDoctors = () => {
  const wrapperRef = useRef(null)
  const [openDropdown, setOpenDropdown] = useState(false)
  const menuOpen = () => {
    setOpenDropdown(true)
  }
  // const getValues = () => {
  //   console.log('ss')
  // }
  const plainOptions = [
    'Anxiety',
    'Trauma Healing',
    'Chronic Indigestion',
    'Emotional Health',
    'Fitness/Balance',
    'Constipation',
    'Stress Management',
    'Sleep Issues',
    'IBS',
    'Mental Health',
    'Balance',
    'Headaches',
    'Depression',
    'Gastrointestinal Health',
    'Muscle Pain',
  ]
  const Practitioners = [
    'Dr. Almasaro',
    'Dr. Herbeau',
    'Dr. Andrew Manson',
    'Dr. Jim Parsons',
    'Dr. Edwin Spindrift',
    'Dr. Jeremy Stone',
    'Dr. Martin Arrowsmith',
    'Dr. Rashids',
  ]
  const Specialties = ['Yoga Instructor', 'Holistic Health Coach', 'Life Coach', 'Meditation Coach']
  function canditions(checkedValues) {
    console.log('checked = ', checkedValues)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenDropdown(false)
    }
  }

  const content = (
    <div className="filterbody">
      <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={canditions} />
      <div className="filter-footer">
        <Button>Clear All</Button>
        <Button type="primary" className="ml-3">
          Done
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="card searchdoctropanel">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center pt-4">
                <h3>Find and Book Wellness Practitioners</h3>
                <p>Don’t know where to start? Try searching by health concern.</p>
              </div>
              <div className="searchbar" ref={wrapperRef}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="searchicon">
                    <SearchOutlined />
                  </div>
                  <div className="searchinput">
                    <input
                      type="text"
                      onFocus={menuOpen}
                      className="form-control"
                      placeholder="Search by Practitioners, specialties"
                    />
                  </div>
                  <div className="zipcodewrap">
                    <input type="text" className="form-control" placeholder="Zipcode or City" />
                  </div>
                  <div className="searchbtn">
                    <button type="submit" className="btn btn-primary btn-block">
                      Search
                    </button>
                  </div>
                </div>
                <div className={openDropdown ? 'dropwdownwraper open' : 'dropwdownwraper'}>
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="listtitle">Practitioners</h5>
                      <ul>
                        {Practitioners.map((data) => {
                          return <li>{data}</li>
                        })}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5 className="listtitle">Specialties</h5>
                      <ul>
                        {Specialties.map((data) => {
                          return <li>{data}</li>
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filterlist mb-4">
                <p className="mb-0 semi-bold text-dark mr-2">Filters : </p>
                <div className="filterss">
                  <Popover
                    content={content}
                    title="Conditions"
                    trigger="click"
                    placement="bottomLeft"
                  >
                    <Button>
                      Conditions
                      <DownOutlined />
                    </Button>
                  </Popover>
                </div>
                <div className="filterss">
                  <Popover
                    content={content}
                    title="Specialties"
                    trigger="click"
                    placement="bottomLeft"
                  >
                    <Button>
                      Specialties
                      <DownOutlined />
                    </Button>
                  </Popover>
                </div>
                <div className="filterss">
                  <Popover content={content} title="Price" trigger="click" placement="bottomLeft">
                    <Button>
                      Price
                      <DownOutlined />
                    </Button>
                  </Popover>
                </div>
                <div className="filterss">
                  <Popover content={content} title="Rating" trigger="click" placement="bottomLeft">
                    <Button>
                      Rating
                      <DownOutlined />
                    </Button>
                  </Popover>
                </div>
                <div className="filterss">
                  <Popover
                    content={content}
                    title="Location Type"
                    trigger="click"
                    placement="bottomLeft"
                  >
                    <Button>
                      Location Type
                      <DownOutlined />
                    </Button>
                  </Popover>
                </div>
                <div className="filterss">
                  <Button type="default">Clear all</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p className="semi-bold text-dark">100 practitioners found in your area.</p>
          <div className="row">
            {/* loop  */}
            <div className="col-md-6">
              <div className="pract-card">
                <div className="pro-photo">
                  <img src="resources/images/content/doctor2.png" alt="logo" />
                </div>
                <div className="pro-info">
                  <h4 className="mb-3 d-flex align-items-center">
                    Heather Burkart
                    <span className="ratings">
                      <Rate disabled defaultValue={4} />
                    </span>
                  </h4>
                  <p>Ayurvedic Practitioner, Yoga Instructor and 3 more specialties</p>
                  <p>
                    <i className="icmn-location font-size-18 pr-2" /> Square One Dr, Mississauga, ON
                    L5B, Canada
                  </p>
                  <p>
                    <i className="icmn-phone font-size-18 pr-2" />
                    +1 4379871551
                  </p>
                  <a href="#" className="gotoprofile">
                    <i className="icmn-arrow-right2" />
                  </a>
                </div>
              </div>
            </div>
            {/* loop  */}
            <div className="col-md-6">
              <div className="pract-card">
                <div className="pro-photo">
                  <img src="resources/images/content/doctor2.png" alt="logo" />
                </div>
                <div className="pro-info">
                  <h4 className="mb-3 d-flex align-items-center">
                    Heather Burkart
                    <span className="ratings">
                      <Rate disabled defaultValue={4} />
                    </span>
                  </h4>
                  <p>Ayurvedic Practitioner, Yoga Instructor and 3 more specialties</p>
                  <p>
                    <i className="icmn-location font-size-18 pr-2" /> Square One Dr, Mississauga, ON
                    L5B, Canada
                  </p>
                  <p>
                    <i className="icmn-phone font-size-18 pr-2" />
                    +1 4379871551
                  </p>
                  <a href="#" className="gotoprofile">
                    <i className="icmn-arrow-right2" />
                  </a>
                </div>
              </div>
            </div>
            {/* loop  */}
            <div className="col-md-6">
              <div className="pract-card">
                <div className="pro-photo">
                  <img src="resources/images/content/doctor2.png" alt="logo" />
                </div>
                <div className="pro-info">
                  <h4 className="mb-3 d-flex align-items-center">
                    Heather Burkart
                    <span className="ratings">
                      <Rate disabled defaultValue={4} />
                    </span>
                  </h4>
                  <p>Ayurvedic Practitioner, Yoga Instructor and 3 more specialties</p>
                  <p>
                    <i className="icmn-location font-size-18 pr-2" /> Square One Dr, Mississauga, ON
                    L5B, Canada
                  </p>
                  <p>
                    <i className="icmn-phone font-size-18 pr-2" />
                    +1 4379871551
                  </p>
                  <a href="#" className="gotoprofile">
                    <i className="icmn-arrow-right2" />
                  </a>
                </div>
              </div>
            </div>
            {/* loop  */}
            <div className="col-md-6">
              <div className="pract-card">
                <div className="pro-photo">
                  <img src="resources/images/content/doctor2.png" alt="logo" />
                </div>
                <div className="pro-info">
                  <h4 className="mb-3 d-flex align-items-center">
                    Heather Burkart
                    <span className="ratings">
                      <Rate disabled defaultValue={4} />
                    </span>
                  </h4>
                  <p>Ayurvedic Practitioner, Yoga Instructor and 3 more specialties</p>
                  <p>
                    <i className="icmn-location font-size-18 pr-2" /> Square One Dr, Mississauga, ON
                    L5B, Canada
                  </p>
                  <p>
                    <i className="icmn-phone font-size-18 pr-2" />
                    +1 4379871551
                  </p>
                  <a href="#" className="gotoprofile">
                    <i className="icmn-arrow-right2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDoctors
