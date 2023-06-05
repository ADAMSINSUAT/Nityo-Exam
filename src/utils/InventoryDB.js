import Coke from "../miscellaneous/photos/Coke_bottle.png"
import Lays from "../miscellaneous/photos/Lay's_Potato_Chips.png"
import MMs from "../miscellaneous/photos/M&M's.jpg"

export let inventory = [
    {
        id: 1,
        name: 'Coke 8oz',
        unit: 'bottle',
        price: parseFloat(60.00).toFixed(2),
        date_of_expiry: new Date(`01/16/2022`),
        available_inventory: 20,
        image: `${Coke}`,
        image_name: `Coke_bottle.png`,
    },
    {
        id: 2,
        name: 'Lays Classic Potato Chips 8oz',
        unit: 'box x 12',
        price: parseFloat(1236.00).toFixed(2),
        date_of_expiry: new Date(`12/25/2023`),
        available_inventory: 50,
        image: `${Lays}`,
        image_name: `Lay's_Potato_Chips.png`,
    },
    {
        id: 3,
        name:  'MMs Milk Chocolate 49gm',
        unit:  'box x 50',
        price: parseFloat(9950).toFixed(2),
        date_of_expiry: new Date(`08/12/2024`),
        available_inventory: 25,
        image: `${MMs}`,
        image_name: `M&M's.jpg`,
    },
]