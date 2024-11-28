import { useContext, useState } from 'react';

import { context } from '../../../Store';
import './Menu.css';
import bannerImg from '../../../Assets/banner.jpg';
import paneerTikka from '../../../Assets/paneer-tikka.jpg';
import tandooriChicken from '../../../Assets/tandoori-chicken.jpg';
import mixedAppetizer from '../../../Assets/mixed-appetizers.jpeg';
import chanaMasala from '../../../Assets/chana-masala.jpeg';
import butterChicken from '../../../Assets/butter-chicken.jpeg';
import chickenCurry from '../../../Assets/Chicken-curry.jpeg';
import vegBiryani from '../../../Assets/Veg-biryani.jpg';
import chickenBiryani from '../../../Assets/Checken-biryani.jpg';
import butterNaan from '../../../Assets/butter-naan.jpg';
import garlicNaan from '../../../Assets/garlic-naan.jpg';
import cheeseGarlicNaan from '../../../Assets/cheese-garlic-naan.jpg';
import mangoLassi from '../../../Assets/mango-lassi.jpg';
import pineAppleJuice from '../../../Assets/pineapple-juice.jpg';
import masalaChai from '../../../Assets/masala-chai.jpg';
import { useNavigate } from 'react-router-dom';

function MenuPage() {

    const [state, dispatch] = useContext(context);
    let navigate = useNavigate();

    const [restaurant,] = useState("Naan N Curry");
    const [description,] = useState("Indian Cuisine");
    const [total, setTotal] = useState(state.total);
    const [selectedCategory, setSelectedCategory] = useState(state.selectedCategory, 'Best Sellers');
    const [categories,] = useState(['Best Sellers', 'Appetizers', 'Curry', 'Naans', 'Beverages']);
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Paneer Tikka",
            description: "Chunks of paneer marinated in spices and grilled in tandoor, served with Green Chutney.",
            price: "13.50",
            img: paneerTikka,
            categories: ['Appetizers']
        },
        {
            id: 2,
            name: "Tandoori Chicken",
            description: "Bone in Chicken marinated in yogurt and spices roasted in the tandoor served with lemon and Green Chutney.",
            price: "14.99",
            img: tandooriChicken,
            categories: ['Appetizers']
        },
        {
            id: 3,
            name: "Mixed Appetizer",
            description: "Bone in Chicken marinated in yogurt and spices roasted in the tandoor served with lemon and Green Chutney.",
            price: "11.50",
            img: mixedAppetizer,
            categories: ['Appetizers', 'Best Sellers']
        },
        {
            id: 4,
            name: "Chana Masala",
            description: "Heart Indian chickpea curry with fresh garlic, onions, tomatoes, green chilies, and coriander",
            price: "15.50",
            img: chanaMasala,
            categories: ['Curry', 'Best Sellers']
        },
        {
            id: 5,
            name: "Butter Chicken",
            description: "Buttery and creamy dish, giving smooth and rich flavour.",
            price: "16.25",
            img: butterChicken,
            categories: ['Curry', 'Best Sellers']
        },
        {
            id: 6,
            name: "Chicken Curry",
            description: "A favorite from Indian dishes made with chicken in a delicious gravy with herbs and spices",
            price: "16.25",
            img: chickenCurry,
            categories: ['Curry']
        },
        {
            id: 7,
            name: "Vegetable Biryani",
            description: "Basmati rice and slow cooked vegetables in a classic biryani gravy.",
            price: "16.99",
            img: vegBiryani,
            categories: ['Curry', 'Best Sellers']
        },
        {
            id: 8,
            name: "Chicken Biryani",
            description: "A traditional classic Mughlai dish that is decadent with tender chicken and bursting flavours ground spices.",
            price: "17.99",
            img: chickenBiryani,
            categories: ['Curry']
        },
        {
            id: 9,
            name: "Butter Naan",
            description: "",
            price: "3.99",
            img: butterNaan,
            categories: ['Naans']
        },
        {
            id: 10,
            name: "Garlic Naan",
            description: "",
            price: "4.25",
            img: garlicNaan,
            categories: ['Naans']
        },
        {
            id: 11,
            name: "Cheese Garlic Naan",
            description: "",
            price: "4.75",
            img: cheeseGarlicNaan,
            categories: ['Naans', 'Best Sellers']
        },
        {
            id: 12,
            name: "Mango Lassi",
            description: "A refreshing and creamy yogurt drink infused with sweet mango",
            price: "5.50",
            img: mangoLassi,
            categories: ['Beverages', 'Best Sellers']
        },
        {
            id: 13,
            name: "Pineapple Juice",
            description: "",
            price: "3.50",
            img: pineAppleJuice,
            categories: ['Beverages']
        },
        {
            id: 14,
            name: "Masala Chai",
            description: "Spiced Indian tea for ultimate comfort and flavor",
            price: "3.50",
            img: masalaChai,
            categories: ['Beverages']
        }
    ]);
    const [tray, setTray] = useState({ ...state.tray }, {});

    const renderCategories = () => {
        return categories.map((category, index) => {
            return (
                <div className={selectedCategory === category ? 'selected-category' : 'menu-category-box'} key={index} onClick={() => selectCategory(category)}>
                    <p className='menu-category-text'>{category}</p>
                </div>
            )
        });
    }

    const selectCategory = (category) => {
        setSelectedCategory(category);
        dispatch({
            type: 'select_category',
            payload: {
                selectedCategory: category
            }
        });
    }

    const increaseQuantity = (itemId) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === itemId) {
                const newTray = { ...tray };
                if (newTray[itemId]) {
                    newTray[itemId].quantity++;
                } else {
                    newTray[itemId] = { ...item, quantity: 1 };
                }
                setTotal(total + parseFloat(item.price));
                setTray(newTray);
            }
        })
        setItems(newItems);
    }

    const decreaseQuantity = (itemId) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === itemId) {
                const newTray = { ...tray };
                if (newTray[itemId]) {
                    newTray[itemId].quantity--;
                } else {
                    newTray[itemId] = { ...item, quantity: 1 };
                }
                if (newTray[itemId].quantity === 0) {
                    delete newTray[itemId];
                }
                setTotal(total - parseFloat(item.price));
                setTray(newTray);
            }
        })
        setItems(newItems);
    }

    const renderItems = () => {
        const filteredItems = items.filter(item => item.categories.includes(selectedCategory));
        return filteredItems.map(item => {
            return (
                <div className='menu-item-div' key={item.id}>
                    <div className='menu-item-img-div'>
                        <img src={item.img} className='menu-item-img' alt={item.name} onClick={() => setDetails(item)} />
                        <div className="menu-quantity-div">
                            {tray[item.id] !== undefined && <>
                                <div className="menu-quantity-btn-minus" onClick={() => decreaseQuantity(item.id)}>-</div>
                                <div className="menu-quantity"><span>{tray[item.id].quantity}</span></div>
                            </>}
                            <div className={tray[item.id] !== undefined ? 'menu-quantity-btn-plus' : "menu-quantity-btn"} onClick={() => increaseQuantity(item.id)}>+</div>
                        </div>
                    </div>
                    <p className='menu-item-name poppins-semibold'>{item.name}</p>
                    <p className='menu-item-price'>{"$" + item.price}</p>
                </div>
            )
        });
    }

    const setDetails = async (item) => {
        await dispatch({
            type: 'select_item',
            payload: {
                tray: { ...tray },
                selectedItem: { ...item },
                total: total
            }
        });
        await navigate("details");
    }

    const updateTray = async (navigateTo) => {
        await dispatch({
            type: 'update_tray',
            payload: {
                tray: { ...tray },
                total: total
            }
        });
        await navigate(navigateTo);
    }

    return (
        <div className="menu-bg">
            <div className="menu-banner">
                <img src={bannerImg} className='menu-banner-img' alt='menu-banner-image' />
                <div className='menu-banner-overlay' />
                <div className='menu-banner-div'>
                    <p className="menu-banner-title poppins-black">{restaurant}</p>
                    <p className="menu-banner-desc">{description}</p>
                </div>
            </div>
            <div className='menu-category'>
                {renderCategories()}
            </div>
            <div className='menu-items'>
                <p className='menu-items-title poppins-semibold'>{selectedCategory}</p>
                <div className='menu-items-container'>
                    {renderItems()}
                </div>
            </div>
            <div className='menu-bottom-container poppins-semibold'>
                <div className='menu-total-container'>
                    <span>Total</span>
                    <span>{"$" + total.toFixed(2)}</span>
                </div>
                <div className='menu-total-container'>
                    <div className='menu-view-table-btn' onClick={() => updateTray("table")}>
                        <span>View Table</span>
                    </div>
                    <div className='menu-add-to-tray-btn' onClick={() => updateTray("tray")}>
                        <span>Add to Tray</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuPage;