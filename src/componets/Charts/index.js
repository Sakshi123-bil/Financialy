import React from "react";
import { Line , Pie} from '@ant-design/charts';
function ChartComponent({ sortedTransactions }) {
    console.log(sortedTransactions);
    let data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    
     let spendingData = sortedTransactions.filter((transaction) =>{
        if(transaction.type == "expense"){
            return {tag:transaction.tag , amount:transaction.amount};
        }
     })

     let finalSpending = spendingData.reduce((acc, obj) => {
        let existingTag = acc.find((item) => item.tag === obj.tag);
        if (existingTag) {
            existingTag.amount += obj.amount;
        } else {
            acc.push({ tag: obj.tag, amount: obj.amount });
        }
        return acc;
    }, []);
    // let finalSpending = spendingData.reduce((acc,obj)=>{
    //    let key = obj.tag;
    //    if(!acc[key]){
    //     acc[key]={tag:obj.tag,amount:obj.amount};
    //    }else{
    //     acc[key].amount += obj.amount;
    //    }
    //    return acc;
    // },{})
    const config = {
        data:data,
        width:500,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
    };
    const spendingConfig = {
        data:finalSpending,
        width:500,  
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