import React, { useState } from "react";
import styles from "./mint.module.scss";
import clx from "classnames";
// import { SiweMessage } from "siwe";
// import { useAccount, useSignMessage, useSigner } from "wagmi";
import { Tooltip } from "@mui/material";
import Lottie from "lottie-react";
import confettie from "./confettie.json";

function Mint({
  connectButtonRef,
}: {
  connectButtonRef: React.RefObject<HTMLButtonElement>;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
  const [isSigning, setIsSigning] = useState<boolean>(false);
  // const { address: walletAddress } = useAccount();
  // const { signMessageAsync } = useSignMessage();
  // const { data: signer } = useSigner();

  // const signRequest = async () => {
  //   if (!signer) return;
  //   try {
  //     const messageObject = new SiweMessage({
  //       domain: window.location.host,
  //       address: walletAddress,
  //       statement: `You just supported this author with your time and collected their dPage! Thanks <3`,
  //       uri: window.location.origin,
  //       version: "1",
  //     });
  //     const signature = await signMessageAsync({
  //       message: messageObject.prepareMessage(),
  //     });
  //     const message = messageObject.prepareMessage();

  //     console.log({ message, signature });
  //     setIsSigning(false);
  //   } catch (error: any) {
  //     console.log(error);
  //     setIsSigning(false);
  //     setIsAnimating(false);
  //   }
  // };

  const handleMouseEnter = () => {
    // if (!walletAddress) {
    //   connectButtonRef?.current?.click();
    //   return;
    // }
    setIsAnimating(true);

    const incrementInterval = (6 * 1000) / 60;
    let currentCount = count;
    const increment = () => {
      if (currentCount < 60) {
        if (!isSigning) {
          setCount(currentCount + 1);
          currentCount += 1;
        }
      } else if (currentCount === 60) {
        setIsSigning(true);
        clearInterval(intervalId);
        setTimeout(() => {
          // signRequest();
          console.log("SIGN");
          currentCount = 0;
          setCount(0);
        }, 1750);
      }
    };
    const intervalId = setInterval(increment, incrementInterval);
    setIntervalID(intervalId);
  };

  const handleMouseLeave = () => {
    if (!isSigning) {
      setIsAnimating(false);
      setIsSigning(true);
      // signRequest();
      console.log("SIGN");
      clearInterval(intervalID);
      setCount(0);
    }
  };

  return (
    <Tooltip
      title={
        count === 0
          ? "Support the author with your time pressed on this heart on-chain"
          : `+${count}`
      }
    >
      <div onMouseUp={handleMouseLeave} onMouseDown={handleMouseEnter}>
        <div id="confettie">
          {count === 60 && <Lottie loop={false} animationData={confettie} />}
        </div>
        <div className={styles.frame}>
          <div className={clx(styles.heart, isAnimating && styles.animate)} />
        </div>
      </div>
    </Tooltip>
  );
}

export default Mint;
