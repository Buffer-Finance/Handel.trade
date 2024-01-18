import { useAccount, useBalance } from 'wagmi';
import PrimeFadeText from '../../components/PrimeFadeText';
import PrimeText from '../../components/PrimeText';
import { view } from '../../Helpers/bigintUtils';
import useUserState, { useOtherUserState } from '../../atoms/userState';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatAddress } from '../../Helpers/web3utils';
import { useState } from 'react';

const UserCard: React.FC<any> = () => {
  const params = useParams();
  const account = useAccount();
  const { address } = params?.user_addr
    ? { address: params.user_addr }
    : account;

  const [userState, setUserState] = params?.user_addr
    ? useOtherUserState()
    : useUserState();

  const { data, isError, isLoading } = useBalance({
    address: address,
    watch: true,
  });

  if (params?.user_addr) {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/address/${params.user_addr}`
      )
      .then((res) => {
        setUserState(res.data.data);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className="flex w-full">
        {/* profile img section */}
        <span className="flex flex-grow">
          <img
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/img_placeholder.svg';
              e.currentTarget.classList.remove('img-loading');
            }}
            className=" rounded-[10px] mr-4 object-cover  w-[60px] h-[60px] img-loading"
            src={userState?.img_url}
            alt="user profile"
          />
          {/* demographics */}
          <span className="flex flex-col justify-between py-3">
            <PrimeText>
              {userState?.first_name + ' ' + userState?.last_name}
            </PrimeText>
            {/* <PrimeText>{}</PrimeText> */}
            {!params?.user_addr && (
              <PrimeFadeText>{userState?.email}</PrimeFadeText>
            )}
            {params.user_addr && (
              <span className=" mt-[-4px] pl-0 max-w-[70px] text-2 rounded-lg p-2">
                {formatAddress(userState?.public_address)}{' '}
              </span>
            )}
          </span>
        </span>
        {/* finance */}
        <span className="flex flex-col py-3 min-w-4 jstify-between">
          <PrimeText style={{ 'align-self': 'flex-end' }}>
            {isLoading ? 'Fetching..' : view(data?.value)}
            &nbsp;ETH
          </PrimeText>
          <PrimeFadeText
            classname=" text-[12px]"
            style={{ alignSelf: 'flex-end', fontWeight: 100 }}
          >
            Wallet Balance
          </PrimeFadeText>
          {userState?.country && (
            <PrimeFadeText classname="" style={{ 'align-self': 'flex-end' }}>
              {userState?.country}
            </PrimeFadeText>
          )}
        </span>
      </div>
    </div>
  );
};

export { UserCard };
