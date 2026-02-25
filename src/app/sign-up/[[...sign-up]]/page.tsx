import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-lg border border-stone-100 rounded-2xl",
          },
        }}
      />
    </div>
  );
}

