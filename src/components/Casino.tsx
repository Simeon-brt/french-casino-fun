
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SlotMachine from './SlotMachine';
import DiceGame from './DiceGame';
import CreditDisplay from './CreditDisplay';
import { Dices, Heart } from 'lucide-react';

const Casino = () => {
  const [credits, setCredits] = useState(1000);
  const [currentGame, setCurrentGame] = useState<'slots' | 'dice'>('slots');

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const subtractCredits = (amount: number) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-casino-dark via-slate-900 to-casino-dark p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold casino-gradient bg-clip-text text-transparent mb-4">
            ✨ CASINO ROYAL ✨
          </h1>
          <p className="text-casino-gold/80 text-xl">
            Tentez votre chance et remportez le jackpot !
          </p>
        </div>

        {/* Credits Display */}
        <div className="mb-8">
          <CreditDisplay credits={credits} />
        </div>

        {/* Game Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setCurrentGame('slots')}
            variant={currentGame === 'slots' ? 'default' : 'outline'}
            className="casino-gradient text-casino-dark font-bold px-8 py-3"
          >
            <Heart className="mr-2 h-5 w-5" />
            Machine à Sous
          </Button>
          <Button
            onClick={() => setCurrentGame('dice')}
            variant={currentGame === 'dice' ? 'default' : 'outline'}
            className="casino-gradient text-casino-dark font-bold px-8 py-3"
          >
            <Dices className="mr-2 h-5 w-5" />
            Jeu de Dés
          </Button>
        </div>

        {/* Game Area */}
        <div className="flex justify-center">
          {currentGame === 'slots' ? (
            <SlotMachine 
              credits={credits}
              onWin={addCredits}
              onBet={subtractCredits}
            />
          ) : (
            <DiceGame
              credits={credits}
              onWin={addCredits}
              onBet={subtractCredits}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-casino-gold/60">
          <p>🎰 Jouez de manière responsable 🎰</p>
        </div>
      </div>
    </div>
  );
};

export default Casino;
