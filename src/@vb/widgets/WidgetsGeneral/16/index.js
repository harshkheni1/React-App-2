import React, { useState } from 'react'
import style from './style.module.scss'

const General16 = () => {
  const randomData = {
    isNew: Math.random() < 0.5,
    isFavourite: Math.random() < 0.5,
    image: `resources/images/products/00${Math.floor(Math.random() * 4) + 1}.jpg`,
    name: 'TP-Link AC1750 Smart WiFi Router - Dual Band Gigabit Wireless Internet Routers for Home',
    price: '99.99',
    oldPrice: '199.99',
  }

  const [favourite, setFavourite] = useState(randomData.isFavourite)

  const setIsFavourite = (e) => {
    e.preventDefault()
    setFavourite(!favourite)
  }

  return (
    <div className="overflow-hidden position-relative rounded">
      <div hidden={!randomData.isNew} className={style.new}>
        New
      </div>
      <div className="card-body">
        <a
          role="menuitem"
          className={`${style.favourite} ${favourite ? 'text-dark' : 'text-gray-3'}`}
          onClick={setIsFavourite}
          onKeyPress={setIsFavourite}
          tabIndex="0"
        >
          <i className="fe fe-heart font-size-21" />
        </a>
        <div className={`${style.image} border-bottom height-250 mb-3`}>
          <img className="img-fluid" src={randomData.image} alt={randomData.name} />
        </div>
        <div className="font-size-24 font-weight-bold text-dark mb-2">
          {randomData.price}{' '}
          <del hidden={!randomData.oldPrice} className="align-text-top font-size-14">
            {randomData.oldPrice}
          </del>
        </div>
        <div>
          <a className="text-blue font-size-18">{randomData.name}</a>
        </div>
      </div>
    </div>
  )
}

export default General16
