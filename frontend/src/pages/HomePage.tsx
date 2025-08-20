import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";


const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar onShowAll={() => {}} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
