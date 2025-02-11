<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login() {
        // dd(Hash::make(123456));
        return view('auth.login');
    }

    public function auth_login(Request $request){
        // dd($request->all());
        $remeber =!empty($request->remember) ?true:false;
        if(Auth::attempt(['email'=>$request->email,'password'=> $request->password],$remeber)){
            dd('login');
            return redirect('panel/dashbord');
        }else{
            return redirect()->back()->with('error',"please enter currect email and password");
        } 
    }

}
