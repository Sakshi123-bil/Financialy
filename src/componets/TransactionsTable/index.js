import React, { useState } from "react";
import { Table , Select , Radio} from "antd";
const {Option}=Select
function TransactionsTable({transactions}){
    const [sortKey,setSortKey] = useState("");
    const [search , setSearch] = useState("");
    const [typeFilter,setTypeFilter]=useState("");
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'tyep',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
      ];
      let filteredTransactions = transactions.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = [...filteredTransactions].sort((a,b)=>{
        if(sortKey==="date"){
            return new Date(a.date)- new Date(b.date);
        }
        else if(sortKey==="amount"){
            return a.amount-b.amount
        }else{
            return 0;
        }
    });
    return (
        <>
          <input 
         type="text" 
         value={search} 
         onChange={(e)=>setSearch(e.target.value)}
         placeholder="Search by name"
         ></input>
         <Select
         className="select-input"
         onChange={(value)=>setTypeFilter(value)}
         value={typeFilter}
         placeholder="Filter"
         >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
         </Select>
         <Radio.Group
         className="input-radio"
         onChange={(e)=>{setSortKey(e.target.value)}}
         value={sortKey}
         >
           <Radio.Button value="">No Sort</Radio.Button>
           <Radio.Button value="date">Sort by Date</Radio.Button>
           <Radio.Button value="amount">Sort by Amount</Radio.Button>
         </Radio.Group>
         <Table dataSource={sortedTransactions} columns={columns} />;
         
         </>
   
    )
}


export default TransactionsTable;