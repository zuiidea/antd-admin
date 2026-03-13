import React from 'react';

interface LinkItem {
  title: string;
  href: string;
}

interface GlobalFooterProps {
  links?: LinkItem[];
  copyright?: React.ReactNode;
  className?: string;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({
  links = [],
  copyright,
}) => {
  return (
    <footer style={{ textAlign: 'center', padding: '24px 0', color: '#666' }}>
      {links.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{ margin: '0 8px' }}>
              {l.title}
            </a>
          ))}
        </div>
      )}
      <div>{copyright ?? `© ${new Date().getFullYear()}`}</div>
    </footer>
  );
};

export default GlobalFooter;
