'use client'

import { Input } from '@/app/components/Input'

import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
type FormValues = {
  email: string
  password: string
}
const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
})
export function FormSignIn() {
  const { control } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <form className="flex flex-col gap-3 w-full  ">
      <Input
        label="Endereço de e-mail"
        dataTest="data-email-signin"
        type="email"
        name="email"
        placeholder="Insira seu e-mail"
        required
        control={control}
        disabled={false}
      />
      <Input
        label="Senha"
        dataTest="data-email-signin"
        type="password"
        name="password"
        placeholder="Insira sua senha"
        required
        control={control}
        disabled={false}
      />
      <Link href="#" className="text-defaultText-text">
        Esqueci minha senha
      </Link>
      <Button className="text-sm bg-orange-500 hover:bg-orange-600">Entrar</Button>
      <div className="flex items-center gap-1 w-full justify-between">
        <div className="w-24 bg-input h-0.5" />
        <span className="text-xs font-normal text-white/15">
          ou se preferir
        </span>
        <div className="w-24 bg-input h-0.5" />
      </div>
      <Button className="flex gap-4 bg-orange-500 rounded-10 border border-input">
        {/* <Image src={LogoGoogleo} alt=" Logo googleo" /> */}
        Continuar com o Google
      </Button>
      <h1 className="text-xs font-normal  w-full text-center ">
        Ainda não tem uma conta?
        <span className="text-primaryProject-default text-xs font-medium ml-1">
          Crie agora!
        </span>
      </h1>
    </form>
  )
}
