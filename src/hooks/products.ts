import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct } from "../models"

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    async function getProducts(){
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>("https://fakestoreapi.com/products?limit=5")
            setProducts(response.data)
            setLoading(false)
            setError("")
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(()=>{
        getProducts()
    }, [])

    return {products, error, loading}
}