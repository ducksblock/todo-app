import Link from "next/link"

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Todo App</h1>
      <Link href="/todo">
        <button className="btn btn-primary">Launch</button>
      </Link>
    </div>
  )
}
