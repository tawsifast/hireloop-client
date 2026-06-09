import { serverFetch } from "../core/server"

export const getPlanById = async (planId) =>{
    return serverFetch(`/plans?plan_id=${planId}`)
}