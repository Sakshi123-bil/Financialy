import React, { useEffect, useState } from "react";
import Header from "../componets/Header";
import Cards from "../componets/Cards";
 import AddExpenseModal from "../componets/Modals/addExpense";
 import AddIncomeModal from "../componets/Modals/addIncome";
 import { toast } from 'react-toastify';
import { addDoc,collection, getDocs, query} from "firebase/firestore";
import {auth , db} from "../firebase";
import moment from "moment";
import {useAuthState} from "react-firebase-hooks/auth";
import TransactionsTable from "../componets/TransactionsTable";
function Dashboard() {
    
    const [transactions,setTransactions]=useState([]);
    const [loading , setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
    const [income,setIncome] = useState(0);
    const [expense,setExpense]=useState(0);
    const [totalBalance,setTotalBalance]=useState(0);
    const showExpenseModal = () => {
        setIsExpenseModalVisible(true);
        
    };
    const showIncomeModal = () => {
        setIsIncomeModalVisible(true);
       
    };
    const handleExpnseCancel = () => {
        setIsExpenseModalVisible(false);
    };
    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false);
    };

    const onFinish = (values,type) =>{
        const newTransaction = {
            type:type,
            date:moment(values.date).format("YYYY-MM-DD"),
            amount: parseFloat(values.amount),
            tag:values.tag,
            name:values.name,
        };
        addTransaction(newTransaction);
    };
    async function addTransaction(transaction){
        try{
            const docRef = await addDoc(
                collection(db , `users/${user.uid}/transactions`),
                transaction
            );
            console.log("Document written with ID:" , docRef.id);
            
                toast.success("Transaction Added!");
                let newArr = transactions;
                newArr.push(transaction);
                setTransactions(newArr);
                calculateBalance();
            }
         catch(e){
            console.error("Error adding document",e);
           
                toast.error("could not add transaction");
            
        }
    }

    useEffect (()=>{
         fetchTransactions();
    },[])
    useEffect (() =>{
        calculateBalance();
    },[transactions]);
    
    function calculateBalance(){
         let incomeTotal =0;
         let expenseTotal =0;
         transactions.forEach((transaction)=>{
            if(transaction.type === "income"){
                incomeTotal = incomeTotal  + transaction.amount;
            }else{
                expenseTotal = expenseTotal + transaction.amount;
            }
         });
         setIncome(incomeTotal);
         setExpense(expenseTotal);
         setTotalBalance(incomeTotal-expenseTotal);
    }
    async function fetchTransactions (){
        setLoading(true);
        if(user){
            const q = query(collection(db , `users/${user.uid}/transactions`));
            const querySnapshot = await getDocs(q);
            let transactionsArray =[];
            querySnapshot.forEach((doc)=>{
                transactionsArray.push(doc.data());
            });
            setTransactions(transactionsArray);
            console.log("transactions array" ,transactionsArray);
            toast.success("Transaction Fetched!");
        }
        setLoading(false);
    }
    return (
        <div>
            {
                loading ? (<p>Loading...</p>) :  (<>
                <Header/>
                <Cards
                     income={income}
                     expense={expense}
                     totalBalance={totalBalance}
                    showExpenseModal={showExpenseModal}
                    showIncomeModal={showIncomeModal}
                />
                <AddIncomeModal
                    isIncomeModalVisible={isIncomeModalVisible}
                    handleIncomeCancel={handleIncomeCancel}
                    onFinish={onFinish}
                ></AddIncomeModal>
                <AddExpenseModal
                    isExpenseModalVisible={isExpenseModalVisible}
                    handleExpenseCancel={handleExpnseCancel}
                    onFinish={onFinish}
                ></AddExpenseModal>
                <TransactionsTable transactions={transactions}></TransactionsTable>
                </>
            )
            }
                  
            
        
        </div>
    )
}

export default Dashboard;