// Mock data for landing page when API fails
export const mockLandingPageData = {
  _id: "mock-landing-page-id",
  carouselHeroTitle: "UGC İçeriklerinizi",
  staticHeroTitle: "Oluşturun",
  heroSubTitle: "Markanızı gerçek kullanıcılar tarafından üretilen içeriklerle tanıştırarak influencer pazarlamasını en üst düzeye çıkarın.",
  videos: [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  ]
};

// Mock data for pricing plans when API fails
export const mockPricingData = [
  {
    _id: "mock-pricing-id-1",
    title: "Başlangıç Paketi",
    description: "Markanız için temel UGC içerik paketi",
    videoCount: 1,
    finalPrice: 3000,
    features: ["15s-60s video", "Düzenleme seçeneği", "Farklı en-boy oranları"]
  },
  {
    _id: "mock-pricing-id-2",
    title: "Standart Paket",
    description: "Markanız için kapsamlı UGC içerik paketi",
    videoCount: 3,
    finalPrice: 8000,
    features: ["15s-60s video", "Düzenleme seçeneği", "Farklı en-boy oranları", "Sosyal medya paylaşımı"]
  },
  {
    _id: "mock-pricing-id-3",
    title: "Premium Paket",
    description: "Markanız için tam kapsamlı UGC içerik paketi",
    videoCount: 5,
    finalPrice: 12000,
    features: ["15s-60s video", "Düzenleme seçeneği", "Farklı en-boy oranları", "Sosyal medya paylaşımı", "Kapak görseli"]
  },
  {
    _id: "mock-pricing-id-4",
    title: "Kurumsal Paket",
    description: "Büyük markalar için özel UGC içerik paketi",
    videoCount: 10,
    finalPrice: 20000,
    features: ["15s-60s video", "Düzenleme seçeneği", "Farklı en-boy oranları", "Sosyal medya paylaşımı", "Kapak görseli", "Özel içerik stratejisi"]
  }
];

// Mock data for additional services when API fails
export const mockAdditionalServicesData = {
  _id: "mock-additional-services-id",
  editPrice: 500,
  sharePrice: 750,
  coverPicPrice: 300,
  creatorTypePrice: 1000,
  shippingPrice: 250,
  thirtySecondDurationPrice: 500,
  sixtySecondDurationPrice: 1000
};
