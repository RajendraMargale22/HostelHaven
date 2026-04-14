import HostelCard from './HostelCard';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';

// Usage:
// <HostelGrid hostels={[...]} loading={false} onDeleted={fn} onClear={fn} />

export default function HostelGrid({ hostels = [], loading = false, onDeleted, onClear }) {
  if (loading) return <Spinner label="Loading hostels..." />;

  if (!hostels.length) {
    return (
      <EmptyState
        icon="🏠"
        title="No hostels found"
        desc="Try adjusting your filters or clear them to see all listings."
        action={
          onClear && (
            <Button variant="primary" size="sm" onClick={onClear}>
              Clear Filters
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="hostels-grid">
      {hostels.map(h => (
        <HostelCard key={h._id} hostel={h} onDeleted={onDeleted} />
      ))}
    </div>
  );
}