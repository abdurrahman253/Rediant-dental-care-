export default function Logo({
  variant = 'color',
  layout = 'horizontal',
  iconOnly = false,
  size = 'md',
  className = ''
}) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 64
  };

  const iconSize = iconSizes[size];

  // Color mapping
  const colors = {
    color: {
      icon: '#1E66F5',
      text: '#0B1220',
      sparkle: '#1E66F5'
    },
    dark: {
      icon: '#0B1220',
      text: '#0B1220',
      sparkle: '#0B1220'
    },
    white: {
      icon: '#ffffff',
      text: '#ffffff',
      sparkle: '#ffffff'
    }
  };

  const currentColors = colors[variant];

  // Icon component
  const Icon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric tooth outline with sparkle */}
      <path
        d="M20 6C15.5 6 12 8.5 12 12V20C12 22 11.5 26 10 30C9.5 31.5 10 34 12 34C14 34 14.5 32 15 30C15.5 28 16 26 17 24.5C17.5 23.5 18.5 23 20 23C21.5 23 22.5 23.5 23 24.5C24 26 24.5 28 25 30C25.5 32 26 34 28 34C30 34 30.5 31.5 30 30C28.5 26 28 22 28 20V12C28 8.5 24.5 6 20 6Z"
        fill={currentColors.icon}
        fillOpacity="0.1"
      />
      <path
        d="M20 6C15.5 6 12 8.5 12 12V20C12 22 11.5 26 10 30C9.5 31.5 10 34 12 34C14 34 14.5 32 15 30C15.5 28 16 26 17 24.5C17.5 23.5 18.5 23 20 23C21.5 23 22.5 23.5 23 24.5C24 26 24.5 28 25 30C25.5 32 26 34 28 34C30 34 30.5 31.5 30 30C28.5 26 28 22 28 20V12C28 8.5 24.5 6 20 6Z"
        stroke={currentColors.icon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sparkle/shine element */}
      <g opacity="0.9">
        <path
          d="M26 10L27.5 13L30.5 14.5L27.5 16L26 19L24.5 16L21.5 14.5L24.5 13L26 10Z"
          fill={currentColors.sparkle}
        />
      </g>
    </svg>
  );

  // Wordmark component
  const Wordmark = ({ textColor }) => (
    <div
      className="flex flex-col"
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: textColor
      }}
    >
      <span
        className="tracking-tight"
        style={{
          fontSize: size === 'sm' ? '18px' : size === 'md' ? '22px' : '36px',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}
      >
        Radiant
      </span>
      <span
        className="uppercase tracking-wider opacity-70"
        style={{
          fontSize: size === 'sm' ? '9px' : size === 'md' ? '11px' : '18px',
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '0.15em'
        }}
      >
        Dental Care
      </span>
    </div>
  );

  if (iconOnly) {
    return (
      <div className={className}>
        <Icon />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${layout === 'stacked' ? 'flex-col gap-3' : 'gap-3'} ${className}`}>
      <Icon />
      <Wordmark textColor={currentColors.text} />
    </div>
  );
}
