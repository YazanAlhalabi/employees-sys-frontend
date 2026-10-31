import z from "zod";

export const leaveRequestSchema = z.object({
  id:z.string(),
  startDate:z.string(),
  endDate:z.string(),
  reason:z.string()
});

export type LeaveRequest = z.infer<typeof leaveRequestSchema>

export const leaveRequestCreateSchema = leaveRequestSchema.omit({
  id:true
})
export type LeaveRequestCreate = z.infer<typeof leaveRequestCreateSchema>