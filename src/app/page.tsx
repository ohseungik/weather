"use client"

import { useState } from "react"
import { WeatherSearch } from "@/components/WeatherSearch"
import { CurrentWeather } from "@/components/CurrentWeather"
import { Card } from "@/components/ui/card"
import { CloudSun } from "lucide-react"

export interface WeatherData {
  location: {
    name: string
    country: string
    originalQuery?: string
  }
  current: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: {
      main: string
      description: string
      icon: string
    }
    sunrise: number
    sunset: number
  }
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (city: string) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "날씨 정보를 가져올 수 없습니다")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="h-10 w-10 text-white" />
            <h1 className="text-4xl font-bold text-white">날씨 앱</h1>
          </div>
          <p className="text-blue-100 text-lg">한국어로 도시를 검색하여 실시간 날씨 정보를 확인하세요</p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <WeatherSearch onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <Card className="max-w-md mx-auto mb-8 p-4 bg-red-50 border-red-200">
            <p className="text-red-600 text-center">{error}</p>
          </Card>
        )}

        {/* Weather Content */}
        {weatherData && (
          <div className="max-w-2xl mx-auto">
            <CurrentWeather data={weatherData} />
          </div>
        )}

        {/* Welcome Message */}
        {!weatherData && !loading && !error && (
          <Card className="max-w-md mx-auto p-8 text-center bg-white/90 backdrop-blur-sm">
            <CloudSun className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">한국어로 도시를 검색해보세요</h2>
            <p className="text-gray-600 mb-4">한국어 도시명을 입력하여 날씨를 확인할 수 있습니다.</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <strong>예시:</strong>
              </p>
              <p>서울, 부산, 도쿄, 뉴욕, 런던, 파리</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
