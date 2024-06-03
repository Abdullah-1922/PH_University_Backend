import { Faculty } from "./faculty.model"

const getFacultyById=async (param : string)=>{
    const result = await Faculty.findOne({id:param})
    return result
}

export const facultyServices ={
    getFacultyById
}