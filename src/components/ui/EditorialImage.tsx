import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  fallbackTitle,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F7E6EC] via-[#F5ECE8] to-[#EAD3DA] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="h-6 w-6 text-[#B87487]" aria-hidden="true" />
        {fallbackTitle && (
          <span className="mt-3 font-display text-lg font-medium text-[#2D1E24]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#F7E6EC] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={imgClassName}
        loading="lazy"
      />
    </div>
  );
}
