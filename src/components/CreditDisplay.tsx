
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface CreditDisplayProps {
  credits: number;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits }) => {
  return (
    <Card className="casino-glow bg-gradient-to-r from-casino-red to-casino-gold p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center gap-4">
        <DollarSign className="h-8 w-8 text-casino-dark" />
        <div className="text-center">
          <p className="text-casino-dark font-semibold text-lg">Vos Crédits</p>
          <p className="text-4xl font-bold text-casino-dark">
            {credits.toLocaleString()}
          </p>
        </div>
        <DollarSign className="h-8 w-8 text-casino-dark" />
      </div>
    </Card>
  );
};

export default CreditDisplay;
