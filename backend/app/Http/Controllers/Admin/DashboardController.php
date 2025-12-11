<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Article;
use App\Models\Service;
use App\Models\Contact;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'projects' => Project::count(),
            'articles' => Article::count(),
            'published_articles' => Article::published()->count(),
            'services' => Service::count(),
            'contacts' => Contact::count(),
            'unread_contacts' => Contact::unread()->count(),
        ];

        $recentContacts = Contact::recent()->take(5)->get();
        $recentArticles = Article::orderBy('created_at', 'desc')->take(5)->get();

        return view('admin.dashboard', compact('stats', 'recentContacts', 'recentArticles'));
    }
}
