<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from various sources
        $locale = $this->getLocaleFromRequest($request);
        
        // Set the application locale
        if ($locale && $this->isValidLocale($locale)) {
            App::setLocale($locale);
        }

        return $next($request);
    }

    /**
     * Get locale from request
     */
    protected function getLocaleFromRequest(Request $request): ?string
    {
        // 1. Check query parameter
        if ($request->has('locale')) {
            return $request->get('locale');
        }

        // 2. Check Accept-Language header
        $acceptLanguage = $request->header('Accept-Language');
        if ($acceptLanguage) {
            $locale = $this->parseAcceptLanguage($acceptLanguage);
            if ($locale) {
                return $locale;
            }
        }

        // 3. Check X-Locale header
        if ($request->hasHeader('X-Locale')) {
            return $request->header('X-Locale');
        }

        // 4. Check session
        if (session()->has('locale')) {
            return session()->get('locale');
        }

        return null;
    }

    /**
     * Parse Accept-Language header
     */
    protected function parseAcceptLanguage(string $acceptLanguage): ?string
    {
        $locales = explode(',', $acceptLanguage);
        
        foreach ($locales as $locale) {
            $locale = trim(explode(';', $locale)[0]);
            
            // Convert to our supported format
            if (str_starts_with($locale, 'th')) {
                return 'th';
            } elseif (str_starts_with($locale, 'zh')) {
                return 'zh';
            } elseif (str_starts_with($locale, 'en')) {
                return 'en';
            }
        }

        return null;
    }

    /**
     * Check if locale is valid
     */
    protected function isValidLocale(string $locale): bool
    {
        return in_array($locale, ['th', 'en', 'zh']);
    }
}
