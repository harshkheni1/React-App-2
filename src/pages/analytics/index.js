/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import WidgetsCharts from '@vb/widgets/WidgetsCharts/3'
import { Badge, notification, Tabs, DatePicker } from 'antd'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import { useSelector } from 'react-redux'
import { GET } from 'services/axios/common.api'
import moment from 'moment'
import style from './style.module.scss'
import styleGlobal from './style.css'

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

const _ = require('lodash')

const Analytics = () => {
  const { TabPane } = Tabs

  const [totalUser, setTotalUsers] = useState([])
  // const [dailyCallDetails, setDailyCallDetails] = useState([])
  const [totalusersrole, setTotalusersrole] = useState([])
  const { selectedRole } = useSelector((state) => state.user)
  const [appointmentType, setAppointmentType] = useState([])

  // For Call Details
  const [callCompleted, setCallCompleted] = useState([])
  const [callReject, setCallRejec] = useState([])
  const [callDate, setCallDate] = useState([])
  const [callMissed, setCallMissed] = useState([])
  const [callJoined, setCallJoined] = useState([])
  const [flaggCompleted, setFlaggCompleted] = useState(false)

  const [flagAppointment, setFlagAppointment] = useState(false)
  // For Appointments Detail
  const [appointmentDate, setAppointmentCompleted] = useState([])
  const [appointmentDraft, setAppointmentDraft] = useState([])
  const [appointmentMissed, setAppointmentMissed] = useState([])
  const [appointmentRejected, setAppointmentRejected] = useState([])
  const [appointmentPending, setAppointmentPending] = useState([])
  const [appointmentConfirmed, setAppointmentConfirmed] = useState([])

  const [overlappingBarData, setOverlappingBarData] = useState({})
  const [overlappingBarOptions, setOverlappingBarOptions] = useState({})
  const [overlappingResponsiveOptions, setOverlappingResponsiveOptions] = useState([])

  const [overlappingBarDataAppointment, setOverlappingBarDataAppointment] = useState({})
  const [overlappingBarOptionsAppointment, setOverlappingBarOptionsAppointment] = useState({})
  const [
    overlappingResponsiveOptionsAppointment,
    setOverlappingResponsiveOptionsAppointment,
  ] = useState([])

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    setDateTo(moment().format('YYYY-MM-DD'))
    setDateFrom(moment().subtract(30, 'd').format('YYYY-MM-DD'))

    getAnalyticsData(moment().subtract(30, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    console.log('flag calll thayu ahi check')
    console.log('check 2')
    const bar = {
      labels: callDate,
      series: [callCompleted, callReject, callMissed, callJoined],
      color: 'green',
    }
    setOverlappingBarData(bar)

    const BarOptions = {
      seriesBarDistance: 5,
      plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
    }
    setOverlappingBarOptions(BarOptions)

    const optionResponsive = [
      [
        '',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc(value) {
              return value[0]
            },
          },
        },
      ],
    ]
    setOverlappingResponsiveOptions(optionResponsive)

    console.log(callCompleted)
    console.log(callMissed)
    console.log(callReject)
    console.log(callJoined)
  }, [flaggCompleted])

  useEffect(() => {
    // Appointment
    const BarDataAppointment = {
      labels: appointmentDate,
      series: [
        appointmentConfirmed,
        appointmentDraft,
        appointmentMissed,
        appointmentPending,
        appointmentRejected,
      ],
    }

    setOverlappingBarDataAppointment(BarDataAppointment)

    const BarOptionsAppointment = {
      seriesBarDistance: 5,
      plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
    }

    setOverlappingBarOptionsAppointment(BarOptionsAppointment)

    const ResponsiveOptionsAppointment = [
      [
        '',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc(value) {
              console.log(value, '-------')
              return value[0]
            },
          },
        },
      ],
    ]

    setOverlappingResponsiveOptionsAppointment(ResponsiveOptionsAppointment)
  }, [flagAppointment])

  const getAnalyticsData = async (fromD, toD) => {
    setCallCompleted([])
    setCallRejec([])
    setCallDate([])
    setCallMissed([])
    setCallJoined([])

    setAppointmentCompleted([])
    setAppointmentDraft([])
    setAppointmentMissed([])
    setAppointmentRejected([])
    setAppointmentPending([])
    setAppointmentConfirmed([])
    amchartCallByStatys()
    amchartCalls()


    try {
      const analytics = await GET(
        `analyticsdb?clientid=${selectedRole?.CompanyID}&fromdate=${fromD}&todate=${toD}`,
      )
      console.log(analytics?.data, 'getAnalyticsData')
      setTotalUsers(analytics?.data?.totalusers[0])
      setTotalusersrole(analytics?.data?.totalusers[0]?.totalusers)
      setAppointmentType(analytics?.data?.totalAppBytype)

      // For Daily call details
      const O = analytics?.data?.callsbystatus
      O.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
      })
      const totbyapptyp = analytics?.data?.totalAppBytype
      const totalaptbydt = analytics?.data?.otalaptbydt
      amchartPieRender(totbyapptyp);

      const chart = am4core.create("aptstats", am4charts.XYChart);

      chart.paddingRight = 20;

      console.log("AM data");
      console.log(O);
      chart.data = O;
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "totalcalls";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();
      chart.legend = new am4charts.Legend();
      // const scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      console.log(O, '-0-0==-=-=-0-0-0')
      const newData = []
      O.forEach((el) => {
        // if (moment(el?.date).format('YYYY-MM') == moment().format('YYYY-MM')) {
        newData.push(el)
        // }
      })
      console.log(newData)

      const newDataNew = _(newData)
        // .groupBy((v) => moment(v.date).format('YYYY-MM-DD'))
        .groupBy((v) => moment(v.date).format('DD MMM'))
        .value()

      Object.entries(newDataNew).map((item) => {
        callDate.push(item[0])

        let flagCompleteed = {
          meta: 'Completed Call',
          value: 0,
        }
        let flagRejected = {
          meta: 'Missed Call',
          value: 0,
        }
        let flagJoined = {
          meta: 'Joined Call',
          value: 0,
        }
        let flagMissed = {
          meta: 'Rejected Call',
          value: 0,
        }

        item[1].forEach((element) => {
          const datee = moment(element.date).format('DD MMM')
          if (item[0] == datee) {
            if (element.callstatus == 'COMPLETED') {
              flagCompleteed = {
                meta: 'Completed Call',
                value: element.totalcalls,
              }
            }
            if (element.callstatus == 'MISSED') {
              flagMissed = {
                meta: 'Missed Call',
                value: element.totalcalls,
              }
            }
            if (element.callstatus == 'JOINED') {
              flagJoined = {
                meta: 'Joined Call',
                value: element.totalcalls,
              }
            }
            if (element.callstatus == 'REJECTED') {
              flagRejected = {
                meta: 'Rejected Call',
                value: element.totalcalls,
              }
            }
          }
        })

        callCompleted.push(flagCompleteed)
        callReject.push(flagRejected)
        callJoined.push(flagJoined)
        callMissed.push(flagMissed)

        return item
      })

      if (
        callCompleted?.length != 0 &&
        callJoined?.length != 0 &&
        callMissed?.length != 0 &&
        callReject?.length != 0
      ) {
        // setFlaggCompleted(true);

        const bar = {
          labels: callDate,
          series: [callCompleted, callReject, callMissed, callJoined],
        }
        console.log(bar);
        setOverlappingBarData(bar)
      }

      // For appointment details
      const appointment = analytics?.data?.appointmentsbystatusdt
      appointment.sort(function (a, b) {
        return new Date(a.appointmentdate) - new Date(b.appointmentdate)
      })

      const newDataAppointment = []
      appointment.forEach((el) => {
        // if (moment(el?.appointmentdate).format('YYYY-MM') == moment().format('YYYY-MM')) {
        newDataAppointment.push(el)
        // }
      })
      // console.log(newDataAppointment)

      const newDataAppointmentData = _(newDataAppointment)
        .groupBy((v) => moment(v.appointmentdate).format('DD MMM'))
        .value()
      console.log("newDataAppointmentData")
      console.log(newDataAppointmentData)

      Object.entries(newDataAppointmentData).map((itemAppointment, index) => {
        appointmentDate.push(itemAppointment[0])

        let flagDraft = {
          meta: 'Draft Appointment',
          value: 0,
        }
        let flagRejectedd = {
          meta: 'Rejected Appointment',
          value: 0,
        }
        let flagPending = {
          meta: 'Pending Appointment',
          value: 0,
        }
        let flagMissedd = {
          meta: 'Missed Appointment',
          value: 0,
        }
        let flagConfirmed = {
          meta: 'Confirmed Appointment',
          value: 0,
        }

        itemAppointment[1].forEach((element) => {
          const datee = moment(element.appointmentdate).format('DD MMM')
          if (itemAppointment[0] == datee) {
            if (element.status == 'MISSED') {
              flagMissedd = {
                meta: 'Missed Appointment',
                value: element.appointments,
              }
            }
            if (element.status == 'PENDING') {
              flagPending = {
                meta: 'Pending Appointment',
                value: element.appointments,
              }
            }
            if (element.status == 'DRAFT') {
              flagDraft = {
                meta: 'Draft Appointment',
                value: element.appointments,
              }
            }
            if (element.status == 'REJECTED') {
              flagRejectedd = {
                meta: 'Rejected Appointment',
                value: element.appointments,
              }
            }
            if (element.status == 'CONFIRMED') {
              flagConfirmed = {
                meta: 'Confirmed Appointment',
                value: element.appointments,
              }
            }
          }
        })

        appointmentConfirmed.push(flagConfirmed)
        appointmentDraft.push(flagDraft)
        appointmentPending.push(flagPending)
        appointmentMissed.push(flagMissedd)
        appointmentRejected.push(flagRejectedd)

        return itemAppointment
      })

      if (
        appointmentConfirmed?.length != 0 &&
        appointmentDraft?.length != 0 &&
        appointmentPending?.length != 0 &&
        appointmentMissed?.length != 0 &&
        appointmentRejected?.length != 0
      ) {
        // setFlagAppointment(true)
        const BarDataAppointment = {
          labels: appointmentDate,
          series: [
            appointmentConfirmed,
            appointmentDraft,
            appointmentMissed,
            appointmentPending,
            appointmentRejected,
          ],
        }
        console.log(BarDataAppointment);
        setOverlappingBarDataAppointment(BarDataAppointment)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const onChangeDateFrom = (date, dateString) => {
    console.log(date, dateString)
    setDateFrom(dateString)
  }

  const onChangeDateTo = (date, dateString) => {
    console.log(date, dateString)
    setDateTo(dateString)
  }

  const submitDate = () => {
    setFlagAppointment(false)
    setFlaggCompleted(false)

    getAnalyticsData(dateFrom, dateTo)
  }

const amchartCalls= (dat) =>{
  const chart = am4core.create("callstats", am4charts.XYChart);

  chart.paddingRight = 20;
  chart.data = [
    {
        "COMPLETED": 1,
        "MISSED": 0,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-25T00:00:00.000Z"
    },
    {
        "COMPLETED": 3,
        "MISSED": 0,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-12T00:00:00.000Z"
    },
    {
        "COMPLETED": 3,
        "MISSED": 0,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-15T00:00:00.000Z"
    },
    {
        "COMPLETED": 9,
        "MISSED": 3,
        "REJECTED": 7,
        "JOINED": 7,
        "date": "2022-02-16T00:00:00.000Z"
    },
    {
        "COMPLETED": 1,
        "MISSED": 0,
        "REJECTED": 1,
        "JOINED": 1,
        "date": "2022-02-24T00:00:00.000Z"
    },
    {
        "COMPLETED": 46,
        "MISSED": 3,
        "REJECTED": 3,
        "JOINED": 3,
        "date": "2022-02-18T00:00:00.000Z"
    },
    {
        "COMPLETED": 26,
        "MISSED": 2,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-19T00:00:00.000Z"
    },
    {
        "COMPLETED": 1,
        "MISSED": 0,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-21T00:00:00.000Z"
    },
    {
        "COMPLETED": 1,
        "MISSED": 0,
        "REJECTED": 0,
        "JOINED": 0,
        "date": "2022-02-23T00:00:00.000Z"
    },
    {
        "COMPLETED": 3,
        "MISSED": 0,
        "REJECTED": 1,
        "JOINED": 1,
        "date": "2022-03-04T00:00:00.000Z"
    }
];
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  // valueAxis.tooltip.disabled = true;
  valueAxis.renderer.minWidth = 35;

  const series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.dateX = "date";
  series.dataFields.valueY = "COMPLETED";
  series.tooltipText = "completed :{valueY.value}";
  series.name = "Completed  Calls"
  const series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.dateX = "date";
  series2.dataFields.valueY = "MISSED";
  series2.tooltipText = "'Missed':{valueY.value}";
  series2.name = "Missed  Calls"
  const series1 = chart.series.push(new am4charts.ColumnSeries());
  series1.dataFields.dateX = "date";
  series1.dataFields.valueY = "MISSED";
  series1.tooltipText = "'Rejectde':{valueY.value}";
  series1.name = "Rejected  Calls"
  const series3 = chart.series.push(new am4charts.ColumnSeries());
  series3.dataFields.dateX = "date";
  series3.dataFields.valueY = "MISSED";
  series3.tooltipText = "'Joined':{valueY.value}";
  series3.name = "Joined  Calls"
  chart.cursor = new am4charts.XYCursor();
  chart.legend = new am4charts.Legend();
}

  const amchartPieRender = (tap) => {
    const chart = am4core.create("chartdivpie", am4charts.PieChart);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "TotalAppointments";
    pieSeries.dataFields.category = "appointmenttype";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];
    pieSeries.labels.template.disabled = true;
    // pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();
    console.log(tap)
    chart.data = tap;

  }
 
  const amchartCallByStatys = () => {
  
    const c1 = am4core.create('chartdiv', am4charts.XYChart)
    c1.colors.step = 2;

    c1.legend = new am4charts.Legend()
    c1.legend.position = 'top'
    c1.legend.paddingBottom = 20
    c1.legend.labels.template.maxWidth = 95

    const xAxis = c1.xAxes.push(new am4charts.DateAxis())
    xAxis.renderer.grid.template.location = 0;
    const yAxis = c1.yAxes.push(new am4charts.ValueAxis());
    yAxis.renderer.minWidth = 35;

    c1.data=[
      {
          "CONFIRMED": 3,
          "MISSED": 3,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-23T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 1,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-17T00:00:00.000Z"
      },
      {
          "CONFIRMED": 2,
          "MISSED": 2,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-10T00:00:00.000Z"
      },
      {
          "CONFIRMED": 2,
          "MISSED": 2,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 2,
          "appointmentdate": "2022-02-24T00:00:00.000Z"
      },
      {
          "CONFIRMED": 1,
          "MISSED": 1,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-25T00:00:00.000Z"
      },
      {
          "CONFIRMED": 1,
          "MISSED": 1,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-03T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-04T00:00:00.000Z"
      },
      {
          "CONFIRMED": 5,
          "MISSED": 5,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 1,
          "appointmentdate": "2022-02-16T00:00:00.000Z"
      },
      {
          "CONFIRMED": 1,
          "MISSED": 1,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-08T00:00:00.000Z"
      },
      {
          "CONFIRMED": 1,
          "MISSED": 1,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-11T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 2,
          "appointmentdate": "2022-02-09T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 1,
          "appointmentdate": "2022-02-12T00:00:00.000Z"
      },
      {
          "CONFIRMED": 2,
          "MISSED": 2,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 1,
          "appointmentdate": "2022-02-21T00:00:00.000Z"
      },
      {
          "CONFIRMED": 1,
          "MISSED": 1,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-14T00:00:00.000Z"
      },
      {
          "CONFIRMED": 5,
          "MISSED": 5,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-15T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 0,
          "COMPLETED": 2,
          "DRAFT": 0,
          "appointmentdate": "2022-02-28T00:00:00.000Z"
      },
      {
          "CONFIRMED": 2,
          "MISSED": 2,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-27T00:00:00.000Z"
      },
      {
          "CONFIRMED": 3,
          "MISSED": 3,
          "REJECTED": 1,
          "COMPLETED": 0,
          "DRAFT": 1,
          "appointmentdate": "2022-02-18T00:00:00.000Z"
      },
      {
          "CONFIRMED": 3,
          "MISSED": 3,
          "REJECTED": 0,
          "COMPLETED": 1,
          "DRAFT": 0,
          "appointmentdate": "2022-02-19T00:00:00.000Z"
      },
      {
          "CONFIRMED": 2,
          "MISSED": 2,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-02-22T00:00:00.000Z"
      },
      {
          "CONFIRMED": 0,
          "MISSED": 0,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 2,
          "appointmentdate": "2022-03-01T00:00:00.000Z"
      },
      {
          "CONFIRMED": 12,
          "MISSED": 12,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 0,
          "appointmentdate": "2022-03-03T00:00:00.000Z"
      },
      {
          "CONFIRMED": 8,
          "MISSED": 8,
          "REJECTED": 0,
          "COMPLETED": 0,
          "DRAFT": 5,
          "appointmentdate": "2022-03-04T00:00:00.000Z"
      }
  ]
  const series = c1.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "appointmentdate";
    series.dataFields.valueY = "CONFIRMED";
    series.name = "Confirmed Appointments"
    series.columns.template.tooltipText = "Confirmed: [bold]{valueY}[/]";
series.columns.template.tooltipY = 0;
series.columns.template.strokeOpacity = 0;
    const series2 = c1.series.push(new am4charts.ColumnSeries());
    series2.dataFields.dateX = "appointmentdate";
    series2.dataFields.valueY = "MISSED";
    series2.name = "Missed Appointments"
    series2.columns.template.tooltipText = "Missed: [bold]{valueY}[/]";
series2.columns.template.tooltipY = 0;
series2.columns.template.strokeOpacity = 0;
    const series3 = c1.series.push(new am4charts.ColumnSeries());
    series3.dataFields.dateX = "appointmentdate";
    series3.dataFields.valueY = "COMPLETED";
    series3.name = "Completed Appointments"
    series3.columns.template.tooltipText = "Completed: [bold]{valueY}[/]";
series3.columns.template.tooltipY = 0;
series3.columns.template.strokeOpacity = 0;
c1.cursor = new am4charts.XYCursor();
  c1.legend = new am4charts.Legend();
    // createSeries('CONFIRMED', 'Confirmed Appointments');
    // createSeries('MISSED', 'Missed App');
    // createSeries('COMPLETED', 'Completed');

  }

  const amchartRender = () => {
    const chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    const data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: `name${i}`, value: visits });
    }
    console.log("AM data");
    // console.log(data);
    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.legend = new am4charts.Legend();

    // this.chart = chart;
  }

  useState(() => {
    console.log(dateTo)
    console.log(dateFrom, 'dateFrommmmmmmm')
    setDateFrom(dateFrom)
    setDateTo(dateTo)
  }, [dateTo, dateFrom])

  return (
    <>
      <h1>{flaggCompleted}</h1>
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 vb__utils__avatar mr-4 mb-2">
                  <img src="resources/images/avatars/avatar.png" alt="Mary Stanform" />
                </div>
                <div className="mr-auto">
                  <p className="text-uppercase text-dark font-weight-bold mb-1">Total Patient</p>
                </div>
                <p className="text-success font-weight-bold font-size-24 mb-0">{totalusersrole}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 vb__utils__avatar mr-4 mb-2">
                  <img src="resources/images/avatars/avatar.png" alt="Mary Stanform" />
                </div>
                <div className="mr-auto">
                  <p className="text-uppercase text-dark font-weight-bold mb-1">Total Patient</p>
                </div>
                <p className="text-success font-weight-bold font-size-24 mb-0">
                  {totalUser?.totalusers}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          {/* <Badge.Ribbon text="Doctor" color="green"> */}
          <div className="card" style={{ height: 76 }}>
            <div className="card-body text-white bg-primary rounded p-0 m-0 pl-3 pt-1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="my-1 mr-4 font-size-36 flex-shrink-0">
                  <img
                    className={style.userprofile}
                    src="resources/images/avatars/1.jpg"
                    alt="Mary Stanform"
                  />
                </div>
                <div>
                  <div className="font-size-18 font-weight-bold">Admin</div>
                  <div className="font-size-12 text-uppercase">
                    {moment().format('DD-MMM-YYYY')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Badge.Ribbon> */}
        </div>
      </div>




      <div className="row">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="media-body white text-left">
                    <h3> {appointmentType[0]?.TotalAppointments}</h3>
                    <span> VIRTUAL</span>
                  </div>
                  <div className="align-self-center">
                    <i className="icon-rocket white font-large-2 float-right" />
                    <img
                      className={style.icon_bg}
                      src="resources/images/icon/calendar.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="media-body white text-left">
                    <h3> {appointmentType[1]?.TotalAppointments}</h3>
                    <span> WALKIN</span>
                  </div>
                  <div className="align-self-center">
                    <img
                      className={style.icon_bg}
                      src="resources/images/icon/calendar.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="media-body white text-left">
                    {appointmentType[3]?.TotalAppointments ? (
                      <h3> {appointmentType[3]?.TotalAppointments}</h3>
                    ) : (
                      <h3>0</h3>
                    )}
                    <span> CALLBACK</span>
                  </div>
                  <div className="align-self-center">
                    <img
                      className={style.icon_bg}
                      src="resources/images/icon/phone-call.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="media-body white text-left">
                    {appointmentType[4]?.TotalAppointments ? (
                      <h3> {appointmentType[4]?.TotalAppointments}</h3>
                    ) : (
                      <h3>0</h3>
                    )}
                    <span> INPERSON</span>
                  </div>
                  <div className="align-self-center">
                    <img
                      className={style.icon_bg}
                      src="resources/images/icon/appointment.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4">&nbsp;</div>
        <div className="col-sm-3">
          <DatePicker
            onChange={onChangeDateFrom}
            className={style.classDate}
            placeholder="From date"
            defaultValue={moment(moment().subtract(7, 'd').format('YYYY-MM-DD'), 'YYYY-MM-DD')}
          />
        </div>
        <div className="col-sm-3">
          <DatePicker
            onChange={onChangeDateTo}
            className={style.classDate}
            placeholder="To date"
            defaultValue={moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
          />
        </div>
        <div className="col-sm-2">
          <button
            type="button"
            className={`btn btn-primary ${style.btnWithAddon}`}
            onClick={submitDate}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body pb-5">
              <div className="card-header ">
                <HeadersCardHeader data={{ title: 'Call Statistics' }} />
              </div>
              <div className="pt-5">
                {/* <ChartistGraph
                  // className="height-300"
                  className="height-300"
                  data={overlappingBarData}
                  options={overlappingBarOptions}
                  responsive-options={overlappingResponsiveOptions}
                  type="Bar"
                /> */}
                <div className="card-body">
                  <div id="callstats" style={{ width: '100%', height: '400px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6">
          <div className="card">
            <div className="card-body pb-5">
              <div className="card-header ">
                <HeadersCardHeader data={{ title: 'Appointment Statistics' }} />
              </div>
              <div className="pt-5">
                <ChartistGraph
                  className="height-300"
                  data={overlappingBarDataAppointment}
                  options={overlappingBarOptionsAppointment}
                  responsive-options={overlappingResponsiveOptionsAppointment}
                  type="Bar"
                />
              </div>
            </div>
          </div>
        </div> */}


      </div>

      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <div id="chartdiv" style={{ width: '100%', height: '400px' }} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-header ">
              <HeadersCardHeader data={{ title: 'Appointment Types' }} />
            </div>
            <div className="card-body">
              <div id="chartdivpie" style={{ width: '100%', height: '400px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-header ">
              <HeadersCardHeader data={{ title: 'Total Calls  ' }} />
            </div>
            <div className="card-body">
              <div id="aptstats" style={{ width: '100%', height: '400px' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics
