'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent, source: string) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Email tidak valid')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('loading')

    try {
      const { error } = await supabase.from('waitlist').insert({
        email: email.toLowerCase().trim(),
        source,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      })

      if (error) {
        if (error.code === '23505') {
          setStatus('success')
          setMessage('Kamu sudah terdaftar di waitlist 🎉')
        } else {
          throw error
        }
      } else {
        setStatus('success')
        setMessage('Berhasil! Kami akan kabari ya 🙏')
      }

      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setStatus('error')
      setMessage('Ada kendala. Coba lagi sebentar.')
      setTimeout(() => setStatus('idle'), 4000)
      console.error(err)
    }
  }

  function toggleFaq(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.classList.toggle('open')
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="logo">Tagiin</a>
          <div className="nav-links">
            <a href="#features">Fitur</a>
            <a href="#how">Cara Kerja</a>
            <a href="#pricing">Harga</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#cta" className="nav-cta">Daftar Waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                <span className="dot"></span>
                SEGERA HADIR · 2026
              </div>
              <h1>
                Tagih <em>lebih mudah,</em><br />
                dibayar <em>lebih cepat.</em>
              </h1>
              <p className="sub">
                Invoice profesional, reminder WhatsApp otomatis, pembayaran QRIS — semua dalam satu aplikasi. Dibuat untuk freelancer & UMKM Indonesia.
              </p>

              <form className="waitlist" onSubmit={(e) => handleSubmit(e, 'landing_hero')}>
                <input
                  type="email"
                  placeholder="email@kamu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                />
                <button type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Proses...' : 'Daftar Gratis'}
                </button>
              </form>

              <div className="social-proof">
                <div className="avatars">
                  <span>AR</span>
                  <span>BD</span>
                  <span>CS</span>
                  <span>+47</span>
                </div>
                <span>50+ freelancer sudah daftar waitlist</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-phone">
                <div className="hero-phone-screen">
                  <div className="mock-header">
                    <span style={{ fontFamily: "'Instrument Serif'", fontStyle: 'italic', color: 'var(--brand)', fontSize: '18px' }}>Tagiin</span>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4471f, #f4a261)' }}></div>
                  </div>
                  <div className="mock-stat">
                    <div className="lbl">TAGIHAN BULAN INI</div>
                    <div className="num">Rp 12,4jt</div>
                    <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>↑ 23% vs bulan lalu</div>
                  </div>
                  <div className="mock-row">
                    <div>
                      <div className="name">PT Surya Abadi</div>
                      <div className="meta">INV-0034</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="amt">Rp 3,5jt</div>
                      <span className="mock-pill pending">menunggu</span>
                    </div>
                  </div>
                  <div className="mock-row">
                    <div>
                      <div className="name">Budi Santoso</div>
                      <div className="meta">INV-0033</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="amt">Rp 850rb</div>
                      <span className="mock-pill lunas">lunas</span>
                    </div>
                  </div>
                  <div className="mock-row">
                    <div>
                      <div className="name">Sari Dewi</div>
                      <div className="meta">INV-0032</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="amt">Rp 2,1jt</div>
                      <span className="mock-pill lunas">lunas</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-notif">
                <div className="icon">✓</div>
                <div className="text">
                  <strong>Invoice lunas!</strong>
                  <span>PT Surya · Rp 3.500.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="label">Mendukung Pembayaran</div>
          <div className="payment-methods">
            <span className="method">QRIS</span>
            <span className="method">GoPay</span>
            <span className="method">OVO</span>
            <span className="method">DANA</span>
            <span className="method">ShopeePay</span>
            <span className="method">BCA</span>
            <span className="method">Mandiri</span>
            <span className="method">BNI</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">MASALAH YANG KAMI SOLUSIKAN</div>
            <h2>Invoice kirim, tapi <em>kapan dibayarnya?</em></h2>
            <p>Freelancer dan UMKM Indonesia kehilangan ratusan jam setiap bulan buat ngejar pembayaran. Tagiin bikin itu otomatis.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="num">01</div>
              <h4>Invoice manual di Word / Excel</h4>
              <p>Bikin dari template, save PDF, kirim ke WA. Setiap invoice = 15 menit kerja. Kalau 20 klien seminggu? Habis 5 jam.</p>
            </div>
            <div className="problem-card">
              <div className="num">02</div>
              <h4>Nagih ke klien itu awkward</h4>
              <p>Udah lewat jatuh tempo, mau chat klien rasanya ngga enak. Akhirnya didiemin — dan invoice makin lama makin macet.</p>
            </div>
            <div className="problem-card">
              <div className="num">03</div>
              <h4>Cek mutasi bank tiap hari</h4>
              <p>Buka BCA mobile, scroll mutasi, cocokin nama klien, update spreadsheet. Dilakuin setiap. Hari. Capek ngga sih?</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-head">
            <div className="kicker">APA YANG KAMU DAPAT</div>
            <h2>Semua yang kamu butuh, <em>nggak lebih.</em></h2>
            <p>Fokus pada fitur inti yang bikin perbedaan besar — bukan fitur yang cuma bikin bingung.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card wide">
              <div className="icon">📱</div>
              <h3>Invoice dalam 30 detik</h3>
              <p>Isi form sederhana, invoice langsung jadi. Auto-hitung total, auto-generate nomor, preview langsung di layar. Kirim via WhatsApp sebagai gambar — klien langsung scan QRIS, nggak perlu klik link.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔔</div>
              <h3>Reminder otomatis</h3>
              <p>H+1, H+3, H+7 — Tagiin kirim WhatsApp reminder ke klien dengan tone yang makin tegas. Kamu nggak perlu keluar duit buat jadi &ldquo;si penagih utang&rdquo;.</p>
            </div>
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>Auto-confirm pembayaran</h3>
              <p>Dynamic QRIS + webhook = begitu klien bayar, status invoice langsung update. Kamu dapat notifikasi, nggak perlu cek mutasi bank lagi.</p>
            </div>
            <div className="feature-card">
              <div className="icon">📊</div>
              <h3>Dashboard bisnis kamu</h3>
              <p>Total tagihan bulan ini, klien terbaik, invoice yang overdue — semua di 1 layar. Keputusan bisnis jadi data-driven, bukan feeling.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🎨</div>
              <h3>Anti-phishing design</h3>
              <p>Invoice dikirim sebagai gambar — klien scan QRIS langsung dari WA. Nggak ada link mencurigakan yang bikin klien korporat suspicious.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head">
            <div className="kicker">CARA KERJA</div>
            <h2>Dari tagih ke dibayar <em>— 3 langkah.</em></h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h4>Buat invoice</h4>
              <p>Isi form singkat: klien, item, nominal. Preview langsung tampil. Simpan. Selesai — butuh 30 detik.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h4>Kirim via WhatsApp</h4>
              <p>Tap tombol &ldquo;Kirim&rdquo;. Tagiin auto-generate gambar invoice + QRIS. Klien terima sebagai attachment WA.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h4>Dibayar</h4>
              <p>Klien scan QRIS dari gambar pakai app pembayaran mereka. Status invoice otomatis update ke &ldquo;lunas&rdquo;. Dana ke rekening kamu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head">
            <div className="kicker">HARGA</div>
            <h2>Mulai <em>gratis,</em> upgrade kalau butuh.</h2>
            <p>Ngga ada biaya tersembunyi. Ngga ada kontrak. Bayar bulanan, cancel kapan aja.</p>
          </div>

          <div className="pricing-grid">
            {/* FREE */}
            <div className="price-card">
              <span className="price-label free">FREE</span>
              <div className="price"><span className="currency">Rp</span>0</div>
              <div className="price-sub">Selamanya, ngga perlu kartu kredit</div>
              <ul className="price-features">
                <li><span className="check">✓</span> 10 invoice per bulan</li>
                <li><span className="check">✓</span> Kirim via WhatsApp (gambar)</li>
                <li><span className="check">✓</span> QRIS statis + info rekening</li>
                <li><span className="check">✓</span> 1× manual reminder per invoice</li>
                <li><span className="check">✓</span> Database 10 klien</li>
                <li><span className="check">✓</span> Download PDF invoice</li>
                <li><span className="cross">—</span> Dynamic QRIS (auto-fill nominal)</li>
                <li><span className="cross">—</span> Auto-reminder H+1, H+3, H+7</li>
                <li><span className="cross">—</span> Auto-confirm pembayaran</li>
              </ul>
              <button className="price-btn free" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Mulai Gratis</button>
            </div>

            {/* PRO */}
            <div className="price-card featured">
              <span className="price-label pro">PRO — REKOMENDASI</span>
              <div className="price"><span className="currency">Rp</span>39rb</div>
              <div className="price-sub">per bulan · bisa cancel kapan aja</div>
              <ul className="price-features">
                <li><span className="check">✓</span> <strong>Unlimited</strong> invoice</li>
                <li><span className="check">✓</span> Kirim via WhatsApp (gambar)</li>
                <li><span className="check">✓</span> <strong>Dynamic QRIS</strong> (nominal auto-fill)</li>
                <li><span className="check">✓</span> <strong>Auto-reminder</strong> H+1, H+3, H+7</li>
                <li><span className="check">✓</span> <strong>Auto-confirm</strong> pembayaran</li>
                <li><span className="check">✓</span> Unlimited klien</li>
                <li><span className="check">✓</span> Tanpa watermark di gambar</li>
                <li><span className="check">✓</span> Logo & brand kustom</li>
                <li><span className="check">✓</span> Priority support</li>
              </ul>
              <button className="price-btn pro" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Coba Pro Gratis 14 Hari</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-head">
            <div className="kicker">PERTANYAAN UMUM</div>
            <h2>Hal-hal yang <em>sering ditanya.</em></h2>
          </div>

          <div className="faq-list">
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Apakah dana pelanggan masuk ke rekening saya langsung?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Ya. Tagiin bukan wallet — kami nggak menahan uang kamu. Dana dari QRIS langsung settle ke rekening merchant kamu via gateway pembayaran resmi (Bank Indonesia compliant).</div>
            </div>
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Berapa biaya transaksi QRIS?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Free plan: 0% (pakai QRIS statis kamu sendiri). Pro plan: 0.7% per transaksi sukses — standar MDR QRIS dari Bank Indonesia. Kamu hanya bayar saat ada pembayaran masuk.</div>
            </div>
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Apakah klien saya perlu install aplikasi Tagiin?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Tidak. Klien terima invoice sebagai gambar di WhatsApp — tinggal scan QRIS-nya dari gambar pakai app pembayaran yang biasa mereka pakai (GoPay, OVO, DANA, mobile banking, dll). Nggak perlu klik link apapun.</div>
            </div>
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Aman nggak kalau kirim invoice via WhatsApp?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Sangat aman. Tagiin kirim invoice sebagai gambar (bukan link), sehingga klien nggak perlu khawatir phishing. Pembayaran via QRIS resmi yang tidak bisa dipalsukan, dan kami pakai Kirimi.id sebagai WhatsApp gateway resmi.</div>
            </div>
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Kapan bisa mulai pakai?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Kami sedang dalam fase beta terbatas. Daftar waitlist sekarang — early user dapat akses Pro gratis 3 bulan + lifetime discount 30%.</div>
            </div>
            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                <span>Apakah bisa untuk bisnis saya?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">Tagiin didesain untuk freelancer, pelaku jasa (konsultan, desainer, fotografer, tutor), dan UMKM (katering, toko online, kontraktor kecil). Kalau kamu rutin kirim invoice ke klien, Tagiin cocok buat kamu.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section" id="cta">
        <h2>Siap <em>berhenti nagih</em><br />dan mulai dibayar?</h2>
        <p>Daftar waitlist — dapat akses early + Pro gratis 3 bulan sebagai bonus.</p>
        <form className="waitlist" onSubmit={(e) => handleSubmit(e, 'landing_cta')}>
          <input
            type="email"
            placeholder="email@kamu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Proses...' : 'Daftar Waitlist'}
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="logo">Tagiin</a>
          <div className="footer-links">
            <a href="#">Tentang</a>
            <a href="#">Privasi</a>
            <a href="#">Syarat</a>
            <a href="mailto:hi@tagiin.app">Kontak</a>
          </div>
          <div className="footer-copy">© 2026 TAGIIN · MADE IN INDONESIA 🇮🇩</div>
        </div>
      </footer>

      {/* Toast */}
      {status !== 'idle' && status !== 'loading' && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: status === 'success' ? '#2f7a4f' : '#d4471f',
            color: 'white',
            padding: '14px 22px',
            borderRadius: '12px',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxWidth: 'calc(100vw - 48px)',
          }}
        >
          {message}
        </div>
      )}
    </>
  )
}
