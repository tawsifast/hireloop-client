"use server"

import { headers } from "next/headers";
import { getUserToken } from "./session";
import { redirect } from "next/navigation";


export const authHeader = async() =>{
    const token = await getUserToken();
    const header = token ?{
        authorization : `Bearer ${token}`
    }: {};
    return header
}



export const serverFetch = async (path) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
    // handle 401, 403, 404
    return res.json();
}

export const protectedFetch = async (path) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    {
        headers: await authHeader()
    }
    );
    
    return handleStatusCode(res);
}

export const serverMutation = async(path, data, method = "POST") =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`,{
        method: method,
        headers:{
            "Content-type":"application/json",
            ... await authHeader()
        },
        body:JSON.stringify(data)
    })

    
    return handleStatusCode(res)
}

const handleStatusCode = res =>{
    if(res.status === 401){
        redirect("/signin")
    } 
    else if(res.status === 403){
        redirect("/unauthorized")
    } 
    return res.json();
}