import ProgressBar from 'components/ProgressBar';
import { HiAdjustments, HiArrowSmLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import AssetOverview from '../AssetOverview';
import StepSlider from '../StepSlider';
import collectFeesIcon from '../../../../assets/images/collect-fees-icon.svg';
import LiquidityInfo from '../LiquidityInfo';

function ManageLiquidity() {
  const navigate = useNavigate();

  return (
    <article className="my-24 rounded-[40px] bg-white p-[50px] pt-2.5">
      <header className="relative mt-6 mb-12 flex items-center justify-center border-b px-10 pb-6">
        <div className="absolute left-0">
          <button
            className="flex items-center rounded text-hyphen-gray-400"
            onClick={() => navigate(-1)}
          >
            <HiArrowSmLeft className="h-5 w-auto" />
          </button>
        </div>

        <h2 className="text-xl text-hyphen-purple">Manage Liquidity</h2>

        <div className="absolute right-0 flex">
          <button className="mr-4 text-xs text-hyphen-purple">Clear All</button>
          <button className="flex items-center rounded text-hyphen-gray-400">
            <HiAdjustments className="h-4 w-auto rotate-90" />
          </button>
        </div>
      </header>

      <AssetOverview
        apy={91.91}
        tokenSymbol="USDC"
        tokenSupplied={459.64}
        chainId={43114}
        poolShare={0.03}
        unclaimedFees={154}
      />

      <section className="mt-8 grid grid-cols-2">
        <div className="h-[25rem] max-h-[25rem] border-r pr-[50px] pt-9">
          <div className="mb-8">
            <ProgressBar currentProgress={25} />
            <div className="mt-1 flex justify-between text-[10px] font-bold uppercase text-hyphen-gray-300">
              <span>Pool cap</span>
              <span>19.8 ETH / 100 ETH</span>
            </div>
          </div>

          <label
            htmlFor="liquidityAmount"
            className="pl-5 text-[10px] font-bold uppercase text-hyphen-gray-400"
          >
            Input
          </label>
          <input
            id="liquidityAmount"
            type="text"
            className="mt-2 mb-6 h-[60px] w-full rounded-[10px] border bg-white px-4 py-2 font-mono text-2xl text-hyphen-gray-400 focus:outline-none"
          />

          <StepSlider dots step={25} />

          <button className="mt-9 mb-2.5 h-[60px] w-full rounded-[10px] bg-hyphen-purple font-semibold text-white">
            Confirm Removal
          </button>
          <button className="h-[60px] w-full rounded-[10px] border-2 border-hyphen-purple font-semibold text-hyphen-purple">
            + Increase Liquidity
          </button>
        </div>
        <div className="h-[25rem] max-h-[25rem] pl-[50px] pt-1">
          <label
            htmlFor="unclaimedFees"
            className="pl-5 text-[10px] font-bold uppercase text-hyphen-gray-400"
          >
            Unclaimed Fees
          </label>
          <input
            id="unclaimedFees"
            type="text"
            className="mt-2 mb-10 h-[60px] w-full rounded-[10px] border bg-white px-4 py-2 font-mono text-2xl text-hyphen-gray-400 focus:outline-none"
          />

          <button className="mb-11 flex h-[60px] w-full items-center justify-center rounded-[10px] bg-hyphen-purple font-semibold text-white">
            <img src={collectFeesIcon} alt="Collect fees" className="mr-1" />
            Collect Fees
          </button>

          <LiquidityInfo />
        </div>
      </section>
    </article>
  );
}

export default ManageLiquidity;
