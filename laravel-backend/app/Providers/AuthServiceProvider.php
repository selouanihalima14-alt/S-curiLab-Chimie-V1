<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Custom Gates based on Roles
        Gate::define('admin-only', function ($user) {
            return $user->role === 'Administrateur';
        });

        Gate::define('enseignant-or-above', function ($user) {
            return in_array($user->role, ['Administrateur', 'Enseignant']);
        });

        Gate::define('technicien-or-above', function ($user) {
            return in_array($user->role, ['Administrateur', 'Technicien']);
        });
    }
}
