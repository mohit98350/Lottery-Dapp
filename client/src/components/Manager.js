import React , {useState , useEffect} from 'react'
import "./Manager.css"

const Manager = ({state}) =>{

    const[account , setAccount] = useState("");
    const[cbalance , setCbalance] = useState("");
    const[Loading , setLoading] = useState(false)
    const[lwinner , setLwinner] = useState("No Winner Yet");

    //Built in method of metamask to quicky update account info
    const setAccountListener = (provider) => {
        provider.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
      };

    useEffect(()=>{
        const getAccount = async()=>{
            const {web3} =state;
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            setAccountListener(web3.givenProvider);
            setAccount(accounts[0]);
        }
        state.web3 && getAccount();
    },[state , state.web3]);

    const contractBalance = async()=>{
        const {contract,web3} = state;
        try {
            setLoading(true)
            const balance =  await contract.methods.getBalance().call({from:account});    //call is read only
            const bal = web3.utils.fromWei(balance, "ether");
            setCbalance(bal +" "+"ETH");
           
        } catch (error) {
            setCbalance("You are not the manager");
        }
        setLoading(false)
       
    }

    const winner = async()=>{
        const{contract}=state;
        try {
            await contract.methods.pickWinner().send({from:account});            // send is used bcoz we are updating state varibale  i.e performing write operation on blockchain
            const lotteryWinner = await contract.methods.winner().call();        // winner is public var in sol i.e solidity automatially creates a getter fun
            console.log(lotteryWinner)
            setLwinner(lotteryWinner);
        } catch (e) {
            if(e.message.includes("You are not the manager")){
                setLwinner("You are not the manager");
            }
            else if(e.message.includes("Players are less than 3")){
                setLwinner("Players are less than 3")
            }
            else{
                setLwinner("No Winner Yet");
            }
        }
       
    }
    return(
        <ul className="list-group mt-5" id="list">
      <div className="center">
        <li className="list-group-item text-secondary acc" aria-disabled="true">
          <b>Connected account :</b> {account}
        </li>
        <li className="list-group-item text-success">
          <b> Winner : </b>
          {lwinner}
          <button className="button1" onClick={winner}>
            Click For Winner
          </button>
        </li>
        
        <li className="list-group-item text-success">
          <b>Balance : </b>{!Loading ?cbalance:
          <div class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only"></span>
        </div>} 
          <button className="button1" onClick={contractBalance}>
            Click For Balance
          </button>
        </li>
      </div>
    </ul>
    );

};

export default Manager



// By default once we deploy to ganache first account is selected for deployment/manager