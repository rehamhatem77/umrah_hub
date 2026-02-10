import { Link, usePage } from '@inertiajs/react';

export default function NavLink({ href, children }) {
  const { url } = usePage();
  // const isActive = url === href;
  const isActive = new RegExp(`^${href}(\/.*)?$`).test(url);
const isContactPage = url === '/contact';

  return (
    <Link
      href={href}
      className={`relative pb-1 transition
        ${
          isActive
            ? isContactPage? "hover:text-white" : "text-[var(--app-primary)] hover:text-[var(--app-primary)]"
            : ""
        }
      `}
    >
      {children}

      {isActive && (
        <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[var(--app-primary)] rounded-full"></span>
      )}
    </Link>
  );
}

