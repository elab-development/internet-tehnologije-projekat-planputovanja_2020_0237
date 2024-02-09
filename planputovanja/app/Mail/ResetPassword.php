<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;

    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    public function build()
    {
        $resetLink = url('password/reset', $this->token);

        $emailContent = "<h1>Resetovanje Lozinke</h1>
                        <p>Poštovani {$this->user->username},</p>
                        <p>Kliknite na link ispod da resetujete lozinku:</p>
                        <a href='{$resetLink}'>Resetuj Lozinku</a>";

        return $this->html($emailContent)->subject('Reset Password');
    }
}
