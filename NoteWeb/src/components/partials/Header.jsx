function Header({username}){
    return(
        <header className="flex justify-between items-center">
        <h1 className="font-[Coiny] text-2xl select-none">Notes</h1>
        <div className="flex items-center space-x-[200px]">
          <div className="flex items-center w-[230px] h-[35px] p-1 rounded-lg bg-gray-300 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                stroke-width="1"
              />
            </svg>
            <input
              type="text"
              className="p-1 outline-none h-[35px] w-[150px]"
              placeholder="Search Note..."
            />
          </div>

          <div className="flex items-center space-x-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M489.493 111.658c30.658-1.792 45.991 36.44 22.59 56.329C457.831 214.095 426 281.423 426 354c0 134.757 109.243 244 244 244c72.577 0 139.905-31.832 186.014-86.084c19.868-23.377 58.064-8.102 56.332 22.53C900.4 745.823 725.141 912 512.5 912C291.31 912 112 732.69 112 511.5c0-211.39 164.287-386.024 374.198-399.649l.206-.013zm-81.143 79.75l-4.112 1.362C271.1 237.943 176 364.092 176 511.5C176 697.344 326.656 848 512.5 848c148.28 0 274.938-96.192 319.453-230.41l.625-1.934l-.11.071c-47.18 29.331-102.126 45.755-159.723 46.26L670 662c-170.104 0-308-137.896-308-308c0-58.595 16.476-114.54 46.273-162.467z"
              />
            </svg>
            <div className="flex items-center space-x-2">
              <img
                src="https://avatars.dicebear.com/api/avataaars/1234.svg"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <h1 className="text-sm font-bold text-[#E50046]">{username}</h1>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Header