const mongoose = require('mongoose');
const { payment } = require('paypal-rest-sdk');

const orderSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userEmail: String,
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    orderDate: Date,
    paymentId: String,
    payerId: String,
    instructorId: String,
    instructorName: String,
    courseImage: String,
    courseId: String,
    courseTitle: String,
    coursePricing: String
})

module.exports = mongoose.model('Order', orderSchema);