import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-lg border border-stone-100 rounded-2xl",
          },
        }}
      />
    </div>
  );
}

