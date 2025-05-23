import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-brand-0 h-10 flex justify-between items-center px-3">
      <h1>Logo</h1>
      <div>
        <Link href={"/authors"} />
        <Link href={"/"} />
      </div>
    </div>
  );
}
