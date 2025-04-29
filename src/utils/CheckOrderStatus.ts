export const checkStatus = (status: string) => {
    switch (status) {
        case "pending":
            return "Beklemede";
        case "active":
            return "Aktif";
        case "completed":
            return "Tamamlandı";
        case "cancelled":
            return "İptal Edildi";
        case "revision":
            return "Revizyon";
        default:
            return status;
    }
};