import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Typography, Cascader, Input, Button } from 'antd'
// import { FormOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { API } from 'aws-amplify'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.scss'
import actions from '../../redux/doctorProfile/actions'

const ExpertAdvice = () => {
  const { id } = useSelector((state) => state.user)
  const [expertList, setExpertList] = useState([])
  const [expertiseId, setExpertiseId] = useState(null)
  const [expertiseSkill, setExpertiseSkill] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [expertisePerson, setExpertisePerson] = useState([])
  const categoryList = []
  const dispatch = useDispatch()
  const history = useHistory()
  const canadaProvinces = [
    {
      label: 'Alberta',
      value: 'Alberta',
    },
    {
      label: 'British Columbia',
      value: 'British Columbia',
    },
    {
      label: 'Manitoba',
      value: 'Manitoba',
    },
    {
      label: 'New Brunswick',
      value: 'New Brunswick',
    },
    {
      label: 'Newfoundland and Labrador',
      value: 'Newfoundland and Labrador',
    },
    {
      label: 'Northwest Territories',
      value: 'Northwest Territories',
    },
    {
      label: 'Nova Scotia',
      value: 'Nova Scotia',
    },
    {
      label: 'Nunavut',
      value: 'Nunavut',
    },
    {
      label: 'Ontario',
      value: 'Ontario',
    },
    {
      label: 'Prince Edward Island',
      value: 'Prince Edward Island',
    },
    {
      label: 'Quebec',
      value: 'Quebec',
    },
    {
      label: 'Saskatchewan',
      value: 'Saskatchewan',
    },
    {
      label: 'Yukon',
      value: 'Yukon',
    },
  ]

  useEffect(() => {
    API.get('API', `expert/allCategories?userId=${id}`).then((res) => {
      if (res && res.status && res.categories) {
        res.categories.forEach((category) => {
          const { Name, categoryId } = category
          categoryList.push({ label: Name, value: categoryId })
        })
        setExpertList(categoryList)
      } else {
        setExpertList([])
      }
    })
  }, [])
  function onExpertiseChange(value) {
    const getExpertiseSkill = expertList.filter((listId) => value[0] === listId.value)
    setExpertiseSkill(getExpertiseSkill[0]?.label)
    setExpertiseId(value)
  }
  function onProvienceChange(value) {
    setProvince(value)
  }
  function getDoctors() {
    API.get(
      'API',
      `expert/search?categoryId=${expertiseId}&province=${province || ''}&city=${city || ''}`,
    ).then((res) => {
      setExpertisePerson(res.categories)
    })
  }
  function showDoctorProfile(userId) {
    dispatch({ type: actions.SET_DOCTOR_PROFILE_ID, payload: userId })
    history.push('/userProfileDoctor')
  }

  const { Title, Text } = Typography

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6 border-buttom">
              <div className={style.card_header_new}>
                <Title level={2}>Expert Advice</Title>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="row">
            {/* <div className="col-lg-2 col-md-2 col-sm-12">
              <Text className="pl-1">Doctor</Text>
              <div className="pb-3">
                <Cascader
                  options={options}
                  onChange={onChange}
                  style={{ width: '100%' }}
                  placeholder="Choose Doctor"
                />
              </div>
            </div> */}
            <div className="col-lg-2 col-md-3 col-sm-12">
              <Text className="pl-1">Expertise</Text>
              <div className="pb-3">
                <Cascader
                  options={expertList}
                  onChange={onExpertiseChange}
                  style={{ width: '100%' }}
                  placeholder="Choose Expertise"
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12">
              <Text className="pl-1">Province</Text>
              <div className="pb-3">
                <Cascader
                  options={canadaProvinces}
                  onChange={onProvienceChange}
                  style={{ width: '100%' }}
                  placeholder="Choose Province"
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12">
              <Text className="pl-1">City</Text>
              <div>
                <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12 pt-4 pr-3 pr-5">
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={() => {
                  getDoctors()
                }}
              >
                Search
              </button>
            </div>
            <div
              className="col-lg-2 col-md-3 col-sm-12 pt-2 pr-3"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <img src="resources/images/content/filter.png" height="25px" alt="logo" />
              <div>
                <Text style={{ marginLeft: 10 }}>All Filters</Text>
                <img
                  className={style.arrow_down}
                  src="resources/images/content/arrow-down-sign-to-navigate.png"
                  height="15px"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pl-4">
          <Title level={5} className="pl-1">
            {expertiseSkill && expertisePerson.length > 0
              ? `Book ${expertiseSkill} Specialist in Torronto`
              : null}
          </Title>
        </div>
        <div className={style.div_pad}>
          {/* Container 1 */}

          {expertisePerson.map((data) => (
            <div className={style.cart_container}>
              <div className="row">
                <div className="col-xl-9">
                  <div className={style.newClass}>
                    <div className={style.img_doctor}>
                      <img
                        className={style.arrow_down}
                        src="resources/images/content/doctor2.png"
                        height="140px"
                        alt="logo"
                      />
                    </div>
                    <div style={{ paddingLeft: 20 }}>
                      <div>
                        <Title level={4}>{data.name}</Title>
                      </div>
                      <div className="pb-2">
                        <Text>{expertiseSkill} Specialist</Text>
                      </div>
                      <div className="pb-3">
                        <img
                          className={style.logoPlaceholder}
                          src="resources/images/content/placeholder.png"
                          height="20px"
                          alt="logo"
                        />
                        <Text>{data.address}</Text>
                      </div>
                      <div className="pb-3">
                        <img
                          className={style.logoPlaceholder}
                          src="resources/images/content/phone-call.png"
                          height="20px"
                          alt="logo"
                        />
                        <Text>{data.phone}</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className={style.button_viewProfile}>
                    <Button
                      type="primary"
                      onClick={() => {
                        showDoctorProfile(data.userId)
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpertAdvice
