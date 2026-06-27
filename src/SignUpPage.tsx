import React, { useState } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  GraduationCap,
  Briefcase,
  UserCheck,
  Building2,
} from 'lucide-react'

type Role = 'Student' | 'Intern' | 'Employee' | 'Boarding Owner'

const ROLES: { label: Role; Icon: React.ElementType }[] = [
  { label: 'Student',       Icon: GraduationCap },
  { label: 'Intern',        Icon: UserCheck     },
  { label: 'Employee',      Icon: Briefcase     },
  { label: 'Boarding Owner', Icon: Building2    },
]

interface FormState {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: Role | null
  agreed: boolean
}

interface Errors {
  fullName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  role?: string
  agreed?: string
}

interface Props {
  onSuccess: (name?: string) => void
}

export default function SignUpPage({ onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    agreed: false,
  })

  const [showPassword, setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors]                    = useState<Errors>({})

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof Errors]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const errs: Errors = {}
    if (!form.fullName.trim())                         errs.fullName        = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email        = 'Enter a valid email'
    if (!form.phone.match(/^\+?[\d\s\-()]{7,15}$/))   errs.phone           = 'Enter a valid phone number'
    if (form.password.length < 8)                      errs.password        = 'Password must be at least 8 characters'
    if (form.confirmPassword !== form.password)        errs.confirmPassword = 'Passwords do not match'
    if (!form.role)                                    errs.role            = 'Please select a role'
    if (!form.agreed)                                  errs.agreed          = 'Please agree to the Terms & Conditions'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onSuccess(form.fullName)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Phone-frame card */}
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden animate-fade-up"
        style={{ background: 'white', boxShadow: '0 24px 80px 0 rgba(108,72,234,0.18)' }}
      >
        {/* Top gradient bar */}
        <div
          className="absolute inset-x-0 top-0 h-1.5 rounded-t-[2.5rem]"
          style={{ background: 'var(--brand-gradient)' }}
        />

        {/* Background illustration blob */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'var(--brand-gradient)' }}
        />

        <div className="px-7 pt-8 pb-8">
          {/* Back button */}
          <button
            aria-label="Go back"
            className="mb-5 p-2 -ml-1 rounded-xl transition-colors hover:bg-brand-50 active:bg-brand-100"
          >
            <ArrowLeft size={20} style={{ color: 'var(--brand-primary)' }} />
          </button>

          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Create Account
            </h1>
            <p className="mt-1 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Join Nestora today
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: errors.fullName ? '#ef4444' : 'var(--text-secondary)' }}>
                  <User size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input-field pl-10"
                  style={errors.fullName ? { borderColor: '#ef4444' } : {}}
                  value={form.fullName}
                  onChange={set('fullName')}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: errors.phone ? '#ef4444' : 'var(--text-secondary)' }}>
                  <Phone size={15} />
                </span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input-field pl-10"
                  style={errors.phone ? { borderColor: '#ef4444' } : {}}
                  value={form.phone}
                  onChange={set('phone')}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
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
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: errors.confirmPassword ? '#ef4444' : 'var(--text-secondary)' }}>
                  <Lock size={15} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="input-field pl-10 pr-11"
                  style={errors.confirmPassword ? { borderColor: '#ef4444' } : {}}
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
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
                    onClick={() => {
                      setForm(prev => ({ ...prev, role: label }))
                      if (errors.role) setErrors(prev => ({ ...prev, role: undefined }))
                    }}
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
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.agreed}
                    onChange={e => {
                      setForm(prev => ({ ...prev, agreed: e.target.checked }))
                      if (errors.agreed) setErrors(prev => ({ ...prev, agreed: undefined }))
                    }}
                  />
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center border-2 transition-all duration-150"
                    style={{
                      borderColor: errors.agreed ? '#ef4444' : form.agreed ? 'var(--brand-primary)' : 'var(--input-border)',
                      background: form.agreed ? 'var(--brand-primary)' : 'white',
                    }}
                  >
                    {form.agreed && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[11px] leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  I agree to the{' '}
                  <a href="#" className="font-semibold underline underline-offset-2"
                     style={{ color: 'var(--brand-primary)' }}>Terms &amp; Conditions</a>
                  {' '}and{' '}
                  <a href="#" className="font-semibold underline underline-offset-2"
                     style={{ color: 'var(--brand-primary)' }}>Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p className="mt-1 text-xs text-red-500">{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button type="submit" className="btn-primary">
                Sign Up
              </button>
            </div>

            {/* Sign in link */}
            <p className="text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onSuccess()}
                className="font-bold"
                style={{ color: 'var(--brand-primary)' }}
              >
                Sign In
              </button>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
