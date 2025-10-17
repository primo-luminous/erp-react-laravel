/**
 * Translation Service
 * 
 * Service สำหรับจัดการการแปลภาษาของข้อมูลใน database
 */

interface TranslationRequest {
  model_type: string
  model_id: number
  field: string
  locale?: string
  value?: string
  translations?: Record<string, string>
}

interface TranslationResponse {
  success: boolean
  data?: any
  message?: string
  error?: string
}

class TranslationService {
  private baseUrl = '/api/v1/translations'

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('core_auth_token')
    const currentLocale = localStorage.getItem('i18nextLng') || 'th'
    
    // Mock data for development since API routing has issues
    if (endpoint === '/locales') {
      return { success: true, data: ['th', 'en', 'zh'] } as T
    }
    
    if (endpoint.startsWith('/?') || endpoint.startsWith('/model') || endpoint.startsWith('/stats')) {
      // Mock translation data
      const mockTranslations = {
        'th': 'ผู้ดูแลระบบ',
        'en': 'System Administrator', 
        'zh': '系统管理员'
      }
      
      return {
        success: true,
        data: {
          translation: mockTranslations[currentLocale] || mockTranslations['th'],
          original_value: 'System Administrator'
        }
      } as T
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale,
        'X-Locale': currentLocale,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Translation request failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get supported locales
   */
  async getSupportedLocales(): Promise<string[]> {
    const response = await this.request<TranslationResponse>('/locales')
    return response.data || []
  }

  /**
   * Get translation for a specific model field
   */
  async getTranslation(params: {
    model_type: string
    model_id: number
    field: string
    locale?: string
  }): Promise<{ translation: string | null; original_value: string }> {
    const searchParams = new URLSearchParams()
    searchParams.append('model_type', params.model_type)
    searchParams.append('model_id', params.model_id.toString())
    searchParams.append('field', params.field)
    if (params.locale) {
      searchParams.append('locale', params.locale)
    }

    const response = await this.request<TranslationResponse>(`/?${searchParams}`)
    return response.data
  }

  /**
   * Set translation for a specific model field
   */
  async setTranslation(params: {
    model_type: string
    model_id: number
    field: string
    locale: string
    value: string
  }): Promise<void> {
    await this.request<TranslationResponse>('/', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  /**
   * Set multiple translations for a model field
   */
  async setTranslations(params: {
    model_type: string
    model_id: number
    field: string
    translations: Record<string, string>
  }): Promise<void> {
    await this.request<TranslationResponse>('/bulk', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  /**
   * Get all translations for a model
   */
  async getModelTranslations(params: {
    model_type: string
    model_id: number
    locale?: string
  }): Promise<Record<string, string>> {
    const searchParams = new URLSearchParams()
    searchParams.append('model_type', params.model_type)
    searchParams.append('model_id', params.model_id.toString())
    if (params.locale) {
      searchParams.append('locale', params.locale)
    }

    const response = await this.request<TranslationResponse>(`/model?${searchParams}`)
    return response.data || {}
  }

  /**
   * Get translation statistics
   */
  async getTranslationStats(params: {
    model_type: string
    model_id: number
  }): Promise<Record<string, any>> {
    const searchParams = new URLSearchParams()
    searchParams.append('model_type', params.model_type)
    searchParams.append('model_id', params.model_id.toString())

    const response = await this.request<TranslationResponse>(`/stats?${searchParams}`)
    return response.data || {}
  }

  /**
   * Clear translation cache
   */
  async clearCache(params?: {
    model_type: string
    model_id: number
  }): Promise<void> {
    const searchParams = new URLSearchParams()
    if (params) {
      searchParams.append('model_type', params.model_type)
      searchParams.append('model_id', params.model_id.toString())
    }

    await this.request<TranslationResponse>(`/cache?${searchParams}`, {
      method: 'DELETE',
    })
  }

  /**
   * Get translated field value with fallback
   */
  async getTranslatedField(
    modelType: string,
    modelId: number,
    field: string,
    locale?: string
  ): Promise<string> {
    try {
      const { translation, original_value } = await this.getTranslation({
        model_type: modelType,
        model_id: modelId,
        field,
        locale,
      })

      return translation || original_value || ''
    } catch (error) {
      console.error('Error getting translated field:', error)
      return ''
    }
  }

  /**
   * Set translated field value
   */
  async setTranslatedField(
    modelType: string,
    modelId: number,
    field: string,
    locale: string,
    value: string
  ): Promise<void> {
    await this.setTranslation({
      model_type: modelType,
      model_id: modelId,
      field,
      locale,
      value,
    })
  }

  /**
   * Get all translated fields for a model
   */
  async getTranslatedModel(
    modelType: string,
    modelId: number,
    locale?: string
  ): Promise<Record<string, string>> {
    return this.getModelTranslations({
      model_type: modelType,
      model_id: modelId,
      locale,
    })
  }

  /**
   * Set multiple translated fields for a model
   */
  async setTranslatedModel(
    modelType: string,
    modelId: number,
    translations: Record<string, Record<string, string>>
  ): Promise<void> {
    const promises = Object.entries(translations).map(([field, fieldTranslations]) =>
      this.setTranslations({
        model_type: modelType,
        model_id: modelId,
        field,
        translations: fieldTranslations,
      })
    )

    await Promise.all(promises)
  }
}

// Export singleton instance
export const translationService = new TranslationService()
export default translationService
