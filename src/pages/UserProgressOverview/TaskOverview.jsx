import { Box, Typography } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts'
import '../../assets/styles/taskoverview.scss'
import { useGetCountQuery } from '../../app/features/api/apiSlice'
import * as React from 'react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { color } from '@mui/system'
import '../../assets/styles/taskoverview.scss'

function TaskOverview() {
  const palette = ['#5bc0de', '#22bb33', '#ff3333']

  const { data: result, isLoading, isSuccess, isError } = useGetCountQuery()
  console.log(result, 'resulttt')

  useEffect(() => {
    if (isSuccess) {
      toast.success(result.message, {
        position: 'bottom-left',
        style: {
          background: 'green',
          textAlign: 'center',
          fontSize: 'large',
          color: 'white',
        },
      })
    }
  }, [isSuccess])

  return (
    <>
      <Box
        className="taskoverview-body"
        sx={{ backgroundColor: '#101322', color: 'white' }}
      >
        <Typography className="taskoverview-body__label" variant="h3">
          Overall Task Progress Overview
        </Typography>

        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error loading data</Typography>}
        {isSuccess && result && (
          <PieChart
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
              },
              '[data-name="recharts-legend-item-text"]': {
                fill: 'white',
              },
            }}
            colors={palette}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: result.result.pending,
                    label: 'Ongoing Task',
                  },
                  {
                    id: 1,
                    value: result.result.done,
                    label: 'Successfully finished Task',
                  },
                  {
                    id: 2,
                    value: result.result.inactive,
                    label: 'Failed to Do task',
                  },
                ],
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            width={1000}
            height={600}
          />
        )}
      </Box>
    </>
  )
}

export default TaskOverview
