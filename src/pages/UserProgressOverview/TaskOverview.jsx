import { Box, Divider, IconButton, Typography } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts'
import '../../assets/styles/taskoverview.scss'
import { useGetCountQuery } from '../../app/features/api/apiSlice'
import * as React from 'react'
import { toast } from 'sonner'
import { useEffect } from 'react'

import '../../assets/styles/taskoverview.scss'
import {
  KeyboardDoubleArrowLeft,
  LoopOutlined,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function TaskOverview() {
  const palette = ['#5bc0de', '#22bb33', '#ff3333']
  const navigate = useNavigate()
  const { data: result, isLoading, isSuccess, isError } = useGetCountQuery()
  console.log(result, 'resulttt')

  useEffect(() => {
    if (isSuccess) {
      toast.success(result.message, {
        position: 'bottom-left',
        duration: 2000,
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
        sx={{ backgroundColor: '#101322', color: 'white', padding: '15px' }}
      >
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <IconButton className="back-btn">
            <KeyboardDoubleArrowLeft
              fontSize="large"
              className="back-btn"
              onClick={() => {
                navigate('/landingpage')
              }}
              color="info"
            />
          </IconButton>
        </Box>

        <Typography className="taskoverview-body__label" variant="h3">
          Overall Task Progress Overview
         
        </Typography>
        <Divider
          style={{ height: '1px', width: '50%', backgroundColor: 'white' }}
        />

        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error loading data</Typography>}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {result && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <LoopOutlined fontSize="large" color="primary" />
                  <Typography variant="h5">
                    {`There are `}
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      {result.result.pending}
                    </Typography>
                    {` ongoing task${
                      result.result.pending !== 1 ? 's' : ''
                    } in total.`}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}
                >
                  <ThumbUp fontSize="large" color="success" />
                  <Typography variant="h5">
                    {`You have successfully completed `}
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      {result.result.done}
                    </Typography>
                    {` task${result.result.done !== 1 ? 's' : ''}.`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <ThumbDown fontSize="large" color="error" />

                  <Typography variant="h5">
                    {`You have failed to complete `}
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      {result.result.inactive}
                    </Typography>
                    {` task${result.result.done !== 1 ? 's' : ''}.`}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {isSuccess && result && (
            <PieChart
              slotProps={{
                legend: {
                  position: {
                    vertical: 'middle',
                    horizontal: 'right',
                  },
                  itemMarkWidth: 22,
                  itemMarkHeight: 8,
                  markGap: 5,
                  itemGap: 10,
                },
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: 'bold',
                },
                marginLeft: '-30%',
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
                  arcLabel: (item) => ` ${item.value}`,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: {
                    innerRadius: 40,
                    additionalRadius: -30,
                    color: 'gray',
                  },
                },
              ]}
              width={1200}
              height={650}
            />
          )}
        </Box>
        {result && (
          <Typography
            variant="h5"
            sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
          >
            {`Percentage of successfully completed tasks: `}
            {(
              (result.result.done /
                (result.result.pending +
                  result.result.done +
                  result.result.inactive)) *
              100
            ).toFixed(2)}
            %{` in total `}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default TaskOverview
