import { z } from 'zod';
import { Days } from './OfferedCourse.constant';


const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(time=>{
        const regex = /^([01]?\d|2[0-3]):[0-5]\d$/;
       return  regex.test(time)
      },{
        message:"Invalid time format , expected 'HH:MM' in 24 hour format"
      }), // HH: MM   00-23: 00-59
      endTime:  z.string().refine(time=>{
        const regex = /^([01]?\d|2[0-3]):[0-5]\d$/;
       return  regex.test(time)
      },{
        message:"Invalid time format , expected 'HH:MM' in 24 hour format"
      }),
    }).refine((body)=>{
        const start= new Date(`1970-01-01T${body.startTime}:00`)
        const end= new Date(`1970-01-01T${body.endTime}:00`)
        return end >start
    },{message:"Start time should be before End time"})
 
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime:  z.string().refine(time=>{
        const regex = /^([01]?\d|2[0-3]):[0-5]\d$/;
       return  regex.test(time)
      },{
        message:"Invalid time format , expected 'HH:MM' in 24 hour format"
      }), // HH: MM   00-23: 00-59
      endTime:  z.string().refine(time=>{
        const regex = /^([01]?\d|2[0-3]):[0-5]\d$/;
       return  regex.test(time)
      },{
        message:"Invalid time format , expected 'HH:MM' in 24 hour format"
      }),
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};