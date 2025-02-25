'use client';

import { Users, DollarSign, Truck } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: '1M+ Customers',
      description: 'Quality, Privacy, Secure.',
      bgColor: 'bg-[#34656d]',
      iconColor: 'text-white',
    },
    {
      icon: DollarSign,
      title: 'Very Low Prices',
      description: 'Best price in the world!',
      bgColor: 'bg-[#88bdbc]',
      iconColor: 'text-white',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: '100% Guarantee. Free Airmail shipping.',
      bgColor: 'bg-[#f76c6c]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="w-full py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 rounded-lg border-2 border-gray-100 bg-white"
              >
                <div
                  className={`${feature.bgColor} p-3 rounded-full flex items-center justify-center`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm font-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
