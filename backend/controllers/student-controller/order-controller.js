const paypal = require('../../helpers/paypal');
const Order = require('../../models/order');
const StudentCourses = require('../../models/student_courses');
const Course = require('../../models/course');


const createOrder = async (request, response) => {
    try{
        const {
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseId,
            courseTitle,
            coursePricing
        } = request.body;
        const payment_json = {
            intent: "sale",
            payer: {
                payment_method: 'paypal'

            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            },
            transactions: [
                {
                    item_list : {
                        items: [{
                            name: courseTitle,
                            sku: courseId,
                            price: coursePricing,
                            currency: "USD",
                            quantity: 1
                         }
                        ]
                    },
                    amount: {
                        currency: 'USD',
                        total: coursePricing.toFixed(2)
                    },
                    description : courseTitle
                }
            ]
        }
        paypal.payment.create(payment_json , async (error, paymentInfo) => {
            if(error){
                console.log(error)
                return response.status(500).json({
                    success: false,
                    message: "Error while creating payment"
                })
            }else{
                const newCreatedOrder = new Order({
                    userId,
                    userName,
                    userEmail,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    paymentId,
                    payerId,
                    instructorId,
                    instructorName,
                    courseImage,
                    courseId,
                    courseTitle,
                    coursePricing
                });
                await newCreatedOrder.save();
                const approveUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href;
                return response.status(201).json({
                    success: true,
                    data:{
                        approveUrl,
                        orderId: newCreatedOrder._id
                    }
                })
            }
        })

    }catch(error){
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const capturePayment = async (request, response) =>  {
    try{
        const {paymentId, payerId, orderId} = request.body;
        let order = await Order.findById(orderId); 
        if(!order){
            return response.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        order.paymentStatus='paid'
        order.orderStatus='confirmed'
        order.paymentId=paymentId
        order.payerId=payerId
        await order.save();
        const studentCourses = await StudentCourses.findOne({userId: order.userId});
        if(studentCourses){
            studentCourses.courses.push({
                courseId: order.courseId,
                title: order.courseTitle,
                instructorId: order.instructorId,
                instructorName: order.instructorName,
                courseImage: order.courseImage,
                pricing: order.coursePricing,
                dateOfPurchase: order.orderDate,
            });
            await studentCourses.save();

        }else{
            const newStudentCourses = new StudentCourses({
                userId: order.userId,
                courses: [
                    {
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        courseImage: order.courseImage,
                        pricing: order.coursePricing,
                        dateOfPurchase: order.orderDate,

                    }
                ]
            })
            await newStudentCourses.save();

        }

        await Course.findByIdAndUpdate(order.courseId, { 
            $addToSet: { students: {
                studentId: order.userId,
                studentName: order.userName,
                studentEmail: order.userEmail,
                paidAmount: order.coursePricing,
            } 
        } });
        return response.status(200).json({
            success: true,
            message: "Order Confirmed",
            data: order
        });
    }catch(error){
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {createOrder, capturePayment}