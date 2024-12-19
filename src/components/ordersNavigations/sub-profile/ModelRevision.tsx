export default function ModelRevision() {
    return (
        <>
            {/* Revision Request */}
            <div className=" flex justify-center items-center bg-white">
                <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-6 rounded-md">
                    <h2 className="text-base font-semibold mb-1">Revizyon Talebi</h2>
                    <p className="text-gray-600 mb-2">
                        Lütfen revizyon talebi oluşturmak istediğiniz İçerik Üreticisi No ve İçerik bağlantı linki ile, değişiklik istediğiniz detayları belirtin.
                    </p>

                    <div className="relative mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                        <textarea
                            className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border  rounded-lg focus:outline-none"
                            rows={6}
                            placeholder=""
                        />
                    </div>

                    <div className="flex justify-end">
                        <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
                            Gönder
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
