import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId,user,refreshData}) {

    const [name, setName]=useState();
    const [amount, setAmount]=useState();

    const addNewExpense=async()=>{
        const result=await db.insert(Expenses).values(
            {
                name:name,
                amount:amount,
                budgetId:budgetId,
                createdAt:user?.primaryEmailAddress?.emailAddress
            }).returning({insertedId:Budgets.id});
        console.log(result);
        if(result){

            refreshData()
            toast('Nuevo gasto agregado')

        }

    }
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Agregar un nuevo gasto</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Nombre</h2>
                <Input placeholder='Ej: Decoración del hogar'
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Cantidad de dinero utilizado</h2>
                <Input placeholder='Ej: $10.000'
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button disabled={!(name&&amount)}
            onClick={addNewExpense}
            className='mt-3'>Agregar gasto</Button>
        </div>
    )
}


export default AddExpense