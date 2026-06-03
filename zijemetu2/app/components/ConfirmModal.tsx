'use client'
import React from 'react'

type Props = {
  isOpen: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ isOpen, title, message, confirmText = 'Ano', cancelText = 'Zrušit', onConfirm, onCancel }: Props) {
  if (!isOpen) return null
  return (
    <div onClick={e => e.target === e.currentTarget && onCancel()} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--white)', borderRadius: 6, padding: '28px 22px', width: '100%', maxWidth: 520, boxShadow: '0 18px 60px rgba(0,0,0,0.28)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <img src="/LOGO_kulate.png" alt="logo" style={{ height: 84, width: 84, objectFit: 'contain', margin: '8px auto 12px', filter: 'contrast(1.45) brightness(1.08) saturate(1.05)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          {title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: '6px 0' }}>{title}</h3>}
          <p style={{ fontSize: 14, color: 'var(--gray)', marginTop: 6 }}>{message}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
          <button onClick={onCancel} style={{ padding: '10px 18px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, color: 'var(--gray)' }}>{cancelText}</button>
          <button onClick={onConfirm} style={{ padding: '10px 18px', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 14 }}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
