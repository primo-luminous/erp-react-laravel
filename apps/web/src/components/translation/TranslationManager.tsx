/**
 * Translation Manager Component
 * 
 * Component สำหรับจัดการการแปลภาษาของข้อมูลใน database
 */

import React, { useState, useEffect } from 'react'
import { useTranslation, useModelTranslation } from '../../hooks/useTranslation'
import { translationService } from '../../services/TranslationService'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface TranslationManagerProps {
  modelType: string
  modelId: number
  field: string
  originalValue: string
  className?: string
}

export function TranslationManager({
  modelType,
  modelId,
  field,
  originalValue,
  className = '',
}: TranslationManagerProps) {
  const [currentLocale, setCurrentLocale] = useState('th')
  const [supportedLocales, setSupportedLocales] = useState<string[]>(['th', 'en', 'zh'])
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const {
    translation,
    isLoading,
    error,
    setTranslation,
    refresh,
  } = useTranslation({
    modelType,
    modelId,
    field,
    locale: currentLocale,
  })

  useEffect(() => {
    // Load supported locales
    translationService.getSupportedLocales().then(setSupportedLocales)
  }, [])

  useEffect(() => {
    if (isEditing) {
      setEditValue(translation || originalValue)
    }
  }, [isEditing, translation, originalValue])

  const handleSave = async () => {
    if (editValue.trim() === '') return

    try {
      await setTranslation(currentLocale, editValue.trim())
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save translation:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditValue(translation || originalValue)
  }

  const displayValue = translation || originalValue

  return (
    <div className={`translation-manager ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <select
          value={currentLocale}
          onChange={(e) => setCurrentLocale(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {supportedLocales.map((locale) => (
            <option key={locale} value={locale}>
              {locale.toUpperCase()}
            </option>
          ))}
        </select>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={refresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={`Enter translation for ${currentLocale.toUpperCase()}`}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isLoading || editValue.trim() === ''}
              size="sm"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {currentLocale.toUpperCase()} Translation:
          </div>
          <div className="text-gray-900 dark:text-gray-100">
            {isLoading ? 'Loading...' : displayValue}
          </div>
          {!translation && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              (Showing original value)
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ModelTranslationManagerProps {
  modelType: string
  modelId: number
  fields: string[]
  originalData: Record<string, string>
  className?: string
}

export function ModelTranslationManager({
  modelType,
  modelId,
  fields,
  originalData,
  className = '',
}: ModelTranslationManagerProps) {
  const [currentLocale, setCurrentLocale] = useState('th')
  const [supportedLocales, setSupportedLocales] = useState<string[]>(['th', 'en', 'zh'])
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  const {
    translations,
    isLoading,
    error,
    setTranslations,
    refresh,
  } = useModelTranslation({
    modelType,
    modelId,
    locale: currentLocale,
  })

  useEffect(() => {
    // Load supported locales
    translationService.getSupportedLocales().then(setSupportedLocales)
  }, [])

  useEffect(() => {
    // Initialize edit values
    const values: Record<string, string> = {}
    fields.forEach((field) => {
      values[field] = translations[field] || originalData[field] || ''
    })
    setEditValues(values)
  }, [fields, translations, originalData, currentLocale])

  const handleEditField = (field: string) => {
    setEditingField(field)
    setEditValues(prev => ({
      ...prev,
      [field]: translations[field] || originalData[field] || ''
    }))
  }

  const handleSaveField = async (field: string) => {
    try {
      await setTranslations(field, {
        [currentLocale]: editValues[field]
      })
      setEditingField(null)
    } catch (error) {
      console.error('Failed to save translation:', error)
    }
  }

  const handleCancelEdit = (field: string) => {
    setEditingField(null)
    setEditValues(prev => ({
      ...prev,
      [field]: translations[field] || originalData[field] || ''
    }))
  }

  return (
    <div className={`model-translation-manager ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <select
          value={currentLocale}
          onChange={(e) => setCurrentLocale(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {supportedLocales.map((locale) => (
            <option key={locale} value={locale}>
              {locale.toUpperCase()}
            </option>
          ))}
        </select>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={refresh}
          disabled={isLoading}
        >
          Refresh All
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field) => {
          const isEditing = editingField === field
          const displayValue = translations[field] || originalData[field] || ''

          return (
            <div key={field} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {field.replace('_', ' ')}
                </h4>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={() => handleSaveField(field)}
                        disabled={isLoading}
                        size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCancelEdit(field)}
                        disabled={isLoading}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleEditField(field)}
                      disabled={isLoading}
                      size="sm"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <Input
                  value={editValues[field] || ''}
                  onChange={(e) => setEditValues(prev => ({
                    ...prev,
                    [field]: e.target.value
                  }))}
                  placeholder={`Enter translation for ${field} in ${currentLocale.toUpperCase()}`}
                  className="w-full"
                />
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {currentLocale.toUpperCase()} Translation:
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    {isLoading ? 'Loading...' : displayValue}
                  </div>
                  {!translations[field] && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      (Showing original value)
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
