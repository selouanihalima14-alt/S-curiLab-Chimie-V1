import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface LocalQRCodeProps {
  text: string;
  className?: string;
  alt?: string;
  onDataUrlGenerated?: (url: string) => void;
}

export const LocalQRCode: React.FC<LocalQRCodeProps> = ({ 
  text, 
  className, 
  alt = "QR Code",
  onDataUrlGenerated 
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(text, {
      margin: 2,
      width: 400,
      errorCorrectionLevel: 'M', // medium level error correction for optimal scanning
      color: {
        dark: '#0f172a', // deep slate for very crisp high-contrast
        light: '#ffffff'
      }
    })
      .then(url => {
        if (active) {
          setDataUrl(url);
          if (onDataUrlGenerated) {
            onDataUrlGenerated(url);
          }
          setError('');
        }
      })
      .catch(err => {
        console.error('Error generating QR Code', err);
        if (active) {
          setError('Échec de la génération du QR Code');
        }
      });
    return () => {
      active = false;
    };
  }, [text, onDataUrlGenerated]);

  if (error) {
    return (
      <div className="text-rose-500 text-xs font-bold p-4 bg-rose-50 rounded-xl text-center">
        {error}
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div className="w-full h-full min-h-[160px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center font-bold text-xs text-slate-400">
        Génération...
      </div>
    );
  }

  return (
    <img 
      src={dataUrl} 
      alt={alt} 
      className={className} 
      referrerPolicy="no-referrer"
    />
  );
};
