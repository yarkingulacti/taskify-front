import Banner from "../assets/images/banner.jpg";
import Logo from "../assets/images/logo/logo-black.png";

export default function Home() {
  return (
    <div className="flex gap-6 items-center justify-center">
      <img src={Banner} alt="Taskify App Banner" className="w-9/12" />
      <div className="flex flex-col items-center justify-center">
        <img src={Logo} alt="Taskfiy app logo" className="w-full" />
        <p className="text-xl font-light mt-2 text-center">
          Taskify is a simple task manager that helps you keep track of your
          daily tasks.
        </p>
      </div>
    </div>
  );
}
