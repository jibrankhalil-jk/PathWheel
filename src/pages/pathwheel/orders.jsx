import React, { useState, useEffect } from 'react';
import axios from 'axios';

class Order {
    constructor(oid, uid, total_amount, status, created_at) {
        this.oid = oid;
        this.uid = uid;
        this.total_amount = total_amount;
        this.status = status;
        this.created_at = created_at;
    }

    formattedAmount() {
        return `$${(this.total_amount / 100).toFixed(2)}`;
    }

    formattedDate() {
        return new Date(this.created_at).toLocaleString();
    }
}

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from API
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/orders');

            const orderInstances = response.data.map(order =>
                new Order(order.oid, order.uid, order.total_amount, order.status, order.created_at)
            );
            setOrders(orderInstances);

        } catch (err) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Define status colors for tags
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-500';
            case 'processing':
                return 'bg-blue-500';
            case 'cancelled':
                return 'bg-red-500';
            case 'pending':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Orders Management</h2>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded border border-blue-500"
                        onClick={() => alert('Create Order functionality')}
                    >
                        New Order
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-100 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={fetchOrders}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>


            {loading ? (
                <div className="text-center py-5 text-gray-500">Loading orders...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">Order ID</th>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">User ID</th>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">Amount</th>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">Status</th>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">Created At</th>
                                <th className="p-3 bg-gray-100 font-bold text-left border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.oid}>
                                    <td className="p-3 border-b">{order.oid}</td>
                                    <td className="p-3 border-b">{order.uid}</td>
                                    <td className="p-3 border-b">{order.formattedAmount()}</td>
                                    <td className="p-3 border-b">
                                        <span
                                            className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(order.status)}`}
                                        >
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b">{order.formattedDate()}</td>
                                    <td className="p-3 border-b">
                                        <button className="px-2 py-1 bg-gray-100 border border-gray-300 rounded mr-1 text-sm">View</button>
                                        <button
                                            className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={order.status === 'completed' || order.status === 'cancelled'}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
