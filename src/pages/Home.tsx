import { TaskList } from "../components/task/TaskList";

export function Home() {
  return (
    <section className="p-16 w-full">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start justify-between w-2/3">
          <TaskList />
        </div>
      </div>
    </section>
  );
}
