// 한국어 도시명을 영어로 매핑하는 테이블
export const koreanCityMapping: Record<string, string> = {
  // 한국 주요 도시
  서울: "Seoul",
  부산: "Busan",
  대구: "Daegu",
  인천: "Incheon",
  광주: "Gwangju",
  대전: "Daejeon",
  울산: "Ulsan",
  수원: "Suwon",
  고양: "Goyang",
  용인: "Yongin",
  창원: "Changwon",
  성남: "Seongnam",
  청주: "Cheongju",
  부천: "Bucheon",
  화성: "Hwaseong",
  남양주: "Namyangju",
  전주: "Jeonju",
  천안: "Cheonan",
  안산: "Ansan",
  안양: "Anyang",
  포항: "Pohang",
  의정부: "Uijeongbu",
  원주: "Wonju",
  춘천: "Chuncheon",
  진주: "Jinju",
  순천: "Suncheon",
  목포: "Mokpo",
  제주: "Jeju",
  제주도: "Jeju",

  // 세계 주요 도시
  도쿄: "Tokyo",
  오사카: "Osaka",
  교토: "Kyoto",
  요코하마: "Yokohama",
  베이징: "Beijing",
  상하이: "Shanghai",
  홍콩: "Hong Kong",
  타이베이: "Taipei",
  방콕: "Bangkok",
  싱가포르: "Singapore",
  쿠알라룸푸르: "Kuala Lumpur",
  자카르타: "Jakarta",
  마닐라: "Manila",
  하노이: "Hanoi",
  호치민: "Ho Chi Minh City",
  뉴욕: "New York",
  로스앤젤레스: "Los Angeles",
  시카고: "Chicago",
  라스베이거스: "Las Vegas",
  샌프란시스코: "San Francisco",
  워싱턴: "Washington",
  보스턴: "Boston",
  시애틀: "Seattle",
  런던: "London",
  파리: "Paris",
  베를린: "Berlin",
  로마: "Rome",
  마드리드: "Madrid",
  바르셀로나: "Barcelona",
  암스테르담: "Amsterdam",
  취리히: "Zurich",
  비엔나: "Vienna",
  프라하: "Prague",
  모스크바: "Moscow",
  상트페테르부르크: "Saint Petersburg",
  시드니: "Sydney",
  멜버른: "Melbourne",
  토론토: "Toronto",
  밴쿠버: "Vancouver",
  상파울루: "São Paulo",
  리우데자네이루: "Rio de Janeiro",
  부에노스아이레스: "Buenos Aires",
  카이로: "Cairo",
  이스탄불: "Istanbul",
  두바이: "Dubai",
  뭄바이: "Mumbai",
  델리: "Delhi",
  방갈로르: "Bangalore",
}

// 한국어 도시명을 영어로 변환하는 함수
export function translateCityName(cityName: string): string {
  const trimmedCity = cityName.trim()

  // 한국어 매핑 테이블에서 찾기
  if (koreanCityMapping[trimmedCity]) {
    return koreanCityMapping[trimmedCity]
  }

  // 매핑되지 않은 경우 원본 반환 (영어 도시명일 수 있음)
  return trimmedCity
}

// 검색 제안을 위한 한국어 도시 목록
export function getKoreanCitySuggestions(query: string): string[] {
  if (!query) return []

  const suggestions = Object.keys(koreanCityMapping).filter((city) => city.includes(query) || city.startsWith(query))

  return suggestions.slice(0, 5) // 최대 5개 제안
}
