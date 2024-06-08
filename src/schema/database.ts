import { DBSchema } from "idb";

interface BaseModel {
  id?: number;
  createdAt: Date;
  updatedAt: Date | null;
}

interface BaseSchema {
  key: number;
}

export interface TaskModel extends BaseModel {
  title: string;
  description: string | null;
}

export interface TaskSchema extends BaseSchema {
  value: TaskModel;
  indexes: {
    pk_tasks: number;
  };
}

// Define your database schema
export interface Taskify extends DBSchema {
  tasks: TaskSchema;
}
