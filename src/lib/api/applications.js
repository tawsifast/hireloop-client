import { protectedFetch } from "../core/server"

export const getApplicationsByApplicant = async (applicantId) =>{
    return protectedFetch(`/applications?applicantId=${applicantId}`)
}