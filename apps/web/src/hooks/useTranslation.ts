/**
 * useTranslation Hook
 * 
 * Hook สำหรับจัดการการแปลภาษาของข้อมูลใน database
 */

import { useState, useEffect, useCallback } from 'react'
import { translationService } from '../services/TranslationService'

interface UseTranslationOptions {
  modelType: string
  modelId: number
  field: string
  locale?: string
  autoLoad?: boolean
}

interface UseTranslationReturn {
  translation: string | null
  originalValue: string
  isLoading: boolean
  error: string | null
  setTranslation: (locale: string, value: string) => Promise<void>
  setTranslations: (translations: Record<string, string>) => Promise<void>
  refresh: () => Promise<void>
}

export function useTranslation({
  modelType,
  modelId,
  field,
  locale,
  autoLoad = true,
}: UseTranslationOptions): UseTranslationReturn {
  const [translation, setTranslationValue] = useState<string | null>(null)
  const [originalValue, setOriginalValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTranslation = useCallback(async () => {
    if (!modelType || !modelId || !field) return

    try {
      setIsLoading(true)
      setError(null)

      const result = await translationService.getTranslation({
        model_type: modelType,
        model_id: modelId,
        field,
        locale,
      })

      setTranslationValue(result.translation)
      setOriginalValue(result.original_value)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load translation')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, field, locale])

  const setTranslation = useCallback(async (locale: string, value: string) => {
    try {
      setIsLoading(true)
      setError(null)

      await translationService.setTranslation({
        model_type: modelType,
        model_id: modelId,
        field,
        locale,
        value,
      })

      // Refresh the translation
      await loadTranslation()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save translation')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, field, loadTranslation])

  const setTranslations = useCallback(async (translations: Record<string, string>) => {
    try {
      setIsLoading(true)
      setError(null)

      await translationService.setTranslations({
        model_type: modelType,
        model_id: modelId,
        field,
        translations,
      })

      // Refresh the translation
      await loadTranslation()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save translations')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, field, loadTranslation])

  const refresh = useCallback(async () => {
    await loadTranslation()
  }, [loadTranslation])

  useEffect(() => {
    if (autoLoad) {
      loadTranslation()
    }
  }, [autoLoad, loadTranslation])

  return {
    translation,
    originalValue,
    isLoading,
    error,
    setTranslation,
    setTranslations,
    refresh,
  }
}

interface UseModelTranslationOptions {
  modelType: string
  modelId: number
  locale?: string
  autoLoad?: boolean
}

interface UseModelTranslationReturn {
  translations: Record<string, string>
  isLoading: boolean
  error: string | null
  setTranslations: (field: string, translations: Record<string, string>) => Promise<void>
  setModelTranslations: (translations: Record<string, Record<string, string>>) => Promise<void>
  refresh: () => Promise<void>
}

export function useModelTranslation({
  modelType,
  modelId,
  locale,
  autoLoad = true,
}: UseModelTranslationOptions): UseModelTranslationReturn {
  const [translations, setTranslationsValue] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTranslations = useCallback(async () => {
    if (!modelType || !modelId) return

    try {
      setIsLoading(true)
      setError(null)

      const result = await translationService.getModelTranslations({
        model_type: modelType,
        model_id: modelId,
        locale,
      })

      setTranslationsValue(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load translations')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, locale])

  const setTranslations = useCallback(async (field: string, translations: Record<string, string>) => {
    try {
      setIsLoading(true)
      setError(null)

      await translationService.setTranslations({
        model_type: modelType,
        model_id: modelId,
        field,
        translations,
      })

      // Refresh the translations
      await loadTranslations()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save translations')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, loadTranslations])

  const setModelTranslations = useCallback(async (translations: Record<string, Record<string, string>>) => {
    try {
      setIsLoading(true)
      setError(null)

      await translationService.setTranslatedModel(modelType, modelId, translations)

      // Refresh the translations
      await loadTranslations()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save model translations')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId, loadTranslations])

  const refresh = useCallback(async () => {
    await loadTranslations()
  }, [loadTranslations])

  useEffect(() => {
    if (autoLoad) {
      loadTranslations()
    }
  }, [autoLoad, loadTranslations])

  return {
    translations,
    isLoading,
    error,
    setTranslations,
    setModelTranslations,
    refresh,
  }
}

interface UseTranslationStatsOptions {
  modelType: string
  modelId: number
  autoLoad?: boolean
}

interface UseTranslationStatsReturn {
  stats: Record<string, any>
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useTranslationStats({
  modelType,
  modelId,
  autoLoad = true,
}: UseTranslationStatsOptions): UseTranslationStatsReturn {
  const [stats, setStats] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!modelType || !modelId) return

    try {
      setIsLoading(true)
      setError(null)

      const result = await translationService.getTranslationStats({
        model_type: modelType,
        model_id: modelId,
      })

      setStats(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load translation stats')
    } finally {
      setIsLoading(false)
    }
  }, [modelType, modelId])

  const refresh = useCallback(async () => {
    await loadStats()
  }, [loadStats])

  useEffect(() => {
    if (autoLoad) {
      loadStats()
    }
  }, [autoLoad, loadStats])

  return {
    stats,
    isLoading,
    error,
    refresh,
  }
}
