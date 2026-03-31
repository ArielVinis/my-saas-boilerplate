"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { paths } from "@/lib/paths";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Acessar sua conta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Digite seu email abaixo para acessar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              href={paths.auth.signup}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Acessar</Button>
        </Field>

        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field className="flex flex-col gap-2">
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() =>
              signIn("microsoft-entra-id", { callbackUrl: paths.root })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              className="size-5"
            >
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            Entrar com Microsoft
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: paths.root })}
          >
            <IconBrandGoogle className="size-5" />
            Entrar com Google
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
