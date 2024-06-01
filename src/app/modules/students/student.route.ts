import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidationSchemas } from './student.validation'

const router = express.Router()

// will call controller func


router.get('/',StudentController.getAllStudents)
router.get('/:studentId',StudentController.getStudentByID)
router.delete('/:studentId',StudentController.deleteStudent)
router.patch('/:studentId', 
validateRequest(studentValidationSchemas.updateStudentValidationSchema)
,StudentController.updateStudent)


export const StudentRoutes=router