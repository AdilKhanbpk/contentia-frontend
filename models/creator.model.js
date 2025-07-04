import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const CreatorFormSchema = new mongoose.Schema(
    {
        tckn: {
            type: String,
            unique: true,
        },

        favoriteOrders: {
            type: [mongoose.Types.ObjectId],
            ref: "Order",
        },
        authProvider: {
            type: String,
            enum: ["google", "credentials", "facebook", "apple"],
            default: "credentials",
        },

        appleId: {
            type: String,
        },
        fullName: {
            type: String,
            required: [true, "Full name is required."],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required."],
        },
        userType: {
            type: String,
            enum: ["customer", "creator"],
            default: "creator",
        },
        profilePic: {
            type: String,
            default: function () {
                return `https://ui-avatars.com/api/?name=${this.fullName
                    ?.slice(0, 2)
                    .toUpperCase()}&background=4D4EC9&color=ffffff&size=128`;
            }
        },
        addressDetails: {
            addressOne: {
                type: String,
            },
            addressTwo: {
                type: String,
            },
            country: {
                type: String,
            },
            zipCode: {
                type: String,
            },
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        password: {
            type: String,
            required: function () {
                return this.authProvider === "credentials";
            },
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required."],
        },
        verificationCode: {
            type: String,
        },
        otpExpiresAt: {
            type: Date,
        },
        isPhoneVerified: {
            type: Boolean,
            default: false,
        },
        otpJobID: {
            type: String,
        },
        isVerified: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required."],
        },
        gender: {
            type: String,
        },
        accountType: {
            type: String,
            enum: ["individual", "institutional"],
        },
        paymentInformation: {
            ibanNumber: {
                type: String,
            },
            address: {
                type: String,
            },
            fullName: {
                type: String,
            },
            trId: {
                type: String,
            },
            companyName: {
                type: String,
            },
            taxNumber: {
                type: String,
            },
            taxOffice: {
                type: String,
            },
        },

        invoiceType: {
            type: String,
            enum: ["individual", "institutional"],
        },

        billingInformation: {
            invoiceStatus: {
                type: Boolean,
            },
            trId: {
                type: String,
            },
            address: {
                type: String,
            },
            fullName: {
                type: String,
            },
            companyName: {
                type: String,
            },
            taxNumber: {
                type: String,
            },
            taxOffice: {
                type: String,
            },
        },

        preferences: {
            contentInformation: {
                contentType: {
                    type: [String],
                    enum: ["product", "service", "location"],
                    required: [true, "Preferences - Content type is required."],
                },
                creatorType: {
                    type: String,
                    enum: ["nano", "micro"],
                    default: "nano",
                },
                contentFormats: [String],
                areaOfInterest: [String],
                addressDetails: {
                    country: {
                        type: String,
                    },
                    state: {
                        type: String,
                    },
                    district: {
                        type: String,
                    },
                    neighborhood: {
                        type: String,
                    },
                    fullAddress: {
                        type: String,
                    },
                },
            },
            socialInformation: {
                contentType: {
                    type: String,
                    enum: ["yes", "no"],
                },
                platforms: {
                    Instagram: {
                        followers: Number,
                        username: String,
                    },
                    TikTok: {
                        followers: Number,
                        username: String,
                    },
                    Facebook: {
                        followers: Number,
                        username: String,
                    },
                    Youtube: {
                        followers: Number,
                        username: String,
                    },
                    X: {
                        followers: Number,
                        username: String,
                    },
                    Linkedin: {
                        followers: Number,
                        username: String,
                    },
                },
                portfolioLink: [String],
            },
        },
        settings: {
            isNotificationOn: {
                type: Boolean,
                default: true
            }
        },

        userAgreement: {
            type: Boolean,
            required: [true, "User agreement is required."],
        },
        approvedCommercial: {
            type: Boolean,
            default: true,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

CreatorFormSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // if the password is modified then allow the hashed password otherwise do nothing

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

CreatorFormSchema.pre("save", function (next) {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (this.email === adminEmail) {
        this.role = "admin";
    }

    next();
});

CreatorFormSchema.methods.AccessToken = function () {
    const accessToken = jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        }
    );
    return accessToken;
};

CreatorFormSchema.methods.RefreshToken = function () {
    const refreshToken = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
        }
    );
    return refreshToken;
};

CreatorFormSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const CreatorModel = mongoose.model("Creator", CreatorFormSchema);

export default CreatorModel;
