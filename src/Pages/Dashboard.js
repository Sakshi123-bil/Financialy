import React, { useState } from "react";
import Header from "../componets/Header";
import Cards from "../componets/Cards";
import AddExpenseModal from "../componets/Modals/addExpense";
import AddIncomeModal from "../componets/Modals/addIncome";
function Dashboard() {
    const [isExpnseModalVisible, setIsExenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
    const showExpenseModal = () => {
        setIsExenseModalVisible(true);
    }
    const showIncomeModal = () => {
        setIsExenseModalVisible(true);
    }
    const handleExpnseCancel = () => {
        setIsExenseModalVisible(false);
    }
    const handleIncomeCancel = () => {
        setIncomeModalVisible(false);
    }

    const onFinish = (values,type) =>{
        console.log("On Finish",values , type);
    };
    return (
        <div>
            <Header></Header>
            <Cards
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
            >
            <AddIncomeModal
                isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeCancel={handleIncomeCancel}
                onFinish={onFinish}
            ></AddIncomeModal>
            <AddExpenseModal
                isExpnseModalVisible={isExpnseModalVisible}
                handleExpnseCancel={handleExpnseCancel}
                onFinish={onFinish}
            ></AddExpenseModal>
            
            </Cards>
        </div>
    )
}

export default Dashboard;