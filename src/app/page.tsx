import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className=""> low code version: 0.1.0 </div>
        <Link href="./lowcode-app">lowcode editor</Link>
        <Link href="./pro-page">预览本地版本</Link>
      </main>
    </div>
  );
}
