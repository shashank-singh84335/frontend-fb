import { Menu, Search } from "lucide-react";

const DashNav = ({
  placeholder,
  searchQuery,
  handleButtonClick
}) => {
  return (
    <div className="flex items-center h-[4rem] justify-between gap-4 px-6 py-10">
      <div className="flex gap-6 items-center">
        <div className="flex">
          <Menu size={26} />
        </div>
        <div className="flex">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="text-gray-500 dark:text-gray-300" size={20} />
            </div>
            <input
              type="search"
              id="default-search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => searchQuery(e.target.value)}
              className="block h-[2.5rem] w-[20rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-[#f5f5f5] focus:outline-none"
              required
            />
            {/* button */}
          </div>
        </div>
      </div>
      <div className="p-2 h-[2.5rem]  flex justify-center items-center border-2 border-gray-400 cursor-pointer hover:bg-gray-100 transform-all duration-300 rounded-md"
      onClick={handleButtonClick}
      >
        Search
      </div>
    </div>
  );
};

export default DashNav;
