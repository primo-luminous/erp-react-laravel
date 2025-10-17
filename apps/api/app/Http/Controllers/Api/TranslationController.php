<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TranslationController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    /**
     * Get translation for a specific model field
     */
    public function getTranslation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'field' => 'required|string',
            'locale' => 'nullable|string|in:th,en,zh',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $modelClass = $request->model_type;
            $model = $modelClass::findOrFail($request->model_id);
            
            $translation = $this->translationService->getTranslation(
                $model,
                $request->field,
                $request->locale
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'translation' => $translation,
                    'original_value' => $model->getAttribute($request->field),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get translation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set translation for a specific model field
     */
    public function setTranslation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'field' => 'required|string',
            'locale' => 'required|string|in:th,en,zh',
            'value' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $modelClass = $request->model_type;
            $model = $modelClass::findOrFail($request->model_id);
            
            $this->translationService->setTranslation(
                $model,
                $request->field,
                $request->locale,
                $request->value
            );

            return response()->json([
                'success' => true,
                'message' => 'Translation saved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save translation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set multiple translations for a model field
     */
    public function setTranslations(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'field' => 'required|string',
            'translations' => 'required|array',
            'translations.*' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $modelClass = $request->model_type;
            $model = $modelClass::findOrFail($request->model_id);
            
            $this->translationService->setTranslations(
                $model,
                $request->field,
                $request->translations
            );

            return response()->json([
                'success' => true,
                'message' => 'Translations saved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save translations',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all translations for a model
     */
    public function getModelTranslations(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'locale' => 'nullable|string|in:th,en,zh',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $modelClass = $request->model_type;
            $model = $modelClass::findOrFail($request->model_id);
            
            $translations = $this->translationService->getModelTranslations(
                $model,
                $request->locale
            );

            return response()->json([
                'success' => true,
                'data' => $translations,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get translations',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get translation statistics
     */
    public function getTranslationStats(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $modelClass = $request->model_type;
            $model = $modelClass::findOrFail($request->model_id);
            
            $stats = $this->translationService->getTranslationStats($model);

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get translation stats',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get supported locales
     */
    public function getSupportedLocales(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->translationService->getSupportedLocales(),
        ]);
    }

    /**
     * Clear translation cache
     */
    public function clearCache(Request $request): JsonResponse
    {
        try {
            if ($request->has('model_type') && $request->has('model_id')) {
                $modelClass = $request->model_type;
                $model = $modelClass::findOrFail($request->model_id);
                $this->translationService->clearCacheForModel($model);
            } else {
                $this->translationService->clearAllCache();
            }

            return response()->json([
                'success' => true,
                'message' => 'Cache cleared successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cache',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
