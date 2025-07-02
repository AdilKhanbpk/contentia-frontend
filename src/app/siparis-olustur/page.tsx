"use client";
import React, { useState } from "react";
import TabFirst from "@/components/orders/OrderTabFirst";
import TabSecond from "@/components/orders/OrderTabSecond";
import TabThird from "@/components/orders/OrderTabThird";
import TabFourth from "@/components/orders/OrderTabFourth";

const OrderDetails = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: "Sipariş Detayları" },
        { id: 1, label: "Ödeme" },
        { id: 2, label: "UGC Brief" },
        { id: 3, label: "Tercihler" },
    ];

    return (
        <div className='sectionBackground pb-4'>
            <div className='flex px-4 sm:px-6 md:px-12 lg:px-20 space-x-8  pt-36'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`w-1/4 pt-2 pb-2 border-t-4 text-sm ${
                            activeTab === tab.id
                                ? "BlueBorder  BlueText font-bold"
                                : "pinkBorder text-gray-400"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 0 && (
                <TabFirst setActiveTab={setActiveTab}></TabFirst>
            )}
            {activeTab === 1 && (
                <TabSecond setActiveTab={setActiveTab}/>
            )}
            {activeTab === 2 && (
                <TabThird setActiveTab={setActiveTab}></TabThird>
            )}
            {activeTab === 3 && (
                <TabFourth setActiveTab={setActiveTab}></TabFourth>
            )}
        </div>
    );
};

export default OrderDetails;
