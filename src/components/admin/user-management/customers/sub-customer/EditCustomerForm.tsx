// EditCustomerForm.tsx (120 lines)
"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the Customer interface
interface Customer {
    id: number;
    name: string;
    email: string;
    contact: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
}

interface EditCustomerFormProps {
    editingCustomer: Customer | null;
    onSubmit: SubmitHandler<Customer>;
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    reset: (values?: Customer) => void;
    errors: any;
    register: any;
    handleSubmit: any;
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({
    editingCustomer,
    onSubmit,
    setShowEditForm,
    reset,
    errors,
    register,
    handleSubmit,
}) => {
    if (!editingCustomer) return null;

    return (
        <div className="p-4 my-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
                {editingCustomer ? "Edit Customer" : "Add Customer"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        className="p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="p-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        type="text"
                        placeholder="Contact"
                        {...register("contact", { required: "Contact is required" })}
                        className="p-2 border rounded"
                    />
                    {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

                    <input
                        type="number"
                        placeholder="Age"
                        {...register("age", { valueAsNumber: true })}
                        className="p-2 border rounded"
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        {...register("country", { required: "Country is required" })}
                        className="p-2 border rounded"
                    />
                    {errors.country && <p className="text-red-500">{errors.country.message}</p>}

                    <select
                        {...register("status", { required: "Status is required" })}
                        className="p-2 border rounded"
                    >
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 ButtonBlue text-white rounded-md mr-2"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowEditForm(false);
                            reset(); // Reset form for new customer
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomerForm;
