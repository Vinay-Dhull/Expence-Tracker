import React from "react";
import { Progress } from "antd";
import "../styles/Analytics.css";

const Analytics = ({ allTransaction }) => {
  // Categories
  const categories = [
    "Salary",
    "Tip",
    "Project",
    "Food",
    "Movie",
    "Bills",
    "Medical",
    "Fee",
    "Tax",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Health",
    "Housing",
    "Education",
    "Insurance",
    "Savings",
    "Gifts_donations",
    "Other"
  ];

  // Total transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  // Debugging
  console.log("All Transactions:", allTransaction);
  console.log("Total Expense Transactions:", totalExpenseTransactions);

  return (
    <>
      <div className="row m-3">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransactions.length}
              </h5>
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"#28a745"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"#dc3545"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <div className="card-header">Total TurnOver: {totalTurnover.toFixed(2)}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover.toFixed(2)}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover.toFixed(2)}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"#28a745"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"#dc3545"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <h6 className="bg-dark p-2 text-light">CategoryWise Income</h6>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="mt-2" key={category}>
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <h6 className="bg-warning p-2 text-light">CategoryWise Expense</h6>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              // Debugging
              console.log(`Category: ${category}, Amount: ${amount}`);

              return (
                amount > 0 && (
                  <div className="mt-2" key={category}>
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="row mt-3 analytics"></div>
    </>
  );
};

export default Analytics;
