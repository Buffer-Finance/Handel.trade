import { useEffect, useState } from 'react';
import { MarketSearchBar } from '../components/MarketSearchBar';
import { SearchTab, Tablist } from '../components/Tablist';
import { MarketList } from '../components/MarketList';
import useSearchMarket from '../atoms/marketSearch';
import axios from 'axios';
import useSWR from 'swr';
import { ListLoader } from '../components/ListLoader';
import { useAccount, useConnect, useNetwork } from 'wagmi';

const useActiveChain = () => {
  const { connectors } = useConnect();
  const account = useAccount();

  console.log(`MarketListing-account: `, account);
  useEffect(() => {
    console.log(`MarketListing-getu: `, account);
    const getu = async () => {
      const params = await connectors[0].web3AuthInstance.getUserInfo();
      console.log(`MarketListing-params: `, params, account);
    };
    if (account.address) getu();
  }, [connectors, account.address]);
};

const MarketListing: React.FC<any> = ({}) => {
  const [activeTab, setActiveTab] = useState('Top');
  const searchManager = useSearchMarket();
  const network = useActiveChain();
  const [tabs, settabs] = useState(['New', 'Top']);
  const account = useAccount();
  const net = useNetwork();
  useEffect(() => {
    if (account.address) {
      settabs((t) => {
        t.push('Mine');
        return [...new Set(t)];
      });
    }
  }, [account.address]);
  console.log(`MarketListing-network: `, net);
  return (
    <div className="px-[20px] flex flex-col gap-[10px]">
      <div className="sticky top-0 flex flex-col w-full pt-4 pb-2 bg-[#f6f7fc] gap-y-2">
        <MarketSearchBar />
        <div className="flex">
          <Tablist
            tablist={tabs}
            activeTab={searchManager.keyword ? '-1' : activeTab}
            onTabSelect={setActiveTab}
          />
          {searchManager.keyword ? (
            <SearchTab
              keyword={searchManager.keyword}
              onClose={searchManager.cancelSearch}
            />
          ) : null}
        </div>
      </div>
      {searchManager.keyword ? (
        <SearchList />
      ) : activeTab == 'New' ? (
        <New />
      ) : activeTab == 'Top' ? (
        <Top />
      ) : (
        <Mine account={account.address} />
      )}
    </div>
  );
};

export { MarketListing };
export const marketsRefreshInterval = 3000;
const New = () => {
  const { data, isLoading } = useSWR<Market[]>('dd', {
    fetcher: async () => {
      const results = await axios.get(
        'https://api-production-4b67.up.railway.app/market/list/new/400/0'
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketListing-data: `, data);
  if (!data?.length) return <ListLoader />;
  return <MarketList markets={data} />;
};
const Top = () => {
  const { data, isLoading, isValidating } = useSWR<Market[]>('ddd', {
    fetcher: async () => {
      const results = await axios.get(
        'https://api-production-4b67.up.railway.app/market/list/top/400/0'
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;

  console.log(`MarketListing-data:dd `, data);
  if (!data?.length) return <ListLoader />;
  return <MarketList markets={data} />;
};
const Mine: React.FC<{ address?: string }> = ({ address }) => {
  const ads = address || '0x8c6b7Cc652343e6a4B6CaF7F474A27D6cF8F19Ef';
  const { data, isLoading } = useSWR<Market[]>('dddd', {
    fetcher: async () => {
      const results = await axios.get(
        `https://api-production-4b67.up.railway.app/market/list/my/${ads}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketListing-data: `, data);
  return <MarketList markets={data} />;
};
const SearchList = () => {
  const searchManager = useSearchMarket();
  if (searchManager.loading) return <ListLoader />;
  console.log(`MarketListing-searchManager.markets: `, searchManager.markets);

  return <MarketList markets={searchManager.markets} />;
};
