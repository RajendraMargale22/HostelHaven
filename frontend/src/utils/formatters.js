// ── Price formatter ───────────────────────────────────
export const formatPrice = (price) =>
  Number(price).toLocaleString('en-IN');

// ── Date formatter ────────────────────────────────────
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

// ── Relative time (e.g. "2 days ago") ────────────────
export const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return 'Just now';
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

// ── Total cost calculator ─────────────────────────────
export const calcTotal = (price, months) =>
  formatPrice(Number(price) * Number(months));

// ── Capitalize first letter ───────────────────────────
export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1);

// ── Truncate long text ────────────────────────────────
export const truncate = (str = '', max = 60) =>
  str.length > max ? str.slice(0, max) + '...' : str;