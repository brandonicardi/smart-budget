"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'


function CreateBudget({refreshData}) {

    const [emojiIcon,setEmojiIcon]=useState('😀');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
    
    const [name,setName]=useState();
    const [amount,setAmount]=useState();


    const {user}=useUser();


    /**
     * Utilizado para crear un nuevo presupuesto.
     */
    const onCreateBudget=async ()=>{
        const result=await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress.emailAddress,
            icon:emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result)
        {
            refreshData()
            toast('Presupuesto creado correctamente')
        }

        
    }

    return (
      <div>
            <Dialog>
                <DialogTrigger asChild>
                <div className='bg-slate-100 p-12 rounded-md
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md'>
                <h2 className='text-3xl'>+</h2>
                <h2>Crear nuevo presupuesto</h2>
            </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Crear nuevo presupuesto</DialogTitle>
                    <DialogDescription>
                        <div>
                        <Button variant='outline'
                        className='text-lg'
                        onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                        
                        >{emojiIcon}
                        </Button>
                           
                            <div className='absolute z-20'>
                            <EmojiPicker
                            open={openEmojiPicker}
                            onEmojiClick={(e)=>{
                                setEmojiIcon(e.emoji)
                                setOpenEmojiPicker(false)
                            }}
                            />
                            </div>     
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'
                                >Nombre del presupuesto</h2>
                                <Input placeholder='Ej: Decoración del hogar'
                                onChange={(e)=>setName(e.target.value)}/>

                            </div> 
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'
                                >Cantidad disponible</h2>
                                <Input 
                                type='number'
                                placeholder='Ej: $200.000'
                                onChange={(e)=>setAmount(e.target.value)}/>
                            </div> 

                        </div>                  
                    </DialogDescription>
                    </DialogHeader>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                            <Button 
                            disabled={!(name&&amount)}
                            onClick={()=>onCreateBudget()}
                            className='mt-5 w-full'>Crear presupuesto
                            </Button>

                </DialogClose>
                </DialogFooter>
                </DialogContent> 
                </Dialog>
      </div>
     )
    }

export default CreateBudget