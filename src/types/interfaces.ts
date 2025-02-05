export interface CreatorInterface {
    _id: string;
    fullName: string;
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    profilePic?: string;
    isVerified: "pending" | "approved" | "rejected";
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    addressDetails: {
        fullAddress: string;
        state: string;
        country: string;
        district: string;
        neighborhood: string;
    };
    paymentInformation: {
        ibanNumber?: string;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    billingInformation: {
        invoiceStatus: boolean;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    preferences: {
        contentInformation: {
            contentType: ("product" | "service" | "location")[];
            creatorType: "nano" | "micro";
            contentFormats: string[];
            areaOfInterest: string[];
            addressDetails: {
                country: string;
                state: string;
                district: string;
                neighborhood?: string;
                fullAddress: string;
            };
        };
        socialInformation: {
            contentType: "yes" | "no";
            platforms: {
                Instagram?: {
                    followers: number;
                    username: string;
                };
                TikTok?: {
                    followers: number;
                    username: string;
                };
                Facebook?: {
                    followers: number;
                    username: string;
                };
                Youtube?: {
                    followers: number;
                    username: string;
                };
                X?: {
                    followers: number;
                    username: string;
                };
                Linkedin?: {
                    followers: number;
                    username: string;
                };
            };
            portfolioLink?: string[];
        };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
}

export interface ProfileFormInputs {
    fullName: string;
    password: string;
    email: string;
    phoneNumber: string;
    tckn: string;
    dateOfBirth: string;
    gender?: string;

    addressDetails: {
        addressOne: string;
        addressTwo: string;
        country: string;
        zipCode: number;
    };
}

export interface PaymentInformationFormValues {
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    paymentInformation: {
        ibanNumber: string;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    billingInformation: {
        invoiceStatus: boolean;
        ibanNumber: string;
        trId?: string;
        address: string;
        fullName?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
}


export interface OrderInterface {
    _id: string;
    coupon?: string;
    orderOwner: {
        _id: string;
        fullName: string;
        email: string;
    };
    assignedCreators: string[] | CreatorInterface[];
    appliedCreators: string[] | CreatorInterface[];
    profilePic?: string;
    noOfUgc: number;
    totalPrice: number;
    orderStatus: "pending" | "active" | "completed" | "cancelled" | "revision";
    paymentStatus: "paid" | "pending" | "refunded" | "cancelled";
    contentsDelivered?: number;
    additionalServices: {
        platform: string;
        duration: string;
        edit: boolean;
        aspectRatio: string;
        share?: boolean;
        coverPicture?: boolean;
        creatorType?: boolean;
        productShipping?: boolean;
    };
    preferences?: {
        creatorGender?: string;
        minCreatorAge?: number;
        maxCreatorAge?: number;
        interests?: string[];
        contentType?: string;
        locationAddress?: {
            country?: string;
            city?: string;
            district?: string;
            street?: string;
            fullAddress?: string;
        };
    };
    briefContent?: {
        brandName?: string;
        brief?: string;
        productServiceName?: string;
        productServiceDesc?: string;
        scenario?: string;
        caseStudy?: string;
        uploadFiles?: string;
        uploadFileDate?: string;
    };
    numberOfRequests?: number;
    orderQuota?: number;
    quotaLeft?: number;
    uploadFiles?: Array<{
        uploadedBy: string;
        fileUrls: string[];
        uploadedDate: Date;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}