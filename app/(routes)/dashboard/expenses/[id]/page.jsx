"use client"
import React, { useEffect, useState } from 'react'
import { Budgets, Expenses } from '@/utils/schema'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import {eq, getTableColumns, sql} from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'

function ExpensesDashboard({params}) {
    const{user}=useUser();
    const[budgetInfo,setbudgetInfo]=useState();
    useEffect(()=>{
        user&&getBudgetInfo();
    },[user])

    const getBudgetInfo=async()=>{
        const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS DECIMAL))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)
          setbudgetInfo(result[0]);
          
        }
    
    
  return (
    <div className='p-10'>
        <h2 className='font-bold text-3xl'>Mis gastos</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo? <BudgetItem
        budget={budgetInfo}
        />:
        <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
        </div>}
        <AddExpense budgetId={params.id} user={user} refreshData={()=>getBudgetInfo()} />
    </div>
    </div>
  )
}

export default ExpensesDashboard