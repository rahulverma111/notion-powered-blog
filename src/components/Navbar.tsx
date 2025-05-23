import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-brand-0 h-10 flex justify-between items-center px-3">
      <h1>Logo</h1>
      <div className="flex gap-x-4">
        <Link href={"/"}>Blogs</Link>
        <Link href={"/authors"}>Authors</Link>
      </div>
    </div>
  );
}
