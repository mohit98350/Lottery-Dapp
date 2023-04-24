import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Players = ({ state, address }) => {
  const [account, setAccount] = useState("No account connected");
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  const [reload, setReload] = useState(false);
  const[loading , setLoading] = useState(false)


  const reloadEffect = () => {
    setReload(!reload);
  };

 

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Copied !!")
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);

    }
  }


  //Built in fun by metamask to quickly update selected account on UI

  const setAccountListener = (provider) => {
    console.log("setAccount clicked..")
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      console.log("event triggerd")
    });
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;

      const accounts = await web3.eth.getAccounts();
      //  console.log(accounts);

      setAccountListener(web3.givenProvider);                  //fun called once to start the event of accountChange
      setAccount(accounts[0]);

    };
    state.web3 && getAccount();
  }, [state, state.web3]);


  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      setLoading(true)
      const players = await contract.methods.allPlayers().call();
      const registerdPlayers = await Promise.all(
        players.map((player) => {
          return player;
        })
      );

      console.log(registerdPlayers);
      setRegisterdPlayers(registerdPlayers);
      setLoading(false)
      // reloadEffect();
    };
    state.contract && getPlayers();
  }, [state, state.contract, reload]);
  return (
    <>
      <ul className="list-group mt-5" id="list">
        <div className="center">
          <li className="list-group-item text-secondary acc " aria-disabled="true">
            <b>Connected account :</b>{account}
          </li>
          <li className="list-group-item text-success acc">
            <b>Please pay 1 ether on this contract address : </b> {address}
            <i style={{ cursor: "pointer", paddingLeft: '5px', color: "black", fontSize: "18px" }}
              class="bi bi-clipboard "  data-toggle="tooltip" title="Copy to Clipboard"
              onClick={copyText}>

            </i>

            <Toaster />

          </li>
          <li className="list-group-item text-primary ">
            <b>Registerd Players </b>:
            <br />
            <br />
             {!loading ? registerdPlayers.length !== 0 ?
              registerdPlayers.map((name) => <p className="acc" key={name}>{name}</p>):"No Registerd Player":
              <div class="spinner-border spinner-border-md" role="status">
              <span class="sr-only"></span>
            </div>
              }
          </li>
        </div>
      </ul>
    </>
  );
};


export default Players;