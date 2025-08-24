const mongoose = require('mongoose')
const { initializeDatabase } = require('./db/db.connect')
const Hotel = require('./models/hotel.models')

initializeDatabase()

// const newHotel = {
//   name: "New Hotel",
//   category: ["Mid-Range"],
//   location: "123 Main Street, Frazer Town",
//   rating: 4.0,
//   reviews: [],
//   website: "https://hotel-example.com",
//   phoneNumber: "+1234567890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Room Service"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
// };

const newHotel1 = {
    name: "Lake View",
    category: ["Mid-Range"],
    location: "124 Main Street, Anytown",
    rating: 3.2,
    reviews: [],
    website: "https://lake-view-example.com",
    phoneNumber: "+1234555890",
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
    amenities: ["Laundry", "Boating"],
    priceRange: "$$$ (31-60)",
    reservationsNeeded: true,
    isParkingAvailable: false,
    isWifiAvailable: true,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
};

const newHotel2 = {
    name: "Sunset Resort",
    category: ["Resort"],
    location: "12 Main Road, Anytown",
    rating: 4.0,
    reviews: [],
    website: "https://sunset-example.com",
    phoneNumber: "+1299655890",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
    priceRange: "$$$$ (61+)",
    reservationsNeeded: true,
    isParkingAvailable: true,
    isWifiAvailable: true,
    isPoolAvailable: true,
    isSpaAvailable: true,
    isRestaurantAvailable: true,
    photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};

async function createHotel(newHotel) {
    try {
        const hotel = new Hotel(newHotel)
        const saveHotel = await hotel.save()
        console.log('New Hotel Data:', saveHotel)
    } catch (error) {
        throw error
    }
}

// createHotel(newHotel)

// Question 1 & 2: 

async function seedHotel() {
    await createHotel(newHotel1)
    await createHotel(newHotel2)
    mongoose.connection.close()
}

// seedHotel()

// Question 3: 

async function getAllHotels() {
    try {
        const allHotels = await Hotel.find()
        console.log("All Hotels: ", allHotels)
    } catch (error) {
        console.log(error)
    }
}

getAllHotels()

// Question 4: 

async function getHotelByName(hotelName) {
    try {
        const nameOfHotel = await Hotel.findOne({ name: hotelName })
        if (nameOfHotel) {
            console.log(`Hotel details of "${hotelName}": `, nameOfHotel)
        } else {
            console.log(`No Hotel found of name "${hotelName}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelByName("Lake View")

// Question 5: 

async function getHotelsWithParking() {
    try {
        const parkingHotel = await Hotel.find({ isParkingAvailable: true })
        if (parkingHotel) {
            console.log(`Hotels details which offer Parking Space: `, parkingHotel)
        } else {
            console.log("No Hotel found with Parking Space available.")
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelsWithParking()

// Question 6: 

async function getHotelsWithRestaurant() {
    try {
        const hotelWithRestaurant = await Hotel.find({ isRestaurantAvailable: true })
        if (hotelWithRestaurant) {
            console.log("Hotels details with Restaurant available: ", hotelWithRestaurant)
        } else {
            console.log("No Hotel found with Restaurant Available.")
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelsWithRestaurant()

// Question 7: 

async function getHotelsWithCategory(categoryType) {
    try {
        const categoryHotel = await Hotel.find({ category: categoryType })
        if (categoryHotel) {
            console.log(`Hotels details with category "${categoryType}": `, categoryHotel)
        } else {
            console.log(`No Hotel found with "${categoryType}" category.`)
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelsWithCategory("Mid-Range")

// Question 8: 

async function getHotelsByPriceRange(price) {
    try {
        const hotelPrice = await Hotel.find({ priceRange: price })
        if (hotelPrice) {
            console.log(`Hotels details of price range "${price}": `, hotelPrice)
        } else {
            console.log(`No Hotel found with price range "${price}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelsByPriceRange("$$$$ (61+)")

// Question 9: 

async function getHotelsByRating(ratingHotel) {
    try {
        const hotelRating = await Hotel.find({ rating: ratingHotel })
        if (hotelRating) {
            console.log(`Hotels details with rating "${ratingHotel}": `, hotelRating)
        } else {
            console.log(`No Hotel found with rating "${ratingHotel}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelsByRating(4.0)

// Question 10: 

async function getHotelByPhoneNumber(phone) {
    try {
        const hotelPhone = await Hotel.findOne({ phoneNumber: phone })
        if (hotelPhone) {
            console.log(`Hotel details of phone number "${phone}": `, hotelPhone)
        } else {
            console.log(`No Hotel found with phone number "${phone}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

getHotelByPhoneNumber("+1299655890")