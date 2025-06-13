
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from 'lucide-react';
import { toast } from 'sonner';

interface DiceGameProps {
  credits: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => boolean;
}

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const DiceGame: React.FC<DiceGameProps> = ({ credits, onWin, onBet }) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [betAmount, setBetAmount] = useState(20);
  const [betType, setBetType] = useState<'high' | 'low' | 'double'>('high');

  const rollDice = async () => {
    if (!onBet(betAmount)) {
      toast.error('Crédits insuffisants !');
      return;
    }

    setIsRolling(true);
    
    setTimeout(() => {
      const newDice1 = Math.floor(Math.random() * 6) + 1;
      const newDice2 = Math.floor(Math.random() * 6) + 1;
      
      setDice1(newDice1);
      setDice2(newDice2);
      
      const total = newDice1 + newDice2;
      const winAmount = calculateWin(newDice1, newDice2, total, betType, betAmount);
      
      if (winAmount > 0) {
        onWin(winAmount);
        toast.success(`🎉 Vous avez gagné ${winAmount} crédits ! (Total: ${total})`);
      } else {
        toast.info(`Pas de chance ! Total: ${total}`);
      }
      
      setIsRolling(false);
    }, 1500);
  };

  const calculateWin = (dice1: number, dice2: number, total: number, bet: string, amount: number): number => {
    switch (bet) {
      case 'high':
        return total >= 8 ? amount * 2 : 0;
      case 'low':
        return total <= 6 ? amount * 2 : 0;
      case 'double':
        return dice1 === dice2 ? amount * 6 : 0;
      default:
        return 0;
    }
  };

  const Dice1Icon = diceIcons[dice1 - 1];
  const Dice2Icon = diceIcons[dice2 - 1];

  return (
    <Card className="bg-gradient-to-b from-casino-green to-green-900 p-8 casino-glow max-w-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-casino-gold mb-2">🎲 JEU DE DÉS 🎲</h2>
        <p className="text-casino-gold/80">Pariez sur le résultat des dés !</p>
      </div>

      {/* Dice Display */}
      <div className="flex justify-center gap-8 mb-8">
        <div className={`p-4 bg-white rounded-lg ${isRolling ? 'spin-animation' : ''}`}>
          <Dice1Icon className="h-16 w-16 text-casino-dark" />
        </div>
        <div className={`p-4 bg-white rounded-lg ${isRolling ? 'spin-animation' : ''}`}>
          <Dice2Icon className="h-16 w-16 text-casino-dark" />
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-casino-gold">
          Total: {dice1 + dice2}
        </p>
      </div>

      {/* Bet Type Selection */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <Button
          onClick={() => setBetType('low')}
          variant={betType === 'low' ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          Faible (2-6)
          <br />x2
        </Button>
        <Button
          onClick={() => setBetType('high')}
          variant={betType === 'high' ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          Élevé (8-12)
          <br />x2
        </Button>
        <Button
          onClick={() => setBetType('double')}
          variant={betType === 'double' ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          Double
          <br />x6
        </Button>
      </div>

      {/* Bet Amount */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => setBetAmount(20)}
          variant={betAmount === 20 ? 'default' : 'outline'}
          className="casino-gradient text-casino-dark font-bold"
        >
          20
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

      {/* Roll Button */}
      <div className="text-center">
        <Button
          onClick={rollDice}
          disabled={isRolling || credits < betAmount}
          className="casino-gradient text-casino-dark font-bold text-xl px-8 py-4"
        >
          {isRolling ? '🎲 LANCER...' : `🎲 LANCER (${betAmount} crédits)`}
        </Button>
      </div>

      {/* Rules */}
      <div className="mt-6 text-casino-gold/80 text-sm">
        <p className="font-bold mb-2">📋 RÈGLES :</p>
        <p>Faible: Total 2-6 (x2) | Élevé: Total 8-12 (x2)</p>
        <p>Double: Même valeur sur les deux dés (x6)</p>
      </div>
    </Card>
  );
};

export default DiceGame;
