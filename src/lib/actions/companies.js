"use server"

import { serverMutation } from "../core/server"

export const createCompany = async(newCompanyData) =>{
    return serverMutation('/companies', newCompanyData)
}
// export const createCompany = async(newCompanyData) =>{
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies`,{
//         method: "POST",
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify(newCompanyData)
//     })
//     return res.json()
// }