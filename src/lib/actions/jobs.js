"use server"

import { serverMutation } from "../core/server"


export const createJobs =  async(newJobData)  => {
    return serverMutation(`/jobs`, newJobData )
}

// export const createJobs = async(newJobData) =>{
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,{
//         method:"POST",
//         headers:{
//             'Content-type':"application/json"
//         },
//         body: JSON.stringify(newJobData)
//     })
//     return res.json();
// }