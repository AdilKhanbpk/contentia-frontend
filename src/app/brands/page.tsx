import Image from 'next/image'

export default function BrandsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply" />
                    <Image
                        src="/whyContentia.png"
                        alt="Brand Collaboration"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Transform Your Brand's Content Strategy
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
                        Connect with top creators and elevate your brand's presence across all platforms
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                        Get Started Today
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Why Choose Contentia
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Quality Content Creation",
                                description: "Access a network of verified creators who deliver high-quality, engaging content.",
                                icon: "/check.png"
                            },
                            {
                                title: "Streamlined Collaboration",
                                description: "Manage all your content projects in one place with our intuitive platform.",
                                icon: "/usersIcon.svg"
                            },
                            {
                                title: "Data-Driven Results",
                                description: "Track performance and ROI with comprehensive analytics and reporting.",
                                icon: "/roiImage.jpg"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <Image src={feature.icon} alt="" width={24} height={24} style={{ width: 'auto' }} />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Create Your Brief",
                                description: "Define your content needs and requirements"
                            },
                            {
                                step: "2",
                                title: "Match with Creators",
                                description: "Get paired with creators that match your brand"
                            },
                            {
                                step: "3",
                                title: "Review & Approve",
                                description: "Review content and request revisions if needed"
                            },
                            {
                                step: "4",
                                title: "Publish & Track",
                                description: "Share content and monitor performance"
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Trusted by Leading Brands
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((testimonial) => (
                            <div key={testimonial} className="bg-gray-50 p-8 rounded-2xl">
                                <div className="flex items-center mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Image
                                            key={star}
                                            src="/starIcon.svg"
                                            alt="star"
                                            width={20}
                                            height={20}
                                            style={{ width: 'auto' }}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">
                                    "Contentia has transformed how we approach content creation. The quality of creators and ease of collaboration is unmatched."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                                    <div>
                                        <h4 className="font-semibold">Marketing Director</h4>
                                        <p className="text-gray-500">Global Brand</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Ready to Transform Your Content Strategy?
                    </h2>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                        Join thousands of brands creating exceptional content with Contentia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all">
                            Get Started
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
                            Schedule a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { number: "1000+", label: "Active Creators" },
                            { number: "50K+", label: "Content Pieces Delivered" },
                            { number: "98%", label: "Client Satisfaction" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
