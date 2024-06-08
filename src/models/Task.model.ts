import { UserModel } from "./User.model";

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  creator: UserModel;
  created_at: Date;
  updated_at: Date;
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
