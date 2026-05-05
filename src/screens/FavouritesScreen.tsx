import FavoritesList from '../components/FavoritesList';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

export default function FavouritesScreen({ onNavigate }: Props) {
  return (
    <div className="px-4 pb-4">
      <FavoritesList onNavigate={onNavigate} />
    </div>
  );
}
