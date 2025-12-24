import mongoose, { model, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"]
    },

    currency: {
      type: String,
      enum: ["NGN", "USD", "EUR"],
      default: "USD"
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true
    },

    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "others"
      ],
      required: true
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active"
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (val) => val <= new Date(),
        message: "Start Date must be in the past"
      }
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (val) {
          return val > this.startDate;
        },
        message: "Renewal date must be after start date"
      }
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// =====================
// INDEXES
// =====================
subscriptionSchema.index({ user: 1, status: 1 });

// =====================
// VIRTUALS
// =====================
subscriptionSchema.virtual("isExpired").get(function () {
  return this.renewalDate < new Date();
});


// =====================
// PRE-SAVE HOOK
// =====================
subscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    const renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        renewalDate.setDate(renewalDate.getDate() + 1);
        break;
      case "weekly":
        renewalDate.setDate(renewalDate.getDate() + 7);
        break;
      case "monthly":
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        break;
      case "yearly":
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        break;
    }

    this.renewalDate = renewalDate;
  }

  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }
});


// =====================
// MODEL
// =====================
const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
