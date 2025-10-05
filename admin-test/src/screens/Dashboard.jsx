import React from "react";
    import { IoBagHandleSharp } from "react-icons/io5";
    import { MdShoppingCart } from "react-icons/md";
    import { MdAttachMoney } from "react-icons/md";
    import { IoPeopleSharp } from "react-icons/io5";
    import { FaRegClock } from 'react-icons/fa';
    
    const Dashboard = () => {
      // Fake data for the dashboard cards
      const stats = [
        {
          title: "Total Questions",
          amount: "35,000",
          changePercentage: "+20%",
          icon: <IoPeopleSharp />,
          color: "#EC3E14", // Primary color
        }
      ];
    
      // Fake data for top-selling products
      const topSellingProducts = [
        { name: "Product A", sales: 100 },
        { name: "Product B", sales: 80 },
        { name: "Product C", sales: 50 },
        { name: "Product D", sales: 75 },
        { name: "Product E", sales: 51 },
        { name: "Product F", sales: 20 },
      ];
    
      // Fake data for recent activities
      const recentActivities = [
        { activity: "Order #1234 was placed", time: "2 hours ago" },
        { activity: "Product B was restocked", time: "5 hours ago" },
        { activity: "User JohnDoe left a review", time: "1 day ago" },
      ];
    
      const topPerformingEmployees = [
        { name: "Alice Johnson", performance: 95 },
        { name: "Bob Smith", performance: 90 },
        { name: "Charlie Brown", performance: 88 },
        { name: "Diana Prince", performance: 85 },
        { name: "Ethan Hunt", performance: 83 },
      ];
      return (
        <div className="min-h-screen p-4 font-urbanist bg-contentBg">    
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center justify-center text-2xl w-14 h-14 rounded-xl"
                    style={{
                      color: stat.color,
                      backgroundColor: `${stat.color}1A`,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <h4 className="text-xl font-semibold text-dark font-urbanist text-independence">
                      {stat.amount}
                    </h4>
                    <p className="text-sm text-rhythm font-urbanist">
                      {stat.title}
                    </p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
    
        
        </div>
      );
    };
    
    export default Dashboard;
    