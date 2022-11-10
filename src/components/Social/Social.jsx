import './social.css'

export function Social({ url, children }) {
  return (
    <a className="social" href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
