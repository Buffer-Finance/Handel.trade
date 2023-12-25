import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect, usePublicClient } from 'wagmi';
import { MarketListing } from '../MarketListing';
import { ShareManagementDrawer } from '../../components/ShareManagementDrawer';
import useUserState from '../../atoms/userState';
import useDrawerState from '../../atoms/drawerState';

const Onboarding: React.FC<any> = ({}) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { waitForTransactionReceipt } = usePublicClient();
  const [userState] = useUserState();
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const drawerManager = useDrawerState();
  useEffect(() => {
    console.log(`Onboarding-userState: `, userState);
  }, [userState]);
  useEffect(() => {
    if (!address) {
      navigate('/login');
    }
  }, [address]);
  return (
    <div className="w-full h-full bg-2b">
      <MarketListing />
      {drawerManager.drawerState?.screen ? <ShareManagementDrawer /> : null}
    </div>
  );
};

export { Onboarding };
