import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, GraduationCap, UserCheck, Briefcase, Building2 } from 'lucide-react'

type Role = 'Student' | 'Intern' | 'Employee' | 'Boarding Owner'

const ROLES: { label: Role; Icon: React.ElementType }[] = [
  { label: 'Student',        Icon: GraduationCap },
  { label: 'Intern',         Icon: UserCheck     },
  { label: 'Employee',       Icon: Briefcase     },
  { label: 'Boarding Owner', Icon: Building2     },
]

interface Props {
  onSignUp: () => void
  onLogin: (name?: string, role?: string) => void
}

interface FormState {
  email: string
  password: string
  role: Role
}

interface Errors {
  email?: string
  password?: string
}

export default function LoginPage({ onSignUp, onLogin }: Props) {
  const [form, setForm] = useState<FormState>({ email: '', password: '', role: 'Student' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const errs: Errors = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      const name = form.email.split('@')[0]
      const formatted = name.charAt(0).toUpperCase() + name.slice(1)
      onLogin(formatted, form.role)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{ background: 'var(--bg-page)' }}
    >
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden animate-fade-up"
        style={{ background: 'white', boxShadow: '0 24px 80px 0 rgba(108,72,234,0.18)' }}
      >
        {/* Top gradient bar */}
        <div
          className="absolute inset-x-0 top-0 h-1.5 rounded-t-[2.5rem]"
          style={{ background: 'var(--brand-gradient)' }}
        />

        {/* City skyline illustration bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 opacity-[0.06] pointer-events-none"
          style={{
            background: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=60&auto=format") center bottom / cover no-repeat',
            filter: 'saturate(0)',
          }}
        />

        {/* Blob decoration */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'var(--brand-gradient)' }}
        />
        <div
          className="absolute -bottom-20 -left-16 w-52 h-52 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'var(--brand-gradient)' }}
        />

        <div className="px-7 pt-8 pb-10 relative">
          {/* Back button */}
          <button
            aria-label="Go back"
            onClick={onSignUp}
            className="mb-6 p-2 -ml-1 rounded-xl transition-colors hover:bg-brand-50 active:bg-brand-100"
          >
            <ArrowLeft size={20} style={{ color: 'var(--brand-primary)' }} />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L3 8.5V19h5.5v-5h5v5H19V8.5L11 2Z" fill="white" />
                </svg>
              </div>
              <div className="leading-none">
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>NNRP</p>
                <p className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Nestora</p>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
              Welcome Back!
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: errors.email ? '#ef4444' : 'var(--text-secondary)' }}>
                  <Mail size={15} />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field pl-10"
                  style={errors.email ? { borderColor: '#ef4444' } : {}}
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: errors.password ? '#ef4444' : 'var(--text-secondary)' }}>
                  <Lock size={15} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-11"
                  style={errors.password ? { borderColor: '#ef4444' } : {}}
                  value={form.password}
                  onChange={set('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <a href="#" className="text-xs font-semibold" style={{ color: 'var(--brand-primary)' }}>
                Forgot Password?
              </a>
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-xs font-semibold mb-2.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                I am a
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ROLES.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, role: label }))}
                    className={`role-card${form.role === label ? ' active' : ''}`}
                  >
                    <Icon
                      size={20}
                      style={{ color: form.role === label ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
                    />
                    <span
                      className="text-[10px] font-semibold leading-tight text-center"
                      style={{ color: form.role === label ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login button */}
            <div className="pt-1">
              <button type="submit" className="btn-primary">
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px" style={{ background: 'var(--input-border)' }} />
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--input-border)' }} />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 hover:shadow-card active:scale-95"
                style={{ borderColor: 'var(--input-border)', color: 'var(--text-primary)', background: 'white' }}
              >
                <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
                  <path d="M43.6 24.5c0-1.5-.1-3-.4-4.5H24v8.5h11c-.5 2.5-2 4.7-4.2 6.1v5h6.8c4-3.7 6-9.1 6-15.1z" fill="#4285F4"/>
                  <path d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.8-5c-1.8 1.2-4.1 2-6.7 2-5.2 0-9.6-3.5-11.2-8.2H5.8v5.2C9.2 39.1 16.1 44 24 44z" fill="#34A853"/>
                  <path d="M12.8 27.9c-.4-1.2-.6-2.5-.6-3.9s.2-2.7.6-3.9v-5.2H5.8C4.3 17.9 3.5 20.9 3.5 24s.8 6.1 2.3 9.1l7-5.2z" fill="#FBBC05"/>
                  <path d="M24 12c2.9 0 5.5 1 7.5 3l5.6-5.6C33.5 6.2 29 4 24 4 16.1 4 9.2 8.9 5.8 15.9l7 5.2c1.6-4.7 6-9.1 11.2-9.1z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 hover:shadow-card active:scale-95"
                style={{ borderColor: 'var(--input-border)', color: 'var(--text-primary)', background: 'white' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-xs pt-1" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSignUp}
                className="font-bold"
                style={{ color: 'var(--brand-primary)' }}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
