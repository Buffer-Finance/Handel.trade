import { MarketCard } from './MarketCard';

const MarketList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {markets.map((market) => (
        <MarketCard market={market} />
      ))}
    </div>
  );
};

export { MarketList };