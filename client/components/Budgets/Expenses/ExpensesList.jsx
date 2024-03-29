import React, { useState } from 'react'
import { postExpenses } from '../../../actions/expenses'
import { Box, Button, Grid } from '@mui/material/'
//import { useParams } from 'react-router-dom'
import ExpensesForm from './ExpensesForm'
import ExpenseCard from './ExpensesCard'

export default function ExpensesList({ expenses }) {
  //const { budgetId } = useParams()
  const [adding, setAdding] = useState(false)

  return (
    <Box className="container">
      {adding && (
        <ExpensesForm
          title={'Add New Expense '}
          thunk={postExpenses}
          expensesData={{ name: '', amount: '', budgetId: 1 }}
          setStatus={setAdding}
          firstParam={1}
        />
      )}

      <Box
        className="add-btn"
        sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, p: 1 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setAdding(true)
          }}
        >
          Add New
        </Button>
      </Box>

      <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
        {expenses.data?.map((expense, i) => {
          return (
            <Grid item key={i}>
              <ExpenseCard expense={expense} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
