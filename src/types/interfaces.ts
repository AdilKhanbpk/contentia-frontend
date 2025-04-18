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
    settings: {
        isNotificationOn: boolean;
    }
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
    assignedCreators: string[] | CreatorInterface[] | [{
        _id: string;
        fullName: string;
        email: string;
    }];
    appliedCreators: string[] | CreatorInterface[];
    associatedBrands?: {
        brandName: string;
        brandImage: string;
    };
    profilePic?: string;
    noOfUgc: number;
    totalPrice: number;
    basePrice?: number;
    totalPriceForCustomer?: number;
    totalPriceForCreator?: number;
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
        areaOfInterest?: string[];
        contentType?: string;
        addressDetails?: {
            country?: string;
            state?: string;
            district?: string;
            neighborhood?: string;
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
        uploadFiles?: [string];
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

interface BillingInformation {
    invoiceStatus?: boolean;
    trId?: string;
    address?: string;
    fullName?: string;
    companyName?: string;
    taxNumber?: string;
    taxOffice?: string;
}

export interface Customer {
    _id?: string;
    authProvider: "google" | "credentials";
    status: "approved" | "waiting" | "rejected";
    userType: string;
    role: "admin" | "user";
    profilePic?: string;
    fullName?: string;
    email: string;
    age?: number;
    phoneNumber?: string;
    customerStatus: "waiting" | "approved" | "rejected";
    password?: string;
    invoiceType?: "individual" | "institutional";
    billingInformation?: BillingInformation;
    refreshToken?: string;
    rememberMe?: boolean;
    termsAndConditionsApproved?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    // Methods
    AccessToken(): string;
    RefreshToken(): string;
    ComparePassword(password: string): Promise<boolean>;
}

export interface PackageInterface {
    _id: string;
    coupon?: string;
    packageCreator: {
        _id: string;
        fullName: string;
        profilePic: string;
        email: string;
    };
    packageCustomer: {
        _id: string;
        fullName: string;
        profilePic: string;
        email: string;
    },
    noOfUgc: number;
    packageTotalPrice: number;
    packageStatus: "pending" | "active" | "completed" | "cancelled" | "revision";
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
    numberOfRequests?: number;
    orderQuota?: number;
    quotaLeft?: number;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface BlogInterface {
    _id: string;
    status: string;
    title: string;
    category: string;
    bannerImage: FileList | string;
    content: string;
    metaDescription: string;
    metaKeywords: string[];
    createdAt: string;
    updatedAt: string;
    author: {
        billingInformation: {
            invoiceStatus: boolean;
            trId: string;
            address: string;
            fullName: string;
            companyName: string;
            taxNumber: string;
            taxOffice: string;
        };
        _id: string;
        profilePic: string;
        authProvider: string;
        status: string;
        userType: string;
        role: string;
        email: string;
        customerStatus: string;
        password: string;
        rememberMe: boolean;
        termsAndConditionsApproved: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
        age: number;
        fullName: string;
        invoiceType: string;
        phoneNumber: string;
    };
}

export interface EmailNotificationInterface {
    _id?: string,
    userType: 'all' | 'all-creators' | 'all-customers' | 'some-creators' | 'some-customers',
    emailTitle: string,
    emailContent: string,
    users: string[],
    createdAt?: string,
    updatedAt?: string,

}

export interface TermsInterface {
    _id: string;
    pageTitle: string;
    pageContent: string;
    pageCategory: "creator" | "customer";
    pageSlug: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface FilesInterface {
    creatorId: string;
    fullName: string;
    email: string;
    profilePic: string;
    orderId: string;
    googleDriveUrl: string;
}

export interface ClaimInterface {
    _id: string;
    status: "pending" | "approved" | "rejected";
    customer: {
        _id?: string;
        fullName?: string;
        email?: string;
        profilePic?: string;
    };
    creator: {
        _id?: string;
        fullName?: string;
        email?: string;
        profilePic?: string;
    };
    order: {
        _id?: string;
    };
    claimDate?: Date | string;
    claimContent: string;
}