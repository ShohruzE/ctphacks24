import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignIn />
    </div>
  );
}
