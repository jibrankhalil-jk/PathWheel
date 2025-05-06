import { useState, useEffect } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

import Header from '../components/header.component'
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/footer.component";

const WheelchairsPage = () => {
    const [wheelchairs, setWheelchairs] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Add new state for the selected wheelchair and modal
    const [selectedWheelchair, setSelectedWheelchair] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch wheelchairs data
    useEffect(() => {
        const fetchWheelchairs = async () => {
            try {
                setLoading(true);

                await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-wheelchairs", {
                    limit: 10
                })
                    .then(({ data }) => {
                        console.log(data.wheelchairs);
                        setWheelchairs(data.wheelchairs);
                        setLoading(false);
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.error);
                    });
            } catch (err) {
                setError('Failed to load wheelchairs');
                setLoading(false);
                console.error('Error fetching wheelchairs:', err);
            }
        };

        fetchWheelchairs();
    }, []);

    // Add function to open the modal with product details
    const openProductModal = (wheelchair) => {
        setSelectedWheelchair(wheelchair);
        setIsModalOpen(true);
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addToCart = (wheelchair) => {
        const existingItem = cart.find(item => item.wid === wheelchair.wid);

        if (existingItem) {
            setCart(cart.map(item =>
                item.wid === wheelchair.wid
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...wheelchair, quantity: 1 }]);
        }

        // Optional: Show toast notification
        toast.success(`${wheelchair.name} added to cart!`);
    };

    const removeFromCart = (wheelchairId) => {
        const existingItem = cart.find(item => item.wid === wheelchairId);

        if (existingItem.quantity === 1) {
            setCart(cart.filter(item => item.wid !== wheelchairId));
        } else {
            setCart(cart.map(item =>
                item.wid === wheelchairId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <Header
                cart={<button
                    className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 relative backdrop-blur-sm"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                >
                    <FaShoppingCart className="mr-2" />
                    <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </button>}
            />
            <div className="container mx-auto px-4 py-8 ">

                {/* Cart Sidebar */}
                {isCartOpen && (
                    <div className="fixed right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md shadow-lg z-50 p-4 transform transition-transform border-l border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Your Cart</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                onClick={() => setIsCartOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty</p>
                        ) : (
                            <>
                                <div className="max-h-[70vh] overflow-y-auto">
                                    {cart.map((item) => (
                                        <div key={item.wid} className="flex justify-between items-center border-b border-blue-100 py-2">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-blue-600 font-semibold">${item.price}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
                                                    onClick={() => removeFromCart(item.wid)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 font-medium">{item.quantity}</span>
                                                <button
                                                    className="p-1 bg-blue-200 rounded-md hover:bg-blue-300 transition-all"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 border-t border-blue-200 pt-4">
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span className="text-blue-700">${totalPrice}</span>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg py-2 mt-4 hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Product Detail Modal */}
                {isModalOpen && selectedWheelchair && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className=" rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl relative animate-fadeIn">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                                onClick={closeModal}
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className=" rounded-lg p-6 flex items-center justify-center">
                                    <img
                                        src={`/wheelchairs/${selectedWheelchair.wid}.jpeg`}
                                        alt={selectedWheelchair.name}
                                        className=" object-contain"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedWheelchair.name}</h2>
                                    <p className="text-2xl font-bold text-blue-600 mt-2">${selectedWheelchair.price}</p>

                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2">Description</h3>
                                            <p className="mt-2 text-gray-700">
                                                {selectedWheelchair.description || 'High-quality wheelchair designed for comfort and durability. Perfect for everyday use with advanced features for improved mobility.'}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2">Features</h3>
                                            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                                                <li>Ergonomic design for maximum comfort</li>
                                                <li>Lightweight yet sturdy construction</li>
                                                <li>Easy to maneuver and transport</li>
                                                <li>Adjustable settings for personalized use</li>
                                                <li>Premium quality materials for longevity</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2">Specifications</h3>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-gray-700">
                                                <div>Weight:</div><div>18 lbs</div>
                                                <div>Max Capacity:</div><div>300 lbs</div>
                                                <div>Width:</div><div>25 inches</div>
                                                <div>Material:</div><div>Aluminum alloy</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <button
                                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center gap-2"
                                            onClick={() => {
                                                addToCart(selectedWheelchair);
                                                closeModal();
                                            }}
                                        >
                                            <FaShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Loading and Error States */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-md">
                        <p>{error}</p>
                    </div>
                )}

                {/* Wheelchairs Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16  ">
                        {wheelchairs.map((wheelchair) => (
                            <div key={wheelchair.wid} className=" backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all hover:scale-105 group">
                                <div
                                    className="aspect-square w-full overflow-hidden flex items-center justify-center p-4 cursor-pointer"
                                    onClick={() => openProductModal(wheelchair)}
                                >
                                    <img
                                        src={`/wheelchairs/${wheelchair.wid}.png`}
                                        alt={wheelchair.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3
                                        className="font-semibold text-lg cursor-pointer hover:text-blue-600"
                                        onClick={() => openProductModal(wheelchair)}
                                    >{wheelchair.name}
                                    </h3>
                                    <p className="text-blue-600 mt-1 font-bold">${wheelchair.price}</p>
                                    <button
                                        className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center gap-2"
                                        onClick={() => addToCart(wheelchair)}
                                    >
                                        <FaShoppingCart size={14} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
};

export default WheelchairsPage;
