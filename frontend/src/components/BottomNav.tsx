import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/reports', label: 'Reports' },
  { path: '/add', label: '+' },
  { path: '/goals', label: 'Goals' },
  { path: '/settings', label: 'Settings' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-primary border-t border-border safe-bottom z-50">
      <div className="max-w-lg mx-auto grid grid-cols-5 items-center h-14">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const isAdd = item.path === '/add';

          if (isAdd) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex justify-center items-center -mt-4"
              >
                <div className="w-10 h-10 rounded-full bg-text-primary text-surface-primary flex items-center justify-center text-xl font-normal">
                  +
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center h-full text-2xs
                ${isActive ? 'text-text-primary font-medium' : 'text-text-tertiary'}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
