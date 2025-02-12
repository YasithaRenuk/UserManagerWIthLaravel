<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // Display the admin page to manage user roles
    public function index()
    {
        // Fetch all users with their roles
        $users = User::with('roles')->get();
        // Fetch all available roles
        $roles = Role::all();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    // Update the role of a specific user
    public function updateRole(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        // Sync the user's roles (replace existing roles with the new one)
        $user->roles()->sync([$request->role_id]);

        return redirect()->back()->with('success', 'User role updated successfully.');
    }
}