'use client'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
    }}>
      <div style={{
        background: 'white',
        border: '1px solid var(--line)',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 700, fontFamily: 'Instrument Serif, serif' }}>
          Tagiin
        </div>
        <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '15px' }}>
          Masuk untuk mulai tagih lebih mudah
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 20px',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            background: 'white',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--ink)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = 'var(--paper)')}
          onMouseOut={e => (e.currentTarget.style.background = 'white')}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.7-2.9-11.3-7H6.3C9.6 39.5 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.3l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Lanjutkan dengan Google
        </button>

        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--muted)' }}>
          Dengan masuk, kamu setuju dengan{' '}
          <a href="#" style={{ color: 'var(--brand)' }}>Syarat & Ketentuan</a> Tagiin.
        </p>
      </div>
    </div>
  )
}
