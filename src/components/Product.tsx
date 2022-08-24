import React, { useState } from 'react'
import { IProduct } from '../models'
import PropTypes from 'prop-types'

interface ProductProps {
  product: IProduct
}

export default function Product({product}: ProductProps) {

  const [details, setDetails] = useState(false)
  const btnClassName = details?'bg-yellow-400':'bg-purple-400'
  const btnCLasses = ['py-2 px-4 border',btnClassName]
  return (
    <div className='border py-2 px-4 rounded flex flex-col items-center mb-2'>
      <img src={product.image} className="w-1/6" alt="" />
      <p>{product.title}</p>
      <span className='font-bold'>{product.price}</span>
      <button 
        className={btnCLasses.join(' ')}
        onClick={()=>setDetails(!details)}
      >
        {!details?"View Product":"Hide Details"}
      </button>
      
      {details && <div>
        <p>{product.description}</p>
        <p>Rate: <span className="font-bold">{product.rating.rate}</span></p>
      </div>}
    </div>
  )
}
