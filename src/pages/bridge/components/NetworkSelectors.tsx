import Select from 'components/Select';
import { ChainConfig } from 'config/chains';
import { useChains } from 'context/Chains';
import { useWalletProvider } from 'context/WalletProvider';
import React, { useMemo } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import CustomTooltip from '../../../components/CustomTooltip';

interface INetworkSelectorsProps {}

const NetworkSelectors: React.FC<INetworkSelectorsProps> = () => {
  const { isLoggedIn } = useWalletProvider()!;
  const {
    chainsList,
    fromChain,
    toChain,
    changeFromChain,
    changeToChain,
    switchChains,
    compatibleToChainsForCurrentFromChain,
  } = useChains()!;

  const fromChainOptions = useMemo(
    () =>
      chainsList.map(chain => ({
        id: chain.chainId,
        name: chain.name,
        image: chain.image,
      })),
    [chainsList],
  );

  const toChainOptions = useMemo(() => {
    if (!compatibleToChainsForCurrentFromChain) return [];
    else
      return compatibleToChainsForCurrentFromChain.map(chain => ({
        id: chain.chainId,
        name: chain.name,
        image: chain.image,
      }));
  }, [compatibleToChainsForCurrentFromChain]);

  const selectedFromChain = useMemo(() => {
    if (!fromChain) return undefined;
    else return fromChainOptions.find(opt => opt.id === fromChain.chainId);
  }, [fromChain, fromChainOptions]);

  const selectedToChain = useMemo(() => {
    if (!toChain) return undefined;
    else return toChainOptions.find(opt => opt.id === toChain.chainId);
  }, [toChain, toChainOptions]);

  return (
    <>
      <div>
        <Select
          options={fromChainOptions}
          selected={selectedFromChain}
          setSelected={opt => {
            chainsList &&
              changeFromChain(
                chainsList.find(
                  chain => chain.chainId === opt.id,
                ) as ChainConfig,
              );
          }}
          label={'source'}
        />
      </div>
      <div className="mb-1.5 flex items-end">
        <button
          className="rounded-full border border-hyphen-purple/10 bg-hyphen-purple bg-opacity-20 p-2 text-hyphen-purple transition-all"
          onClick={switchChains}
        >
          <HiArrowRight />
        </button>
      </div>
      <div data-tip data-for="networkSelect">
        <Select
          disabled={!isLoggedIn}
          options={toChainOptions}
          selected={selectedToChain}
          setSelected={opt => {
            chainsList &&
              changeToChain(
                chainsList.find(
                  chain => chain.chainId === opt.id,
                ) as ChainConfig,
              );
          }}
          label={'destination'}
        />
        {!isLoggedIn && (
          <CustomTooltip id="networkSelect">
            <span>Please connect your wallet</span>
          </CustomTooltip>
        )}
      </div>
    </>
  );
};

export default NetworkSelectors;
