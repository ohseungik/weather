import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wind, Eye, Gauge, MapPin, Sunrise, Sunset, Thermometer, Navigation } from "lucide-react"
import type { WeatherData } from "@/app/page"

interface CurrentWeatherProps {
  data: WeatherData
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { location, current } = data

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWindDirection = (degrees: number) => {
    const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"]
    return directions[Math.round(degrees / 45) % 8]
  }

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <MapPin className="h-5 w-5" />
            {location.name}, {location.country}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 mb-6">
            <img
              src={getWeatherIcon(current.weather.icon) || "/placeholder.svg"}
              alt={current.weather.description}
              className="w-24 h-24"
            />
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-2">{Math.round(current.temp)}°C</div>
              <div className="text-xl text-gray-600 capitalize mb-1">{current.weather.description}</div>
              <div className="text-sm text-gray-500">체감온도 {Math.round(current.feels_like)}°C</div>
            </div>
          </div>

          <div className="text-center mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
              {current.weather.main}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature Details */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              <Thermometer className="h-5 w-5" />
              온도 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">현재 온도</span>
              <span className="font-semibold text-lg">{Math.round(current.temp)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">체감 온도</span>
              <span className="font-semibold text-lg">{Math.round(current.feels_like)}°C</span>
            </div>
          </CardContent>
        </Card>

        {/* Wind Information */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              <Wind className="h-5 w-5" />
              바람 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">풍속</span>
              <span className="font-semibold">{current.wind_speed} m/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">풍향</span>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4" style={{ transform: `rotate(${current.wind_deg}deg)` }} />
                <span className="font-semibold">{getWindDirection(current.wind_deg)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atmospheric Conditions */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              <Gauge className="h-5 w-5" />
              대기 상태
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">습도</span>
              </div>
              <span className="font-semibold">{current.humidity}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-orange-500" />
                <span className="text-gray-600">기압</span>
              </div>
              <span className="font-semibold">{current.pressure} hPa</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">가시거리</span>
              </div>
              <span className="font-semibold">{(current.visibility / 1000).toFixed(1)} km</span>
            </div>
          </CardContent>
        </Card>

        {/* Sun Information */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              <Sunrise className="h-5 w-5" />
              일출/일몰
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sunrise className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-600">일출</span>
              </div>
              <span className="font-semibold">{formatTime(current.sunrise)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sunset className="h-4 w-4 text-orange-500" />
                <span className="text-gray-600">일몰</span>
              </div>
              <span className="font-semibold">{formatTime(current.sunset)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
