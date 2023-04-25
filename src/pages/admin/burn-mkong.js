import React, { useState, useEffect } from "react";
import Image from "next/image";
import Images from "../../img/index";
// Custom components

import AdminLayout from "layouts/admin";

import { ethers } from "ethers";
import MemeKongABI from "../../web3/MemeKongV2.json";

export default function NftMarketplace() {
  // Chakra Color Mode

  useEffect(async () => {}, []);

  return (
    <AdminLayout>
      <div class="stake-content">
        <Image src={Images.Staking} alt="Staking" />
        <h4> MKONG Burning </h4>
        <p>
          Burning MKONG increases your individual staking APY up to a maximum of
          10x.
        </p>
        <p>
          Burning MKONG simultaneously pumps the price by burning an equivalent
          amount of MKONG from the ETH/MKONG pair of Uniswap v2, or 1% of the
          pool if your burn equivalent is over.
        </p>
        <div class="claim-sec">
          <p>Burn 90% of your staked balance to achieve 10x staking bonus.</p>
          <p>
            Burn up to 10x of your total staking interest claimed to help pump
            the price!
          </p>
          <ul>
            <li>
              {" "}
              <Image src={Images.Wallet} alt="Wallet" /> Wallet: N/A
            </li>
            <li>
              {" "}
              <Image src={Images.Logo} alt="Logo" /> Balance: 0
            </li>
            <li>
              {" "}
              <Image src={Images.Logo} alt="Logo" /> Staked: 0
            </li>
            <li>
              {" "}
              <Image src={Images.Logo} alt="Logo" /> Burnt: 0
            </li>
          </ul>
          <div class="calculation-sec">
            <p>BURN MKONG TO ACQUIRE A MAXIMUM OF 10X STAKING APY @ 42.0%</p>
            <input
              type="text"
              class="form-control"
              id="text"
              placeholder="Burn Amount"
            />
            <p>AVAILABLE TO BURN :</p>
            <div class="calcu action-sec">
              <a href="#">Burn MKONG</a>
              <Image src={Images.DownArrow} alt="DownArrow" />
              <a href="#">Claim Now</a>
            </div>
            <p> AVAILABLE TO CLAIM :</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
