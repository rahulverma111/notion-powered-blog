import Link from "next/link";

import Logo from "./ui/logo";

export default function Navbar() {
  return (
    <div className="bg-black h-12 flex justify-between items-center px-4">
      <Logo />
      <div>
        <Link href={"/authors"} />
        <Link href={"/"} />
      </div>
    </div>
  );
}
