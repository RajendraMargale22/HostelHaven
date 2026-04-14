// PageWrapper — wraps inner-page content with top padding to clear fixed navbar
// Usage: <PageWrapper><YourContent /></PageWrapper>
// Use solid={true} for inner pages (non-home) to force solid navbar bg

export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`page-content-wrap ${className}`.trim()}>
      {children}
    </div>
  );
}