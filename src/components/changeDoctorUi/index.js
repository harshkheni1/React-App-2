/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Typography, Cascader } from 'antd'
import { Badge } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.scss'

const ChangeDoctorUI = ({
  isChangeDoctorButtonClick,
  selectedDoctorName,
  selectedDoctorInfo,
  doctorChange,
  selectedClinicDoctors,
  selectedDoctor,
  doctorName,
}) => {
  const { Title } = Typography
  const { selectedRole, name } = useSelector((state) => state.user)
  const [isChangedoctor, setIsChangedoctor] = useState(false)
  const getUserImage = (imageUrl) => {
    if (imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null) {
      return imageUrl
    }
    return `${process.env.REACT_APP_ASSET_URL}/${imageUrl}`
  }
  const doctorChangedoctr = () => {
    console.log('click')
    setIsChangedoctor(true)
  }

  return (
    <div className="d-flex align-items-center">
      {isChangedoctor && (
        <div className="selecdoctor mr-3">
          <Cascader
            onChange={doctorChange}
            fieldNames={{ label: 'doctorName', value: 'doctorName' }}
            size="large"
            options={selectedClinicDoctors}
            //   defaultValue={[selectedDoctor]}
            placeholder="Select Doctor"
            width="140%"
          />
        </div>
      )}
      {!isChangedoctor ? (
        <div className="doctorinfo mt-2">
          <div className="d-flex">
            <div className={style.img_doctor}>
              {selectedDoctorInfo.profilepicture ? (
                <img
                  className={style.avtarImg}
                  src={getUserImage(selectedDoctorInfo.profilepicture)}
                  alt=""
                />
              ) : (
                <img className={style.avtarImg} src="resources/images/avatars/noImg.png" alt="" />
              )}
            </div>
            <div className={style.rating_div}>
              <Title level={5} className={style.doctorName}>
                {selectedRole?.role === 'DOCTOR' ? name : selectedDoctorName}
              </Title>
              <div
                style={{
                  marginTop: '-4%',
                  cursor: 'pointer',
                }}
              >
                {selectedRole?.role !== 'DOCTOR' ? (
                  <>
                    <Badge color="primary" className={style.Badge} onClick={doctorChangedoctr}>
                      Change
                    </Badge>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ChangeDoctorUI
