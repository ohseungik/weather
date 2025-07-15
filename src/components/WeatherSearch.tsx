"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { getKoreanCitySuggestions } from "@/app/utils/cityMapping"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  loading: boolean
}

export function WeatherSearch({ onSearch, loading }: WeatherSearchProps) {
  const [city, setCity] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCity(value)

    if (value.length > 0) {
      const citySuggestions = getKoreanCitySuggestions(value)
      setSuggestions(citySuggestions)
      setShowSuggestions(citySuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion)
  }

  // 외부 클릭 시 제안 목록 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={inputRef}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="도시 이름을 입력하세요 (예: 서울, 도쿄, 뉴욕)"
            value={city}
            onChange={handleInputChange}
            className="flex-1 bg-white/90 backdrop-blur-sm border-white/20 placeholder:text-gray-500"
            disabled={loading}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
          />

          {/* 검색 제안 목록 */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || !city.trim()}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
