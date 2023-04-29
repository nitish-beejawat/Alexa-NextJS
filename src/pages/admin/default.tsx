/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { isWindowAvailable } from "utils/navigation";
import AdminLayout from "layouts/admin";

import Usa from "img/dashboards/usa.png";
import Script from "next/script";
import Image from "next/image";
import Images from "../../img/index";
import MemeCoin from "../../img/allImg/mene-coins.png";
export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <AdminLayout>
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />

      <div className="memekong-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-12">
            <div className="black-back-sec">
							<div className="myheader-sec">
							   <h2>Welcome to $MKONG Staking!</h2>
							</div>
							<div className="contain-sec">
							   <p>$MKONG Market is a groundbreaking decentralized platform offering variable yield opportunities and a harmonious relationship between burning, staking through DeFi to maximize growth and stability for the project. </p>
							   <p>Doing your own research is vital in this space. Here is some information to get you started. </p>
								<div className="heading-small">
									<p><b>What Is Staking?</b></p>
								</div>
								<p>Staking is a process that involves placing funds into a digital wallet and keeping them there to support validating transactions for blockchains. By participating in transaction validation, participants earn extra cryptocurrency.</p>
								<p>The main benefits associated with staking crypto include the following:</p>
									
									<ul>
										<li>Crypto staking doesn’t require any extra equipment, unlike crypto mining.</li>
										<li>You can earn a certain amount of interest on your crypto holdings.</li>
										<li>Staking is substantially less harmful for the environment than mining.</li>
										<li>Staking directly enhances the efficiency and security of blockchains.</li>
									</ul>
									
								<p><b>Staking $MKONG in the stake pool accrues an introductory yield of 4.20% and spans a yield of up to 42.0% APY, paid in $MKONG. Staking yield is generated from the staking contract and keeps $MKONG 100% deflationary – no new tokens are ever minted. If 100% of staked balance are staked at the base APY of 4.2% (without compounding), the total yield would be 4.2% per year.</b></p>
								
								<p><b>Staking yield is generated per minute on a stake and can be claimed direct-to-wallet or rolled back into staked balance at any time. Staking has a minimum nine-day lock/cooldown period from most recent stake, claim or roll.  An emergency unstake will bypass the nine-day lockup at the cost of 9% burn.  MK staked holders can claim accrued yield at any point throughout the duration of your stake.</b></p>
								
								<p><b>Burning $MKONG increases the token price and maximizes staking returns. This is done by means of automatically burning the same amount burnt in the $MKONG/ETH Uniswap v2 pair.This instrument ultimately increases price alongside using your total burnt amount as a metric to calculate your individual staking APY up to a maximum of a 10x multiple (in order to attain 42.0%), one can achieve the 42% APY by burning a total of 90% of the staked balance.</b></p>
								
								<p><b>$MKONG</b> offers a custom staking mechanism, enriching our tokenomics and giving full control to our amazing $MKONG Hodlers, </p>
								
							</div>
						</div>
            </div>
            <div className="col-md-5 col-12">
              <div className="contain-img">
                <Image src={MemeCoin} alt="" />
                {/* <img src={MemeCoin} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
