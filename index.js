const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const app = express()

const mongoose = require('mongoose')
const { initializeDatabase } = require('./db/db.connect')
const Hotel = require('./models/hotel.models')

app.use(express.json())

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

initializeDatabase()

async function createHotel(newHotel) {
    try {
        const hotel = new Hotel(newHotel)
        const saveHotel = await hotel.save()
        // console.log('New Hotel Data:', saveHotel)
        return saveHotel
    } catch (error) {
        throw error
    }
}

app.post("/hotels", async(req, res) => {
    try{
        const savedHotel = await createHotel(req.body)
        res.status(201).json({message: "Hotel added successfully.", hotel: savedHotel})
    }catch(error){
        res.status(500).json({error: "Failed to add Hotel."})
    }
})

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
        // console.log("All Hotels: ", allHotels)
        return allHotels
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels", async(req, res) => {
    try{
        const hotels = await getAllHotels()
        if(hotels.length !== 0){
            res.json(hotels)
        }else{
            res.status(400).json({error: "No hotel found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})


// getAllHotels()

// Question 4: 

async function getHotelByName(hotelName) {
    try {
        const nameOfHotel = await Hotel.findOne({ name: hotelName })
        if (nameOfHotel) {
            // console.log(`Hotel details of "${hotelName}": `, nameOfHotel)
            return nameOfHotel
        } else {
            console.log(`No Hotel found of name "${hotelName}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels/:hotelName", async(req, res) => {
    try{
        const hotels = await getHotelByName(req.params.hotelName)
        if(hotels.length !== 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "Hotel not found by name."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotel by name."})
    }
})

// getHotelByName("Lake View")

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

// getHotelsWithParking()

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

// getHotelsWithRestaurant()

// Question 7: 

async function getHotelsWithCategory(categoryType) {
    try {
        const categoryHotel = await Hotel.find({ category: categoryType })
        if (categoryHotel) {
            // console.log(`Hotels details with category "${categoryType}": `, categoryHotel)
            return categoryHotel
        } else {
            console.log(`No Hotel found with "${categoryType}" category.`)
        }
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try{
        const hotels = await getHotelsWithCategory(req.params.hotelCategory)
        if(hotels.length !== 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "Hotel not found by hotel category."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotel by hotel category."})
    }
})

// getHotelsWithCategory("Mid-Range")

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

// getHotelsByPriceRange("$$$$ (61+)")

// Question 9: 

async function getHotelsByRating(ratingHotel) {
    try {
        const hotelRating = await Hotel.find({ rating: ratingHotel })
        if (hotelRating) {
            // console.log(`Hotels details with rating "${ratingHotel}": `, hotelRating)
            return hotelRating
        } else {
            console.log(`No Hotel found with rating "${ratingHotel}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const hotels = await getHotelsByRating(req.params.hotelRating)
        if(hotels.length !== 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "Hotel not found by hotel rating."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotel by hotel rating."})
    }
})

// getHotelsByRating(4.0)

// Question 10: 

async function getHotelByPhoneNumber(phone) {
    try {
        const hotelPhone = await Hotel.findOne({ phoneNumber: phone })
        if (hotelPhone) {
            // console.log(`Hotel details of phone number "${phone}": `, hotelPhone)
            return hotelPhone
        } else {
            console.log(`No Hotel found with phone number "${phone}".`)
        }
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels/directory/:phoneNumber", async(req, res) => {
    try{
        const hotels = await getHotelByPhoneNumber(req.params.phoneNumber)
        if(hotels.length !== 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "Hotel not found by phone Number."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotel by phone number."})
    }
})

// getHotelByPhoneNumber("+1299655890")

// BE2.3_HW2

// Question 1: 

async function updateHotelById(hotelId, dataToUpdate){
    try{
        const updatedCheckout = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new: true})
        // console.log(updatedCheckout)
        return updatedCheckout
    }catch(error){
        console.log("Error in changing Checkout Time.", error)
    }
}

app.post("/hotels/:hotelId", async(req, res) => {
    try{
        const updHotel = await updateHotelById(req.params.hotelId, req.body)
        if(updHotel){
            res.status(200).json({message: "Hotel updated successfully.", updHotel: updHotel})
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update hotel"})
    }
})

// updateHotelById("68ab41d7fff4df38696d9fe4", {checkOutTime: "11:00 AM"})

// Question 2: 

async function updateHotelByName(hotelName, dataToUpdate){
    try{
        const updatedRating = await Hotel.findOneAndUpdate({name: hotelName}, dataToUpdate, {new: true})
        console.log(updatedRating)
    }catch(error){
        console.log("Error in changing Rating.")
    }
}

// updateHotelByName("Sunset Resort", {rating: 4.2})

// Question 3: 

async function updateHotelByPhoneNumber(hotelPhoneNumber, dataToUpdate){
    try{
        const updatedPhoneNumber = await Hotel.findOneAndUpdate({phoneNumber: hotelPhoneNumber}, dataToUpdate, {new: true})
        console.log(updatedPhoneNumber)
    }catch(error){
        console.log("Error in updating phone number.")
    }
}

// updateHotelByPhoneNumber("+1299655890", {phoneNumber: "+1997687392"})

// BE2.4_HW2

// Question 1: 

async function deleteHotelById(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
        // console.log("Deleted Hotel by ID: ", deletedHotel)
        return deletedHotel
    }catch(error){
        console.log("Error in Deleting Hotel by ID.", error)
    }
}

app.delete("/hotels/:hotelId", async(req, res) => {
    try{
        const delHotel = await deleteHotelById(req.params.hotelId)
        if(delHotel){
            res.status(200).json({message: "Hotel deleted successfully."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete hotel."})
    }
})

// deleteHotelById("68a8590967e526b846b2bed1")

// Question 2: 

async function deleteHotelByPhoneNumber(hotelPhoneNumber){
    try{
        const deletedHotel = await Hotel.findOneAndDelete({phoneNumber: hotelPhoneNumber})
        console.log("Deleted Hotel by Phone Number: ", deletedHotel)
    }catch(error){
        console.log("Error in Deleting Hotel by Phone Number.", error)
    }
}

// deleteHotelByPhoneNumber("+1234555890")

// const PORT = 3000

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })

module.exports = app
module.exports.handler = serverless(app)