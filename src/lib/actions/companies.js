"use server"


import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/server"

export const createCompany = async(newCompanyData) =>{
    return serverMutation('/companies', newCompanyData)
}

export const updatedCompany = async (id, data) =>{
    const result = await serverMutation(`/companies/${id}`, data, "PATCH");
    revalidatePath('/dashboard/admin/companies');
    return result;
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