'use client'

import { validateEmailFormat } from '@/lib/validateEmail'
import clsx from 'clsx'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'


type InputType = 'text' | 'email' | 'password' | 'number' | 'username'
type InputProps = {
  type: InputType
  name: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  className?: string
  control?: any
  dataTest: string
  label: string
}

export const Input = ({
  type,
  name,
  required = false,
  placeholder,
  disabled = false,
  className,
  control,
  dataTest,
  label,
}: InputProps) => {
  const [inputType, setInputType] = useState<InputType>(type)
  const [error, setError] = useState<string | undefined>(undefined)
  const validateInput = (inputValue: string | number) => {
    if (required && inputValue.toString().trim().length === 0) {
      return 'Campo obrigatório'
    }

    if (type === 'email' && typeof inputValue === 'string') {
      const result = validateEmailFormat(inputValue, { required })
      if (!result.ok) {
        return result.error
      }
    }

    if (type === 'password' && typeof inputValue === 'string') {
      if (inputValue.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres'
      }
    }

    return undefined
  }

  const handleTogglePasswordVisibility = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setError(validateInput(inputValue))
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className="flex w-full flex-col gap-1">
          <label className="text-sm font-medium text-defaultText-text">{label}</label>
          <div
            className={clsx(
              'flex w-full items-center gap-2 rounded-lg border border-input p-3 transition-colors  focus-within:border-primary-300',
              className,
              { 'bg-secondary-200': disabled },
            )}
          >
            {type === 'email' && (
              <Mail className="flex-shrink-0 size-4 text-defaultText-text" />
            )}
            {type === 'username' && (
              <User className="flex-shrink-0 size-4 text-defaultText-text" />
            )}
            {type === 'password' && (
              <Lock className="flex-shrink-0 size-4 text-defaultText-text" />
            )}

            <input
              data-testid={dataTest}
              type={inputType}
              name={name}
              value={field.value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e)
                handleChange(e)
              }}
              className="w-full border-none bg-transparent p-0 text-label placeholder:text-secondary-400 focus:outline-none focus:ring-0"
            />
            {type === 'password' && (
              <button
                onClick={handleTogglePasswordVisibility}
                className="group flex-shrink-0"
                type="button"
              >
                {inputType === 'password' ? (
                  <EyeOff className="size-4 fill-secondary-300 transition-colors group-hover:fill-secondary-400 group-active:fill-secondary-500 text-defaultText-text" />
                ) : (
                  <Eye className="size-4 fill-secondary-300 transition-colors group-hover:fill-secondary-400 group-active:fill-secondary-500 text-defaultText-text" />
                )}
              </button>
            )}
          </div>
          {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
        </div>
      )}
    />
  )
}
