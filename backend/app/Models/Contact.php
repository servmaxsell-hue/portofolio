<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'read',
        'replied_at',
    ];

    protected $casts = [
        'read' => 'boolean',
        'replied_at' => 'datetime',
    ];

    public function scopeUnread($query)
    {
        return $query->where('read', false);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function markAsRead()
    {
        $this->update(['read' => true]);
    }
}
