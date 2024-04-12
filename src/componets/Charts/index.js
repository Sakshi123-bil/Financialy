import React from "react";
import { Line , Pie} from '@ant-design/charts';
function ChartComponent({ sortedTransactions }) {
    console.log(sortedTransactions);
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    let finalSpending = sortedTransactions.reduce((acc,obj)=>{
       let key = obj.tag;
       if(!acc[key]){
        acc[key]={tag:obj.tag,amount:obj.amount};
       }else{
        acc[key].amount += obj.amount;
       }
       return acc;
    },{})
    const config = {
        data:data,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
    };
    const spendingConfig = {
        data:finalSpending,  
        angleField:"amount",
        colorField:"tag"
    };
    return (
        <div className="charts-wrapper">
            <div>
                <h1>Your Analytics</h1>
                <Line {...config} />
            </div>
            <div>
                <h1>Your Spendings</h1>
                <Pie {...spendingConfig}></Pie>
            </div>

        </div>
    )
}

export default ChartComponent;