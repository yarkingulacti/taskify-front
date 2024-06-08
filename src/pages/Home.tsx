import Banner from "../assets/images/banner.svg";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={Banner} alt="Taskify App Banner" className="w-6/12" />
      <h1 className="text-4xl mt-5"> Hi! 👋 This is Taskify! ⚙ </h1>
    </div>
  );
}
