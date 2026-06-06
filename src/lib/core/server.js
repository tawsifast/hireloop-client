"use server"


export const serverFetch = async (path) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
    return res.json();
}

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