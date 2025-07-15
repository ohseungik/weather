import { type NextRequest, NextResponse } from "next/server"
import { translateCityName } from "@/app/utils/cityMapping"

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY || "demo_key"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// 켈빈을 섭씨로 변환하는 함수
function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "도시 이름이 필요합니다" }, { status: 400 })
  }

  try {
    // 한국어 도시명을 영어로 변환
    const translatedCity = translateCityName(city)

    // Get current weather only
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(translatedCity)}&appid=${API_KEY}&units=metric&lang=kr`,
    )

    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        return NextResponse.json({ error: `"${city}" 도시를 찾을 수 없습니다` }, { status: 404 })
      }
      throw new Error("날씨 정보를 가져올 수 없습니다")
    }

    const currentData = await currentResponse.json()

    // 온도가 켈빈 단위인 경우 섭씨로 변환
    const temp = currentData.main.temp > 200 ? kelvinToCelsius(currentData.main.temp) : currentData.main.temp
    const feels_like =
      currentData.main.feels_like > 200 ? kelvinToCelsius(currentData.main.feels_like) : currentData.main.feels_like

    // Format the response
    const weatherData = {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
        originalQuery: city, // 원본 검색어 추가
      },
      current: {
        temp: temp,
        feels_like: feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        visibility: currentData.visibility,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg || 0,
        weather: {
          main: currentData.weather[0].main,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
        },
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
      },
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API Error:", error)
    return NextResponse.json({ error: "날씨 정보를 가져오는 중 오류가 발생했습니다" }, { status: 500 })
  }
}
