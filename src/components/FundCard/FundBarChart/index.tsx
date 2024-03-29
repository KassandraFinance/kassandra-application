import React from 'react'

import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts'

interface IBarChartProps {
  poolObject: Record<string, number>
  poolInfo: { token: { id: string } }[]
}

const FundBarChart = ({ poolObject, poolInfo }: IBarChartProps) => {
  const dictionary: { [key: number]: string } = {
    0: '#E8983D',
    1: '#63698C',
    2: '#B7372D',
    3: '#AB40E1',
    4: '#E9BC50',
    5: '#AB40E1',
    6: '#CF498D',
    7: '#D54F49',
    8: '#4517AB',
    9: '#72EEE4',
    10: '#4B81EF',
    11: '#e8983d65',
    12: '#18db11',
    13: '#cc24bef7',
    14: '#68d410d6',
    15: '#e9bb5067',
    16: '#ab40e149',
    17: '#cf498c42',
    18: '#d5504949',
    19: '#10e72299',
    20: '#d4e442b0'
  }

  const poolLength = poolInfo.length - 1

  return (
    <ResponsiveContainer width="99%" height={5}>
      <BarChart
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          marginTop: '0.65rem',
          maxWidth: '100%',
          borderRadius: '50%'
        }}
        data={[{ name: 'pool', ...poolObject }]}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" hide dataKey="pool" />

        {poolInfo.map((item, index) => (
          <Bar
            key={item.token.id}
            barSize={4}
            stackId="pool"
            dataKey={item.token.id}
            fill={`${dictionary[index]}`}
            radius={
              index === 0
                ? [25, 0, 0, 25]
                : index === poolLength
                ? [0, 25, 25, 0]
                : [0, 0, 0, 0]
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default FundBarChart
