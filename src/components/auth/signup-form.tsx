import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { paths } from "@/lib/paths";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandMeta,
} from "@tabler/icons-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input id="name" type="text" placeholder="Digite seu nome" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu email"
            required
          />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar Conta</Button>
        </Field>
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <IconBrandGithub className="size-5" />
            Criar conta com GitHub
          </Button>
          <Button variant="outline" type="button">
            <IconBrandGoogle className="size-5" />
            Criar conta com Google
          </Button>
          <Button variant="outline" type="button">
            <IconBrandMeta className="size-5" />
            Criar conta com Microsoft
          </Button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <Link href={paths.auth.login}>Entrar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
