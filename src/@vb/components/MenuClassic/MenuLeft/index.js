/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import classNames from 'classnames'
import store from 'store'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { find } from 'lodash'
import style from './style.module.scss'
import { s3Get } from '../../../../services/s3fileUpload/index'
import DocMenu from '../../../../services/menu/index'

const mapStateToProps = ({ menu, settings, user }) => ({
  menuData: menu.menuData,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMobileView: settings.isMobileView,
  isMenuUnfixed: settings.isMenuUnfixed,
  isMenuShadow: settings.isMenuShadow,
  leftMenuWidth: settings.leftMenuWidth,
  menuColor: settings.menuColor,
  logo: settings.logo,
  version: settings.version,
  role: user.role,
})

const MenuLeft = ({
  dispatch,
  menuData = [],
  location: { pathname },
  isMenuCollapsed,
  isMobileView,
  isMenuUnfixed,
  isMenuShadow,
  leftMenuWidth,
  menuColor,
  role,
}) => {
  const history = useHistory()
  const [selectedKeys, setSelectedKeys] = useState(store.get('app.menu.selectedKeys') || [])
  const [openedKeys, setOpenedKeys] = useState(store.get('app.menu.openedKeys') || [])
  const { selectedRole } = useSelector((state) => state.user)
  // const { accountType } = useSelector((state) => state.user)
  const { selectedCompanyInfo } = useSelector((state) => state.user)
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    applySelectedKeys()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuData])

  const applySelectedKeys = () => {
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const selectedItem = find(flattenItems(menuData, 'children'), ['url', pathname])
    setSelectedKeys(selectedItem ? [selectedItem.key] : [])
  }

  const onCollapse = (value, type) => {
    if (type === 'responsive' && isMenuCollapsed) {
      return
    }
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    })
    setOpenedKeys([])
  }

  const onOpenChange = (keys) => {
    store.set('app.menu.openedKeys', keys)
    setOpenedKeys(keys)
  }

  const handleClick = (e) => {
    store.set('app.menu.selectedKeys', [e.key])
    setSelectedKeys([e.key])
  }

  const generateMenuItems = () => {
    const generateItem = (item) => {
      const { key, title, url, icon, disabled, count, keyRoles } = item
      if (item.category) {
        return <Menu.ItemGroup key={Math.random()} title={item.title} />
      }
      if (item.url) {
        if (item?.keyRoles?.includes(selectedRole?.role)) {
          return (
            <Menu.Item key={key} disabled={disabled}>
              {item.target && (
                <a href={url} target={item.target} rel="noopener noreferrer">
                  {icon && <span className={`${icon} ${style.icon} icon-collapsed-hidden`} />}
                  <span className={style.title}>{title}</span>
                  {count && <span className="badge badge-success ml-2">{count}</span>}
                </a>
              )}
              {/* changes on this part */}
              {!item.target && !item.menuItemBasedOnCom && (
                <Link to={url}>
                  {icon && <span className={`${icon} ${style.icon} icon-collapsed-hidden`} />}
                  <span className={style.title}>{title}</span>
                  {count && <span className="badge badge-success ml-2">{count}</span>}
                </Link>
              )}
            </Menu.Item>
          )
        }
        return <></>
      }
      return (
        <Menu.Item key={key} disabled={disabled}>
          {icon && <span className={`${icon} ${style.icon} icon-collapsed-hidden`} />}
          <span className={style.title}>{title}</span>
          {count && <span className="badge badge-success ml-2">{count}</span>}
        </Menu.Item>
      )
    }

    const generateSubmenu = (items) =>
      items.map((menuItem) => {
        if (menuItem.children && (!menuItem.doctorBased || selectedDoctorInfo?.manage)) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              {menuItem.icon && (
                <span className={`${menuItem.icon} ${style.icon}`} style={{ left: 30 }} />
              )}
              <span className={style.title}>{menuItem.title}</span>
              {menuItem.count && <span className="badge badge-success ml-2">{menuItem.count}</span>}
            </span>
          )

          return (
            <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          )
        }
        return !menuItem.doctorBased ? generateItem(menuItem) : null
      })

    let routeData = []
    if (selectedRole?.role === 'DOCTOR') {
      routeData = DocMenu.getClinicDoctorMenu()
    } else if (selectedRole?.role === 'STAFF' || selectedRole?.role === 'ADMIN') {
      routeData = DocMenu.getClinicDoctorMenu()
    } else if (selectedRole?.role === 'SUPERUSER') {
      if (selectedCompanyInfo?.type === 'ASSISTEDLIVING') {
        routeData = DocMenu.getAssistedMenu()
      } else {
        routeData =
          selectedCompanyInfo?.type === 'CLINIC'
            ? menuData.filter(
                (data) => data?.keyRoles?.includes(selectedRole?.role) && data?.type === 'clinic',
              )
            : menuData.filter(
                (data) => data?.keyRoles?.includes(selectedRole?.role) && data?.type === 'company',
              )
      }
    }

    return routeData.map((menuItem) => {
      if (menuItem.roles && !menuItem.roles.includes(role)) {
        return null
      }
      // below snippets for the root menu
      if (
        menuItem.children &&
        (!menuItem.menuItemBasedOnCom || selectedCompanyInfo?.type === 'COMPANY')
      ) {
        const subMenuTitle = (
          <span key={menuItem.key}>
            {menuItem.icon && <span className={`${menuItem.icon} ${style.icon}`} />}
            <span className={style.title}>{menuItem.title}</span>
            {menuItem.count && <span className="badge badge-success ml-2">{menuItem.count}</span>}
          </span>
        )
        return (
          <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateSubmenu(menuItem.children)}
          </Menu.SubMenu>
        )
      }
      return !menuItem.menuItemBasedOnCom && generateItem(menuItem)
    })
  }

  function getImage(imageKey) {
    s3Get(imageKey)
      .then((link) => {
        setImageUrl(link)
      })
      .catch((err) => {
        console.log(err)
      })
    return imageKey === null || imageKey === undefined ? false : true
  }

  const menuSettings = isMobileView
    ? {
        width: leftMenuWidth,
        collapsible: false,
        collapsed: false,
        onCollapse,
      }
    : {
        width: leftMenuWidth,
        collapsible: true,
        collapsed: isMenuCollapsed,
        onCollapse,
        breakpoint: 'lg',
      }

  return (
    <>
      {history.location.pathname !== '/selectRole' ? (
        <Layout.Sider
          {...menuSettings}
          className={classNames(`${style.menu}`, {
            [style.white]: menuColor === 'white',
            [style.gray]: menuColor === 'gray',
            [style.dark]: menuColor === 'dark',
            [style.unfixed]: false,
            [style.shadow]: isMenuShadow,
          })}
        >
          <div
            className={style.menuOuter}
            style={{
              width: isMenuCollapsed && !isMobileView ? 80 : leftMenuWidth,
              height: isMobileView || isMenuUnfixed ? 'calc(100% - 64px)' : 'calc(100% - 110px)',
            }}
          >
            <div className={style.logoContainer}>
              <div className={style.logo}>
                <a href="/">
                  <img
                    src={
                      getImage(selectedCompanyInfo?.companylogo)
                        ? imageUrl
                        : 'resources/images/content/logo.png'
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'resources/images/content/logo.png'
                    }}
                    height="50px"
                    width="50px"
                    alt="logo"
                  />
                </a>
                {/* <div className={style.name}>{selectedRole.role}</div> */}
              </div>
            </div>
            <PerfectScrollbar>
              <Menu
                onClick={handleClick}
                // selectedKeys={selectedKeys}
                openKeys={openedKeys}
                onOpenChange={onOpenChange}
                mode="inline"
                className={style.navigation}
                inlineIndent="15"
              >
                {generateMenuItems()}
              </Menu>
            </PerfectScrollbar>
          </div>
        </Layout.Sider>
      ) : null}
    </>
  )
}

export default withRouter(connect(mapStateToProps)(MenuLeft))
