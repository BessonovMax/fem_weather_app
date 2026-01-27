import SearchIcon from "../assets/images/icon-search.svg";

export default function Search() {
  return (
    <form className="text-preset-5-medium flex flex-col gap-3 md:flex-row lg:w-[656px] lg:self-center">
      <div className="relative flex grow-1 items-center">
        <img
          className="pointer-events-none absolute pl-6"
          src={SearchIcon}
          alt="Search"
        />
        <input
          className="w-full cursor-pointer rounded-xl bg-neutral-800 py-4 pr-4 pl-[3.75rem] text-neutral-200"
          type="search"
          placeholder="Search for a place..."
        ></input>
      </div>
      <div className="cursor-pointer rounded-xl bg-blue-500 py-4 text-center md:px-6">
        Search
      </div>
    </form>
  );
}
