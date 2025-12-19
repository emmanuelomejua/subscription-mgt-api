import mongoose, { model, Schema } from "mongoose";

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription Name is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['NGA', 'USD', 'EUR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'others'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required:true,
        validate: {
            validator: (val) => val <= new Date(),
            message: 'Start Date must be in the past'
        },
    },
    renewalDate: {
        type: Date,
        required:true,
        validate: {
            validator: function(val){
                return val > this.startDate();
            },
            message: 'Start Date must be in the past'
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps: true})


// Auto Calculates the renewal date
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency])
    }

    // Auto update status when renewal date expired
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }

    next()
})


const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
