import React, { useState } from "react";
import { Table, Select, Radio } from "antd";
import { unparse , parse} from "papaparse";
import { toast } from 'react-toastify';
const { Option } = Select;
function TransactionsTable({ transactions , addTransaction , fetchTransactions }) {
    const [sortKey, setSortKey] = useState("");
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
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

    let sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        }
        else if (sortKey === "amount") {
            return a.amount - b.amount
        } else {
            return 0;
        }
    });

    function exportCSV () {
        var csv = unparse({
            fields:["name","type","tag","date","amount"],
            data:transactions,
        });
        var data = new Blob([csv],{type:"text/csv;charset=utf-8;"});
        var url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download="transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    function importFromCsv(event){
        event.preventDefault();
        try{
            parse(event.target.files[0] , {
                header:true,
                complete:async function (results){
                    console.log(results)
                    for(const transaction of results.data){
                        console.log("Transactions",transaction);
                        const newTransaction = {
                            ...transaction,
                            amount:parseInt(transaction.amount)
                        };
                        await addTransaction(newTransaction,true);
                    }
                },
            });
            toast.success("All Transaction Added");
            fetchTransactions();
            event.target.files = null;

        }catch(e){
           toast.error(e.meesage);
        }
    }
    return (
        <>
            <div
              style={{
                width:"95vw",
                padding:"0rem 2rem",
              }}
            >
                <div 
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    gap:"1rem",
                    alignItems:"center",
                    marginBottom:"1rem",
                }}
                >
                    <div className="input-flex">
                        <img src="text" width="16"></img>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name"
                        ></input>
                    </div>

                    <Select
                        className="select-input"
                        onChange={(value) => setTypeFilter(value)}
                        value={typeFilter}
                        placeholder="Filter"
                    >
                        <Option value="">All</Option>
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                    </Select>
                </div>
                <div className="my-table">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: "1rem",
                        }}
                    >
                        <h2>My Transactions</h2>
                        <Radio.Group
                            className="input-radio"
                            onChange={(e) => { setSortKey(e.target.value) }}
                            value={sortKey}
                        >
                            <Radio.Button value="">No Sort</Radio.Button>
                            <Radio.Button value="date">Sort by Date</Radio.Button>
                            <Radio.Button value="amount">Sort by Amount</Radio.Button>
                        </Radio.Group>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "1rem",
                                width: "400px"
                            }}
                        >
                            <button className="btn" onClick={exportCSV}>
                                Export To Csv
                            </button>
                            <label for="file-csv" className="btn btn-blue">
                                Import from CSV
                            </label>
                            <input

                                id="file-csv"
                                type="file"
                                accept=".csv"
                                required
                                oncChange={importFromCsv}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                    <Table dataSource={sortedTransactions} columns={columns} />;
                </div>
            </div>


        </>

    )
}


export default TransactionsTable;