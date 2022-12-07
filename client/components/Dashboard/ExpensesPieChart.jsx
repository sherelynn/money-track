import React, { useCallback, useState, useEffect } from 'react'
import { PieChart, Pie, Sector } from 'recharts'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses } from '../../actions/expenses'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontWeight: 'bold', fontSize: '20px' }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#0F3D3E"
      >{`Budget $${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#0F3D3E"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export default function App() {
  const expensesData = useSelector((state) => state.expenses)
  const dispatch = useDispatch()

  const expenses = expensesData.data?.map((expense) => {
    return { name: expense.name, value: expense.amount }
  })

  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  return (
    <PieChart width={650} height={430}>
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="rgba(5,74,87,100)" />
          <stop offset="95%" stopColor="rgba(5,38,38,100)" />
        </linearGradient>
      </defs>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={expenses}
        cx={300}
        cy={200}
        r={50}
        innerRadius={120}
        outerRadius={155}
        fill="url(#myGradient)"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  )
}
