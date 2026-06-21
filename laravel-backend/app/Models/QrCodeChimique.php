<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QrCodeChimique extends Model
{
    use HasFactory;

    protected $table = 'qr_codes_chimiques';

    protected $fillable = [
        'produit_id',
        'qr_code_uuid',
        'nombre_scans',
        'dernier_scan_le',
    ];

    protected $casts = [
        'nombre_scans' => 'integer',
        'dernier_scan_le' => 'datetime',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation Inverse One-to-One vers le Produit Chimique.
     */
    public function produit()
    {
        return $this->belongsTo(ProduitChimique::class, 'produit_id');
    }

    /**
     * Incrémente de 1 le compteur de scans de sécurité lors de la lecture physique du QR.
     */
    public function incrementScans(): void
    {
        $this->increment('nombre_scans');
        $this->update(['dernier_scan_le' => now()]);
    }
}
