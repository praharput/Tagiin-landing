'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Invoice = {
  id: string
  invoice_number: string
  client_name: string
  amount: number
  status: 'pending' | 'paid' | 'overdue'
  due_date: string
  created_at: string
}

type User = {
  email: string
  user_metadata: { full_name?: string; avatar_url?: string }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setUser(session.user as unknown as User)

      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setInvoices(data ?? [])
      setLoading(false)
    }
    init()
  }, [router])

  const total = invoices.reduce((s, i) => s + i.amount, 0)
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const unpaid = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)

  function fmt(n: number) {
    return 'Rp' + n.toLocaleString('id-ID')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>Memuat...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid var(--line)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '22px', fontWeight: 700 }}>Tagiin</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'var(--muted)' }}>{user?.email}</span>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
            style={{ fontSize: '13px', color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Keluar
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Dashboard</h1>
          <button
            onClick={() => router.push('/invoice/new')}
            style={{ background: 'var(--brand)', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
          >
            + Buat Invoice
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Tagihan', value: fmt(total), color: 'var(--ink)' },
            { label: 'Sudah Dibayar', value: fmt(paid), color: 'var(--success)' },
            { label: 'Belum Dibayar', value: fmt(unpaid), color: 'var(--brand)' },
          ].map(card => (
            <div key={card.label} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 24px' }}>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>{card.label}</p>
              <p style={{ fontSize: '22px', fontWeight: 600, color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Invoice List */}
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600 }}>Invoice</h2>
          </div>

          {invoices.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
              <p style={{ marginBottom: '12px' }}>Belum ada invoice.</p>
              <button
                onClick={() => router.push('/invoice/new')}
                style={{ color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
              >
                Buat invoice pertamamu →
              </button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
                  {['No. Invoice', 'Klien', 'Jumlah', 'Jatuh Tempo', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={inv.id} style={{ borderBottom: i < invoices.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                    <td style={{ padding: '14px 24px', fontSize: '14px', fontWeight: 500 }}>{inv.invoice_number}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px' }}>{inv.client_name}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', fontWeight: 500 }}>{fmt(inv.amount)}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: 'var(--muted)' }}>{new Date(inv.due_date).toLocaleDateString('id-ID')}</td>
                    <td style={{ padding: '14px 24px' }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: inv.status === 'paid' ? 'var(--success-tint)' : inv.status === 'overdue' ? '#fff0f0' : 'var(--brand-tint)',
                        color: inv.status === 'paid' ? 'var(--success)' : inv.status === 'overdue' ? '#c0392b' : 'var(--brand)',
                      }}>
                        {inv.status === 'paid' ? 'Lunas' : inv.status === 'overdue' ? 'Terlambat' : 'Menunggu'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
