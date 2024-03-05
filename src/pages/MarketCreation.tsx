import { useEffect, useState } from 'react';
import MemoTwitterLogo from '../SVG/TwitterLogo';
import axios from 'axios';
import { ListLoader } from '../components/ListLoader';
import { MarketList } from '../components/MarketList';
import { useProtection } from '../Helpers/useProtection';
import MemoYoutubeLogo from '../SVG/YoutubeLogo';
import MemoSearchIconCompressed from '../SVG/SearchIconCompressed';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import toast from 'react-hot-toast';
import { NoDataFound } from '@/components/NoDataFound';
import MemoInstagramIcon from '@/SVG/InstagramIcon';
import MemoGithubIcon from '@/SVG/GithubIcon';
import MemoMoreDropdownIcon from '@/SVG/MoreDropdownIcon';
import ClickAwayListener from 'react-click-away-listener';
import { Platform, usePlatform, useTwitterMarketName, useTwitterVerified } from '@/atoms/platformState';
import { twMerge } from 'tailwind-merge';
import { PrimaryButton } from '@/components/Buttons';
import { useOwnershipClaimManager } from '@/atoms/OwnershipClaimState';
import { OwnershipClaimDialog } from '@/components/OwnershipClaimDialog';

const MarketCreation: React.FC<any> = ({ }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [twitterMarketName, setTwitterMarketName] = useTwitterMarketName();
  const [platform, setPlatform] = usePlatform();
  const ownershipManager = useOwnershipClaimManager();
  const [getTwitterVerified, setTwitterVerified] = useTwitterVerified();

  const [searchParam] = useSearchParams();
  const claimStatemanager = useOwnershipClaimManager();
  const claimCode = searchParam?.get('code');
  const gotPlatform = searchParam?.get('p0');
  const challange = searchParam?.get('p1');

  useEffect(() => {
    if (claimCode) {
      claimStatemanager.claimCodeRecieved(claimCode, "0", gotPlatform, challange, { social_platform: gotPlatform } as any);
      setTwitterVerified(true);
    }
  }, [claimCode]);

  // loads the twitter market name coming from the ownership claim dialog after twitter login
  useEffect(() => {
    if (twitterMarketName != "") {
      setValue(twitterMarketName);
      setTwitterMarketName("");
      setTimeout(() => {
        fetchMarketStatus();
        setShow(false);
      }, 500);
    }
  }, [twitterMarketName]);

  const [protect] = useProtection();
  const [markets, setMarkets] = useState<Market[] | 'err'>([]);
  const [loading, setLoading] = useState(false);
  console.log(`MarketCreation-loading: `, loading);

  const fetchMarketStatus = async () => {
    protect(async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/market/create`,
          {
            social_platform: platform,
            social_handle: value,
          }
        );
        console.log(`MarketCreation-result.data.data: `, result.data.data);
        setMarkets(result.data.data ?? []);
        if (!result.data.data.length) {
          setMarkets('err');
          toast.error(`No channel or market named "${value}"`);
        }
      } catch (e) {
        setMarkets('err');
      }
      setLoading(false);
    });
  };
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setValue(keyword);
    }
  }, [searchParams]);
  const handleDeleteParam = (paramName: string) => {
    searchParams.delete(paramName);
    setSearchParams(searchParams);

    // Use navigate to replace the current URL with the updated one
    navigate({ search: searchParams.toString() }, { replace: true });
  };
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setMarkets([]);

    if (value && keyword) {
      fetchMarketStatus();
      handleDeleteParam('keyword');
      // window.location.href = window.location.origin + window.location.pathname;
    }
  }, [value, searchParams]);

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-end h-full bg-lightblue">
        <div className="absolute top-0 left-0 w-full h-full custom-bg-image bg-purpleBrand" />
        <div className="flex flex-col items-center h-[70%] gap-[20px] bg-white w-full rounded-t-[20px] p-[30px]">
          <div className="text-lg font-bold">Create new Market</div>
          <div className="w-full text-center text-f12 text-2 ">
            Add a new YouTube channel and receive the 1st share at 0 price.
            Being the 1st shareholder you get to earn reflections on every
            buy/sell and earn yield if the youtube channel is among top
            performers.
          </div>
          <div className="flex items-center w-full bg-3b  h-[50px] rounded-[10px] px-6 pr-4">
            <div className="w-[50px] h-[35px] relative bg-white social-icons-collection rounded-[0.7rem] m-1 pr-2">
              <div
                onClick={() => setShow((s) => !s)}
                className="flex cursor-pointer gap-0 px-2 flex-grow mr-[-1rem] items-center justify-center">
                {platform == Platform.Youtube && <MemoYoutubeLogo className='' />}
                {platform == Platform.Instagram && <MemoInstagramIcon className='scale-[0.82]' />}
                {platform == Platform.Github && <MemoGithubIcon className="scale-[0.95] pt-[0.35rem]" />}
                {platform == Platform.Twitter && <MemoTwitterLogo className='mx-1' />}

                <MemoMoreDropdownIcon style={{ marginTop: "15px" }} />
              </div>
              {show &&
                <ClickAwayListener
                  onClickAway={() => setShow(false)}>
                  <div className='bg-white absolute rounded-[0.7rem] pl-2 mt-5 py-3 pb-4 z-[10] w-[5rem] social-icons-collection'>
                    {/* {platform !== Platform.Youtube && <div
                      onClick={() => {
                        setShow(false);
                        setPlatform(Platform.Youtube);
                      }}
                      className=" ml-[0.5rem] mb-3 cursor-pointer hover-zoom" >
                      <MemoYoutubeLogo />
                    </div>} */}

                    {/* {platform !== Platform.Instagram && <div
                      onClick={() => {
                        setShow(false);
                        setPlatform(Platform.Instagram);
                      }}
                      className=" ml-[0.4rem] mb-4 cursor-pointer hover-zoom" >
                      <MemoInstagramIcon className='scale-[0.85]' />
                    </div>} */}

                    {platform !== Platform.Github && <div
                      onClick={() => {
                        setShow(false);
                        setPlatform(Platform.Github);
                      }}
                      className=" ml-[0.4rem] -mt-4 -mb-4 pt-4 cursor-pointer" >
                      <MemoGithubIcon className=" scale-[0.95]" />
                    </div>}

                    {platform !== Platform.Twitter && <div
                      onClick={() => {
                        setShow(false);
                        setPlatform(Platform.Twitter);
                      }} className=" mt-[0.4rem] ml-3 cursor-pointer" >
                      <MemoTwitterLogo />
                    </div>}
                  </div>
                </ClickAwayListener>
              }
            </div>
            <div className="ml-3 mr-2 text-lg font-bold">@</div>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                fetchMarketStatus();
              }}
            >
              <input
                value={value}
                onSubmit={fetchMarketStatus}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Channel Name"
                className="bg-transparent min-h-[50px] px-3 z-[10]   outline-[transperent] outline-[0px] border-[0px] text-md border-[transperent]  placeholder:text-2 font-[500]  rounded-[10px]   w-full h-full"
              ></input>
            </form>
            {value ? (
              <div
                className=" text-f14 z-[10] bg-brand w-fit h-fit px-3 py-3 rounded-[12px]"
                onClick={() => {
                  fetchMarketStatus();
                }}
              >
                <MemoSearchIconCompressed />
              </div>
            ) : null}
          </div>
          <OwnershipClaimDialog />
          <div className="flex flex-col w-full z-[1]">
            {loading ? (
              <ListLoader />
            ) : markets == 'err' ? (
              <NoDataFound className="bg-[#f4f4f475]">
                No markets found with name "{value}"
              </NoDataFound>
            ) : markets.length ? (<>
              <MarketList markets={markets} />
            </>
            ) : platform == Platform.Twitter && !getTwitterVerified ? <div
              role={'button'}
              className={twMerge(
                `p-[10px] m rounded-[10px] flex w-full bg-sky-100 text-f12 justify-between items-center `,
              )}
            >
              Login with Twitter to create your Market 🤑
              <PrimaryButton
                onClick={() => ownershipManager.startOwnershipClaim({
                  "id": 0,
                  "rank": "",
                  "market_id": "0",
                  "social_platform": "twitter",
                  "social_handle": "",
                  "creator_addr": "Not Created Yet!",
                  "img_url": "/twitter.png",
                  "name": "",
                  "description": "",
                  "on_chain": true,
                  "claimed": false,
                  "buyPrice": "0",
                  "sellPrice": "0",
                  "shares": "0"
                })}
                className="px-3 pr-4 text-f12 flex justify-center items-center "
              >
                Login
              </PrimaryButton>
            </div> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { MarketCreation };
