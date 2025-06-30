"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { validateCoupon } from "@/store/features/admin/couponSlice";
import { OrderInterface } from "@/types/interfaces";
import Image from "next/image";

// Unified interface for both form inputs and payment data
interface PaymentFormData {
  // Card Information
  cardNumber: string;
  expiryDate: string; // MM/YY format for form
  cvv: string;
  nameOnCard: string;

  // Personal Information
  country: string;
  whereDidYouHear?: string;

  // Billing Information
  companyName: string;
  taxId: string;
  taxOffice?: string;
  address: string;
  email: string;
  phoneNumber: string;
  // Options
  saveCard?: boolean;
  agreement?: boolean;

}

// Interface for API payload (with split expiry date)
// interface PaymentApiData extends Omit<PaymentFormData, 'expiryDate' | 'agreement' | 'saveCard'> {
interface PaymentApiData extends Omit<PaymentFormData, 'expiryDate'> {
  expiryMonth: string;
  expiryYear: string;
  amount: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  nameOnCard: string;

}

interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  amount?: string;
  errorCode?: string;
}

interface TabSecondProps {
  setActiveTab: (id: number) => void;
}

export default function TabSecond({ setActiveTab }: TabSecondProps) {
  // State management
  const [orderDate, setOrderDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Payment processing states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [show3DModal, setShow3DModal] = useState(false);
  const [iframeHtml, setIframeHtml] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
 const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "fail">("pending");
  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponAppliedLoading, setIsCouponAppliedLoading] = useState(false);

  // Redux state
  const { data: additionalService } = useSelector((state: RootState) => state.addPrice);
  const orderFormData = useSelector<RootState, OrderInterface | null>(
    (state: RootState) => state.order.orderFormData as OrderInterface
  );
  const dispatch = useDispatch<AppDispatch>();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<PaymentFormData>();

  // Calculated values
  const basePrice = orderFormData?.basePrice || 0;
  const quantity = orderFormData?.noOfUgc || 1;
  const totalPrice = orderFormData?.totalPrice || 0;
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // Delivery date calculations
  const deliveryStartDate = new Date(orderDate);
  deliveryStartDate.setDate(deliveryStartDate.getDate() + 30);

  const deliveryEndDate = new Date(orderDate);
  deliveryEndDate.setDate(deliveryEndDate.getDate() + 35);

  // Utility functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const generateOrderId = () => `ORDER${Date.now()}`;

  // Event handlers
  const handleCalendarClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setValue('cardNumber', formatted);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsCouponAppliedLoading(true);
    setCouponError("");

    try {
      const result = await dispatch(
        validateCoupon({ code: couponCode })
      ).unwrap();

      let discountAmount = 0;
      if (result.discountTl) {
        discountAmount = result.discountTl;
      } else if (result.discountPercentage) {
        discountAmount = (totalPrice * result.discountPercentage) / 100;
      }

      const updatedFinalPrice = Math.max(0, totalPrice - discountAmount);
      setFinalPrice(updatedFinalPrice);
      setDiscount(discountAmount);
    } catch (error: any) {
      setCouponError(error.message || "Kupon kodu geçersiz");
      setDiscount(0);
      setFinalPrice(totalPrice);
    } finally {
      setIsCouponAppliedLoading(false);
    }
  };

  // Payment processing
  const processPayment = async (formData: PaymentFormData) => {
    setLoading(true);
    setResult(null);

    try {
      // Parse expiry date
      const [expiryMonth, expiryYear] = formData.expiryDate.split('/');

      if (!expiryMonth || !expiryYear) {
        throw new Error('Geçersiz son kullanma tarihi formatı');
      }

      // Prepare API payload
      const paymentData: PaymentApiData = {
        amount: finalPrice.toString(),
        orderId: generateOrderId(),
        userName: formData.companyName,
        userEmail: formData.email,
        userPhone: formData.phoneNumber,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryMonth,
        expiryYear,
        cvv: formData.cvv,
        nameOnCard: formData.nameOnCard,
        country: formData.country,
        whereDidYouHear: formData.whereDidYouHear,
        companyName: formData.companyName,
        taxId: formData.taxId,
        taxOffice: formData.taxOffice,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber,

      };

      const response = await fetch('https://contentia-backend-s4pw.onrender.com/api/paytr/direct-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      const contentType = response.headers.get('content-type');

      // 3D Secure Response
      if (contentType?.includes('text/html')) {
        let html = await response.text();

        // Add Cancel Script
        html = html.replace('</body>', `
        <script>
          document.querySelector('input[type="button"][value="Cancel"]')?.addEventListener('click', function(e) {
            window.parent.postMessage({ type: 'CANCEL_3D' }, '*');
            e.preventDefault();
          });
        </script>
      </body>`);

        html = html.replace(/target=("|')?_top("|')?/gi, 'target="_self"');

        setIframeHtml(html);
        setShow3DModal(true);

        // Auto-close iframe after 3 minutes (optional)
        setTimeout(() => {
          setShow3DModal(false);
          alert("Oturum zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }, 180000);

        return;
      }

      // Handle JSON response
      const json: PaymentResult = await response.json();
      console.log("json", json);
      setResult(json);

      if (json.success) {
        alert('Ödeme başarılı!');
        setActiveTab(2);
      } else {
        alert('Ödeme başarısız: ' + json.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Bilinmeyen hata';
      const errorResult = { success: false, message: 'Ağ hatası: ' + message };
      setResult(errorResult);
      alert('Ödeme başarısız: ' + message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PaymentFormData) => {
    if (!data.agreement) {
      alert('Lütfen mesafeli satış sözleşmesini onaylayın.');
      return;
    }
    await processPayment(data);
  };

  // Effects
  useEffect(() => {
    setFinalPrice(totalPrice);
  }, [totalPrice]);

  // Inject HTML into iframe for 3D Secure
  useEffect(() => {
    console.log("iframe",iframeRef)
    if (show3DModal && iframeRef.current && iframeHtml) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(iframeHtml);
        doc.close();
      }
    }
  }, [iframeHtml, show3DModal]);

  // Listen for 3D Secure cancel message
useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.paymentStatus === "success") {
        setPaymentStatus("success");
      } else if (event.data?.paymentStatus === "fail") {
        setPaymentStatus("fail");
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);


// In React useEffect (for iframe listener)
useEffect(() => {
  const interval = setInterval(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow?.location.href.includes('/payment/success')) {
      console.log("window")
      alert("✅ Payment successful");
        setActiveTab(2);

      setShow3DModal(false);
      clearInterval(interval);
    }
    if (iframe && iframe.contentWindow?.location.href.includes('/payment/Failed')) {
      console.log("window")

      alert("❌ Payment failed");

      setShow3DModal(false);
      clearInterval(interval);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [show3DModal]);




  // Render helper for additional services
  const renderAdditionalService = (
    name: string,
    price: number,
    pricePerUnit: string,
    condition: boolean
  ) => {
    if (!condition) return null;

    return (
      <div className='flex justify-between'>
        <div>
          <p className='font-semibold'>{name}</p>
          <p className='text-sm text-gray-500'>{pricePerUnit}</p>
        </div>
        <p className='font-semibold'>
          {(price * quantity).toLocaleString("tr-TR")} TL
        </p>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between px-4 sm:px-6 md:px-12 lg:px-24 lg:space-x-16'>
        {/* Order Summary Section */}
        <div className='w-full lg:w-3/5'>
          <div className='bg-white border rounded-lg p-6 shadow-md w-full'>
            <h2 className='text-xl font-semibold mb-4'>Sipariş Özeti</h2>

            <div className='space-y-3'>
              {/* Base Videos */}
              <div className='flex justify-between'>
                <div>
                  <p className='font-semibold'>{quantity} Video</p>
                  <p className='text-sm text-gray-500'>
                    {(basePrice / quantity).toLocaleString("tr-TR")} TL / Video
                  </p>
                </div>
                <p className='font-semibold'>
                  {basePrice.toLocaleString("tr-TR")} TL
                </p>
              </div>

              {/* Additional Services */}
              {orderFormData?.additionalServices && (
                <>
                  {renderAdditionalService(
                    "Süre (30s)",
                    additionalService?.thirtySecondDurationPrice || 0,
                    `${(additionalService?.thirtySecondDurationPrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    orderFormData.additionalServices.duration === "30s"
                  )}

                  {renderAdditionalService(
                    "Süre (60s)",
                    additionalService?.sixtySecondDurationPrice || 0,
                    `${(additionalService?.sixtySecondDurationPrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    orderFormData.additionalServices.duration === "60s"
                  )}

                  {renderAdditionalService(
                    "Düzenleme",
                    additionalService?.editPrice || 0,
                    `${(additionalService?.editPrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    !!orderFormData.additionalServices.edit
                  )}

                  {renderAdditionalService(
                    "Sosyal Medyada Paylaşım",
                    additionalService?.sharePrice || 0,
                    `${(additionalService?.sharePrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    !!orderFormData.additionalServices.share
                  )}

                  {renderAdditionalService(
                    "Kapak Görseli",
                    additionalService?.coverPicPrice || 0,
                    `${(additionalService?.coverPicPrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    !!orderFormData.additionalServices.coverPicture
                  )}

                  {renderAdditionalService(
                    "Influencer Paketi",
                    additionalService?.creatorTypePrice || 0,
                    `${(additionalService?.creatorTypePrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    !!orderFormData.additionalServices.creatorType
                  )}

                  {renderAdditionalService(
                    "Ürün Gönderimi",
                    additionalService?.shippingPrice || 0,
                    `${(additionalService?.shippingPrice || 0).toLocaleString("tr-TR")} TL / Video`,
                    !!orderFormData.additionalServices.productShipping
                  )}
                </>
              )}
            </div>

            {/* Total */}
            <div className='border-t mt-4 pt-4'>
              <div className='flex justify-between font-semibold text-lg'>
                <p>Toplam</p>
                <p>
                  {isCouponAppliedLoading ? (
                    <span className='text-gray-500 animate-pulse'>
                      Hesaplanıyor...
                    </span>
                  ) : discount > 0 ? (
                    <>
                      <span className='line-through text-gray-400 mr-2'>
                        {totalPrice.toLocaleString("tr-TR")} TL
                      </span>
                      <span>
                        {finalPrice.toLocaleString("tr-TR")} TL
                      </span>
                    </>
                  ) : (
                    `${totalPrice.toLocaleString("tr-TR")} TL`
                  )}
                </p>
              </div>
            </div>

            {/* Coupon Code */}
            <div className='mt-4'>
              <label className='block text-sm font-semibold mb-2'>
                Kupon Kodu
              </label>
              <div className='flex flex-col lg:flex-row lg:space-x-3 space-y-2 lg:space-y-0'>
                <input
                  type='text'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className='flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Kupon kodunuzu giriniz'
                  disabled={isCouponAppliedLoading}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isCouponAppliedLoading || !couponCode.trim()}
                  className={`Button text-white px-4 py-2 rounded-md font-semibold transition-opacity ${isCouponAppliedLoading || !couponCode.trim()
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-90"
                    }`}
                >
                  {isCouponAppliedLoading ? "Uygulanıyor..." : "Uygula"}
                </button>
              </div>
              {couponError && (
                <p className='text-red-500 text-sm mt-2'>{couponError}</p>
              )}
              {discount > 0 && (
                <p className='text-green-500 text-sm mt-2'>
                  {discount.toLocaleString("tr-TR")} TL indirim uygulandı!
                </p>
              )}
            </div>

            {/* Delivery Date */}
            <div className='mt-6 sectionBG p-4 rounded-lg flex items-center space-x-3 relative'>
              <div
                className='bg-indigo-600 p-2 rounded-full text-white cursor-pointer relative'
                onClick={handleCalendarClick}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 7V3m8 4V3m-8 8h8m-8 4h8M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z'
                  />
                </svg>

                {isTooltipVisible && (
                  <div className='absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10'>
                    Sipariş Tarihi + 30-35 Gün
                  </div>
                )}
              </div>

              <div className='flex flex-col sm:flex-row sm:items-center'>
                <p className='font-semibold text-sm text-indigo-600 mr-0 sm:mr-3'>
                  {formatDate(deliveryStartDate)} - {formatDate(deliveryEndDate)}
                </p>
                <p className='text-sm font-semibold border-t sm:border-t-0 sm:border-l border-gray-300 pt-2 sm:pt-0 sm:pl-4'>
                  İçeriklerinizin tahmini iletilme zamanını gösterir
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className='mt-6 lg:mt-0 w-full lg:w-2/5'>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='text-xl font-semibold mb-6'>Ödeme</h2>

            {/* Payment Result Display */}
            {result && (
              <div className={`mb-6 p-4 rounded-lg border ${result.success
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                <h3 className='font-semibold mb-1'>
                  {result.success ? 'Ödeme Başarılı!' : 'Ödeme Başarısız'}
                </h3>
                <p className='text-sm'>{result.message}</p>
                {result.transactionId && (
                  <p className='text-xs mt-1'>İşlem ID: {result.transactionId}</p>
                )}
              </div>
            )}

            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
              {/* Card Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>
                  Kart Bilgileri
                </h3>

                {/* Card Number */}
                <div>
                  <label className='block text-sm font-semibold mb-1'>
                    Kart Numarası <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='1111 2222 3333 4444'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    {...register("cardNumber", {
                      required: "Kart numarası gerekli",
                      minLength: {
                        value: 19,
                        message: "Geçersiz kart numarası"
                      }
                    })}
                    onChange={handleCardNumberChange}
                  />
                  {errors.cardNumber && (
                    <span className='text-red-500 text-sm'>
                      {errors.cardNumber.message}
                    </span>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-1'>
                      Son Kullanma <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      placeholder='MM/YY'
                      maxLength={5}
                      className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      {...register("expiryDate", {
                        required: "Son kullanma tarihi gerekli",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: "MM/YY formatında giriniz"
                        }
                      })}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        setValue('expiryDate', value);
                      }}
                    />
                    {errors.expiryDate && (
                      <span className='text-red-500 text-xs'>
                        {errors.expiryDate.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold mb-1'>
                      CVV <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      placeholder='***'
                      maxLength={4}
                      className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      {...register("cvv", {
                        required: "CVV gerekli",
                        minLength: {
                          value: 3,
                          message: "CVV en az 3 karakter olmalı"
                        },
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "Sadece rakam giriniz"
                        }
                      })}
                    />
                    {errors.cvv && (
                      <span className='text-red-500 text-xs'>
                        {errors.cvv.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className='block text-sm font-semibold mb-1'>
                    Kart Üzerindeki İsim <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Ad Soyad'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    {...register("nameOnCard", {
                      required: "Kart üzerindeki isim gerekli",
                      minLength: {
                        value: 2,
                        message: "En az 2 karakter olmalı"
                      }
                    })}
                  />
                  {errors.nameOnCard && (
                    <span className='text-red-500 text-sm'>
                      {errors.nameOnCard.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Personal Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>
                  Kişisel Bilgiler
                </h3>

                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-1'>
                      Ülke <span className='text-red-500'>*</span>
                    </label>
                    <select
                      className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      {...register("country", {
                        required: "Ülke seçimi gerekli",
                      })}
                    >
                      <option value=''>Ülke Seçiniz</option>
                      <option value='Türkiye'>Türkiye</option>
                      <option value='Diğer'>Diğer</option>
                    </select>
                    {errors.country && (
                      <span className='text-red-500 text-sm'>
                        {errors.country.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold mb-1'>
                      Contentia'yı Nereden Duydunuz?
                    </label>
                    <input
                      type='text'
                      placeholder='Opsiyonel'
                      className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      {...register("whereDidYouHear")}
                    />
                  </div>
                </div>
              </div>

              {/* Billing Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>
                  Fatura Bilgileri
                </h3>

                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-1'>
                      Ad Soyad / Şirket Ünvanı <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Ad Soyad / Şirket Ünvanı'
                      className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      {...register("companyName", {
                        required: "Bu alan zorunludur",
                        minLength: {
                          value: 2,
                          message: "En az 2 karakter olmalı"
                        }
                      })}
                    />
                    {errors.companyName && (
                      <span className='text-red-500 text-sm'>
                        {errors.companyName.message}
                      </span>
                    )}
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold mb-1'>
                        TCKN / VKN <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        placeholder='TCKN / VKN'
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        {...register("taxId", {
                          required: "TCKN / VKN gerekli",
                          minLength: {
                            value: 10,
                            message: "En az 10 karakter olmalı"
                          }
                        })}
                      />
                      {errors.taxId && (
                        <span className='text-red-500 text-sm'>
                          {errors.taxId.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-semibold mb-1'>
                        Vergi Dairesi
                      </label>
                      <input
                        type='text'
                        placeholder='Opsiyonel'
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        {...register("taxOffice")}
                      />
                    </div>
                  </div>

                </div>
              </div>
              {/* Address */}
              <div>
                <label className='block text-sm font-semibold mb-1'>
                  Adres
                </label>
                <input
                  type='text'
                  placeholder='Açık Adres'
                  className='w-full px-3 py-2 border rounded-md focus:outline-none'
                  {...register("address", {
                    required: true,
                  })}
                />
                {errors.address && (
                  <span className='text-red-500'>
                    Adres gerekli
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-semibold mb-1'>
                  E-Posta
                </label>
                <input
                  type='email'
                  placeholder='E-Posta'
                  className='w-full px-3 py-2 border rounded-md focus:outline-none'
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <span className='text-red-500'>
                    E-posta gerekli
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className='block text-sm font-semibold mb-1'>
                  Telefon Numarası
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border rounded-md focus:outline-none'
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />
                {errors.phoneNumber && (
                  <span className='text-red-500'>
                    Telefon numarası gerekli
                  </span>
                )}
              </div>

              {/* Save Card Checkbox */}
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-3 w-3 rounded border-gray-300'
                  {...register("saveCard")}
                />
                <label className='ml-2 text-sm font-semibold'>
                  Kartımı Kaydet
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full Button text-white px-4 py-2 rounded-md font-semibold'
              >
                <div className='flex flex-row space-x-8'>
                  <div className='w-1/4 flex justify-end items-center'>
                    <Image
                      src='/lockIcon.svg'
                      alt='brand logo'
                      height={20}
                      width={20}
                      className=''
                    />
                  </div>
                  <div className='w-3/4 flex justify-start items-center'>
                    Güvenli Ödeme
                  </div>
                </div>
              </button>

              {/* Agreement Checkbox */}
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300'
                  {...register("agreement", {
                    required: false,
                  })}
                />
                <label className='ml-2 text-sm font-semibold'>
                  Mesafeli Satış Sözleşmesini ve Ön
                  Bilgilendirme Formunu Onaylıyorum
                </label>
                {errors.agreement && (
                  <span className='text-red-500'>
                    Bu alan zorunludur
                  </span>
                )}
              </div>
              {show3DModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="relative bg-white rounded shadow-lg w-full max-w-md h-[500px]">
                    <div className="absolute top-2 right-2">
                      <button onClick={() => setShow3DModal(false)} className="text-red-600 text-xl font-bold px-3 py-1">×</button>
                    </div>

                    {!iframeHtml ? (
                      <div className="flex items-center justify-center h-full text-gray-600">Yükleniyor...</div>
                    ) : (
                      <iframe ref={iframeRef} title="3D Secure Verification" className="w-full h-full border-0 rounded-b" />
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}