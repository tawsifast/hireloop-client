"use server"

export const serverMutation = async(path, data) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`,{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    return res.json()
}