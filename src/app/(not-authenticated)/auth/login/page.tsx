import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";
import { ThemeLogo } from "@/components/templates/ThemeSwitcher/theme-logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-30">
        <div className="flex justify-center gap-2 ">
          <Link
            href="https://github.com/ArielVinis"
            className="flex items-center gap-2 font-medium"
          >
            <ThemeLogo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/auth.png"
          alt="boilerplate"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
