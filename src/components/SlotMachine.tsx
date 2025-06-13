
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Gift, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface SlotMachineProps {
  credits: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => boolean;
}

const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐'];
const iconComponents = [Heart, Gift, DollarSign];

const SlotMachine: React.FC<SlotMachineProps> = ({ credits, onWin, onBet }) => {
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(10);

  const spin = async () => {
    if (!onBet(betAmount)) {
      toast.error('Crédits insuffisants !');
      return;
    }

    setIsSpinning(true);
    
    // Animation de rotation
    setTimeout(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(newReels);
      
      // Vérifier les gains
      const winAmount = calculateWin(newReels, betAmount);
      if (winAmount > 0) {
        onWin(winAmount);
        toast.success(`🎉 Vous avez gagné ${winAmount} crédits !`);
      } else {
        toast.info('Pas de chance cette fois !');
      }
      
      setIsSpinning(false);
    }, 2000);
  };

  const calculateWin = (reels: string[], bet: number): number => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      // Trois symboles identiques
      switch (reels[0]) {
        case '💎': return bet * 50;
        case '⭐': return bet * 20;
        case '🍇': return bet * 10;
        default: return bet * 5;
      }
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      // Deux symboles identiques
      return bet * 2;
    }
    return 0;
  };

  return (
    <Card className="bg-gradient-to-b from-casino-red to-red-900 p-8 casino-glow max-w-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-casino-gold mb-2">🎰 MACHINE À SOUS 🎰</h2>
        <p className="text-casino-gold/80">Alignez 3 symboles pour gagner !</p>
      </div>

      {/* Reels */}
      <div className="flex justify-center gap-4 mb-8">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl border-4 border-casino-gold ${
              isSpinning ? 'spin-animation' : ''
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Bet Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => setBetAmount(10)}
          variant={betAmount === 10 ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          10
        </Button>
        <Button
          onClick={() => setBetAmount(50)}
          variant={betAmount === 50 ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          50
        </Button>
        <Button
          onClick={() => setBetAmount(100)}
          variant={betAmount === 100 ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          100
        </Button>
      </div>

      {/* Spin Button */}
      <div className="text-center">
        <Button
          onClick={spin}
          disabled={isSpinning || credits < betAmount}
          className="casino-gradient text-casino-dark font-bold text-xl px-8 py-4 text-2xl"
        >
          {isSpinning ? '🎰 EN COURS...' : `🎰 JOUER (${betAmount} crédits)`}
        </Button>
      </div>

      {/* Paytable */}
      <div className="mt-6 text-casino-gold/80 text-sm">
        <p className="font-bold mb-2">💰 GAINS :</p>
        <p>💎💎💎 = x50 | ⭐⭐⭐ = x20 | 🍇🍇🍇 = x10</p>
        <p>Autres triplets = x5 | Paires = x2</p>
      </div>
    </Card>
  );
};

export default SlotMachine;
