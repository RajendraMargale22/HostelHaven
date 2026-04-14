import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>404</div>
        <h2 style={{ marginBottom: 10 }}>Page Not Found</h2>
        <p style={{ marginBottom: 28, color: 'var(--text-lt)' }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </div>
    </div>
  );
}