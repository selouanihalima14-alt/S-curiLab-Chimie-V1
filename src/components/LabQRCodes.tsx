import React, { useState, useMemo } from 'react';
import { Download, Printer, ExternalLink } from 'lucide-react';
import { SDS_DATA } from '../constants';
import { LocalQRCode } from './LocalQRCode';

interface ProductCardProps {
  product: typeof SDS_DATA[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const rawText = useMemo(() => {
    try {
      const match = product.qrCodeUrl.match(/[?&]data=([^&]+)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    } catch (e) {
      console.error(e);
    }
    return `PRODUIT: ${product.name}\nFORMULE: ${product.formula || 'N/A'}`;
  }, [product]);

  return (
    <div 
      className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col items-center text-center group transition-all hover:border-indigo-200 hover:bg-white hover:shadow-xl print:bg-white print:rounded-none print:border print:shadow-none"
    >
      <h3 className="text-xl font-bold text-slate-900 mb-4">{product.name}</h3>
      
      <div className="bg-white p-4 rounded-3xl shadow-inner mb-6 group-hover:scale-105 transition-transform flex items-center justify-center w-56 h-56">
        <LocalQRCode 
          text={rawText} 
          className="w-48 h-48 sm:w-52 sm:h-52 object-contain" 
          alt={`QR Code for ${product.name}`}
          onDataUrlGenerated={setDownloadUrl}
        />
      </div>

      <div className="space-y-2 w-full text-left print:hidden">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>Informations Incluses</span>
          <ExternalLink className="w-3 h-3" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['Pictos', 'Phrases H', 'Phrases P', 'EPI', 'Secours', 'Notes'].map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-2 w-full print:hidden">
        {downloadUrl && (
          <a 
            href={downloadUrl}
            download={`${product.id}_qrcode.png`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </a>
        )}
      </div>
    </div>
  );
};

const LabQRCodes: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100 mt-12 print:shadow-none print:border-none print:p-0" id="lab-qr-codes">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 print:hidden">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Générateur de QR Codes Labo</h2>
          <p className="text-slate-600">QR codes enrichis avec toutes les informations de sécurité pour vos produits.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Printer className="w-5 h-5" />
            Imprimer les Étiquettes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-4">
        {SDS_DATA.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-8 print:hidden">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <Printer className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Conseil d'Affichage</h4>
          <p className="text-slate-600 leading-relaxed">
            Imprimez ces QR codes et collez-les directement sur vos flacons de produits chimiques ou vos armoires de stockage. 
            Une simple lecture avec un smartphone permettra aux élèves d'accéder instantanément aux mesures d'urgence et aux EPI requis, même hors ligne si l'application est en cache.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LabQRCodes;
