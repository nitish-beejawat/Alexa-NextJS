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

import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ScrollAlphaProvider } from "web3/ScrollAlphaProvider";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Image from "next/image";
import Images from "../../img/index";
// Custom components

import AdminLayout from "layouts/admin";

import { ethers } from "ethers";
import MemeKongABI from "../../web3/MemeKongV2.json";
import { ScrollAlphaContract } from "web3/ContractAddress";

export default function NftMarketplace() {
  // Chakra Color Mode

  const [rollAmount, setRollAmount] = useState(0);
  const [burnAmount, setBurnAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [calcInterest, setCalcInterest] = useState(0);
  const [account, setAccount] = useState("");
  const [userStakes, setUserStakes] = useState({});
  const [mKongBalance, setMKongBalance] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(async () => {
    if (!window.ethereum) {
      // MetaMask is not installed, show a message or button to prompt the user to install it
      return;
    }
    await window.ethereum.enable();
    setIsOpen(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const acc = accounts[0];
    setAccount(acc);
    if (acc) {
      localStorage.setItem("acc", acc);
    }
    const memeKongContract = new ethers.Contract(
      ScrollAlphaContract,
      MemeKongABI,
      ScrollAlphaProvider
    );
    const staker = await memeKongContract.staker(acc);
    const mkonngBalance = await memeKongContract.balanceOf(acc);
    const isfinished = await memeKongContract.isStakeFinished(acc);
    const calculatedInterest = await memeKongContract.calcStakingRewards(acc);
    console.log(
      "qwertyui ------ ===== ",
      isfinished,
      (parseFloat(mkonngBalance) / 10 ** 9).toFixed(4),
      staker
    );
    setUserStakes(staker);
    setMKongBalance((parseFloat(mkonngBalance) / 10 ** 9).toFixed(4));
    setIsFinished(isfinished);
    setCalcInterest((parseFloat(calculatedInterest) / 10 ** 9).toFixed(4));
  }, []);

  const stake = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const memeKongContract = new ethers.Contract(
        ScrollAlphaContract,
        MemeKongABI,
        signer
      );
      const totalAmount = parseFloat(amount) * 10 ** 9;
      const tx = await memeKongContract.StakeTokens(totalAmount);
      await tx.wait();
      window.alert("Staked Successfully.");
      window.location.reload();
    } catch (error) {
      console.log("error ==== ", JSON.stringify(error));
    }
  };

  const unStake = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const memeKongContract = new ethers.Contract(
        ScrollAlphaContract,
        MemeKongABI,
        signer
      );
      const tx = await memeKongContract.UnstakeTokens();
      await tx.wait();
      window.alert("UnStaked Successfully.");
      window.location.reload();
    } catch (error) {
      console.log("error ==== ", JSON.stringify(error));
    }
  };

  const claim = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const memeKongContract = new ethers.Contract(
        ScrollAlphaContract,
        MemeKongABI,
        signer
      );
      const tx = await memeKongContract.ClaimStakeInterest();
      await tx.wait();
      window.alert("Claimed Successfully.");
      window.location.reload();
    } catch (error) {
      console.log("error ==== ", JSON.stringify(error));
    }
  };

  const roll = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const memeKongContract = new ethers.Contract(
        ScrollAlphaContract,
        MemeKongABI,
        signer
      );
      const tx = await memeKongContract.RollStakeInterest();
      await tx.wait();
      window.alert("Rolled Successfully.");
      window.location.reload();
    } catch (error) {
      console.log("error ==== ", JSON.stringify(error));
    }
  };

  const burnMkong = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const memeKongContract = new ethers.Contract(
        ScrollAlphaContract,
        MemeKongABI,
        signer
      );
      const totalAmount = parseFloat(burnAmount) * 10 ** 9;
      const tx = await memeKongContract.BurnMkong(totalAmount);
      await tx.wait();
      window.alert("Burned Successfully.");
      window.location.reload();
    } catch (error) {
      console.log("error ==== ", JSON.stringify(error));
    }
  };

  // console.log("mmmm", mKongBalance);
  return (
    <AdminLayout>
      <div className="memekong-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="myheader-sec">
                <h2>$MKONG Staking</h2>
              </div>
              <div className="stacking-sec">
                <ul>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.Staking} alt="staking" />
                      <h4>Stake</h4>
                      <p>
                        Staking $MKONG earns interest at 4.20% APY and up to
                        42.0% APY with 90% of staked amount burnt.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.Unstack} />
                      <h4>Unstake</h4>
                      <p>
                        Unstake in $MKONG Unstack all Staked $MKONG, accessible
                        only by owning a Genesis $MKONG.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.Claim} alt="NFTS" />
                      <h4>Claim</h4>
                      <p>
                        Claim Your Spot in the Exclusive $MKONG Staking Pool for
                        Genesis $MKONG Owners
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="stake-content">
                      <Image src={Images.Burn} alt="NFTS" />
                      <h4>Burn</h4>
                      <p>
                        Boost Your $MKONG Staking Rewards with the Power of
                        Burning
                      </p>
                    </div>
                  </li>
                </ul>
                {/* <div className="action-sec">
                  <a href="#">Connect</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Stake</Tab>
            <Tab>Unstake</Tab>
            <Tab>Claim</Tab>
            <Tab>Burn</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>STAKE $MKONG TO EARN A MINIMUM 4.20% APY</p>
              <div className="input-action-sec">
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Stake Amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <button
                  className="chakra-action-btn"
                  onClick={() => {
                    stake();
                  }}
                >
                  Stake $MKONG
                </button>
              </div>
              <p>
                STAKING $MKONG CLAIMS ANY ACCRUED INTEREST STAKE $MKONG UNSTAKE
                $MKONG
              </p>
              <ul>
                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  $MKONG Balance: {mKongBalance} $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Staking Balance:{" "}
                  {userStakes?.stakedBalance
                    ? (parseFloat(userStakes.stakedBalance) / 10 ** 9).toFixed(
                        4
                      )
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Total Staking Interest Earned:{" "}
                  {userStakes?.totalStakingInterest
                    ? (
                        parseFloat(userStakes.totalStakingInterest) /
                        10 ** 9
                      ).toFixed(4)
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Pending Interest to Claim: {calcInterest} $MKONG
                </li>
              </ul>
            </TabPanel>
            <TabPanel>
              <div className="input-action-sec">
                <button
                  className="chakra-action-btn"
                  disabled={parseFloat(mKongBalance) <= 0}
                  onClick={() => {
                    unStake();
                  }}
                >
                  {!isFinished && "Emergency"} Unstake $MKONG
                </button>
              </div>
              <p>
                UNSTAKING $MKONG CLAIMS ANY ACCRUED INTEREST STAKE $MKONG
                UNSTAKE $MKONG
              </p>
              <ul>
                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  $MKONG Balance: {mKongBalance} $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Staking Balance:{" "}
                  {userStakes?.stakedBalance
                    ? (parseFloat(userStakes.stakedBalance) / 10 ** 9).toFixed(
                        4
                      )
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Total Staking Interest Earned:{" "}
                  {userStakes?.totalStakingInterest
                    ? (
                        parseFloat(userStakes.totalStakingInterest) /
                        10 ** 9
                      ).toFixed(4)
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Pending Interest to Claim: {calcInterest} $MKONG
                </li>
              </ul>
            </TabPanel>
            <TabPanel>
              <div className="input-action-sec">
                <button
                  className="chakra-action-btn"
                  onClick={() => {
                    claim();
                  }}
                  disabled={parseFloat(mKongBalance) <= 0}
                >
                  Claim $MKONG
                </button>
              </div>
              <p>CLAIM SENDS INTEREST DIRECT TO WALLET</p>
              <ul>
                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  $MKONG Balance: {mKongBalance} $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Staking Balance:{" "}
                  {userStakes?.stakedBalance
                    ? (parseFloat(userStakes.stakedBalance) / 10 ** 9).toFixed(
                        4
                      )
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Total Staking Interest Earned:{" "}
                  {userStakes?.totalStakingInterest
                    ? (
                        parseFloat(userStakes.totalStakingInterest) /
                        10 ** 9
                      ).toFixed(4)
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Pending Interest to Claim: {calcInterest} $MKONG
                </li>
              </ul>
            </TabPanel>

            <TabPanel>
              <p>BURN $MKONG TO ACQUIRE A MAXIMUM OF 10X STAKING APY @ 42.0%</p>
              <div className="input-action-sec">
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Burn Amount"
                  value={burnAmount}
                  onChange={(e) => {
                    setBurnAmount(e.target.value);
                  }}
                />
                <button
                  className="chakra-action-btn"
                  onClick={() => {
                    burnMkong();
                  }}
                >
                  Burn $MKONG
                </button>
              </div>
              <div className="input-action-sec">
                <p>CLAIMABLE INTEREST {calcInterest + " Mkong"}</p>
                {/* <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="0 MKONG"
                  //value={burnAmount}
                  onChange={(e) => {
                    setBurnAmount(e.target.value);
                  }}
                /> */}
                <button
                  className="chakra-action-btn"
                  onClick={() => {
                    roll();
                  }}
                >
                  ROLL $MKONG
                </button>
                <p> Roll adds $MKONG rewards to your staked balance.</p>
              </div>
              <ul>
                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  Balance: {mKongBalance} $MKONG
                </li>
                <li>
                  <Image src={Images.Logo} alt="logo" />
                  Staking Balance:{" "}
                  {userStakes?.stakedBalance
                    ? (parseFloat(userStakes.stakedBalance) / 10 ** 9).toFixed(
                        4
                      )
                    : 0}{" "}
                  $MKONG
                </li>

                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  Burnt:{" "}
                  {userStakes?.totalBurnt
                    ? (parseFloat(userStakes.totalBurnt) / 10 ** 9).toFixed(4)
                    : 0}{" "}
                  $MKONG
                </li>
                <li>
                  <Image src={Images.Wallet} alt="wallet" />
                  Available to burn:{" "}
                  {mKongBalance <= 0
                    ? 0
                    : (userStakes?.totalStakingInterest
                        ? (
                            parseFloat(userStakes.totalStakingInterest) /
                            10 ** 9
                          ).toFixed(4)
                        : 0) *
                        10 -
                      (userStakes?.totalBurnt
                        ? (parseFloat(userStakes.totalBurnt) / 10 ** 9).toFixed(
                            4
                          )
                        : 0)}{" "}
                  $MKONG
                </li>
              </ul>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {/* <div className="memekong-sec staking-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="contain-img">
                <div className="stake-content">
                  <Image src={Images.Staking} alt="staking" />
                  <h4>MKONG Staking</h4>
                  <p>
                    Stake MKONG to increase your position and earn MKONG
                    passively.
                  </p>
                  <p>
                    7 day stake lock period - your most recent stake/claim/roll
                    resets the period.
                  </p>
                  <div className="claim-sec">
                    <p>
                      Burn 90% of your staked balance to achieve 10x staking
                      bonus.
                    </p>
                    <p>
                      Burn up to 10x of your total staking interest claimed to
                      help pump the price!
                    </p>
                    <ul>
                      <li>
                        <Image src={Images.Wallet} alt="wallet" />
                        MKong Balance: {mKongBalance} MKong
                      </li>
                      <li>
                        <Image src={Images.Logo} alt="logo" />
                        Staking Balance:{" "}
                        {userStakes?.stakedBalance
                          ? (
                              parseFloat(userStakes.stakedBalance) /
                              10 ** 9
                            ).toFixed(4)
                          : 0}{" "}
                        MKong
                      </li>
                      <li>
                        <Image src={Images.Logo} alt="logo" />
                        Total Staking Interest Earned:{" "}
                        {userStakes?.totalStakingInterest
                          ? (
                              parseFloat(userStakes.totalStakingInterest) /
                              10 ** 9
                            ).toFixed(4)
                          : 0}{" "}
                        MKong
                      </li>
                      <li>
                        <Image src={Images.Logo} alt="logo" />
                        Pending Interest to Claim: {calcInterest} MKong
                      </li>
                    </ul>
                    <div className="calculation-sec">
                      <div className="calcu action-sec">
                        <Image src={Images.DownArrow} alt="downarrow" />
                      </div>
                      <p>UNSTAKES ALL STAKED MEMEKONG</p>
                    </div>
                    <div className="calculation-sec intrest-sec">
                      <div className="calcu action-sec"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </AdminLayout>
  );
}
