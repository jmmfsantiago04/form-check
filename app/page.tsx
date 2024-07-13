import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl mb-8">Welcome to Our Application</h1>
      <div className="flex gap-4">
        <Link href="/auth/signup">
          <Button className="w-full">
            Sign Up
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button className="w-full">
            Login
          </Button>
        </Link>
      </div>
    </main>
  );
}
